import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { deleteFromCloudinary, uploadOnCloudinary } from "../utils/cloudnary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Video } from "../models/video.model.js";
import { Types } from "mongoose";

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

    return res.status(200).json(new ApiResponse(200,video,"video uploaded successfully"));
});



const getVideoById = asyncHandler(async(req,res) => {

    const { videoId } = req.params

  
    if(!videoId){
        throw new ApiError(400, "Please provide a video id")
    }

   

    const video = await Video.aggregate([
        {
            $match:{
                _id : new Types.ObjectId(videoId)
            }
        },
        {
            $lookup:{
                from: "videos",
                localField: "owner",
                foreignField:"_id",
                as: "video",
            }
        }
    
    ])
    

    // console.log(video[0].owner)

    if(!video[0]){
        throw new ApiError(400, "Video not found")
    }

    return res.status(200).json(new ApiResponse(200,video[0],"Video Fetched Successfully"))
    


})


const updateVideo = asyncHandler(async(req,res)=> {

    const {videoId} = req.params

    const { title, description } = req.body

    const video = await Video.findOne(req.video?._id);

    console.log(video)

    if(!videoId){ throw new ApiError(400, "Video Id not found")}

    const thumbnailLocalPath = req.file?.path;

    if(!thumbnailLocalPath){
        throw new ApiError(400, "Upload the thumbnail")
    };

   
    if(video && video.thumbnail){
        await deleteFromCloudinary(video.thumbnail)
    }


    const thumbnail = await uploadOnCloudinary(thumbnailLocalPath);

    if(!thumbnail.url){
        throw new ApiError(400, "Error while uploading the file")
    }


    const updatedVideo = await Video.findOneAndUpdate(
        req.video?._id,
        {
            $set : {
                thumbnail: thumbnail.url,
                title,
                description
            }
        },
        {
            new:true
        }
    )




    return res
            .status(200)
            .json(new ApiResponse(200,updatedVideo,"Video Updated updated successfully"))

})


const deleteVideo = asyncHandler(async(req,res)=>{
    const { videoId } = req.params

    const video = await Video.findOne(req.video?._id)

    if(video.videoFile){
        await deleteFromCloudinary(video.videoFile)
    }else{
        throw new ApiError(400, "Could not delete the video")
    }


    if(video.thumbnail){
        await deleteFromCloudinary(video.thumbnail)
    } else {
        throw new ApiError(400, "Could not delete thumnail")
    }
        
      
    
    const deleteOnMongoDb = await Video.findOneAndDelete(videoId) 

    return res 
            .status(200)
            .json(new ApiResponse(400, deleteOnMongoDb, "Video Deleted successfully"))

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