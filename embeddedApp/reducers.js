import { combineReducers } from 'redux';
import * as actions from './actions';

const initialState = {
  inputValue: '',
};

const gallery = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case actions.INPUT_TYPING:
      return Object.assign({}, state, {
        inputValue: action.payload.inputValue,
      });
      case actions.GET_GALLERY_START:
          return Object.assign({}, state, {
              error: null,
              loading: true
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
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  gallery,
});

export default rootReducer;
