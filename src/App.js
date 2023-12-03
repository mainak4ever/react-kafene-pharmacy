import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Topbar from "./Navbar";
import Homepage from "./components/Homepage";
import ProductListingPage from "./components/Productspage";
import UserListPage from "./components/Users";
import LoginPage from "./Loginpage";
import { ROUTE_ENDPOINTS } from "./RouterEndpoints";

const App = () => {
  const classes = { MainContainer: "App_MainContainer__Fvvih" };
  const [isLoggedIn, setLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  const handleLogin = () => {
    setLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true"); // Corrected the string value
  };

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.setItem("isLoggedIn", "false"); // Corrected the string value
  };

  const PrivateRoute = ({ path, element }) => {
    return isLoggedIn ? element : <Navigate to="/login" />;
  };

  return (
    <BrowserRouter>
      <Topbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <div className={classes.MainContainer}>
        <Routes>
          <Route
            path="/login"
            element={<LoginPage onUserLoggedIn={handleLogin} />}
          />
          <Route path="/" element={<PrivateRoute element={<Homepage />} />} />
          <Route
            path="/products"
            element={<PrivateRoute element={<ProductListingPage />} />}
          />
          <Route
            path="/users"
            element={<PrivateRoute element={<UserListPage />} />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
// import React, { useState } from "react";
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import Topbar from "./Navbar";
// import Homepage from "./components/Homepage";
// import ProductListingPage from "./components/Productspage";
// import UserListPage from "./components/Users";
// import Login from "./Loginpage";
// import { ROUTE_ENDPOINTS } from "./RouterEndpoints";

// const App = () => {
//   const classes = { MainContainer: "App_MainContainer__Fvvih" };
//   const [isLoggedIn, setLoggedIn] = useState(
//     localStorage.getItem("isLoggedIn") === "true"
//   );

//   const handleLogin = () => {
//     setLoggedIn(true);
//     localStorage.setItem("isLoggedIn", true);
//   };

//   const handleLogout = () => {
//     setLoggedIn(false);
//     localStorage.setItem("isLoggedIn", false);
//   };

//   const PrivateRoute = ({ path, element }) => {
//     return isLoggedIn ? element : <Navigate to="/login" />;
//   };

//   return (
//     <BrowserRouter>
//       <Topbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
//       <div className={classes.MainContainer}>
//         <Routes>
//           <Route path="/login" element={<Login setLoggedIn={handleLogin} />} />
//           <Route
//             path="/"
//             element={<PrivateRoute path="/" element={<Homepage />} />}
//           />
//           <Route
//             path="/products"
//             element={
//               <PrivateRoute path="/products" element={<ProductListingPage />} />
//             }
//           />
//           <Route
//             path="/users"
//             element={<PrivateRoute path="/users" element={<UserListPage />} />}
//           />
//         </Routes>
//       </div>
//     </BrowserRouter>
//   );
// };

// export default App;
