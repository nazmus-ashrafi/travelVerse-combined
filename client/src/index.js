import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { PersistGate } from "redux-persist/integration/react";

import App from "./App";
import { Provider } from "react-redux";
import { store } from "./app/store";


// import 'tw-elements';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';


ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<App />} />
        </Routes>
      </BrowserRouter>
    </Provider>
,
  document.getElementById("root")
);
