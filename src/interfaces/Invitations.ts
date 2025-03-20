export interface InviteNodeLeader {
    name: string;
    email: string;
    node_type: string;    
}

export interface RegisterNodeLeader {
    token: string;
    name: string;
    email: string;
    password: string;
    confirm_password: string;
    expertise_area: string;
    research_work: string;
    node_type: string;
    node_name: string;
    about: string;
    country: string;
    city: string;
}

export interface InviteAdmin {
    name: string;
    email: string;
}

export interface RegisterAdmin {
    token: string;
    name: string;
    email: string;
    password: string;
    confirm_password: string;
}

export interface InviteNodeMember {
    name: string;
    email: string;
}
export interface RegisterNodeMember {
    token: string;
    name: string;
    email: string;
    password: string;
    confirm_password: string;
    expertise_area: string;
    research_work: string;
    node_type: string;
    // node_name: string;
    about: string;
    country: string;
    city: string;
}