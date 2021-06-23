import {
  DECK_LIST_REQUEST,
  DECK_LIST_SUCCESS,
  DECK_LIST_FAIL,
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
