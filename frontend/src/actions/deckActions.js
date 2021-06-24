import axios from "axios";
import {
  DECK_LIST_REQUEST,
  DECK_LIST_SUCCESS,
  DECK_LIST_FAIL,
} from "../constants/deckConstants";

export const listDecks = () => async (dispatch) => {
  try {
    dispatch({ type: DECK_LIST_REQUEST });
    const { data } = await axios.get("/decks/");
    dispatch({
      type: DECK_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DECK_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
