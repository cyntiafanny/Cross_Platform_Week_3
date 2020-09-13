import {dataRecipes, dataUsers} from "./data";
import {Recipe, User} from "./state";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";

export const UPDATE_RECIPE_LIST = "UPDATE_RECIPE_LIST";
export const UPDATE_CONTACT_LIST = "UPDATE_CONTACT_LIST";
export const UPDATE_SELECTED_RECIPE = "UPDATE_SELECTED_RECIPE";
export const UPDATE_SELECTED_CONTACT = "UPDATE_SELECTED_CONTACT";
export const UPDATE_DELETING_RECIPE_STATUS = "UPDATE_DELETING_RECIPE_STATUS";
export const UPDATE_DELETING_CONTACT_STATUS = "UPDATE_DELETING_CONTACT_STATUS";

export const updateRecipeList = (recipeList: Recipe[]) => {
  return {type: UPDATE_RECIPE_LIST, payload: recipeList}
}

export const updateContactList = (contactList: User[]) => {
  return {type: UPDATE_RECIPE_LIST, payload: contactList}
}

export const updateSelectedRecipe = (selectedRecipe: Recipe) => {
  return {type: UPDATE_SELECTED_RECIPE, payload: selectedRecipe}
}

export const updateSelectedContact = (selectedContact: User) => {
  return {type: UPDATE_SELECTED_CONTACT, payload: selectedContact}
}

export const updateDeletingRecipeStatus = (isDeletingRecipe: boolean) => {
  return {type: UPDATE_DELETING_RECIPE_STATUS, payload: isDeletingRecipe}
}

export const updateDeletingContactStatus = (isDeletingContact: boolean) => {
  return {type: UPDATE_DELETING_RECIPE_STATUS, payload: isDeletingContact}
}

export const getAllRecipes = (recipeId?: string) => {
    return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
      if (!recipeId) {
        let formattedRecipe: Recipe[] = [];
        dataRecipes.forEach((recipeRow: Recipe) => {

          formattedRecipe.push({
            id: recipeRow.id,
            title: recipeRow.title,
            imageUrl: recipeRow.imageUrl,
            ingredients: recipeRow.ingredients
          })
        })
        dispatch(updateRecipeList(formattedRecipe));
      } else {
        let formattedRecipe: Recipe[] = [];
        dataRecipes.forEach((recipeRow: Recipe) => {
          if (recipeRow.id === recipeId) {
            formattedRecipe.push({
              id: recipeRow.id,
              title: recipeRow.title,
              imageUrl: recipeRow.imageUrl,
              ingredients: recipeRow.ingredients
            })
          }
        })
        dispatch(updateSelectedRecipe(formattedRecipe[0]));
      }
    }
  }
;

export const deleteRecipe = (deletedId: string, currentRecipeList: Recipe[]) => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    let formattedRecipe: Recipe[] = [];
    currentRecipeList.forEach((recipeRow: Recipe) => {
      if (recipeRow.id !== deletedId) {
        formattedRecipe.push({
          id: recipeRow.id,
          title: recipeRow.title,
          imageUrl: recipeRow.imageUrl,
          ingredients: recipeRow.ingredients
        })
      }
    })
    dispatch(updateRecipeList(formattedRecipe))
    dispatch(updateDeletingRecipeStatus(true))
  }
}

export const getAllUsers = () => {
  return dataUsers;
};