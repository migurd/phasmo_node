import express from 'express';
import { User, UserReg } from '../Models/User';
import { user_db } from '../Models/user_db';
import bcrypt from 'bcrypt';

export const router = express.Router();

const saltRounds = 10;

// Register
router.post('/user/register', async (req, res) => {
  let newUser: UserReg;

  try {
    const username = req.body.username;
    const password = req.body.password;

    // Bcrypt
    bcrypt.hash(password, saltRounds, async (err, hash) => {

      if (err) console.error(`Error ocurred: ${err.message}`);

      newUser = {
        username: username,
        password: hash
      }

      try {
        const msg = await user_db.register(newUser);
        res.status(200).json({ success: true, message: msg });
      } catch (error: any) {
        res.status(400).json({ success: false, message: "There was a problem creating the account!" });
      }
    });
  }
  catch (err: any) {
    console.error(`Error ocurred: ${err.message}`);
    res.status(400).json({ success: false, message: err.message });
  }
});

// Login
router.post('/user/login', async (req, res) => {
  let currentUser: UserReg;

  try {
    currentUser = {
      username: req.body.username,
      password: req.body.password
    }
    const userFound = await user_db.login(currentUser);
    res.status(200).json({ success: true, message: "OK", currentUser: userFound });
  }
  catch (err: any) {
    console.error(`Error ocurred: ${err.message}`);
    res.status(400).json({ success: false, message: err.message });
  }
});