import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Routes from "./routes";
import AuthContextProvider from "./Context/AuthContextProvider";

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <BrowserRouter>
          <AuthContextProvider>
            <Routes />
          </AuthContextProvider>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
