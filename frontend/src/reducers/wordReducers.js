export const wordListReducer = (state = { words: [] }, action) => {
  switch (action.type) {
    case "WORD_LIST_REQUEST":
      return { loading: true, words: [] };

    case "WORD_LIST_SUCCESS":
      return { loading: false, words: action.payload };
    case "WORD_LIST_FAIL":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
