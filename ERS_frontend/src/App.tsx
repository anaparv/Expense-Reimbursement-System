import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Login } from "./Components/LoginRegister/Login";
import "bootstrap/dist/css/bootstrap.css";
import { Register } from "./Components/LoginRegister/Register";
// import { EmployeeTable } from "./Components/Employee/EmployeeTable";
import { ExpensePage } from "./Components/Expenses/ExpensePage";
// import { AddExpense } from "./Components/Expenses/AddExpense";
import { EmployeesPage } from "./Components/Employee/EmployeesPage";
import { store } from "./GlobalData/store";

type PrivateRouteProps = {
  children: React.ReactNode;
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const user =
    Boolean(store.loggedInUser.userId) &&
    Boolean(store.loggedInUser.role) &&
    Boolean(store.loggedInUser.username);
  return user ? children : <Navigate to="/" />;
};

const ProtectedRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const isAdmin =
    Boolean(store.loggedInUser.role) && store.loggedInUser.role === "admin";

  return isAdmin ? children : <Navigate to="/expenses" />;
};

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* empty string or / for path makes the component render at startup */}
          <Route path="" element={<Login />} />
          <Route path="register" element={<Register />} />
          {/* <Route path="employees" element={<EmployeeTable />} /> */}
          <Route
            path="expenses"
            element={
              <PrivateRoute>
                <ExpensePage />
              </PrivateRoute>
            }
          />
          <Route
            path="employees"
            element={
              <PrivateRoute>
                <ProtectedRoute>
                  <EmployeesPage />
                </ProtectedRoute>
              </PrivateRoute>
            }
          />
          {/* <Route path="add-expense" element={<AddExpense />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
