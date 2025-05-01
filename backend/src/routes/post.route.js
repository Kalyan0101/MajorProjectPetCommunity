import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createPost, deletePost } from "../controllers/post.controller.js";


const router = Router();

router.use(verifyJWT);

router.route("/createPost").post(upload.single("image"), createPost);
router.route("/deletePost").post(deletePost);

// router.route("updatePost").post()