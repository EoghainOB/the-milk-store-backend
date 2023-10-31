import express from 'express';
import { Application } from 'express';
import { Schema, model, connect } from 'mongoose';
import { cartTypes, milkTypes } from './types';
const cors = require('cors');
require('dotenv').config();

const app: Application = express();
app.use(express.json());
app.use(cors());

main().catch(err => console.log(err));

async function main() {
  
  await connect (`mongodb+srv://Eoghain:${process.env.PASS}@cluster0.sdqzzhz.mongodb.net/portfolio?retryWrites=true&w=majority`);

  const milkSchema = new Schema<milkTypes>({
    id: String,
    name: String,
    type: String,
    storage: Number,
  });

  const Milk = model("Milk", milkSchema);

  app.get("/api/milk", async (_req, res) => {
    try {
    const allMilk = await Milk.find();
    res
    .status(200)
    .json(allMilk);
  } catch (err) {
    res
    .status(400)
    .send({ message: err });
  }
  });

  app.get("/api/milk/:id", async (req, res) => {
    try {
    const { id } = req.params;
    const oneMilk = await Milk.findById(id);
    res
    .status(200)
    .json(oneMilk);
  } catch (err) {
    res
    .status(400)
    .send({ message: err });
    }
  });

  app.post("/api/milk", async (req, res) => {
    try {
    const newMilk = new Milk({ ...req.body });
    await newMilk.save();
    res
    .status(200)
    .json(newMilk);
  } catch (err) {
    res
    .status(400)
    .send({ message: err });
    }
  });

  const cartSchema = new Schema<cartTypes[]>([{
    name: String,
    qty: Number,
    type: String,
    _id: String,
  }]);

  const Milkcarts = model("Milkcart", cartSchema);

  app.get("/cart", async (_req, res) => {
    try {
    const allCarts = await Milkcarts.find();
    res.json(allCarts);
  } catch (err) {
    res
    .status(400)
    .send({ message: err });
  }
  });

  app.get("/cart/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const oneCartItem = await Milkcarts.findById(id);
      res
      .status(200)
      .json(oneCartItem);
  } catch (err) {
    res
    .status(400)
    .send({ message: err });
  }
  });

  app.post("/cart", async (req, res) => {
    try {
    const newCart = new Milkcarts({ ...req.body });
    await newCart.save();
    res.json(newCart);
  } catch (err) {
    res
    .status(400)
    .send({ message: err });
  }
  });

  app.delete("/cart/:id", async (req, res) => {
    try {
    const { id } = req.params;
    const removeItem = await Milkcarts.findByIdAndDelete(id);
    res.json(removeItem);
  } catch (err) {
    res
    .status(400)
    .send({ message: err });
  }
  });

  app.use((_req, res) => res.status(404).send('404 Not Found'));

}

export default app;
