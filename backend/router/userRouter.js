import express from 'express';
import User from '../models/userModel';
import expressAsyncHandler from 'express-async-handler';
import { generateToken, isAuth } from '../util';

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

userRouter.put('/:id', isAuth, expressAsyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });

  if (!user) {
    return res.status(404).send({ message: "User Not Found" });
  } else {

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.password = req.body.password || user.password;

    const updatedUser = await user.save();

    res.send({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser),
    })
  }
}));

export default userRouter;