import express from 'express';
import session from "express-session";
import Hello from "./hello.js";
import cors from "cors";
import Lab5 from "./lab5.js";
import CourseRoutes from './courses/routes.js';
import ModuleRoutes from "./modules/routes.js";
import AssignmentRoutes from './assignments/routes.js';
import mongoose from "mongoose";
import UserRoutes from "./users/routes.js";
import "dotenv/config";

const app = express()
app.use(express.json());
app.use(
    cors({
      credentials: true,
      origin: process.env.FRONTEND_URL,
      // origin: process.env.NODE_ENV === "production"
      //   ? process.env.FRONTEND_URL
      //   : process.env.FRONTEND_URL_LOCAL,
    })
  );
  const sessionOptions = {
    secret: "any string",
    resave: false,
    saveUninitialized: false,
  };
  if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
      sameSite: "none",
      secure: true,
    };
  }
  app.use(session(sessionOptions));
  
  // app.use((req, res, next) => {
  //   res.setHeader("Access-Control-Allow-Origin", "*");
  //   res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
  //   res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  //   next();
  // })
const CONNECTION_STRING = process.env.DATABASE_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/kanbas';
mongoose.connect(CONNECTION_STRING);
ModuleRoutes(app);
UserRoutes(app);
Hello(app);
Lab5(app);
CourseRoutes(app);
AssignmentRoutes(app);
app.listen(process.env.PORT || 4000);
