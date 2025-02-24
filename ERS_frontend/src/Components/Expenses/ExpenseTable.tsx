export type ExpenseModel = {
  expense_id: string;
  amount: number;
  description: string;
  status: string;
  user_id: number;
};

type ExpenseTableProps = {
  expenseTableTitle: string;
  showEmployeeColumn: boolean;
  expenses: ExpenseModel[];
};
export const ExpenseTable: React.FC<ExpenseTableProps> = ({
  expenseTableTitle,
  showEmployeeColumn,
  expenses,
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
            {showEmployeeColumn ? <th scope="col">Employee</th> : <></>}
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => {
            return (
              <>
                <tr>
                  <td>{expense.expense_id}</td>
                  <td>{expense.description}</td>
                  <td>{expense.amount}</td>
                  <td>{expense.status}</td>
                  {showEmployeeColumn ? <td>{expense.user_id}</td> : <></>}
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
