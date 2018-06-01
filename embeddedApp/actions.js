import axios from 'axios';

export const INPUT_TYPING = 'INPUT_TYPING';
export const GET_GALLERY_START = 'GET_GALLERY_START';
export const GET_GALLERY_SUCCESS = 'GET_GALLERY_SUCCESS';
export const GET_GALLERY_ERROR = 'GET_GALLERY_ERROR';

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
        .then(response => {
          if (response.data.code ===1) {
            return dispatch(getGalleryError(response.data.message))
          }
          return dispatch(getGallerySuccess(response.data.photos))
        })
        .catch(err => dispatch(getGalleryError(err)))
}
