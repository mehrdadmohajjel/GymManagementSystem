import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "../auth/ProtectedRoute";

<Routes>
  <Route path="/login" element={<Login />} />

  <Route path="/system-admin"
    element={
      <ProtectedRoute role="SystemAdmin">
        <SystemAdminLayout />
      </ProtectedRoute>
    }
  />

  <Route path="/gym-admin"
    element={
      <ProtectedRoute role="GymAdmin">
        <GymAdminLayout />
      </ProtectedRoute>
    }
  />

  <Route path="/athlete"
    element={
      <ProtectedRoute role="Athlete">
        <AthleteLayout />
      </ProtectedRoute>
    }
  />
</Routes>
