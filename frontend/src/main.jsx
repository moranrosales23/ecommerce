import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"
import store from "./store"
import App from "./App"
import "bootstrap/dist/css/bootstrap.min.css"

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <React.Suspense fallback={<div>Loading... </div>}>
        <Provider store={store}>
          <App />
        </Provider>
      </React.Suspense>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
)
