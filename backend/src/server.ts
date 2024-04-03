// src/index.js
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import json from "body-parser";
import cors from "cors";
import { router } from './Routes/index'

dotenv.config();

const main: Express = express();
const port = process.env.PORT || 3000;
const routes = './Routes/index'

// Middleware
main.use(json.urlencoded({extended:true}));
main.use(express.json());
main.use(cors())
main.use(router);

main.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});