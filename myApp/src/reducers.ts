import {initialDataState} from "./initialState";
import {DataState} from "./state";
import {
  UPDATE_CONTACT_LIST, UPDATE_DELETING_CONTACT_STATUS,
  UPDATE_DELETING_RECIPE_STATUS,
  UPDATE_RECIPE_LIST,
  UPDATE_SELECTED_CONTACT,
  UPDATE_SELECTED_RECIPE
} from "./actions";

export const reducers = (state: DataState = initialDataState, action: any) => {
  switch (action.type) {
    case UPDATE_RECIPE_LIST: {
      return Object.assign({}, state, {
        recipes: action.payload
      });
    }
    case UPDATE_CONTACT_LIST: {
      return Object.assign({}, state, {
        users: action.payload
      });
    }
    case UPDATE_SELECTED_RECIPE: {
      return Object.assign({}, state, {
        selectedRecipe: action.payload
      });
    }
    case UPDATE_SELECTED_CONTACT: {
      return Object.assign({}, state, {
        selectedUser: action.payload
      });
    }
    case UPDATE_DELETING_RECIPE_STATUS: {
      return Object.assign({}, state, {
        isDeletingRecipe: action.payload
      });
    }
    case UPDATE_DELETING_CONTACT_STATUS: {
      return Object.assign({}, state, {
        isDeletingContact: action.payload
      });
    }
    default:
      return state;
  }
}
