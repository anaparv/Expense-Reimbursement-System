import { Button } from "react-bootstrap";

export type Employee = {
  password: string;
  role: string;
  userId: number;
  username: string;
};

export type ExpenseModel = {
  expenseId: number;
  amount: number;
  description: string;
  status: string;
  employee: Employee;
  user_id: number;
};

type ExpenseTableProps = {
  expenseTableTitle: string;
  showEmployeeColumn: boolean;
  expenses: ExpenseModel[];
  isHistory?: boolean;
  handleApprove?: (expenseId: number) => void;
  handleDeny?: (expenseId: number) => void;
};

type ShowAdminCellsProps = {
  isBody?: boolean;
  expense?: ExpenseModel;
  isHistory?: boolean;
  handleApprove?: (expenseId: number) => void;
  handleDeny?: (expenseId: number) => void;
};

const ShowAdminCells: React.FC<ShowAdminCellsProps> = ({
  isBody,
  expense,
  isHistory,
  handleApprove,
  handleDeny,
}) => {
  if (isBody && expense) {
    return (
      <>
        <td>{expense.employee.username}</td>
        {!isHistory ? (
          <td style={{ display: "flex", gap: "10px" }}>
            <Button
              variant="outline-primary"
              onClick={() => {
                if (handleApprove) handleApprove(expense.expenseId);
              }}
            >
              Approve
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                if (handleDeny) handleDeny(expense.expenseId);
              }}
            >
              Deny
            </Button>
          </td>
        ) : (
          <></>
        )}
      </>
    );
  }

  return (
    <>
      <th scope="col">Employee</th>
      {!isHistory ? <th scope="col">Actions</th> : <></>}
    </>
  );
};

export const ExpenseTable: React.FC<ExpenseTableProps> = ({
  expenseTableTitle,
  showEmployeeColumn,
  expenses,
  isHistory,
  handleApprove,
  handleDeny,
}) => {
  if (expenses.length === 0) {
    return <h3>There are no {expenseTableTitle.toLowerCase()}</h3>;
  }
  return (
    <>
      <h3>{expenseTableTitle}</h3>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Description</th>
            <th scope="col">Amount</th>
            <th scope="col">Status</th>
            {showEmployeeColumn ? (
              <ShowAdminCells isHistory={isHistory} />
            ) : (
              <></>
            )}
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => {
            return (
              <>
                <tr>
                  <td>{expense.expenseId}</td>
                  <td>{expense.description}</td>
                  <td>$ {expense.amount}</td>
                  <td>{expense.status}</td>
                  {showEmployeeColumn ? (
                    <ShowAdminCells
                      isBody={true}
                      expense={expense}
                      isHistory={isHistory}
                      handleApprove={handleApprove}
                      handleDeny={handleDeny}
                    />
                  ) : (
                    <></>
                  )}
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
