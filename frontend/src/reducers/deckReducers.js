import {
  DECK_ALL_LIST_FAIL,
  DECK_ALL_LIST_REQUEST,
  DECK_ALL_LIST_SUCCESS,
  DECK_CREATE_FAIL,
  DECK_CREATE_REQUEST,
  DECK_CREATE_RESET,
  DECK_CREATE_SUCCESS,
  DECK_DELETE_FAIL,
  DECK_DELETE_REQUEST,
  DECK_DELETE_RESET,
  DECK_DELETE_SUCCESS,
  DECK_DETAILS_FAIL,
  DECK_DETAILS_REQUEST,
  DECK_DETAILS_SUCCESS,
  DECK_LIST_FAIL,
  DECK_LIST_REQUEST,
  DECK_LIST_SUCCESS,
  DECK_UPDATE_FAIL,
  DECK_UPDATE_REQUEST,
  DECK_UPDATE_RESET,
  DECK_UPDATE_SUCCESS,
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
      return { loading: true, ...state }

    case DECK_DETAILS_SUCCESS:
      return { loading: false, success: true, deck: action.payload }

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

export const deckDeleteReducer = (state = { deck: {} }, action) => {
  switch (action.type) {
    case DECK_DELETE_REQUEST:
      return { loading: true }

    case DECK_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
      }

    case DECK_DELETE_FAIL:
      return { loading: false, error: action.payload }

    case DECK_DELETE_RESET:
      return { deck: {} }

    default:
      return state
  }
}

export const deckUpdateReducer = (state = { deck: {} }, action) => {
  switch (action.type) {
    case DECK_UPDATE_REQUEST:
      return { loading: true }

    case DECK_UPDATE_SUCCESS:
      return { loading: false, success: true }

    case DECK_UPDATE_FAIL:
      return { loading: false, error: action.payload }

    case DECK_UPDATE_RESET:
      return { deck: {} }

    default:
      return state
  }
}
