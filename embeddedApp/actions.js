import axios from 'axios';

export const INPUT_TYPING = 'INPUT_TYPING';
export const GET_GALLERY_START = 'GET_GALLERY_START';
export const GET_GALLERY_SUCCESS = 'GET_GALLERY_SUCCESS';
export const GET_GALLERY_ERROR = 'GET_GALLERY_ERROR';

export const inputTyping = inputValue => ({
  type: INPUT_TYPING,
  payload: { inputValue },
});

function getGalleryStart() {
    return {
        type: GET_GALLERY_START
    }
}

function getGallerySuccess(photos) {
    return {
        type: GET_GALLERY_SUCCESS,
        photos
    }
}

function getGalleryError(error) {
    return {
        type: GET_GALLERY_ERROR,
        error
    }
}

export function findGallery(galleryId) {
    return dispatch => {
        dispatch(getGalleryStart());
        axios.get(`/api?gallery_id=${galleryId}`)
            .then(response => dispatch(getGallerySuccess(response.data.photos)))
            .catch(err => dispatch(getGalleryError(err)))
    }
}

