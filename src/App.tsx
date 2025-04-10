import "./App.css";
import SearchBar from "./components/SearchBar";

function App() {
  return (
    <div className="text-gray-300">
      <h1 className="text-4xl font-semibold mb-10">
        {" "}
        Search your fav programmers Github Repos!
      </h1>
      <SearchBar />
    </div>
  );
}

export default App;
