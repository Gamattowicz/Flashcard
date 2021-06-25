import axios from "axios";
import {
  WORD_LIST_REQUEST,
  WORD_LIST_SUCCESS,
  WORD_LIST_FAIL,
  WORD_DETAILS_REQUEST,
  WORD_DETAILS_SUCCESS,
  WORD_DETAILS_FAIL,
  WORD_CREATE_REQUEST,
  WORD_CREATE_SUCCESS,
  WORD_CREATE_FAIL,
} from "../constants/wordConstants";

export const listWords = () => async (dispatch) => {
  try {
    dispatch({ type: WORD_LIST_REQUEST });
    const { data } = await axios.get("/words/");
    dispatch({
      type: WORD_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: WORD_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const listWordDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: WORD_DETAILS_REQUEST });
    const { data } = await axios.get(`/words/${id}`);
    dispatch({
      type: WORD_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: WORD_DETAILS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const createWord =
  (categoryId, deckId, word) => async (dispatch, getState) => {
    try {
      dispatch({ type: WORD_CREATE_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `/words/${categoryId}/create/${deckId}/`,
        word,
        config
      );

      dispatch({
        type: WORD_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: WORD_CREATE_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
