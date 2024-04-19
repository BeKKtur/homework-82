import express from "express";
import {Album, Artists, Track} from "../types";
import albumsModel from "../moduls/albums";
import trackModel from "../moduls/track";
import {ObjectId} from "mongodb";
import artistModel from "../moduls/artists";
import userModel from "../moduls/user";
import trackHistory from "../moduls/trackHistory";

const artistsRoute = express.Router();

artistsRoute.get('/', async (req, res, next) => {
   try {
      const artists = await artistModel.find();
      return  res.send(artists);
   } catch (e) {
      next(e);
   }
});

artistsRoute.post('/', async (req, res, next) => {
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

export default artistsRoute;