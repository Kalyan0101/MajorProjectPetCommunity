import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { 
    allUserName, 
    changePassword, 
    getCurrentUser, 
    loginUser, 
    logoutUser, 
    refreshAccessToken, 
    registerUser,
    updateAccountDetails, 
    updateUserAvatar
} from "../controllers/user.controller.js";

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
    registerUser
)
router.route("/allUserName").get(allUserName);
router.route("/login").post(loginUser);

// secure routes
router.route("/logout").get(verifyJWT, logoutUser);
router.route("/currentUser").get(verifyJWT, getCurrentUser);
router.route("/refreshAccessToken").get(verifyJWT, refreshAccessToken);
router.route("/updateAvatar").post(verifyJWT, upload.single("avatar"), updateUserAvatar);
router.route("/changePassword").post(verifyJWT, changePassword);    
router.route("/updateDetails").post(verifyJWT, updateAccountDetails);

export default router;