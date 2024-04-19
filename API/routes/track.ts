import express from "express";
import trackModel from "../moduls/track";
import {Track} from "../types";
import artistsRoute from "./artists";

const trackRouter = express.Router();

trackRouter.get('/', async (req, res, next) => {
    try {
        const track = await trackModel.find();
        const query = req.query.album;
        const albumTrack = await trackModel.find({query});
        if (query) {
            res.send(albumTrack)
        } else {
            return res.send(track)
        }
    } catch (e) {
        next(e)
    }
});

trackRouter.post('/', async (req, res, next) => {
    try {
        const trackData:Track = {
            name: req.body.name,
            album: req.body.album,
            duration: req.body.duration,
        };

        const track = new trackModel(trackData);
        await track.save();

        return res.send(track);
    } catch (e) {
        next(e)
    }
});

export default trackRouter;