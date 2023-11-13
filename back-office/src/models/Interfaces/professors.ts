export interface IProfessors {
    id: number;
    firstName: string;
    lastName: string;
    email: string | null;
    photo: string | null;
    roles: string[];
    createdAt?: string | null;
    biography?: string | null;
    subscription?: string | null; 
    image?: string | null;
  }
  
