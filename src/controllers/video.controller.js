import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { deleteFromCloudinary, uploadOnCloudinary } from "../utils/cloudnary.js";
import { ApiResponse } from "../utils/ApiResponse.js";



const publishAVideo = asyncHandler(async(req,res)=>{
    const {title,description} = req.body
})



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