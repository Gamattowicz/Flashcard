import {
  EXERCISE_ADD_CORRECT_ANSWER_FAIL,
  EXERCISE_ADD_CORRECT_ANSWER_REQUEST,
  EXERCISE_ADD_CORRECT_ANSWER_SUCCESS,
  EXERCISE_ADD_WRONG_ANSWER_FAIL,
  EXERCISE_ADD_WRONG_ANSWER_REQUEST,
  EXERCISE_ADD_WRONG_ANSWER_SUCCESS,
  EXERCISE_ALL_LIST_FAIL,
  EXERCISE_ALL_LIST_REQUEST,
  EXERCISE_ALL_LIST_SUCCESS,
  EXERCISE_CREATE_FAIL,
  EXERCISE_CREATE_REQUEST,
  EXERCISE_CREATE_RESET,
  EXERCISE_CREATE_SUCCESS,
  EXERCISE_DETAILS_FAIL,
  EXERCISE_DETAILS_REQUEST,
  EXERCISE_DETAILS_SUCCESS,
  EXERCISE_LIST_FAIL,
  EXERCISE_LIST_REQUEST,
  EXERCISE_LIST_SUCCESS,
  EXERCISE_UPDATE_TIME_FAIL,
  EXERCISE_UPDATE_TIME_REQUEST,
  EXERCISE_UPDATE_TIME_SUCCESS,
} from '../constants/exerciseConstants'

export const exerciseCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case EXERCISE_CREATE_REQUEST:
      return { loading: true }

    case EXERCISE_CREATE_SUCCESS:
      return { loading: false, success: true, exerciseInfo: action.payload }

    case EXERCISE_CREATE_FAIL:
      return { loading: false, error: action.payload }

    case EXERCISE_CREATE_RESET:
      return {}

    default:
      return state
  }
}

export const exerciseAddCorrectAnswerReducer = (state = {}, action) => {
  switch (action.type) {
    case EXERCISE_ADD_CORRECT_ANSWER_REQUEST:
      return { loading: true }

    case EXERCISE_ADD_CORRECT_ANSWER_SUCCESS:
      return { loading: false, success: true, userInfo: action.payload }

    case EXERCISE_ADD_CORRECT_ANSWER_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}

export const exerciseAddWrongAnswerReducer = (state = {}, action) => {
  switch (action.type) {
    case EXERCISE_ADD_WRONG_ANSWER_REQUEST:
      return { loading: true }

    case EXERCISE_ADD_WRONG_ANSWER_SUCCESS:
      return { loading: false, success: true, userInfo: action.payload }

    case EXERCISE_ADD_WRONG_ANSWER_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}

export const exerciseListReducer = (state = { exercises: [] }, action) => {
  switch (action.type) {
    case EXERCISE_LIST_REQUEST:
      return { loading: true, exercises: [] }

    case EXERCISE_LIST_SUCCESS:
      return {
        loading: false,
        exercises: action.payload.exercises,
        page: action.payload.page,
        pages: action.payload.pages,
      }

    case EXERCISE_LIST_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}

export const exerciseAllListReducer = (state = { exercises: [] }, action) => {
  switch (action.type) {
    case EXERCISE_ALL_LIST_REQUEST:
      return { loading: true, exercises: [] }

    case EXERCISE_ALL_LIST_SUCCESS:
      return {
        loading: false,
        exercises: action.payload.exercises,
        page: action.payload.page,
        pages: action.payload.pages,
      }

    case EXERCISE_ALL_LIST_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}

export const exerciseDetailsReducer = (state = { exercise: {} }, action) => {
  switch (action.type) {
    case EXERCISE_DETAILS_REQUEST:
      return { loading: true, ...state }

    case EXERCISE_DETAILS_SUCCESS:
      return { loading: false, exercise: action.payload }

    case EXERCISE_DETAILS_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}

export const exerciseUpdateTimeReducer = (state = {}, action) => {
  switch (action.type) {
    case EXERCISE_UPDATE_TIME_REQUEST:
      return { loading: true }

    case EXERCISE_UPDATE_TIME_SUCCESS:
      return { loading: false, success: true, userInfo: action.payload }

    case EXERCISE_UPDATE_TIME_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}
