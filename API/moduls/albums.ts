import mongoose from "mongoose";

const Schema = mongoose.Schema;

const albumsSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    executor: {
        type: String,
        required: true
    },
    yearOfIssue: {
        type: String,
        required: true
    },
    image: {
        type: String,
    }
}, {versionKey: false});

const albumsModel = mongoose.model('albums', albumsSchema);

export default albumsModel;