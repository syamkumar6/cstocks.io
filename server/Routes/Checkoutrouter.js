const express = require('express');
const Orders = require('../Models/Order');
const router = express.Router()
const stripe = require("stripe")("sk_test_51OAAOASFQwpcGAJ8o8kep195RQK9bzblJASlofxZLhwjtqob5mxfVrnZSqiXzjwuEMEK7MkvrfoG0KK2lbtIrzwu00ud58ZDb7")


router.post('/', async(req, res) => {

    // const customer = await stripe.customers.create({
    //   metadata:{
    //     userId: req.body.userId,
    //     cart: JSON.stringify(req.body.products)
    
    //   }
    // }) 
    const {products} = req.body

    const lineItems =products.map((product) => ({ 
        
          price_data:{
            currency:"inr",
            product_data:{
                name:product.title,
                images: [product.image], 
                metadata:{
                    id: product.id
                }
            },
            unit_amount:product.price * 100, 
        },
        quantity:product.quantity 
          
    })
    )
          
        
        
    
    const session =  await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        // shipping_address_collection: {
        //     allowed_countries: ['IN'],
        //   },
        //   shipping_options: [
        //     {
        //       shipping_rate_data: {
        //         type: 'fixed_amount',
        //         fixed_amount: {
        //           amount: 0,
        //           currency: 'inr',
        //         },
        //         display_name: 'Free shipping',
        //         delivery_estimate: {
        //           minimum: {
        //             unit: 'business_day',
        //             value: 5,
        //           },
        //           maximum: {
        //             unit: 'business_day',
        //             value: 7,
        //           },
        //         },
        //       },
        //     },
        //     {
        //       shipping_rate_data: {
        //         type: 'fixed_amount',
        //         fixed_amount: {
        //           amount: 0,
        //           currency: 'inr',
        //         },
        //         display_name: 'Next day air',
        //         delivery_estimate: {
        //           minimum: {
        //             unit: 'business_day',
        //             value: 1,
        //           },
        //           maximum: {
        //             unit: 'business_day',
        //             value: 1,
        //           },
        //         },
        //       },
        //     },
        //   ],
        // phone_number_collection:{
        //     enabled: true
        // },
        line_items:lineItems,
        // customer: customer.id,
        mode:"payment",
        success_url:`${process.env.CLIENT_URL}/user/orders`,
        cancel_url:`${process.env.CLIENT_URL}/cart`,
    })
 
    res.json({id:session.id})
})

//* Create Order
  
// const createOrder = async(customer, data) =>{
//   const Items = JSON.parse(customer.metadata.cart);

//   const newOrders = new Orders({
//     userId: customer.metadata.userId,
//     customerId: data.customer,
//     paymentIntentId: data.payment_intent,
//     products: Items,
//     subtotal: data.amount_subtotal / 100,
//     total: data.amount_subtotal / 100,
//     shipping: data.customer_details,
//     payment_status: data.payment_status,
//   })

//   try{
//     const savedOrder = await newOrders.save();
//   }catch(err){console.log(err)}
// }


// //* This is your Stripe CLI webhook secret for testing your endpoint locally.
// let endpointSecret;

// // *endpointSecret = "whsec_96d9af2ddda346d987dc8e2909aeca51ee0f4b39ded6f40613c6ec5202a5c8ac";

// router.post('/webhook', express.raw({type: 'application/json'}), (req, res) => {
//   const sig = req.headers['stripe-signature']
  
//   let data;
//   let eventType;

//   if(endpointSecret){
//     let event;

//     try {
//       event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
//       console.log("webhook verified")
//     } catch (err) {
//       console.log(`Webhook Error: ${err.message}`)
//       res.status(400).send(`Webhook Error: ${err.message}`);
//       return;
//     }

//     data = event.data.object;
//     eventType = event.type;
//   }else{
//     data = req.body.data.object;
//     eventType = req.body.type
//   }

//   // *Handle the event

//   if(eventType === "checkout.session.completed"){
//      stripe.customers.retrieve(data.customer).then((customer) => {
//       createOrder(customer, data)
//      })
//      .catch((err) => console.log(err.message))
//   }
  
//   res.send().end();
// });



module.exports = router