import { Comment } from './comment';

export class Dish {
    id: number; //changed this to number because it caused errors for promises part 1
    name: string;
    image: string;
    category: string;
    featured: boolean;
    label: string;
    price: string;
    description: string;
    comments: Comment[];
}