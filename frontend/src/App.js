import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import WordsListScreen from "./screens/WordsListScreen";
import WordScreen from "./screens/WordScreen";
import CreateWordScreen from "./screens/CreateWordScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import CategoryListScreen from "./screens/CategoryListScreen";
import CategoryScreen from "./screens/CategoryScreen";
import CreateCategoryScreen from "./screens/CreateCategoryScreen";
import DecksListScreen from "./screens/DecksListScreen";
import DeckScreen from "./screens/DeckScreen";
import CreateDeckScreen from "./screens/CreateDeckScreen";

function App() {
  return (
    <Router>
      <Header />
      <main className="py-4">
        <Container>
          <Route path="/words" component={WordsListScreen} exact />
          <Switch>
            <Route path="/words/create" component={CreateWordScreen} />
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
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
