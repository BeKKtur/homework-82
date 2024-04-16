import mongoose from "mongoose";

const Schema = mongoose.Schema;

const trackSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    album: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    }
}, {versionKey: false});

const trackModel = mongoose.model('track', trackSchema);

export default trackModel