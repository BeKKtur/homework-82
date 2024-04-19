import express from "express";
import userModel from "../moduls/user";

const userRouter = express.Router();

userRouter.post('/', async (req, res, next) => {
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

userRouter.post('/sessions', async (req, res, next) => {
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

export default userRouter;