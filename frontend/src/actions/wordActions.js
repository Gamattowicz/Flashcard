import axios from "axios";
import {
  WORD_LIST_REQUEST,
  WORD_LIST_SUCCESS,
  WORD_LIST_FAIL,
} from "../constants/wordConstants";

const listWords = () => async (dispatch) => {
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
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
