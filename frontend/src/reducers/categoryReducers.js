import {
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_LIST_FAIL,
  CATEGORY_DETAILS_REQUEST,
  CATEGORY_DETAILS_SUCCESS,
  CATEGORY_DETAILS_FAIL,
  CATEGORY_CREATE_REQUEST,
  CATEGORY_CREATE_SUCCESS,
  CATEGORY_CREATE_FAIL,
} from "../constants/categoryConstants";

export const categoryListReducer = (state = { categories: [] }, action) => {
  switch (action.type) {
    case CATEGORY_LIST_REQUEST:
      return { loading: true, categories: [] };

    case CATEGORY_LIST_SUCCESS:
      return { loading: false, categories: action.payload };

    case CATEGORY_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const categoryDetailsReducer = (state = { category: {} }, action) => {
  switch (action.type) {
    case CATEGORY_DETAILS_REQUEST:
      return { loading: true, ...state };

    case CATEGORY_DETAILS_SUCCESS:
      return { loading: false, category: action.payload };

    case CATEGORY_DETAILS_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const categoryCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case CATEGORY_CREATE_REQUEST:
      return { loading: true };

    case CATEGORY_CREATE_SUCCESS:
      return { loading: false, categoryInfo: action.payload };

    case CATEGORY_CREATE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
