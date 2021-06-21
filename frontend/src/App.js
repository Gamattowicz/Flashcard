import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import WordsListScreen from "./screens/WordsListScreen";
import WordScreen from "./screens/WordScreen";
import LoginScreen from "./screens/LoginScreen";

function App() {
  return (
    <Router>
      <Header />
      <main className="py-4">
        <Container>
          <Route path="/words" component={WordsListScreen} />
          <Route path="/word/:id" component={WordScreen} />
          <Route path="/login" component={LoginScreen} />
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
