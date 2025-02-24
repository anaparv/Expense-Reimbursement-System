import { Button, Container } from "react-bootstrap";
import { store } from "../../GlobalData/store";
import { ExpenseModel, ExpenseTable } from "./ExpenseTable";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { AddExpense } from "./AddExpense";

export const ExpensePage: React.FC = () => {
  const navigate = useNavigate();
  const userRole = store.loggedInUser.role;
  const isAdmin = userRole === "admin";

  const [expenses, setExpenses] = useState<ExpenseModel[]>([]);

  const [showAddExpense, setShowAddExpense] = useState<boolean>(false);

  const getAllExpenses = async () => {
    const userId = store.loggedInUser.userId;
    console.log(store);
    const response = await axios.get(
      `http://localhost:8080/expense/${userId}/history`
    );

    if (response.status === 200) {
      setExpenses(response.data);
    }
  };

  useEffect(() => {
    getAllExpenses();
  }, []);

  const makeApiRequest = async ({
    expenseId,
    action,
  }: {
    expenseId: number;
    action: string;
  }) => {
    return axios.put(`http://localhost:8080/expense/${expenseId}/${action}`);
  };

  const handleApprove = async (expenseId: number) => {
    try {
      const response = await makeApiRequest({ expenseId, action: "approve" });
      console.log(response);
      if (response.status === 200) {
        await getAllExpenses();
      }
    } catch {
      alert("Error");
    }
  };

  const handleDeny = async (expenseId: number) => {
    try {
      const response = await makeApiRequest({ expenseId, action: "deny" });
      console.log(response);
      if (response.status === 200) {
        await getAllExpenses();
      }
    } catch {
      alert("Error");
    }
  };

  if (showAddExpense) {
    return (
      <AddExpense
        setShowAddExpense={setShowAddExpense}
        getAllExpenses={getAllExpenses}
      />
    );
  }

  return (
    <Container className="d-flex flex-column mt-3">
      <section
        style={{
          display: "flex",
          paddingBottom: "20px",
          justifyContent: "space-between",
        }}
      >
        {isAdmin ? (
          <>
            <Button
              variant="outline-dark"
              onClick={() => navigate("/employees")}
            >
              See Employees
            </Button>
          </>
        ) : (
          <Button
            variant="outline-dark"
            onClick={() => setShowAddExpense(true)}
          >
            Add expense
          </Button>
        )}
        <h4>Welcome, {store.loggedInUser.username}</h4>
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
      </section>
      <section style={{ marginBottom: "100px" }}>
        <ExpenseTable
          showEmployeeColumn={isAdmin}
          expenseTableTitle={"Pending expenses"}
          expenses={expenses.filter((e) => e.status === "pending")}
          handleApprove={handleApprove}
          handleDeny={handleDeny}
        />
      </section>
      <section>
        <ExpenseTable
          showEmployeeColumn={isAdmin}
          expenseTableTitle={"Expenses history"}
          expenses={expenses.filter((e) => e.status !== "pending")}
          isHistory={true}
        />
      </section>
    </Container>
  );
};
