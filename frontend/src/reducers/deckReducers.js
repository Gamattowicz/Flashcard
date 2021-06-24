import {
  DECK_LIST_REQUEST,
  DECK_LIST_SUCCESS,
  DECK_LIST_FAIL,
  DECK_DETAILS_REQUEST,
  DECK_DETAILS_SUCCESS,
  DECK_DETAILS_FAIL,
} from "../constants/deckConstants";

export const deckListReducer = (state = { decks: [] }, action) => {
  switch (action.type) {
    case DECK_LIST_REQUEST:
      return { loading: true, decks: [] };

    case DECK_LIST_SUCCESS:
      return { loading: false, decks: action.payload };

    case DECK_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const deckDetailsReducer = (state = { deck: {} }, action) => {
  switch (action.type) {
    case DECK_DETAILS_REQUEST:
      return { loading: true };

    case DECK_DETAILS_SUCCESS:
      return { loading: false, deck: action.payload };

    case DECK_DETAILS_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
