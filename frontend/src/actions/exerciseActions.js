import axios from 'axios'
import {
  EXERCISE_CREATE_REQUEST,
  EXERCISE_CREATE_SUCCESS,
  EXERCISE_CREATE_FAIL,
  EXERCISE_ADD_CORRECT_ANSWER_REQUEST,
  EXERCISE_ADD_CORRECT_ANSWER_SUCCESS,
  EXERCISE_ADD_CORRECT_ANSWER_FAIL,
  EXERCISE_ADD_WRONG_ANSWER_REQUEST,
  EXERCISE_ADD_WRONG_ANSWER_SUCCESS,
  EXERCISE_ADD_WRONG_ANSWER_FAIL,
  EXERCISE_LIST_REQUEST,
  EXERCISE_LIST_SUCCESS,
  EXERCISE_LIST_FAIL,
  EXERCISE_ALL_LIST_REQUEST,
  EXERCISE_ALL_LIST_SUCCESS,
  EXERCISE_ALL_LIST_FAIL,
  EXERCISE_DETAILS_REQUEST,
  EXERCISE_DETAILS_SUCCESS,
  EXERCISE_DETAILS_FAIL,
} from '../constants/exerciseConstants'

export const createExercise =
  (deckId, exercise) => async (dispatch, getState) => {
    try {
      dispatch({ type: EXERCISE_CREATE_REQUEST })

      const {
        userLogin: { userInfo },
      } = getState()

      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }

      const { data } = await axios.post(
        `/exercises/${deckId}/create/`,
        exercise,
        config
      )

      dispatch({
        type: EXERCISE_CREATE_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: EXERCISE_CREATE_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      })
    }
  }

export const addCorrectAnswerExercise =
  (exercise) => async (dispatch, getState) => {
    try {
      dispatch({ type: EXERCISE_ADD_CORRECT_ANSWER_REQUEST })

      const {
        userLogin: { userInfo },
      } = getState()

      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }

      const { data } = await axios.put(
        `/exercises/${exercise.id}/correct-answer/`,
        exercise,
        config
      )

      dispatch({
        type: EXERCISE_ADD_CORRECT_ANSWER_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: EXERCISE_ADD_CORRECT_ANSWER_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      })
    }
  }

export const addWrongAnswerExercise =
  (exercise) => async (dispatch, getState) => {
    try {
      dispatch({ type: EXERCISE_ADD_WRONG_ANSWER_REQUEST })

      const {
        userLogin: { userInfo },
      } = getState()

      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }

      const { data } = await axios.put(
        `/exercises/${exercise.id}/wrong-answer/`,
        exercise,
        config
      )

      dispatch({
        type: EXERCISE_ADD_WRONG_ANSWER_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: EXERCISE_ADD_WRONG_ANSWER_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      })
    }
  }

export const listExercises =
  (keyword = '') =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: EXERCISE_LIST_REQUEST })

      const {
        userLogin: { userInfo },
      } = getState()

      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }

      const { data } = await axios.get(`/exercises/${keyword}`, config)

      dispatch({ type: EXERCISE_LIST_SUCCESS, payload: data })
    } catch (error) {
      dispatch({
        type: EXERCISE_LIST_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      })
    }
  }

export const listAllExercises =
  (keyword = '') =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: EXERCISE_ALL_LIST_REQUEST })

      const {
        userLogin: { userInfo },
      } = getState()

      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }

      const { data } = await axios.get(`/exercises/admin/${keyword}`, config)

      dispatch({ type: EXERCISE_ALL_LIST_SUCCESS, payload: data })
    } catch (error) {
      dispatch({
        type: EXERCISE_ALL_LIST_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      })
    }
  }

export const listExerciseDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: EXERCISE_DETAILS_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/exercises/${id}/`, config)

    dispatch({ type: EXERCISE_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: EXERCISE_DETAILS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    })
  }
}
