import { Route, Routes } from "react-router-dom";
import "./App.css";
import QueuePage from "./pages/QueuePage";
import HeaderComponent from "./components/HeaderComponent";
import BookingPage from "./pages/BookingPage";
import RegisterPage from "./pages/RegisterPage";
import { LoginPage } from "./pages/LoginPage";
import { useContext } from "react";
import { AuthContext, AuthData } from "./context/AuthContext";
import { Navigate } from "react-router-dom";
import SingleCustomerPage from "./pages/SingleCustomerPage";
import Dashboard from "./pages/dashboard/Dashboard";
import NotFound from "./pages/NotFound";
import UserPage from "./pages/userPage/UserPage";
import CustomerPage from "./pages/customerPage/CustomerPage";
import AddUserPage from "./pages/userPage/AddUserPage";

type ProtectedProps = {
  authData: AuthData | null;
  children: React.ReactNode;
};

function Protected({ authData, children }: ProtectedProps) {
  if (authData === null || Object.keys(authData).length < 1) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function App() {
  const { authData }: any = useContext(AuthContext);
  return (
    <>
      <HeaderComponent />
      <Routes>
        <Route path="/" element={<QueuePage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="view/:id/customers"
          element={
            <Protected authData={authData}>
              <SingleCustomerPage />
            </Protected>
          }
        />
        {authData && authData?.role === "admin" && (
          <>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/users" element={<UserPage />} />
            <Route path="/addUser" element={<AddUserPage />} />
            <Route path="/customers" element={<CustomerPage />} />
          </>
        )}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
