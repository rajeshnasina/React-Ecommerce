import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import PrimaryNavbar  from "./components/PrimaryNavbar";
import Home from './pages/Home';
import Product from "./pages/Product";
import NoPage from "./pages/NoPage" ;
import Login from "./pages/Login" ;
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PrimaryNavbar />}>
          <Route index element={<Home />} />
          <Route path="product" element={<Product />} />
          <Route path="login" element={<Login />} />
          <Route path="product/:id" element={<Product />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
