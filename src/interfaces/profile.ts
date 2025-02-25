export interface Users {
    id: number;
    name: string;
    email: string;
    role: string;
    about: string;
    degree: string;
    postgraduate: string;
    expertise_area: string;
    research_work: ProfileSection[];
    profile_picture: string;
    social_media: SocialLink[];
    status: string
}

export interface SocialLink {
    platform: 'linkedin' | 'github' | 'twitter' | 'website' | 'facebook' | 'instagram' | 'youtube' | 'research_gate';
    url: string;
}

export interface ProfileSection {
    type: 'experience' | 'projects' | 'publications';
    data: any;
}