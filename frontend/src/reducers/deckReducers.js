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
  DECK_CREATE_RESET,
} from '../constants/deckConstants'

export const deckListReducer = (state = { decks: [] }, action) => {
  switch (action.type) {
    case DECK_LIST_REQUEST:
      return { loading: true, decks: [] }

    case DECK_LIST_SUCCESS:
      return {
        loading: false,
        decks: action.payload.decks,
        page: action.payload.page,
        pages: action.payload.pages,
      }

    case DECK_LIST_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}

export const deckAllListReducer = (state = { decks: [] }, action) => {
  switch (action.type) {
    case DECK_ALL_LIST_REQUEST:
      return { loading: true, decks: [] }

    case DECK_ALL_LIST_SUCCESS:
      return {
        loading: false,
        decks: action.payload.decks,
        page: action.payload.page,
        pages: action.payload.pages,
      }

    case DECK_ALL_LIST_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}

export const deckDetailsReducer = (state = { deck: {} }, action) => {
  switch (action.type) {
    case DECK_DETAILS_REQUEST:
      return { loading: true }

    case DECK_DETAILS_SUCCESS:
      return { loading: false, deck: action.payload }

    case DECK_DETAILS_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}

export const deckCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case DECK_CREATE_REQUEST:
      return { loading: true }

    case DECK_CREATE_SUCCESS:
      return { loading: false, success: true }

    case DECK_CREATE_FAIL:
      return { loading: false, error: action.payload }

    case DECK_CREATE_RESET:
      return {}

    default:
      return state
  }
}
