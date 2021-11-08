import express from "express";
import cors from "cors";

import data from "./data.js";
import connectDB from "./config/db.js";
import userRouter from "./router/userRouter.js";

connectDB();

const app = express();

app.use(cors());

app.use('/api/users', userRouter);

app.get('/api/products', (req, res) => {
  res.send(data.products);
});

app.get('/api/products/:id', (req, res) => {
  const product = data.products.find((x)=> x._id === req.params.id)
  if(product) {
    res.send(product);
  } else {
    res.status(404).send({message: 'Ürün bulunamadı!'})
  } 
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, ()=> {
  console.log(`Server ${PORT} portunda çalışıyor...`);
});



