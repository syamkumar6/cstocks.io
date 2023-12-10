import React from "react";
import { Container } from "react-bootstrap";
import {loadStripe} from '@stripe/stripe-js';
import { useSelector } from "react-redux/es/hooks/useSelector";

function PlaceOrderCard({ carts, totalPrice }) {
  const user = useSelector((state) => state.auth.userdata)
  const stripeCart = carts.map((cart)=> {
     return {
      id:cart._id,
      title:cart.title,
      image:cart.image,
      price:cart.price,
      quantity:cart.quantity
     }
  })
  
//* Stripe checkout session

  const Makepayment = async() => {
    const stripe = await loadStripe("pk_test_51OAAOASFQwpcGAJ8SpwclfoIvL35iOygiV4zpqBR9iJdHlcFwcCDY4tijf1mVaSKdVfKG1wp25hEQz0tEb8Wis5c005COTxi15")

    const body = {
      products:stripeCart,
      userId: user.id
    }
    const headers = {
      "Content-Type":"application/json"
    }
    const response = await fetch("http://localhost:3000/create-checkout-session",{
      method:"POST",
      headers:headers,
      body:JSON.stringify(body)
    })

    const session = await response.json()

    const result = stripe.redirectToCheckout({
      sessionId:session.id
    })

    if(result.error){
      console.log(result.error)
    }
  }

  return (
    <Container >
      <div className="d-flex flex-column h-50 mt-5 ">
        <h5 className="fw-bold mt-3 border-bottom pb-1">PRICE DETAILS</h5>
        <div>
          <div className="d-flex flex-row justify-content-between pb-2">
            <span>Price({carts.length} items)</span>
            <span className="text-success fw-bold"> &#x20b9; {totalPrice}</span>
          </div>
          <div className="d-flex flex-row justify-content-between pb-2">
            <span>Discount</span>
            <span className=" fw-bold">- &#x20b9; 0</span>
          </div>
          <div className="d-flex flex-row justify-content-between pb-2">
            <span>Delivery Charges</span>
            <span className=" fw-bold">Free</span>
          </div>
          <div className="d-flex flex-row justify-content-between pb-2">
            <h6>Total Amount</h6>
            <span className="text-success fw-bold"> &#x20b9; {totalPrice}</span>
          </div> 
        </div>
        <button type="button" class="btn btn-outline-dark" onClick={Makepayment}>Check Out</button>
      </div>
    </Container>
  );
}

export default PlaceOrderCard;
