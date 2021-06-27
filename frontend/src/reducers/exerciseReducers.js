import {
  EXERCISE_CREATE_REQUEST,
  EXERCISE_CREATE_SUCCESS,
  EXERCISE_CREATE_FAIL,
  EXERCISE_CREATE_RESET,
} from "../constants/exerciseConstants";

export const exerciseCreateReducer = (state = {}, actions) => {
  switch (actions.type) {
    case EXERCISE_CREATE_REQUEST:
      return { loading: true };

    case EXERCISE_CREATE_SUCCESS:
      return { loading: false, succes: true };

    case EXERCISE_CREATE_FAIL:
      return { loading: false, error: actions.payload };

    case EXERCISE_CREATE_RESET:
      return {};

    default:
      return state;
  }
};
