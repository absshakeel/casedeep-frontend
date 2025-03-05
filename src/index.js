import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/index.css";
import "./styles/fonts.css";
import "./styles/webTopPick.css";
import "./styles/webOrder.css";

import "react-toastify/dist/ReactToastify.css";
import "react-calendar/dist/Calendar.css";
import App from "./App";
// import reportWebVitals from "./reportWebVitals";
import "./utils/i18n";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById("root")
);
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

// reportWebVitals();