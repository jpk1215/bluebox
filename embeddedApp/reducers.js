import { combineReducers } from 'redux';
import * as actions from './actions';

const initialState = {
  inputValue: '',
  selectedPhoto: '',
};

const gallery = (state = initialState, action) => {

  switch (action.type) {

    case actions.INPUT_TYPING:
      return Object.assign({}, state, {
        inputValue: action.payload.inputValue,
      });

    case actions.GET_GALLERY_START:
      return Object.assign({}, state, {
        error: null,
        loading: true,
        photos: null
      });

    case actions.GET_GALLERY_SUCCESS:
      return Object.assign({}, state, {
        photos: action.photos,
        loading: false
      });

    case actions.GET_GALLERY_ERROR:
      return Object.assign({}, state, {
        loading: false,
        error: action.error
      });

    case actions.SELECT_PHOTO:
      return Object.assign({}, state, {
        selectedPhoto: action.photoId
      });

    case actions.DESELECT_PHOTO:
      return Object.assign({}, state, {
        selectedPhoto: '',
      });

    default:
      return state;
  }
};

const rootReducer = combineReducers({
  gallery,
});

export default rootReducer;
