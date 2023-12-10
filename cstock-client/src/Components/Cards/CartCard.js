import React from "react";
import styles from "./CartCard.module.css";
import toast from 'react-hot-toast';
import { useDispatch } from "react-redux";
import {
  addToCart,
  removeToCart,
  itemQntyDecrement,
} from "../../ReduxStore/cartSlice";

function CartCard({ cartItem }) {
  
  const dispatch = useDispatch();

  const itemQntyIncrement = (e) => {
    dispatch(addToCart(e));
  };

  const removeItem = (e) => {
    dispatch(removeToCart(e))
    toast.success("Item Removed From Cart")
  };

  const ItemQntyDecrement = (e) => {
    dispatch(itemQntyDecrement(e));
  };

  return (
    <li className={styles.cartCard}>
      <div className={styles.cartImgDiv}>
        <img src={cartItem.image} className={styles.cartImg} alt="" />
      </div>
      <div className="d-flex flex-column">
        <h3>{cartItem.title}</h3>
        <span>By {cartItem.author.name}</span>
        <span className="text-success fw-bold">
          &#x20b9; {cartItem.quantity * cartItem.price}
        </span>
        <span>FREE Shipping</span>
        <div className="d-flex flex-column ">
          <span>Quntity</span>
          <div>
            <button
              className={styles.qutyBtn}
              onClick={
                cartItem.quantity <= 1
                  ? () => removeItem(cartItem._id)
                  : () => ItemQntyDecrement(cartItem)
              }
            >
              {" "}
              <img src="./Icons/Minus.svg" alt="" />
            </button>
            <input
              type="text"
              name=""
              id=""
              value={cartItem.quantity}
              className={styles.qtyInput}
            />
            <button
              className={styles.qutyBtn}
              onClick={() => itemQntyIncrement(cartItem)}
            >
              {" "}
              <img src="./Icons/Plus.svg" alt="" />
            </button>
          </div>
        </div>
      </div>

      <button
        className="position-absolute bottom-0 end-0 border-0 bg-light pb-2"
        onClick={() => removeItem(cartItem._id)}
      >
        <img src="./Icons/Trash.svg" alt="" className={styles.trash} />
      </button>
    </li>
  );
}

export default CartCard;
