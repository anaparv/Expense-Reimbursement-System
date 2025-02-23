import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./Components/LoginRegister/Login";
import "bootstrap/dist/css/bootstrap.css";
import { Register } from "./Components/LoginRegister/Register";
import { EmployeeTable } from "./Components/Employee/EmployeeTable";
import { ExpenseTable } from "./Components/Expenses/ExpenseTable";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* empty string or / for path makes the component render at startup */}
          <Route path="" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="employees" element={<EmployeeTable />} />
          <Route path="expenses" element={<ExpenseTable />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
