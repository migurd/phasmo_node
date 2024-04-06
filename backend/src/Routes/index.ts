import express from 'express';
import { IUser, UserReg } from '../Models/User';
import { user_db } from '../Models/user_db';
import { ghost_db } from '../Models/ghost_db';
import bcrypt from 'bcrypt';
import { Role } from '../Models/enums';
import IUserHasGhost from '../Models/UserHasGhost';
import IGhost from '../Models/Ghost';

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
router.post('/user/login', async (req: any, res: any) => {
  let currentUser: UserReg;

  try {
    currentUser = {
      username: req.body.username,
      password: req.body.password
    }
    const userFound = await user_db.login(currentUser);

    req.session.user = userFound;
    // console.log(req.session.user);

    res.status(200).json({ success: true, message: "OK", user: userFound });
  }
  catch (err: any) {
    console.error(`Error ocurred: ${err.message}`);
    res.status(400).json({ success: false, message: err.message });
  }
});

// Verify if user is logged in
router.get('/user/login', (req: any, res: any) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user })
  } else {
    res.send({ loggedIn: false })
  }
});

// Sign out
router.get('/user/signout', (req: any, res: any) => {
  if (req.session.user) {
    req.session.user = null;
    res.send({ loggedIn: false })
  } else {
    res.send({ loggedIn: false })
  }
});

// *************************************
// USER
router.get('/user/getUserInfo/:userId', async (req: any, res: any) => {
  try {
    const userId = req.params.userId;
    const retrieved_user = await user_db.getUser(userId); // Await the asynchronous operation
    res.send({ retrieved_user });
  } catch (error) {
    // Handle errors properly
    console.error(error);
    res.status(500).send('Error fetching user information');
  }
});

router.get('/user/getUserStatistics/:userId', async (req: any, res: any) => {
  try {
    const userId = req.params.userId;
    const retrieved_data = await ghost_db.getGhostStatistics(userId); // Await the asynchronous operation
    res.send(retrieved_data);
  } catch (error) {
    // Handle errors properly
    console.error(error);
    res.status(500).send('Error fetching user information');
  }
});

router.put('/user/updateUser', async (req: any, res: any) => {
  try {
    const updatedUser: Partial<IUser> = {
      id_user: req.body.id_user,
      money: req.body.money,
      level: req.body.level,
      status: req.body.status,
    }

    const retrieved_data = await user_db.updateUser(updatedUser); // Await the asynchronous operation
    res.send({ status: retrieved_data });
  } catch (error) {
    // Handle errors properly
    console.error(error);
    res.status(500).send('Error fetching user information');
  }
});

router.post('/user/postUserHasGhost', async (req: any, res: any) => {
  try {
    const newGame: IUserHasGhost = {
      user_id_user: req.body.user_id_user,
      ghost_id_ghost: req.body.ghost_id_ghost,
      isFound: req.body.isFound,
      isDiscovered: req.body.isDiscovered,
      isDead: req.body.isDead,
    }

    const retrieved_data = await user_db.postUserHasGhost(newGame); // Await the asynchronous operation
    res.send({ status: retrieved_data });
  } catch (error) {
    // Handle errors properly
    console.error(error);
    res.status(500).send('Error creating a new user has ghost row');
  }
});

// *********************************
// ADMIN

router.post('/admin/createGhost', async (req: any, res: any) => {
  try {
    const newGhost: IGhost = {
      name: req.body.name,
      description: req.body.description,
      pic: req.body.pic,
    }

    const retrieved_data = await ghost_db.createGhost(newGhost); // Await the asynchronous operation
    res.send({ status: retrieved_data });
  } catch (error) {
    // Handle errors properly
    console.error(error);
    res.status(500).send('Error creating ghost');
  }
});

router.put('/admin/updateGhost', async (req: any, res: any) => {
  try {
    const updatedGhost: IGhost = {
      id_ghost: req.body.id_ghost,
      name: req.body.name,
      description: req.body.description,
      pic: req.body.pic,
      status: req.body.status,
    }

    const retrieved_data = await ghost_db.updateGhost(updatedGhost); // Await the asynchronous operation
    res.send({ status: retrieved_data });
  } catch (error) {
    // Handle errors properly
    console.error(error);
    res.status(500).send('Error updating ghost information');
  }
});

router.get('/admin/ghostInfo/:ghostId', async (req: any, res: any) => {
  try {
    const ghostId = req.params.ghostId;
    const retrieved_data = await ghost_db.getGhost(ghostId); // Await the asynchronous operation
    res.send(retrieved_data);
  } catch (error) {
    // Handle errors properly
    console.error(error);
    res.status(500).send(`Error obtaining ghost.`);
  }
});

router.get('/admin/ghostsInfo', async (req: any, res: any) => {
  try {
    const retrieved_data = await ghost_db.getGhosts(); // Await the asynchronous operation
    res.send(retrieved_data);
  } catch (error) {
    // Handle errors properly
    console.error(error);
    res.status(500).send('Error obtaining ghosts.');
  }
});

router.get('/admin/amountGhosts', async (req: any, res: any) => {
  try {
    const retrieved_data = await ghost_db.getTotalGhosts(); // Await the asynchronous operation
    res.send(retrieved_data);
  } catch (error) {
    // Handle errors properly
    console.error(error);
    res.status(500).send('Error obtaining amount of ghosts.');
  }
});