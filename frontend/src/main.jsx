import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import { BrowserRouter } from "react-router-dom"
import App from "./App"
import "bootstrap/dist/css/bootstrap.min.css"

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <React.Suspense fallback={<div>Loading... </div>}>
        <App />
      </React.Suspense>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
)
