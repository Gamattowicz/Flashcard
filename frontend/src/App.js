import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Header from './components/Header'
import Footer from './components/Footer'
import WordsListScreen from './screens/WordsListScreen'
import WordsAllListScreen from './screens/WordsAllListScreen'
import WordScreen from './screens/WordScreen'
import CreateWordScreen from './screens/CreateWordScreen'
import DrawWordScreen from './screens/DrawWordScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import CategoryListScreen from './screens/CategoryListScreen'
import CategoryScreen from './screens/CategoryScreen'
import CreateCategoryScreen from './screens/CreateCategoryScreen'
import DecksListScreen from './screens/DecksListScreen'
import DeckScreen from './screens/DeckScreen'
import CreateDeckScreen from './screens/CreateDeckScreen'
import CreateExerciseScreen from './screens/CreateExerciseScreen'
import ExerciseScreen from './screens/ExerciseScreen'
import ExercisesListScreen from './screens/ExercisesListScreen'
import ExerciseDetailsScreen from './screens/ExerciseDetailsScreen'
import EndExerciseScreen from './screens/EndExerciseScreen'
import UsersListScreen from './screens/UsersListScreen'

function App() {
  return (
    <Router>
      <Header />
      <main className="py-4">
        <Container>
          <Switch>
            <Route path="/words" component={WordsListScreen} exact />
            <Route path="/words/admin" component={WordsAllListScreen} />
            <Route path="/words/create" component={CreateWordScreen} />
            <Route path="/words/practice" component={DrawWordScreen} />
            <Route path="/words/:id" component={WordScreen} />
          </Switch>
          <Route path="/login" component={LoginScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/profile" component={ProfileScreen} />
          <Route path="/category" component={CategoryListScreen} exact />
          <Switch>
            <Route path="/category/create" component={CreateCategoryScreen} />
            <Route path="/category/:id" component={CategoryScreen} />
          </Switch>

          <Route path="/decks" component={DecksListScreen} exact />
          <Switch>
            <Route path="/decks/create" component={CreateDeckScreen} />
            <Route path="/decks/:id" component={DeckScreen} />
          </Switch>

          <Route path="/exercises" component={ExercisesListScreen} exact />
          <Switch>
            <Route path="/exercises/create" component={CreateExerciseScreen} />
            <Route path="/exercises/:id/end" component={EndExerciseScreen} />
            <Route path="/exercises/:id/update" component={ExerciseScreen} />
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
