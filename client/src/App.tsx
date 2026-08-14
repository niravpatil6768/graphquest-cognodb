import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Explore from "./pages/Explore";
import DeveloperDetails from "./pages/DeveloperDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Explore />} />
        <Route
          path="/developers/:id"
          element={<DeveloperDetails />}
        />

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
