import { Button } from "react-bootstrap";
import { store } from "../../GlobalData/store";
import { ExpenseTable } from "./ExpenseTable";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export const ExpensePage: React.FC = () => {
  const navigate = useNavigate();
  const userRole = store.loggedInUser.role;
  const isAdmin = userRole === "admin";

  const [expenses, setExpenses] = useState([]);

  const getAllExpenses = async () => {
    const userId = store.loggedInUser.userId;
    const response = await axios.get(
      `http://localhost:8080/expense/${userId}/history`
    );

    if (response.status === 200) {
      setExpenses(response.data);
    }
  };
  useEffect(() => {
    if (expenses.length > 0) {
      return;
    }

    getAllExpenses();
  }, [expenses]);

  return (
    <>
      <Button
        variant="outline-dark"
        onClick={() => navigate("/employees/add-expense")}
      >
        Add expense
      </Button>
      <Button
        variant="outline-dark"
        onClick={() => {
          navigate("/");
          localStorage.setItem(
            "user",
            JSON.stringify({ userId: 0, role: "", username: "" })
          );
        }}
      >
        Log out
      </Button>
      <ExpenseTable
        showEmployeeColumn={isAdmin}
        expenseTableTitle={"Pending expenses"}
        expenses={expenses.filter((e) => e.status === "pending")}
      />
      <div
        style={{
          height: "100px",
        }}
      />
      <ExpenseTable
        showEmployeeColumn={isAdmin}
        expenseTableTitle={"Expenses history"}
        expenses={expenses.filter((e) => e.status === "approved")}
      />
    </>
  );
};
