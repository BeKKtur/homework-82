import express from 'express';
import cors from 'cors';
import artistsRoute from "./routes/artists";
import mongoose from "mongoose";
import config from "./config";
import albumsRoute from "./routes/albums";
import trackRouter from "./routes/track";
import userRouter from "./routes/user";
import trackHistoryRouter from "./routes/trackHistory";

const app = express();
const port= 8000;

app.use(cors());
app.use(express.json());
app.use('/artists', artistsRoute);
app.use('/albums', albumsRoute);
app.use('/track', trackRouter);
app.use('/users', userRouter);
app.use('/track_history', trackHistoryRouter)

const run = async () => {
   await mongoose.connect(config.mongoose.db);

   app.listen(port, () => {
      console.log(`port ${port}`);
   });

   process.on('exit', () => {
      mongoose.disconnect()
   });
}

void run();

