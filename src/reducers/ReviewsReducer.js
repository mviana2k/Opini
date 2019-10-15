import ReviewDAO from '../services/ReviewDAO';
import { ADDED_REVIEW, UPDATED_REVIEW } from '../services/Constants';

export function addReview(review) {
    return dispatch => {
        const entity = ReviewDAO.addReview(review);
        dispatch({ type: ADDED_REVIEW, review: entity });

        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            ReviewDAO.updateReview(entity, { latitude, longitude });
            dispatch({ type: UPDATED_REVIEW, review: entity });
        })
    }
}

const INITIAL_STATE = ReviewDAO.loadReviews();

const reviewsReducer = (reviews = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADDED_REVIEW:
            return [...reviews, action.review];
        default:
            return reviews
        case UPDATED_REVIEW:
            const newReviews = reviews.filter(r => r.id != action.review.id)
            return [...newReviews, action.review];
                
    }
    
};


export default reviewsReducer;