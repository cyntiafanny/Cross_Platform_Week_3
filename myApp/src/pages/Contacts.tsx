import React, {useEffect, useState} from "react";
import {DataState, User} from "../state";
import './Contacts.css'
import {
  IonAvatar,
  IonCol,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonPage,
  IonText,
  IonTitle,
  IonToast,
  IonToolbar
} from "@ionic/react";
import {callOutline, mailOutline} from 'ionicons/icons';
import {getAllContact, updateDeletingContactStatus} from "../actions";
import {RouteComponentProps} from "react-router";
import {ThunkDispatch} from "@reduxjs/toolkit";
import {AnyAction} from "redux";
import {connect} from "react-redux";

export interface ContactsPageProps extends RouteComponentProps<any> {
  currentContact: User[];
  dispatch: ThunkDispatch<DataState, {}, AnyAction>;
  isDeletingContact: boolean;
}

const mapStateToProps = (state: DataState) => {
  return {
    currentContact: state.users,
    isDeletingContact: state.isDeletingContact
  }
}

const ContactsPage: React.FC<ContactsPageProps> = (props: ContactsPageProps) => {
  const dispatch = props.dispatch;
  const currentContact = props.currentContact;

  const [toastDelete, setToastDelete] = useState(false);

  useEffect(() => {
    dispatch(getAllContact())
  }, [dispatch, props.isDeletingContact]);

  useEffect(() => {
    if (props.isDeletingContact) {
      setToastDelete(true)
      dispatch(updateDeletingContactStatus(false))
    }
  }, [currentContact, dispatch, props.isDeletingContact])

  const renderContactList = () => {
    let contactRows: JSX.Element[] = [];

    currentContact.forEach((singleContact: User) => {
      contactRows.push(
        <IonItem key={singleContact.id} routerLink={`/contacts/${singleContact.id}`}>
          <IonAvatar slot="start">
            <IonImg src={singleContact.imageUrl}/>
          </IonAvatar>
          <IonLabel>{singleContact.name}</IonLabel>
          <IonCol slot="end">
            <IonIcon className='ion-icon' icon={mailOutline}/>
            <IonText>{singleContact.email.length}</IonText>
            <IonIcon className='ion-icon' icon={callOutline}/>
            <IonText>{singleContact.phone.length}</IonText>
          </IonCol>
        </IonItem>
      )
    })
    return contactRows;
  }

  return (
    <React.Fragment>
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
      <IonToast
        isOpen={toastDelete}
        onDidDismiss={() => setToastDelete(false)}
        message="Contact deleted."
        duration={500}
      />
    </React.Fragment>
  );
}

export default connect(mapStateToProps)(ContactsPage);