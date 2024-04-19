import express from "express";
import musicModel from "../moduls/artists";
import {Album, Artists, Track, User} from "../types";
import albumsModel from "../moduls/albums";
import trackModel from "../moduls/track";
import {ObjectId} from "mongodb";
import mongoDb from "../mongoDb";
import artists from "../moduls/artists";
import {ObjectIdQueryTypeCasting} from "mongoose";
import artistModel from "../moduls/artists";
import userModel from "../moduls/user";
import bcrypt from "bcrypt";
import trackHistory from "../moduls/trackHistory";

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
      console.log(_id);
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

musicRoute.post('/users', async (req, res, next) => {
   try {
      const user = new userModel({
         username: req.body.username,
         password: req.body.password,
      })

      user.generateToken();
      await user.save();

      return res.send(user);
   } catch (e) {
      next(e);
   }
});

musicRoute.post('/users/sessions', async (req, res, next) => {
   try {
      const user = await userModel.findOne({username: req.body.username});
      if (!user){
        return res.status(400).send({error: 'Username or password not correct'});
      }

      const isMatch = await user.checkPassword(req.body.password);

      if (!isMatch){
         return res.status(400).send({error: 'Username or password not correct'});
      }

      user.generateToken();
      user.save()

      return  res.send({message: 'username and password correct', user});

   } catch (e) {
      next(e)
   }
});

musicRoute.post('/track_history', async (req, res, next) => {
   try {
      const tokenData = req.get('Authorization');

      if (!tokenData){
        return res.status(401).send({error: "No token provider"})
      }

      const [_, token] = tokenData.split(' ');

      const user = await userModel.findOne({token});

      if (!user) {
         res.status(403).send({error: 'Wrong token'});
      }

      const track = new trackHistory({
         user: req.body.user,
         track: req.body.track,
      });

      track.dateTime();
      await track.save();

      // @ts-ignore
      res.send({track, username: user.username});
   } catch (e) {
      next(e)
   }
})

export default musicRoute;