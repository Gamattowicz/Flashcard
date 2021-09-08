import axios from 'axios'
import {
  DECK_LIST_REQUEST,
  DECK_LIST_SUCCESS,
  DECK_LIST_FAIL,
  DECK_ALL_LIST_REQUEST,
  DECK_ALL_LIST_SUCCESS,
  DECK_ALL_LIST_FAIL,
  DECK_DETAILS_REQUEST,
  DECK_DETAILS_SUCCESS,
  DECK_DETAILS_FAIL,
  DECK_CREATE_REQUEST,
  DECK_CREATE_SUCCESS,
  DECK_CREATE_FAIL,
} from '../constants/deckConstants'

export const listDecks =
  (keyword = '') =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: DECK_LIST_REQUEST })

      const {
        userLogin: { userInfo },
      } = getState()

      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }

      const { data } = await axios.get(`/decks/${keyword}`, config)

      dispatch({
        type: DECK_LIST_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: DECK_LIST_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      })
    }
  }

export const listAllDecks =
  (keyword = '') =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: DECK_ALL_LIST_REQUEST })

      const {
        userLogin: { userInfo },
      } = getState()

      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }

      const { data } = await axios.get(`/decks/admin/${keyword}`, config)

      dispatch({
        type: DECK_ALL_LIST_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: DECK_ALL_LIST_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      })
    }
  }

export const listDeckDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: DECK_DETAILS_REQUEST })

    const { data } = await axios.get(`/decks/${id}`)

    dispatch({
      type: DECK_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: DECK_DETAILS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    })
  }
}

export const createDeck = (name) => async (dispatch, getState) => {
  try {
    dispatch({ type: DECK_CREATE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post('/decks/create/', { name }, config)

    dispatch({
      type: DECK_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: DECK_CREATE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    })
  }
}
