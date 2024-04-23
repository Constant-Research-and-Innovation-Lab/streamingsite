import mongoose,{Schema} from "mongoose";



const playlistSchema = new Schema({
    name : {
        type: Schema.Types.ObjectId,
        required: true
    },
    description : {
        type: Schema.Types.ObjectId,
        required: true
    },
    videos : [
        {
        type: Schema.Types.ObjectId,
        ref: "Video",
        }
    ],
    owner : {
        type: Schema.Types.ObjectId,
        ref: "User"
    }




},{timestamps:true})


export const Playlist = mongoose.model("Playlist",playlistSchema)
