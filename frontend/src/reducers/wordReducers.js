import {
  WORD_LIST_REQUEST,
  WORD_LIST_SUCCESS,
  WORD_LIST_FAIL,
  WORD_DETAILS_REQUEST,
  WORD_DETAILS_SUCCESS,
  WORD_DETAILS_FAIL,
} from "../constants/wordConstants";

export const wordListReducer = (state = { words: [] }, action) => {
  switch (action.type) {
    case WORD_LIST_REQUEST:
      return { loading: true, words: [] };

    case WORD_LIST_SUCCESS:
      return { loading: false, words: action.payload };

    case WORD_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const wordDetailsReducer = (state = { word: {} }, action) => {
  switch (action.type) {
    case WORD_DETAILS_REQUEST:
      return { loading: true, ...state };

    case WORD_DETAILS_SUCCESS:
      return { loading: false, word: action.payload };

    case WORD_DETAILS_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};