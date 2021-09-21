import {applyMiddleware, combineReducers, createStore} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {
  wordAddCorrectAnswerReducer,
  wordAddExerciseReducer,
  wordAddWrongAnswerReducer,
  wordAllListReducer,
  wordCreateReducer,
  wordDeleteReducer,
  wordDetailsReducer,
  wordDrawReducer,
  wordListDeckReducer,
  wordListReducer,
  wordUpdateReducer,
} from './reducers/wordReducers'
import {
  userDetailsReducer,
  userListReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
} from './reducers/userReducers'
import {
  categoryCreateReducer,
  categoryDeleteReducer,
  categoryDetailsReducer,
  categoryListReducer,
} from './reducers/categoryReducers'
import {
  deckAllListReducer,
  deckCreateReducer,
  deckDeleteReducer,
  deckDetailsReducer,
  deckListReducer,
  deckUpdateReducer,
} from './reducers/deckReducers'
import {
  exerciseAddCorrectAnswerReducer,
  exerciseAddWrongAnswerReducer,
  exerciseAllListReducer,
  exerciseCreateReducer,
  exerciseDetailsReducer,
  exerciseListReducer,
} from './reducers/exerciseReducers'

const reducer = combineReducers({
  wordList: wordListReducer,
  wordListDeck: wordListDeckReducer,
  wordAllList: wordAllListReducer,
  wordDetails: wordDetailsReducer,
  wordUpdate: wordUpdateReducer,
  wordCreate: wordCreateReducer,
  wordDraw: wordDrawReducer,
  wordAddExercise: wordAddExerciseReducer,
  wordAddCorrectAnswer: wordAddCorrectAnswerReducer,
  wordAddWrongAnswer: wordAddWrongAnswerReducer,
  wordDelete: wordDeleteReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  categoryList: categoryListReducer,
  categoryDetails: categoryDetailsReducer,
  categoryCreate: categoryCreateReducer,
  categoryDelete: categoryDeleteReducer,
  deckList: deckListReducer,
  deckAllList: deckAllListReducer,
  deckDetails: deckDetailsReducer,
  deckCreate: deckCreateReducer,
  deckDelete: deckDeleteReducer,
  deckUpdate: deckUpdateReducer,
  exerciseCreate: exerciseCreateReducer,
  exerciseList: exerciseListReducer,
  exerciseAllList: exerciseAllListReducer,
  exerciseAddCorrectAnswer: exerciseAddCorrectAnswerReducer,
  exerciseAddWrongAnswer: exerciseAddWrongAnswerReducer,
  exerciseDetails: exerciseDetailsReducer,
})

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
