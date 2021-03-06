import axios from 'axios'
import {
    WORD_ADD_CORRECT_ANSWER_FAIL,
    WORD_ADD_CORRECT_ANSWER_REQUEST,
    WORD_ADD_CORRECT_ANSWER_SUCCESS,
    WORD_ADD_EXERCISE_FAIL,
    WORD_ADD_EXERCISE_REQUEST,
    WORD_ADD_EXERCISE_SUCCESS,
    WORD_ADD_WRONG_ANSWER_FAIL,
    WORD_ADD_WRONG_ANSWER_REQUEST,
    WORD_ADD_WRONG_ANSWER_SUCCESS,
    WORD_ALL_LIST_FAIL,
    WORD_ALL_LIST_REQUEST,
    WORD_ALL_LIST_SUCCESS,
    WORD_CREATE_FAIL,
    WORD_CREATE_REQUEST,
    WORD_CREATE_SUCCESS,
    WORD_DELETE_FAIL,
    WORD_DELETE_REQUEST,
    WORD_DELETE_SUCCESS,
    WORD_DETAILS_FAIL,
    WORD_DETAILS_REQUEST,
    WORD_DETAILS_SUCCESS,
    WORD_DRAW_FAIL,
    WORD_DRAW_REQUEST,
    WORD_DRAW_SUCCESS,
    WORD_LIST_DECK_FAIL,
    WORD_LIST_DECK_REQUEST,
    WORD_LIST_DECK_SUCCESS,
    WORD_LIST_FAIL,
    WORD_LIST_REQUEST,
    WORD_LIST_SUCCESS,
    WORD_UPDATE_FAIL,
    WORD_UPDATE_REQUEST,
    WORD_UPDATE_SUCCESS,
} from '../constants/wordConstants'

export const listWords =
  (keyword = '') =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: WORD_LIST_REQUEST })

      const {
        userLogin: { userInfo },
      } = getState()

      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }

      const { data } = await axios.get(`/words/${keyword}`, config)

      dispatch({
        type: WORD_LIST_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: WORD_LIST_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      })
    }
  }

export const listWordsDeck =
  (keyword = '', idDeck) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: WORD_LIST_DECK_REQUEST })

      const {
        userLogin: { userInfo },
      } = getState()

      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }

      const { data } = await axios.get(
        `/words/deck/${idDeck}/${keyword}`,
        config
      )

      dispatch({
        type: WORD_LIST_DECK_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: WORD_LIST_DECK_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      })
    }
  }

export const listAllWords =
  (keyword = '') =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: WORD_ALL_LIST_REQUEST })

      const {
        userLogin: { userInfo },
      } = getState()

      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }

      const { data } = await axios.get(`/words/admin/${keyword}`, config)

      dispatch({
        type: WORD_ALL_LIST_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: WORD_ALL_LIST_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      })
    }
  }

export const listWordDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: WORD_DETAILS_REQUEST })

    const { data } = await axios.get(`/words/${id}`)

    dispatch({
      type: WORD_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: WORD_DETAILS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    })
  }
}

export const createWord =
  (categoryId, deckId, word) => async (dispatch, getState) => {
    try {
      dispatch({ type: WORD_CREATE_REQUEST })

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
        `/words/${categoryId}/create/${deckId}/`,
        word,
        config
      )

      dispatch({
        type: WORD_CREATE_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: WORD_CREATE_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      })
    }
  }

export const addExerciseWord = (word) => async (dispatch, getState) => {
  try {
    dispatch({ type: WORD_ADD_EXERCISE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.patch(
      `/words/${word.id}/add-exercise/`,
      word,
      config
    )

    dispatch({
      type: WORD_ADD_EXERCISE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: WORD_ADD_EXERCISE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    })
  }
}

export const addCorrectAnswerWord = (word) => async (dispatch, getState) => {
  try {
    dispatch({ type: WORD_ADD_CORRECT_ANSWER_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.patch(
      `/words/${word.id}/correct-answer/`,
      word,
      config
    )

    dispatch({
      type: WORD_ADD_CORRECT_ANSWER_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: WORD_ADD_CORRECT_ANSWER_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    })
  }
}

export const addWrongAnswerWord = (word) => async (dispatch, getState) => {
  try {
    dispatch({ type: WORD_ADD_WRONG_ANSWER_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.patch(
      `/words/${word.id}/wrong-answer/`,
      word,
      config
    )

    dispatch({
      type: WORD_ADD_WRONG_ANSWER_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: WORD_ADD_WRONG_ANSWER_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    })
  }
}

export const drawWord = (exercise) => async (dispatch, getState) => {
  try {
    dispatch({ type: WORD_DRAW_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/words/practice/${exercise.id}/`, config)

    dispatch({
      type: WORD_DRAW_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: WORD_DRAW_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    })
  }
}

export const deleteWord = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: WORD_DELETE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.delete(`/words/${id}/delete`, config)

    dispatch({
      type: WORD_DELETE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: WORD_DELETE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    })
  }
}

export const updateWord = (word) => async (dispatch, getState) => {
  try {
    dispatch({ type: WORD_UPDATE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.patch(
      `/words/${word.id}/update/`,
      word,
      config
    )

    dispatch({
      type: WORD_UPDATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: WORD_UPDATE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    })
  }
}
