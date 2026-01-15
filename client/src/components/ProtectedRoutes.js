import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import axios from "axios";
import { SetUser } from "../redux/features/userSlice";
import Spinner from "./Spinner";
import API_BASE_URL from "../services/api";

export default function ProtectedRoutes({ children }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [loadingUser, setLoadingUser] = useState(true); // local loading

  const getUser = async () => {
    try {
      dispatch(showLoading());
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token");

      const response = await axios.post(
        `${API_BASE_URL}/api/getUser`,
        { token },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(hideLoading());

      if (response.data.success) {
        dispatch(SetUser(response.data.data));
      } else {
        localStorage.clear();
      }
    } catch (error) {
      console.log("Error fetching user:", error);
      localStorage.clear();
    } finally {
      dispatch(hideLoading());
      setLoadingUser(false); // stop spinner
    }
  };

  useEffect(() => {
    if (!user) {
      getUser();
    } else {
      setLoadingUser(false);
    }
    // eslint-disable-next-line
  }, [user]);

  // Show spinner while fetching user
  if (loadingUser) return <Spinner />;

  // If no user after fetch or token expired, redirect to login
  if (!user) return <Navigate to="/login" replace />;

  // User exists, render children
  return children;
}
