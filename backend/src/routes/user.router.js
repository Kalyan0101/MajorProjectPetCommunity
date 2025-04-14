import { Router } from "express";
import { registeruser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/register").post(
    upload.fields([
        {
            name: "userAvatar",
            maxCount: 1
        },
        {
            name: "petAvatar",
            maxCount: 1
        }
    ]),
    registeruser
)

export default router;