import {
  EXERCISE_CREATE_REQUEST,
  EXERCISE_CREATE_SUCCESS,
  EXERCISE_CREATE_FAIL,
  EXERCISE_CREATE_RESET,
  EXERCISE_UPDATE_REQUEST,
  EXERCISE_UPDATE_SUCCESS,
  EXERCISE_UPDATE_FAIL,
  EXERCISE_LIST_REQUEST,
  EXERCISE_LIST_SUCCESS,
  EXERCISE_LIST_FAIL,
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

export const exerciseUpdateReducer = (state = {}, actions) => {
  switch (actions.type) {
    case EXERCISE_UPDATE_REQUEST:
      return { loading: true };

    case EXERCISE_UPDATE_SUCCESS:
      return { loading: false, success: true, userInfo: actions.payload };

    case EXERCISE_UPDATE_FAIL:
      return { loading: false, error: actions.payload };

    default:
      return state;
  }
};

export const exerciseListReducer = (state = { exercises: [] }, action) => {
  switch (action.type) {
    case EXERCISE_LIST_REQUEST:
      return { loading: true, exercises: [] };

    case EXERCISE_LIST_SUCCESS:
      return { loading: false, exercises: action.payload };

    case EXERCISE_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
