import {
  IonAvatar,
  IonContent,
  IonHeader,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import {Recipe} from '../state'
import React, {useEffect, useState} from 'react';
import {dataRecipes} from "../data";
import {getAllRecipes} from "../actions";

const RecipePage = () => {
  const [currentRecipe, setCurrentRecipe] = useState(dataRecipes);

  useEffect(() => {
    setCurrentRecipe(getAllRecipes())
  }, []);

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
  );
}

export default RecipePage;
