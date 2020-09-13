export interface DataState {
  recipes: Recipe[];
  users: User[];
}

export interface Recipe {
  id: string;
  title: string;
  imageUrl: string;
  ingredients: string[];
}

export interface User {
  id: string;
  name: string;
  imageUrl: string;
  email: string[];
  phone: string[];
}