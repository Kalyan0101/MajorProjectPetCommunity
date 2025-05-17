import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { 
    deletePet, 
    getAllPet, 
    registerPet, 
    updatePetDetails 
} from "../controllers/pet.controller.js";


const router = Router();

router.use(verifyJWT);

router.route("/getAllPet").get(getAllPet);
router.route("/registerPet").post(upload.single("avatar"), registerPet);
router.route("/deletePet/:petId").delete(deletePet);
router.route("/updateDetails").post(upload.single("avatar"), updatePetDetails);

export default router;