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