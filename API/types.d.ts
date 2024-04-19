import {Model} from "mongoose";

export interface Artists {
    name: string;
    photo?: string;
    info?: string;
}

export interface Album {
    name: string;
    executor: string;
    yearOfIssue: string;
    image?: string;
}

export interface Track {
    name: string;
    album: string;
    duration: string;
}

export interface User {
    username: string;
    password: string;
    token: string;
}

export interface TrackHistory {
    user: string;
    track: string;
    datetime: string;
}

interface UserMethods {
    checkPassword(password: string): Promise<boolean>;
    generateToken(): void;
}

interface TrackMethods {
    dateTime(): void;
}

export type UserModel = Model<User, {}, UserMethods>
export type TrackModel = Model<TrackHistory, {}, TrackMethods>