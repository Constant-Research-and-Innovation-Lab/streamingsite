import { Router} from "express";
import { loginUser, logoutUser, refreshAccessToken, registerUser,updateUserAvatar,updateUserCoverImage } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middlewares.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router()

router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount:1
        },
        {
            name: "coverImage",
            maxCount:1

        }
    ]),
    registerUser
    )

router.route("/login").post(loginUser)

// secured routes

router.route("/logout").post(verifyJWT, logoutUser)

router.route("/refresh-token").post(verifyJWT, refreshAccessToken)

router.route("/avater").post(verifyJWT,upload.single("avater"),updateUserAvatar)

router.route("/coverImage").post(verifyJWT,upload.single("coverImage"),updateUserCoverImage)

  
export default router;



