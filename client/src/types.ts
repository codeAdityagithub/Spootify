export interface Song {
    name: string;
    url: string;
    date: Date;
    id: string;
    genre: string;
    artists: Artist[];
    coverUrl: string;
    previewUrl: string;
    tags: Tag[];
    download: Download;
}

export interface Artist {
    name: string;
    url: string;
}

export interface Download {
    regular: string;
    instrumental?: string;
}

export interface Tag {
    name: string;
    color: Color;
    mood: number;
}

export interface Color {
    r: number;
    g: number;
    b: number;
}
