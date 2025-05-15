import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import errorHandler from "./middlewares/errorHandler.middleware.js";

const app = express();

app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true
    })
);

app.use(
    express.json({
        limit: "16kb"
    })
);

app.use(
    express.urlencoded({
        extended: true,
        limit: "16kb"
    })
);

app.use(express.static("public"));

app.use(cookieParser());

// import routers
import userRouter from "./routes/user.route.js";
import petRouter from "./routes/pet.route.js"
import postRouter from "./routes/post.route.js"

// route declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/pet", petRouter);
app.use("/api/v1/post", postRouter);

app.use(errorHandler);

export { app }