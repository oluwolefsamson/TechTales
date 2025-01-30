import React from "react";
import { Navbar, Footer } from "./components";
import styles from "./style";
import AppRouter from "./router/router";
import { useLocation, Navigate } from "react-router-dom";

// Dummy authentication check function
const useAuth = () => {
  const token = localStorage.getItem("token");
  return !!token;
};

const App = () => {
  const location = useLocation();
  const isAuthenticated = useAuth();

  // Define paths or patterns where Navbar and Footer should be hidden
  const hiddenPaths = ["/login", "/register", "/specialty", "/", "*"];
  const alwaysShowPaths = ["/404"];

  // Check if the current path matches any hidden patterns
  const isHiddenPage =
    hiddenPaths.some((path) => location.pathname.startsWith(path)) &&
    !alwaysShowPaths.includes(location.pathname);

  // Redirect to login if accessing a protected route without authentication
  if (!isAuthenticated && !isHiddenPage) {
    return <Navigate to="/" />;
  }

  // Set background color based on the current route
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";
  const backgroundColor = isAuthPage ? "bg-white" : "bg-black";

  return (
    <div className={`${backgroundColor} w-full overflow-hidden`}>
      {!isHiddenPage ? (
        <div className={`${styles.paddingX} ${styles.flexCenter}`}>
          <div className={`bg-black ${styles.boxWidth}`}>
            <Navbar />
          </div>
        </div>
      ) : null}
      <div className={`${styles.flexStart}`}>
        <div className={`bg-black ${styles.boxWidth}`}>
          <AppRouter />
        </div>
      </div>
      {!isHiddenPage ? (
        <div className={`bg-black ${styles.paddingX} ${styles.flexStart}`}>
          <div className={`bg-black ${styles.boxWidth}`}>
            <Footer />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default App;
