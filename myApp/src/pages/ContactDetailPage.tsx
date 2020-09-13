import {
  IonAlert,
  IonAvatar,
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar
} from "@ionic/react";
import {callOutline, mailOutline, trash} from "ionicons/icons";
import React, {useEffect, useState} from "react";
import {RouteComponentProps} from "react-router";
import {deleteContact, getAllContact} from "../actions";
import {DataState, User} from "../state";
import {ThunkDispatch} from "@reduxjs/toolkit";
import {AnyAction} from "redux";
import {connect} from "react-redux";

export interface ContactDetailProps extends RouteComponentProps<any> {
  match: any;
  location: any;
  currentSelectedContact: User;
  currentContactList: User[];
  dispatch: ThunkDispatch<DataState, {}, AnyAction>;
}

const mapStateToProps = (state: DataState) => {
  return {
    currentSelectedContact: state.selectedUser,
    currentContactList: state.users
  }
}

const ContactDetailPage: React.FC<ContactDetailProps> = (props: ContactDetailProps) => {
  const dispatch = props.dispatch;
  const selectedID = props.match.params.id;
  const contactSelected = props.currentSelectedContact;
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    dispatch(getAllContact(selectedID))
  }, [dispatch, selectedID]);

  const renderElement = (data: any, type: string) => {
    let fullData: JSX.Element[] = [];

    data.forEach((singleData: string) => {
      fullData.push(
        <IonItem key={singleData}>
          {
            (type === "email") ?
              <IonIcon className='ion-icon' icon={mailOutline}/> :
              <IonIcon className='ion-icon' icon={callOutline}/>
          }
          {singleData}
        </IonItem>
      )
    })
    return fullData;
  }

  const actionDeleteContact = () => {
    dispatch(deleteContact(selectedID, props.currentContactList));
    props.history.push('/contacts');
  }

  return (
    <React.Fragment>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/recipes"/>
            </IonButtons>
            <IonTitle>Contact Detail</IonTitle>
            <IonButtons slot="primary">
              <IonButton onClick={() => setShowAlert(true)}>
                <IonIcon className='ion-icon' icon={trash} slot="icon-only"/>
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <IonCard key={contactSelected.id}>
            <IonItem>
              <IonAvatar>
                <IonImg src={contactSelected.imageUrl}/>
              </IonAvatar>
              <IonLabel className='name-contacts'>{contactSelected.name}</IonLabel>
            </IonItem>
            {renderElement(contactSelected.email, "email")}
            {renderElement(contactSelected.phone, "phone")}
          </IonCard>
        </IonContent>
      </IonPage>
      <IonAlert
        isOpen={showAlert}
        onDidDismiss={() => setShowAlert(false)}
        cssClass='my-custom-class'
        header={'Hapus Kontak'}
        message={'Apakah yakin ingin menghapus? Jika sudah dihapus, tidak bisa dikembalikan lagi.'}
        buttons={[
          {
            text: 'BATAL',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              setShowAlert(false)
            }
          },
          {
            text: 'HAPUS',
            handler: () => {
              actionDeleteContact()
            }
          }
        ]}
      />
    </React.Fragment>
  );
}

export default connect(mapStateToProps)(ContactDetailPage);