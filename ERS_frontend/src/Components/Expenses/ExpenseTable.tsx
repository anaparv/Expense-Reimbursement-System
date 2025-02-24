import { Button } from "react-bootstrap";

export type Employee = {
  password: string;
  role: string;
  userId: number;
  username: string;
};

export type ExpenseModel = {
  expenseId: string;
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
};

type ShowAdminCellsProps = {
  isBody?: boolean;
  expense?: ExpenseModel;
  isHistory?: boolean;
};

const ShowAdminCells: React.FC<ShowAdminCellsProps> = ({
  isBody,
  expense,
  isHistory,
}) => {
  if (isBody && expense) {
    return (
      <>
        <td>{expense.employee.username}</td>
        {!isHistory ? (
          <td>
            <Button>Approve</Button>
            <Button>Deny</Button>
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
}) => {
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
                  <td>{expense.amount}</td>
                  <td>{expense.status}</td>
                  {showEmployeeColumn ? (
                    <ShowAdminCells
                      isBody={true}
                      expense={expense}
                      isHistory={isHistory}
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
