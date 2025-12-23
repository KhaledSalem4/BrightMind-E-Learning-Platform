export interface Course {
  id: number;
  title: string;
  description: string;
  category: 'web' | 'data' | 'marketing' | 'design';
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  rating: number;
  duration: string;
  students: number;
  price: number;
  image: string;
  isWatched?: boolean;
  isFavorite?: boolean;
}
