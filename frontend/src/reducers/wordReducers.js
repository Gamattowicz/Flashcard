import {
  WORD_LIST_REQUEST,
  WORD_LIST_SUCCESS,
  WORD_LIST_FAIL,
  WORD_ALL_LIST_REQUEST,
  WORD_ALL_LIST_SUCCESS,
  WORD_ALL_LIST_FAIL,
  WORD_DETAILS_REQUEST,
  WORD_DETAILS_SUCCESS,
  WORD_DETAILS_FAIL,
  WORD_CREATE_REQUEST,
  WORD_CREATE_SUCCESS,
  WORD_CREATE_FAIL,
  WORD_CREATE_RESET,
  WORD_DRAW_REQUEST,
  WORD_DRAW_SUCCESS,
  WORD_DRAW_FAIL,
  WORD_ADD_EXERCISE_REQUEST,
  WORD_ADD_EXERCISE_SUCCESS,
  WORD_ADD_EXERCISE_FAIL,
  WORD_ADD_CORRECT_ANSWER_REQUEST,
  WORD_ADD_CORRECT_ANSWER_SUCCESS,
  WORD_ADD_CORRECT_ANSWER_FAIL,
  WORD_ADD_WRONG_ANSWER_REQUEST,
  WORD_ADD_WRONG_ANSWER_SUCCESS,
  WORD_ADD_WRONG_ANSWER_FAIL,
} from '../constants/wordConstants'

export const wordListReducer = (state = { words: [] }, action) => {
  switch (action.type) {
    case WORD_LIST_REQUEST:
      return { loading: true, words: [] }

    case WORD_LIST_SUCCESS:
      return { loading: false, words: action.payload }

    case WORD_LIST_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}

export const wordAllListReducer = (state = { words: [] }, action) => {
  switch (action.type) {
    case WORD_ALL_LIST_REQUEST:
      return { loading: true, words: [] }

    case WORD_ALL_LIST_SUCCESS:
      return { loading: false, success: true, users: action.payload }

    case WORD_ALL_LIST_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}

export const wordDetailsReducer = (state = { word: {} }, action) => {
  switch (action.type) {
    case WORD_DETAILS_REQUEST:
      return { loading: true, ...state }

    case WORD_DETAILS_SUCCESS:
      return { loading: false, word: action.payload }

    case WORD_DETAILS_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}

export const wordCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case WORD_CREATE_REQUEST:
      return { loading: true }

    case WORD_CREATE_SUCCESS:
      return { loading: false, success: true }

    case WORD_CREATE_FAIL:
      return { loading: false, error: action.payload }

    case WORD_CREATE_RESET:
      return {}

    default:
      return state
  }
}

export const wordDrawReducer = (state = { words: {} }, action) => {
  switch (action.type) {
    case WORD_DRAW_REQUEST:
      return { loading: true, ...state }

    case WORD_DRAW_SUCCESS:
      return { loading: false, words: action.payload }

    case WORD_DRAW_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}

export const wordAddExerciseReducer = (state = {}, action) => {
  switch (action.type) {
    case WORD_ADD_EXERCISE_REQUEST:
      return { loading: true }

    case WORD_ADD_EXERCISE_SUCCESS:
      return { loading: false, success: true }

    case WORD_ADD_EXERCISE_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}

export const wordAddCorrectAnswerReducer = (state = {}, action) => {
  switch (action.type) {
    case WORD_ADD_CORRECT_ANSWER_REQUEST:
      return { loading: true }

    case WORD_ADD_CORRECT_ANSWER_SUCCESS:
      return { loading: false, success: true }

    case WORD_ADD_CORRECT_ANSWER_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}

export const wordAddWrongAnswerReducer = (state = {}, action) => {
  switch (action.type) {
    case WORD_ADD_WRONG_ANSWER_REQUEST:
      return { loading: true }

    case WORD_ADD_WRONG_ANSWER_SUCCESS:
      return { loading: false, success: true }

    case WORD_ADD_WRONG_ANSWER_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}
