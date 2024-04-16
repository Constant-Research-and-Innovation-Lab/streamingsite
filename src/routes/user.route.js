import { Router} from "express";
import { changeCurrentPassword, getCurrentUser, getUserChannelProfile, getWatchistory, loginUser, logoutUser, refreshAccessToken, registerUser,updateAccountDetails,updateUserAvatar,updateUserCoverImage } from "../controllers/user.controller.js";
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

router.route("/change-password").post(verifyJWT,changeCurrentPassword)

router.route("/current-user").get(verifyJWT,getCurrentUser)

router.route("/update-account").patch(verifyJWT,updateAccountDetails)

router.route("/avater").patch(verifyJWT,upload.single("avater"),updateUserAvatar)

router.route("/coverImage").patch(verifyJWT,upload.single("coverImage"),updateUserCoverImage)

router.route("/c/:username").get(verifyJWT,getUserChannelProfile)

router.route("/history").get(verifyJWT,getWatchistory)

export default router;



