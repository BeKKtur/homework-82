import mongoose from "mongoose";
import {TrackHistory, TrackMethods, TrackModel} from "../types";

const Schema = mongoose.Schema;

const trackSchema = new mongoose.Schema<TrackHistory, TrackModel, TrackMethods>({
    user: {
        type: String,
        required: true
    },
    track: {
        type: String,
        required: true
    },
    datetime: {
        type: String,
        required: true
    }
}, {versionKey: false});

trackSchema.methods.dateTime = function () {
    this.datetime = new Date(8.64e15).toString()
}

const trackHistory = mongoose.model<TrackHistory, TrackModel>('track history', trackSchema);

export default trackHistory