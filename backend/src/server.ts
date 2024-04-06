import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { router } from './Routes/index'

// DOTENV
dotenv.config();

// CONST
const main: Express = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

// Middleware
main.use(express.json());
main.use(bodyParser.urlencoded({ extended: true }));
main.use(cors({
  origin: ["http://localhost:5173"],
  methods: ["GET", "POST", "PUT"],
  credentials: true,
}));
main.use(
  session({
    key: "userId",
    secret: "omaga",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24 * 1000,
    },
  })
);
main.use(cookieParser());
main.use(router);

// END
main.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});