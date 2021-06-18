import { Container } from "react-bootstrap";
import { BrowserRouter as Router } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <Header />
      <main className="py-4">
        <Container>Flashcard</Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
