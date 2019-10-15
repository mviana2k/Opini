import ReviewDAO from '../services/ReviewDAO';
import { ADDED_REVIEW, UPDATED_REVIEW } from '../services/Constants';
import Geolocation from '@react-native-community/geolocation';

export function addReview(review) {
    return dispatch => {
        const entity = ReviewDAO.addReview(review);
        dispatch({ type: ADDED_REVIEW, review: entity });

        Geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            ReviewDAO.updateReview(entity, { latitude, longitude });
            dispatch({ type: UPDATED_REVIEW, review: entity });
        })
    }
   
}