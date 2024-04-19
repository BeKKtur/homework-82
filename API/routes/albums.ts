import express from "express";
import albumsModel from "../moduls/albums";
import {Album} from "../types";
import {ObjectId} from "mongodb";

const albumsRoute = express.Router();

albumsRoute.get('/',  async (req, res, next) => {
    try {
        const query = req.query.artist
        const albums = await albumsModel.find();
        const artistAlbum = await albumsModel.find({query});
        if (query){
            res.send(artistAlbum);
        } else {
            return res.send(albums);
        }
    } catch (e) {
        next(e);
    }
});

albumsRoute.post('/', async (req, res, next) => {
    try {
        const albumsData:Album = {
            name: req.body.name,
            executor: req.body.executor,
            yearOfIssue: req.body.yearOfIssue,
            image: req.body.image,
        }

        const albums = new albumsModel(albumsData);
        await albums.save();

        return res.send(albums);
    } catch (e) {
        next(e)
    }
});

albumsRoute.get('/:id',async (req, res, next) => {
    try {
        let _id: ObjectId;
        try {
            _id = new ObjectId(req.params.id);
        } catch (e) {
            return res.status(404).send({error: 'error'});
        }
        const result = await albumsModel.find({_id});
        console.log(_id);
        return res.send(result);
    } catch (e) {
        next(e)
    }
});

export default albumsRoute