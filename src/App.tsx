import CatFactZod from "./components/CatFactZod";
import CatFactsZod from "./components/CatFactsZod";
import Cat from "./assets/cat-svgrepo-com.svg";
import "./App.css";

function App() {
  return (
    <div className="container">
      <div className="sub-container">
        <img src={Cat} alt="/" className="cat-logo" />
        <CatFactZod />
        <CatFactsZod />
      </div>
    </div>
  );
}

export default App;
