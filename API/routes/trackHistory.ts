import express from "express";
import userModel from "../moduls/user";
import trackHistory from "../moduls/trackHistory";
import artistsRoute from "./artists";

const trackHistoryRouter = express.Router();

trackHistoryRouter.post('/', async (req, res, next) => {
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
});

export default trackHistoryRouter