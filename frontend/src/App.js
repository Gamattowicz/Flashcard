import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import WordsScreen from "./screens/WordsScreen";

function App() {
  return (
    <Router>
      <Header />
      <main className="py-4">
        <Container>
          <Route path="/words" component={WordsScreen} />
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
