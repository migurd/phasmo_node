import express from 'express';
import { User, UserReg } from '../Models/User';
import { user_db } from '../Models/user_db';

export const router = express.Router();

// Register
router.post('/user/register', async (req, res) => {
  let newUser: UserReg;
  let msg: string;

  try {
    newUser = {
      username: req.body.username,
      password: req.body.password
    }
    msg = await user_db.register(newUser);
    res.status(200).json({ success: true, message: msg });
  }
  catch (err: any) {
    console.error(`Error ocurred: ${err.message}`);
    res.status(400).json({ success: false, message: "User couldn't be created" });
  }
});

// Login
router.post('/user/login', async (req, res) => {
  let currentUser: UserReg;

  try {
    console.log(req.body.username, req.body.password);
    currentUser = {
      username: req.body.username,
      password: req.body.password
    }
    const userFound = await user_db.login(currentUser);
    res.status(200).json({ success: true, message: "OK", currentUser: userFound });
  }
  catch (err: any) {
    console.error(`Error ocurred: ${err.message}`);
    res.status(400).json({ success: false, message: "User couldn't be found" });
  }
});