import React from 'react';
import { Routes, Route } from 'react-router-dom';
const Home = React.lazy(() => import('./pages/Home'));

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  )
}

export default App
