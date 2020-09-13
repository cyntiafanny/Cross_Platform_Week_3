import {DataState} from "./state";

export const initialDataState: DataState = {
  recipes: [],
  users: [],
  selectedRecipe: {id: "", title: "", imageUrl: "", ingredients: []},
  selectedUser: {id: "", name: "", imageUrl: "", email: [], phone: []},
  isDeletingRecipe: false,
  isDeletingContact: false
};