import React, {useEffect, useState} from "react";
import {getAllUsers} from "../actions";
import {User} from "../state";
import './Contacts.css'
import {
  IonAvatar,
  IonCard,
  IonContent,
  IonHeader, IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar
} from "@ionic/react";
import {initialDataState} from "../initialState";
import { mailOutline, callOutline } from 'ionicons/icons';

const Contacts = () => {
  const [currentContact, setCurrentContact] = useState(initialDataState.users);

  useEffect(() => {
    setCurrentContact(getAllUsers())
  }, []);

  const renderData = (data: any) => {
    let dataRow: JSX.Element[] = [];

    data.forEach((singleData: string) => {
      dataRow.push(
        <IonLabel key={singleData} className='single-data-entry'>{singleData}</IonLabel>
      )
    })

    return dataRow;
  }

  const renderContactList = () => {
    let contactRows: JSX.Element[] = [];

    currentContact.forEach((singleContact: User) => {
      contactRows.push(
        <IonCard key={singleContact.id}>
          <IonItem>
            <IonAvatar>
              <IonImg src={singleContact.imageUrl}/>
            </IonAvatar>
            <IonLabel className='name-contacts'>{singleContact.name}</IonLabel>
          </IonItem>
          <IonItem className='row-data'>
            <IonIcon className='ion-icon' icon={mailOutline}/>
            {renderData(singleContact.email)}
          </IonItem>
          <IonItem className='row-data'>
            <IonIcon className='ion-icon' icon={callOutline}/>
            {renderData(singleContact.phone)}
          </IonItem>
        </IonCard>
      )
    })
    return contactRows;
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Contacts</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {renderContactList()}
      </IonContent>
    </IonPage>
  );
}

export default Contacts;