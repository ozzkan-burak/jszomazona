import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import data from "./data.js";
import connectDB from "./config/db.js";
import userRouter from "./router/userRouter.js";
import orderRouter from "./router/orderRouter.js";

connectDB();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/api/users', userRouter);
app.use('/api/orders',orderRouter)
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

app.use((err,req, res,next)=>{
  const status = err.name && err.name == 'ValidationError' ? 400 : 500;
  res.status(status).send({message: err.message});
})

app.listen(PORT, ()=> {
  console.log(`Server ${PORT} portunda çalışıyor...`);
});



