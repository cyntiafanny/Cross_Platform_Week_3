import React, {useEffect, useState} from "react";
import {
  IonAlert,
  IonBackButton,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonList,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar
} from "@ionic/react";
import {RouteComponentProps} from "react-router";
import {deleteRecipe, getAllRecipes} from "../actions";
import {DataState, Recipe} from "../state";
import {trash} from "ionicons/icons";
import {ThunkDispatch} from "@reduxjs/toolkit";
import {AnyAction} from "redux";
import {connect} from "react-redux";

export interface RecipeDetailProps extends RouteComponentProps<any> {
  match: any;
  location: any;
  currentSelectedRecipe: Recipe;
  currentRecipeList: Recipe[];
  dispatch: ThunkDispatch<DataState, {}, AnyAction>;
}

const mapStateToProps = (state: DataState) => {
  return {
    currentSelectedRecipe: state.selectedRecipe,
    currentRecipeList: state.recipes
  }
}

const RecipeDetailPage: React.FC<RecipeDetailProps> = (props: RecipeDetailProps) => {
  const dispatch = props.dispatch;
  const selectedID = props.match.params.id;
  const recipeSelected = props.currentSelectedRecipe;
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    dispatch(getAllRecipes(selectedID))
  }, [dispatch, selectedID]);

  const renderIngredients = () => {
    let fullIngredients: JSX.Element[] = [];

    recipeSelected.ingredients.forEach((singleIngredients: string) => {
      fullIngredients.push(
        <IonItem key={singleIngredients}>
          {singleIngredients}
        </IonItem>
      )
    })
    return fullIngredients;
  }

  const actionDeleteRecipe = () => {
    dispatch(deleteRecipe(selectedID, props.currentRecipeList));
    props.history.push('/recipes');
  }

  return (
    <React.Fragment>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/recipes"/>
            </IonButtons>
            <IonTitle>{recipeSelected.title}</IonTitle>
            <IonButtons slot="primary">
              <IonButton onClick={() => setShowAlert(true)}>
                <IonIcon className='ion-icon' icon={trash} slot="icon-only"></IonIcon>
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonImg src={recipeSelected.imageUrl}/>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonList>
                  {renderIngredients()}
                </IonList>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonPage>
      <IonAlert
        isOpen={showAlert}
        onDidDismiss={() => setShowAlert(false)}
        cssClass='my-custom-class'
        header={'Are you sure?'}
        message={'So you really want to delete this recipe?'}
        buttons={[
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              setShowAlert(false)
            }
          },
          {
            text: 'Delete',
            handler: () => {
              actionDeleteRecipe()
            }
          }
        ]}
      />
    </React.Fragment>
  );
}

export default connect(mapStateToProps)(RecipeDetailPage);