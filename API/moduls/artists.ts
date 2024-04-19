import mongoose from "mongoose";

const Schema = mongoose.Schema;

const artistsSchema = new Schema({
    name: {
        type:String,
        required: true,
    },
    photo: {
        type: String,
    },
    info: {
        type: String,
    },
},{versionKey: false});

const musicModel = mongoose.model('artists', artistsSchema);
export default musicModel