import axios from 'axios';

export const INPUT_TYPING = 'INPUT_TYPING';
export const GET_GALLERY_START = 'GET_GALLERY_START';
export const GET_GALLERY_SUCCESS = 'GET_GALLERY_SUCCESS';
export const GET_GALLERY_ERROR = 'GET_GALLERY_ERROR';
export const SELECT_PHOTO = 'SELECT_PHOTO';
export const DESELECT_PHOTO = 'DESELECT_PHOTO';

export const inputTyping = inputValue => ({
  type: INPUT_TYPING,
  payload: { inputValue },
});

const getGalleryStart = () => ({
  type: GET_GALLERY_START
})

const getGallerySuccess = photos => ({
  type: GET_GALLERY_SUCCESS,
  photos
})

const getGalleryError = error => ({
  type: GET_GALLERY_ERROR,
  error
})

export const findGallery = galleryId => dispatch => {
    dispatch(getGalleryStart());
    axios.get(`/api?gallery_id=${galleryId}`)
        .then(response => dispatch(getGallerySuccess(response.data.photos)))
        .catch(err => dispatch(getGalleryError(err)))
}

export const selectPhoto = photoId => ({
  type: SELECT_PHOTO,
  payload: { photoId },
})

export const deselectPhoto = () => ({
  type: DESELECT_PHOTO,
})