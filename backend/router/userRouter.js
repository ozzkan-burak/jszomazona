import express from 'express';
import User from '../models/userModel';
import expressAsyncHandler from 'express-async-handler';
import { generateToken } from '../util';

const userRouter = express.Router();

userRouter.get('/createadmin', expressAsyncHandler(async (req, res) => {
  try {
    const user = new User({
      name: 'user',
      email: "user@jszomazona.com",
      password: "jszomazona",
      isAdmin: false
    });
    const createdUser = await user.save();
    res.send(createdUser);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}));

userRouter.post("/signin", expressAsyncHandler(async (req, res) => {
  const signinUser = await User.findOne({ email: req.body.email, password: req.body.password });
  if (!signinUser) {
    return res.status(401).send({ message: "Invalid email or password" });
  } else {
    res.send({
      _id: signinUser._id,
      name: signinUser.name,
      email: signinUser.email,
      isAdmin: signinUser.isAdmin,
      token: generateToken(signinUser),
    })
  }
}));


userRouter.post("/register", expressAsyncHandler(async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  const createdUser = await user.save();
  if (!createdUser) {
    return res.status(401).send({ message: "Invalid User Data" });
  } else {
    res.send({
      _id: createdUser._id,
      name: createdUser.name,
      email: createdUser.email,
      isAdmin: createdUser.isAdmin,
      token: generateToken(createdUser),
    })
  }
}));

export default userRouter;