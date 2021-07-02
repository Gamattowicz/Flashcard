import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  wordListReducer,
  wordDetailsReducer,
  wordCreateReducer,
  wordDrawReducer,
  wordAddExerciseReducer,
  wordAddCorrectAnswerReducer,
  wordAddWrongAnswerReducer,
} from './reducers/wordReducers'
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
} from './reducers/userReducers'
import {
  categoryListReducer,
  categoryDetailsReducer,
  categoryCreateReducer,
} from './reducers/categoryReducers'
import {
  deckListReducer,
  deckDetailsReducer,
  deckCreateReducer,
} from './reducers/deckReducers'

import {
  exerciseCreateReducer,
  exerciseListReducer,
  exerciseAddCorrectAnswerReducer,
  exerciseAddWrongAnswerReducer,
  exerciseDetailsReducer,
} from './reducers/exerciseReducers'

const reducer = combineReducers({
  wordList: wordListReducer,
  wordDetails: wordDetailsReducer,
  wordCreate: wordCreateReducer,
  wordDraw: wordDrawReducer,
  wordAddExercise: wordAddExerciseReducer,
  wordAddCorrectAnswer: wordAddCorrectAnswerReducer,
  wordAddWrongAnswer: wordAddWrongAnswerReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  categoryList: categoryListReducer,
  categoryDetails: categoryDetailsReducer,
  categoryCreate: categoryCreateReducer,
  deckList: deckListReducer,
  deckDetails: deckDetailsReducer,
  deckCreate: deckCreateReducer,
  exerciseCreate: exerciseCreateReducer,
  exerciseList: exerciseListReducer,
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
