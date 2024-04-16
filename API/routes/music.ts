import express from "express";
import musicModel from "../moduls/artists";
import {Album, Artists, Track} from "../types";
import albumsModel from "../moduls/albums";
import trackModel from "../moduls/track";
import {ObjectId} from "mongodb";
import mongoDb from "../mongoDb";
import artists from "../moduls/artists";
import {ObjectIdQueryTypeCasting} from "mongoose";
import artistModel from "../moduls/artists";

const musicRoute = express.Router();

musicRoute.get('/artists', async (req, res, next) => {
   try {
      const artists = await artistModel.find();
      return  res.send(artists);
   } catch (e) {
      next(e);
   }
});

musicRoute.post('/artists', async (req, res, next) => {
   try {
      const artistsData:Artists  = {
         name: req.body.name,
         photo: req.body.photo,
         info: req.body.info,
      }
      const artists = new artistModel(artistsData);
      await artists.save();

      return  res.send(artists);
   } catch (e) {
      next(e);
   }
});

musicRoute.get('/albums',  async (req, res, next) => {
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

musicRoute.post('/albums', async (req, res, next) => {
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

musicRoute.get('/albums/:id',  async (req, res, next) => {
   try {
      let _id: ObjectId;
      try {
         _id = new ObjectId(req.params.id);
      } catch (e) {
         return res.status(404).send({error: 'error'});
      }
      const result = await albumsModel.find({_id});

      return res.send(result);
   } catch (e) {
      next(e)
   }
});

musicRoute.get('/tracks', async (req, res, next) => {
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

musicRoute.post('/tracks', async (req, res, next) => {
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

export default musicRoute;