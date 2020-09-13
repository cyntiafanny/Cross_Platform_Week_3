import {
  IonAvatar,
  IonContent,
  IonHeader,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle, IonToast,
  IonToolbar
} from '@ionic/react';
import {DataState, Recipe} from '../state'
import React, {useEffect, useState} from 'react';
import {getAllRecipes, updateDeletingRecipeStatus} from "../actions";
import {RouteComponentProps} from "react-router";
import {ThunkDispatch} from "@reduxjs/toolkit";
import {AnyAction} from "redux";
import {connect} from "react-redux";

export interface RecipePageProps extends RouteComponentProps<any> {
  currentRecipe: Recipe[];
  dispatch: ThunkDispatch<DataState, {}, AnyAction>;
  isDeletingRecipe: boolean;
}

const mapStateToProps = (state: DataState) => {
  return {
    currentRecipe: state.recipes,
    isDeletingRecipe: state.isDeletingRecipe
  }
}

const RecipePage: React.FC<RecipePageProps> = (props: RecipePageProps) => {
  const dispatch = props.dispatch;
  const currentRecipe = props.currentRecipe;

  const [toastDelete, setToastDelete] = useState(false);

  useEffect(() => {
    dispatch(getAllRecipes())
  }, [dispatch]);

  useEffect(() => {
    if(props.isDeletingRecipe) {
      setToastDelete(true)
      dispatch(updateDeletingRecipeStatus(false))
    }
  }, [currentRecipe, dispatch, props.isDeletingRecipe])

  const renderRecipeList = () => {
    let recipeRows: JSX.Element[] = [];

    currentRecipe.forEach((singleRecipe: Recipe) => {
      recipeRows.push(
        <IonItem key={singleRecipe.id} routerLink={`/recipes/${singleRecipe.id}`}>
          <IonAvatar slot="start">
            <IonImg src={singleRecipe.imageUrl}/>
          </IonAvatar>
          <IonLabel>{singleRecipe.title}</IonLabel>
        </IonItem>
      )
    })
    return recipeRows;
  }

  return (
    <React.Fragment>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Recipes</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <IonList>
            {renderRecipeList()}
          </IonList>
        </IonContent>
      </IonPage>
      <IonToast
        isOpen={toastDelete}
        onDidDismiss={() => setToastDelete(false)}
        message="Recipe deleted."
        duration={500}
      />
    </React.Fragment>
  );
}

export default connect(mapStateToProps)(RecipePage);
