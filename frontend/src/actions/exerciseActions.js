import axios from "axios";
import {
  EXERCISE_CREATE_REQUEST,
  EXERCISE_CREATE_SUCCESS,
  EXERCISE_CREATE_FAIL,
} from "../constants/exerciseConstants";

export const createExercise =
  (deckId, exercise) => async (dispatch, getState) => {
    try {
      dispatch({ type: EXERCISE_CREATE_REQUEST });

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
        `/exercises/${deckId}/create/`,
        exercise,
        config
      );

      dispatch({
        type: EXERCISE_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: EXERCISE_CREATE_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
