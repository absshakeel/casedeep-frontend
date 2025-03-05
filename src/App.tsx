
import "./styles/App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppRoutes from "./components/globals/AppRoutes";
import { Provider } from "react-redux";
import { store } from "./store/store";

function App() {
  return (
    <Provider store={store}>
      <AppRoutes />
      <ToastContainer theme="dark" />
    </Provider>
  );
}

export default App;