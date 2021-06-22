import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import WordsListScreen from "./screens/WordsListScreen";
import WordScreen from "./screens/WordScreen";
import CreateWordScreen from "./screens/CreateWordScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";

function App() {
  return (
    <Router>
      <Header />
      <main className="py-4">
        <Container>
          <Route path="/words/:id" component={WordScreen} />
          <Route path="/admin/words" component={WordsListScreen} />
          <Route path="/words/create" component={CreateWordScreen} />
          <Route path="/login" component={LoginScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/profile" component={ProfileScreen} />
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
