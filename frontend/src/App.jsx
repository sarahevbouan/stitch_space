import Lobby from "./pages/Lobby";
import "./index.css";
import Navbar from "./ui/Navbar";

const App = () => {
  return (
    <>
      <Navbar />

      <div className="mt-24 pt-4">
        <Lobby />
      </div>
    </>
  );
};

export default App;
