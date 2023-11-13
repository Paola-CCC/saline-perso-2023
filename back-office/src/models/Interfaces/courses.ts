import { Categories, Composers, Instrument, Professor, Quizz, Rating } from "../types/courses.types";

export interface ICourses {
    id: number;
    title: string;
    description: string;
    price: number;
    ratingScore: number;
    linkVideo: string;
    users?: any[]; 
    professor?: Professor;
    composers: Composers[];
    categories?: Categories[];
    instrument?: Instrument;
    preview: string;
    photo: string;
    createdAt?: string;
    updatedAt?: string | null;
    ratings?: Rating[] | any[] | [];
    quizz?: Quizz;
}