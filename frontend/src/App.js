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

function App() {
  return (
    <Router>
      <Header />
      <main className="py-4">
        <Container>
          <Route path="/words" component={WordsListScreen} exact />
          <Route path="/words/create" component={CreateWordScreen} />
          <Route path="/login" component={LoginScreen} />
          <Route path="/words/:id" component={WordScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/profile" component={ProfileScreen} />
          <Route path="/category" component={CategoryListScreen} exact />
          <Switch>
            <Route path="/category/create" component={CreateCategoryScreen} />
            <Route path="/category/:id" component={CategoryScreen} />
          </Switch>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
