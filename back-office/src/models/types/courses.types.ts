export type Composers = {
    id: number;
    fullName: string;
}

export type Categories = {
    id: number;
    name: string;
}

export type Professor = {
    id: number;
    firstName: string;
    lastName: string;
    createdAt: string;
    biography: string | null;
}

export type Instrument = {
    id: number;
    name: string;
    level: number[];
}

export type Rating = {}

export type Quizz = {
    id: number;
    title: string;
    question: any[];
}



