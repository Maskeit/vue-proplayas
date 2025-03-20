export interface Nodes { 
    id: string;
    code : string; // se muestra
    type: string; // se muestra
    name : string; // se muestra
    country : string;// se muestra
    city : string;// se muestra
    joined_in : number;// se muestra
    members_count : number;// se muestra
    status: string;
}

import type { SocialLink } from "@interfaces/profile";

export interface Node {
    id: string;
    leader_id: string;
    code : string;// se muestra
    type: string;// se muestra
    name : string;// se muestra
    profile_picture: string;// se muestra
    about: string;// se muestra
    country : string;// se muestra
    city : string;// se muestra
    ip_address: string;
    coordinates: string;
    alt_places: string;// se muestra
    joined_in : number;// se muestra
    members_count : number;// se muestra
    id_photo: string;
    social_media: SocialLink[] | null;// se muestra
    memorandum : string;// se muestra
    status: string;
}