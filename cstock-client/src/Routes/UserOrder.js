import axios from "axios";
import React, { useEffect } from "react";
import styles from "./OrderPage.module.css";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { loginStatus, addUser } from "../ReduxStore/UserSlice";

const baseURL = process.env.REACT_APP_BASE_URL;

export async function loader() {
  const res = await axios.get(`${baseURL}/orders`);
  const data = res.data;
  return { data };
}
function UserOrder() {
  const dispatch = useDispatch();
  const login = useSelector((state) => state.auth.login);
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get(`${baseURL}/users/verify`).then((res) => {
      if (res.data.Status === "Success") {
        dispatch(loginStatus(true));
        dispatch(addUser(res.data.user));
      }
    });
  }, []);
  const { data } = useLoaderData();
  const userId = useSelector((state) => state.auth.userdata.id);
  const orderData = data.filter((order, index) => {
    if (order.userId === userId) {
      return order;
    }
  });

  return (
    <main>
      {login ? (
        <Container className={styles.container}>
          <h3>Your orders</h3>
          <ul>
            {orderData.length > 0 ? (
              orderData.map((item, index) => {
                return (
                  <li key={index} className={styles.orderBox}>
                    {item.products.map((product, index) => {
                      return (
                        <div key={index} className="d-flex flex-row gap-3 pb-3">
                          <div>
                            <img
                              src={product.image}
                              alt="images"
                              className={styles.orderImg}
                            />
                          </div>
                          <div className="d-flex flex-column">
                            <h5>{product.title}</h5>
                            <span className="text-success fw-bold">
                              {" "}
                              &#x20b9;{product.price}
                            </span>
                            <span> Quantity : {product.quantity}</span>
                          </div>
                        </div>
                      );
                    })}
                    <span>Order Id : {item._id}</span>
                    <div className="d-flex flex-row justify-content-between">
                      <span className="fw-bold">
                        Delivery status :{" "}
                        <span className="fw-bold text-success">
                          {item.delivery_status}
                        </span>
                      </span>
                      <span className="fw-bold">
                        {" "}
                        Total Price :{" "}
                        <span className="text-success">
                          {" "}
                          &#x20b9;{item.total}
                        </span>
                      </span>
                    </div>
                  </li>
                );
              })
            ) : (
              <div className="d-flex justify-content-center m-4 fs-4 ">
                <span>Order details will be  updated soon...</span>
              </div>
            )}
          </ul>
        </Container>
      ) : (
        navigate("/")
      )}
    </main>
  );
}

export default UserOrder;
