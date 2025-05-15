import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { 
    allPost, 
    commentPost, 
    createPost, 
    deletePost, 
    lovePost, 
    updatePost 
} from "../controllers/post.controller.js";

const router = Router();

router.use(verifyJWT);

router.route("/allPost").get(allPost); // NOTE: accept optional url parameter ( ?userId = ... )
router.route("/createPost").post(upload.single("image"), createPost);
router.route("/deletePost/:postId").get(deletePost);
router.route("/updatePost/:postId").post(updatePost);
router.route("/love/:postId").get(lovePost);
router.route("/comment/:postId").post(commentPost);

export default router;