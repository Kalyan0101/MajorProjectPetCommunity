import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { 
    allPost, 
    commentPost, 
    createPost, 
    deletePost,
    updatePost 
} from "../controllers/post.controller.js";

import { loveDislove } from "../controllers/love.controller.js";

const router = Router();

router.route("/allPost").get(allPost); // NOTE: accept optional url parameter ( ?userId=... )

router.use(verifyJWT);
router.route("/createPost").post(upload.single("image"), createPost);
router.route("/deletePost/:postId").get(deletePost);
router.route("/updatePost/:postId").post(updatePost);

// from seperate controller(s)
router.route("/love/:postId").get(loveDislove);
router.route("/comment/:postId").post(commentPost);

export default router;