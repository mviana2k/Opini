import firebase from 'react-native-firebase';
import Remote from './Remote';
import { AsyncStorage } from 'react-native';

let channel = null;

function onMessageNotification(message) {
    if (!channel) {
        channel = new firebase.notifications.Android
            .Channel('default_channel', 'Opini Channel',
                firebase.notifications.Android.Importance.Max)
            .setDescription('Opini main channel');
        firebase.notifications().android.createChannel(channel).then(() => {
            showNotification(message);
}) } else {
        showNotification(message);
    }
}

function showNotification(notification) {
    let title = notification.data ? notification.data.title : notification.title || 'Opini';
    let body = notification.data ? notification.data.body : notification.body || 'Nova Mensagem';
    
    const displayNotification = new firebase.notifications.Notification()
        .setNotificationId('1')
        .setTitle(title)
        .setBody(body);
    displayNotification
        .android.setChannelId('default_channel')
        .android.setSmallIcon('ic_launcher');

    return firebase.notifications().displayNotification(displayNotification);
}

export default {
    initToken: () => {
        FCM = firebase.messaging();
        return FCM.requestPermission().then(async () => {

            const lastToken = await AsyncStorage.getItem('lastToken');
            const token = await FCM.getToken();

            if (lastToken !== token) {
                await Remote.addToken(token);
                await AsyncStorage.setItem('lastToken', token);
            }
        }).catch(error => {
            alert(`Usuário não concedeu a permissão, impossível receber notificações.`);
        });
    },
    listenMessages: () => {
        firebase.messaging().onMessage(onMessageNotification);
        firebase.notifications().onNotification(onMessageNotification);
    }
}