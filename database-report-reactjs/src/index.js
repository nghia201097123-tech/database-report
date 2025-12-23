import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import { thunk } from "redux-thunk";
import reportWebVitals from "./reportWebVitals";
import { rootReducer } from "./store/producer/rootReducer";
import App from "./views/App.js";

const reduxStore = createStore(rootReducer, applyMiddleware(thunk));
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={reduxStore}>
    <App />
  </Provider>
);

// React sẽ chạy một số lifecycle methods hai lần để phát hiện các side effects không mong muốn.
// Lưu ý: Không nên bỏ Strict Mode trong ứng dụng production vì nó giúp phát hiện lỗi sớm.?
// cons root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
