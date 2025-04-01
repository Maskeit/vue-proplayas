import type { SocialLink } from "@interfaces/profile";

export interface Nodes {
    id: string;
    code: string; // se muestra
    type: string; // se muestra
    name: string; // se muestra
    country: string;// se muestra
    city: string;// se muestra
    joined_in: number;// se muestra
    members_count: number;// se muestra
    status: string;
}

export interface NodeMembers {
    id: number;
    user_id: number;
    node_id: number;
    member_code: string;
    name: string;
    email: string;
    research_line: string;
    work_area: string;
    username: string;
    status: string;
}

// export interface NodeMembers {
//     id: number;
//     node_id: number;
//     member_code: string;
//     email: string;
//     status: string;
//     user: User;
// }

// interface User {
//     id: number;
//     name: string;
//     about: string;
//     email: string;
//     degree: string;
//     expertise_area: string;
//     postgraduate: string;
//     research_work: string;
//     social_media: SocialLink[] | null;
//     username: string;
//     profile_picture: string;
// }


export interface Node {
    id: string;
    leader_id: string;
    code: string;// se muestra
    type: string;// se muestra
    name: string;// se muestra
    profile_picture: string;// se muestra
    about: string;// se muestra
    country: string;// se muestra
    city: string;// se muestra
    ip_address: string;
    coordinates: string;
    alt_places: string;// se muestra
    joined_in: number;// se muestra
    members_count: number;// se muestra
    id_photo: string;
    social_media: SocialLink[] | null;// se muestra
    memorandum: string;// se muestra
    status: string;
    leader: Leader; // se muestra
}

export interface Leader {
    id: number;
    degree: string;
    email: string;
    name: string;
    postgraduate:string;
}

export interface SocialLink {
    platform: 'linkedin' | 'github' | 'twitter' | 'website' | 'facebook' | 'instagram' | 'youtube' | 'research_gate';
    url: string;
}