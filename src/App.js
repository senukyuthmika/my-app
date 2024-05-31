import logo from './logo.svg';
import './App.css';
import { AuthProvider } from './utils/AuthContext';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './Pages/LogIn';
import { ToastContainer } from 'react-toastify';
import Home from './Pages/Home';
import Users from './Pages/Users';
import Products from './Pages/Items';
import EditOrder from './Pages/Orders/EditOrder';
import Orders from './Pages/Orders/Orders';
import ProtectedRoute from './utils/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          {/* Allowed to access only if logged in */}
          <Route element={<ProtectedRoute />}>
            <Route path="/users" element={<Users />} />
            <Route path="/products" element={<Products />} />
            <Route path="/orders/:id/products" element={<EditOrder />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/" element={<Home />} />
          </Route>

          {/* Allowed to access only if not logged in */}
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>

      <ToastContainer />
    </AuthProvider>
  );
}

export default App;
