import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { deleteFromCloudinary, uploadOnCloudinary } from "../utils/cloudnary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Video } from "../models/video.model.js";

const publishAVideo = asyncHandler(async (req, res) => {
    const { title, description, isPublished = true } = req.body;

    if (!title || !description) {
        throw new ApiError(400, "All fields are required");
    }

    const videoFileLocalPath = req.files?.videoFile?.[0].path;
    const thumbnailLocacPath = req.files?.thumbnail?.[0].path;

    if (!videoFileLocalPath) {
        throw new ApiError(400, "Video file is required");
    }

    if (!thumbnailLocacPath) {
        throw new ApiError(400, "Thumbnail is required");
    }

    const videoFile = await uploadOnCloudinary(videoFileLocalPath);
    const thumbnail = await uploadOnCloudinary(thumbnailLocacPath);

    const duration = videoFile?.duration ? String(videoFile.duration) : undefined;



    const video = await Video.create({
        videoFile: videoFile.url ,
        thumbnail: thumbnail.url,
        title,
        description,
        duration,
        owner: req.user._id,
        isPublished
    });

    if (!video) {
        throw new ApiError(400, "Failed to upload video");
    }

    return res.status(200).json({
        status: 200,
        message: "Video uploaded successfully",
        data: video
    });
});



const getVideoById = asyncHandler(async(req,res) => {

    const {videoId} = req.params

})


const updateVideo = asyncHandler((req,res)=>{
    const {videoId} = req.params
})


const deleteVideo = asyncHandler((req,res)=>{
    const { videoID } = req.params

})


const togglePublishStatus = asyncHandler(async(req,res)=>{
    const {videoId} = req.params
})


const getAllVideos = asyncHandler(async (req,res) =>{
    
    const { page = 1, limit =10, qurey,sortBy,sortType,userID} = req.query



})




export {
    getAllVideos,
    publishAVideo,
    getVideoById,
    updateVideo,
    deleteVideo,
    togglePublishStatus

};