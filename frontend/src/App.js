import {Container} from 'react-bootstrap'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import Header from './components/Header'
import Footer from './components/Footer'
import WordsListScreen from './screens/WordsListScreen'
import WordsAllListScreen from './screens/WordsAllListScreen'
import WordScreen from './screens/WordScreen'
import WordUpdateScreen from './screens/WordUpdateScreen'
import CreateWordScreen from './screens/CreateWordScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import UserScreen from './screens/UserScreen'
import UsersListScreen from './screens/UsersListScreen'
import UserUpdateScreen from './screens/UserUpdateScreen'
import CategoryListScreen from './screens/CategoryListScreen'
import CategoryScreen from './screens/CategoryScreen'
import CreateCategoryScreen from './screens/CreateCategoryScreen'
import CategoryUpdateScreen from './screens/CategoryUpdateScreen'
import DecksListScreen from './screens/DecksListScreen'
import DecksAllListScreen from './screens/DecksAllListScreen'
import DeckScreen from './screens/DeckScreen'
import DeckUpdateScreen from './screens/DeckUpdateScreen'
import CreateDeckScreen from './screens/CreateDeckScreen'
import CreateExerciseScreen from './screens/CreateExerciseScreen'
import ExerciseReversedScreen from './screens/ExerciseReversedScreen'
import ExerciseTypedScreen from './screens/ExerciseTypedScreen'
import ExercisesListScreen from './screens/ExercisesListScreen'
import ExercisesAllListScreen from './screens/ExercisesAllListScreen'
import ExerciseDetailsScreen from './screens/ExerciseDetailsScreen'
import EndExerciseScreen from './screens/EndExerciseScreen'
import HomeScreen from './screens/HomeScreen'

function App() {
  return (
    <Router>
      <Header />
      <main className="py-4">
        <Container>
          <Switch>
            <Route path="/" component={HomeScreen} exact />
            <Route path="/words" component={WordsListScreen} exact />
            <Route path="/admin/words/" component={WordsAllListScreen} />
            <Route path="/words/create" component={CreateWordScreen} />
            <Route path="/words/:id" component={WordScreen} exact />
            <Route path="/words/:id/update" component={WordUpdateScreen} />
          </Switch>
          <Route path="/login" component={LoginScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/profile" component={ProfileScreen} />
          <Route path="/category" component={CategoryListScreen} exact />
          <Route path="/admin/user/:id" component={UserScreen} exact />
          <Route path="/admin/user/:id/update" component={UserUpdateScreen} />
          <Switch>
            <Route path="/category/create" component={CreateCategoryScreen} />
            <Route path="/category/:id" component={CategoryScreen} exact />
            <Route
              path="/category/:id/update"
              component={CategoryUpdateScreen}
            />
          </Switch>

          <Switch>
            <Route path="/decks" component={DecksListScreen} exact />
            <Route path="/admin/decks" component={DecksAllListScreen} />
            <Route path="/decks/create" component={CreateDeckScreen} />
            <Route path="/decks/:id" component={DeckScreen} exact />
            <Route path="/decks/:id/update" component={DeckUpdateScreen} />
          </Switch>

          <Switch>
            <Route path="/exercises" component={ExercisesListScreen} exact />
            <Route
              path="/admin/exercises/"
              component={ExercisesAllListScreen}
            />
            <Route path="/exercises/create" component={CreateExerciseScreen} />
            <Route path="/exercises/:id/end" component={EndExerciseScreen} />
            <Route
              path="/exercises/:id/update/reversed"
              component={ExerciseReversedScreen}
            />
            <Route
              path="/exercises/:id/update/typed"
              component={ExerciseTypedScreen}
            />
            <Route path="/exercises/:id/" component={ExerciseDetailsScreen} />
          </Switch>
          <Route path="/admin/usersList" component={UsersListScreen} />
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
