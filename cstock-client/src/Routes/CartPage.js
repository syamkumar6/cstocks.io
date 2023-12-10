/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import styles from "./CartPage.module.css";
import axios from "axios";
import toast from "react-hot-toast";
import { Card, Col, Container, Row } from "react-bootstrap";
import CartCard from "../Components/Cards/CartCard";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import { clearCart } from "../ReduxStore/cartSlice";
import PlaceOrderCard from "../Components/Cards/PlaceOrderCard";
import { loginStatus, addUser } from "../ReduxStore/UserSlice";
import { useNavigate } from "react-router-dom";


const baseURL = process.env.REACT_APP_BASE_URL

function CartPage() {
  const navigate = useNavigate()
  const { carts } = useSelector((state) => state.carts);
  const login = useSelector((state) => state.auth.login)
  const [totalPrice, setPrice] = useState(0);
  const dispatch = useDispatch();
  useEffect(() => {
    axios.get(`${baseURL}/users/verify`)
    .then(res => {
        if(res.data.Status === "Success") {
          dispatch(loginStatus(true))
          dispatch(addUser(res.data.user))
        }else {
          dispatch(loginStatus(false))
        }
    })
}, [])
  

  const emptyCart = (e) => {
    dispatch(clearCart(e));
    toast.success("Your Cart Is Empty");
  };

  const calculateTotal = () => {
    let total = 0;
    carts.map((item) => (total = total + item.quantity * item.price));
    return totalPrice;
  };

  const total = () => {
    let totalPrice = 0;
    carts.map((item) => {
      totalPrice = item.price * item.quantity + totalPrice;
    });
    setPrice(totalPrice);
  };
  useEffect(() => {
    total();
  }, [total]);

  return (
    <div>
      {
        login ?
        <Container>
        <Row>
          <Col sm={8}>
            <div className="d-flex flex-row justify-content-between pt-3 pb-2 border-bottom">
              <h2>Shopping Cart</h2>
              {carts.length > 0 ? (
                <button onClick={emptyCart} className={styles.clearBtn}>
                  Clear Cart
                </button>
              ) : (
                ""
              )}
            </div>
  
            <div>
              {carts.length === 0 ? (
                <Container>
                  <div className={styles.Ecart}>
                    <img src="./Icons/EmptyCart.svg" alt="" />
                    <span className="text-Secondary fs-2 fw-bold">
                      Your Cart Is Empty
                    </span>
                  </div>
                </Container>
              ) : (
                ""
              )}
            </div>
  
            <Card className="border-0">
              <ul>
                {carts.map((cartItem, index) => {
                  return <CartCard key={index} cartItem={cartItem} />;
                })}
              </ul>
            </Card>
            {carts.length > 0 ? (
              <div className="d-flex flex-column align-items-end">
                <span className="fw-bold">Items in Cart : {carts.length}</span>
                <h5>
                  Total Price :
                  <span className="fw-bold text-success">
                    {" "}
                    &#x20b9; {totalPrice}
                  </span>
                </h5>
              </div>
            ) : (
              ""
            )}
          </Col>
  
          <Col sm={4}>
            <PlaceOrderCard carts={carts} totalPrice={totalPrice} />
          </Col>
        </Row>
      </Container>

      :
      
      navigate('/login')
      
      }
    
  </div>

  

  
  
    
  );
}

export default CartPage;
