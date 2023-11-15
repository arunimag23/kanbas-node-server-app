import express from 'express';
import Hello from "./hello.js";
import cors from "cors";
import Lab5 from "./lab5.js";
import CourseRoutes from './courses/routes.js';
import ModuleRoutes from "./modules/routes.js";
import AssignmentRoutes from './assignments/routes.js';
import "dotenv/config";

const app = express()
app.use(express.json());
app.use(
    cors({
      credentials: true,
      origin: process.env.NODE_ENV === "production"
        ? process.env.FRONTEND_URL
        : process.env.FRONTEND_URL_LOCAL,
    })
  );
ModuleRoutes(app);
Hello(app);
Lab5(app);
CourseRoutes(app);
AssignmentRoutes(app);
app.listen(process.env.PORT || 4000);
