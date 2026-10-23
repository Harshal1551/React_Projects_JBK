import { Provider } from "react-redux";
import store from "./redux/store";
import Home from "./Home";
import Profile from "./Profile";

function App() {
  return (
    <Provider store={store}>
      <h1>Redux Toolkit Example</h1>
      <Home />
      <Profile />
    </Provider>
  );
}

export default App;