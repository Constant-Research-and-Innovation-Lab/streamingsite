import mongoose, {Schema, model} from "mongoose";

const subscriptionSchema = new model({
    subscriber:{
        type: Schema.Types.ObjectId, // those who subscribed
        ref: "User"
    },
    channel:{
        type: Schema.Types.ObjectId, // one to whom 'subcriber' is subscribing
        ref : "User"
    }


}, {timestamps: true})


export const Subscription = mongoose.model("Subscription",subscriptionSchema)

