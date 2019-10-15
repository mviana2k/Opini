import firebase from 'react-native-firebase';
import { Platform } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import uuid from 'uuid';

export default {
    uploadImage: (image) => {
        return new Promise((resolve, reject) => {
            let filePath = image;
            if (Platform.OS === 'ios') {
                filePath = filePath.replace('file://', '');
            }
            const filename = uuid() + '.jpg'
            const imageUri = `${RNFetchBlob.fs.dirs.DocumentDir}/${filename}`;
            RNFetchBlob.fs.cp(filePath, imageUri).then(() => {
                 firebase
                     .storage()
                     .ref(`images/${filename}`)
                     .putFile(imageUri)
                     .then((result) => {
                         resolve(filename);
                     })
                     .catch(error => {
                         reject(error);
                     });
             });
        })
    },
    saveReview: (review) => {
        return fetch('https://us-central1-opini-ad71d.cloudfunctions.net/api/review',
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(review)
            });
    },
    addToken: (token) => {
        return fetch('https://us-central1-opini-ad71d.cloudfunctions.net/api/tokens', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token })
        }).catch(error => {
            alert(`Error submiting token ${JSON.stringify(error)}`);
        })
    }
    
}