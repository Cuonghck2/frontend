/* eslint-disable no-unused-vars */
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Admin from "./page/Admin/Admin";
import LoginPage from "./page/Admin/Auth/LoginPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
      </Routes>
      <Admin />
    </BrowserRouter>
  );
}

export default App;
