import express from "express";
import cors from "cors";

import data from "./data.js";


const app = express();

app.use(cors());

const PORT = process.env.PORT || 5000;

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

app.listen(PORT, ()=> {
  console.log(`Server ${PORT} portunda çalışıyor...`);
});



