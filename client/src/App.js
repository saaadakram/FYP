import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Spinner from "./components/Spinner";
import ProtectedRoutes from "./components/ProtectedRoutes";
import PublicRoutes from "./components/PublicRoutes";
import ApplyDoctor from "./pages/ApplyDoctor";
import NotificationPage from "./pages/NotificationPage";
import Doctors from "./pages/admin/Doctors";
import Users from "./pages/admin/Users";
import Profile from "./pages/doctor/Profile";
import BookingPage from "./pages/BookingPage";
import Appointmnets from "./pages/Appointmnets";
import DoctorAppointments from "./pages/doctor/DoctorAppointments";

function App() {
  const { loading: alertsLoading } = useSelector((state) => state.alerts);
  const { loading: authLoading } = useSelector((state) => state.user);

  // Show spinner only if alerts or auth are loading
  const isLoading = alertsLoading || authLoading;

  return (
    <BrowserRouter>
      {isLoading ? (
        <Spinner />
      ) : (
        <Routes>
          {/* Protected routes */}
          <Route
            path="/"
            element={
              <ProtectedRoutes>
                <Home />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/apply-doctor"
            element={
              <ProtectedRoutes>
                <ApplyDoctor />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/admin/doctors"
            element={
              <ProtectedRoutes>
                <Doctors />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedRoutes>
                <Users />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/appointments"
            element={
              <ProtectedRoutes>
                <Appointmnets />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/doctor-appointments"
            element={
              <ProtectedRoutes>
                <DoctorAppointments />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/doctor/profile/:id"
            element={
              <ProtectedRoutes>
                <Profile />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/doctor/book-appoitment/:doctorId"
            element={
              <ProtectedRoutes>
                <BookingPage />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/notification"
            element={
              <ProtectedRoutes>
                <NotificationPage />
              </ProtectedRoutes>
            }
          />

          {/* Public routes */}
          <Route
            path="/login"
            element={
              <PublicRoutes>
                <Login />
              </PublicRoutes>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoutes>
                <Register />
              </PublicRoutes>
            }
          />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
