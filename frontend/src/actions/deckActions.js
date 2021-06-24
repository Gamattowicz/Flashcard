import axios from "axios";
import {
  DECK_LIST_REQUEST,
  DECK_LIST_SUCCESS,
  DECK_LIST_FAIL,
  DECK_DETAILS_REQUEST,
  DECK_DETAILS_SUCCESS,
  DECK_DETAILS_FAIL,
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

export const listDeckDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: DECK_DETAILS_REQUEST });
    const { data } = await axios.get(`/decks/${id}`);
    dispatch({
      type: DECK_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DECK_DETAILS_FAIL,
      payload:
        error.reponse && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
