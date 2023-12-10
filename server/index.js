const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const cookieParses = require("cookie-parser");


const Bookrouter = require("./Routes/Bookrouter");
const Carouselroutes = require("./Routes/Carouselroutes");
const Personrouter = require("./Routes/Personrouter");
const Userrouter = require("./Routes/Userrouter");
const Checkoutrouter = require("./Routes/Checkoutrouter")
const Orderrouter = require("./Routes/Orderrouter")

const app = express();
const port = process.env.PORT || 3000

app.use(cookieParses());
app.use(express.json());
app.use(
  cors({
    origin: ["https://cstocks-io-syam-kumars-projects.vercel.app"],
    methods: ["POST, GET"],
    credentials: true,
  })
);


app.use("/books", Bookrouter);
app.use("/carousels", Carouselroutes);
app.use("/persons", Personrouter);
app.use("/users", Userrouter);
app.use("/create-checkout-session", Checkoutrouter)
app.use("/orders", Orderrouter)



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

main() 
  .then(() => console.log("db connected")) 
  .catch((err) => console.log(err));

async function main() {
  const db = process.env.DB_URL;
  const urlwithpass = db.replace("<password>", process.env.DB_PASS);

  await mongoose.connect(urlwithpass);

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
