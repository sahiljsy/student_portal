import React, { useState, useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import axios from "axios";


function ProtectedRoute({ component: Component, ...restOfProps }) {
  let isAuthenticated = localStorage.getItem("accessToken");
  return (
    <Route
      {...restOfProps}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
}

export default ProtectedRoute;
