import { Container } from "react-bootstrap";

import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <div>
      <Header />
      <main className="py-4">
        <Container>Flashcard</Container>
      </main>
      <Footer />
    </div>
  );
}

export default App;
