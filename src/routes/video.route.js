import Router from "express";
import { getAllVideos,publishAVideo,deleteVideo,updateVideo,togglePublishStatus,getVideoById} from "../controllers/video.controller.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import { upload } from "../middlewares/multer.middlewares.js";

const router = Router();

// Apply middleware to verify JWT
router.use(verifyJWT);


router
    .route("/upload")
    .get(getAllVideos)
    .post(
        upload.fields([
            {
                name : "videoFile",
                maxCount: 1,
            },
            {
                name: "thumbnail",
                maxCount: 1,

            }

        ]),
        publishAVideo
    )


  router 
        .route("/v/:videoId")
        .get(getVideoById)
        .delete(deleteVideo)
        .patch(upload.single("thumbnail"),updateVideo);



 router.route("/toogle/publish/:videoID").patch(togglePublishStatus);       







export default router;
