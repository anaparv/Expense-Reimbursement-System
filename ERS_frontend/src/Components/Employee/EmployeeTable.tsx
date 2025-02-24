import { Button, Table } from "react-bootstrap";
import { Employee } from "../../Interfaces/Employee";
import { store } from "../../GlobalData/store";

type EmployeeTableProps = {
  employees: Employee[];

  deleteEmployee: (value: Employee) => void;
};

export const EmployeeTable: React.FC<EmployeeTableProps> = ({
  employees,

  deleteEmployee,
}) => {
  if (employees.length === 0) {
    return <h3>There are no employees</h3>;
  }
  return (
    <>
      <h3>Employees</h3>
      <Table className="table">
        <thead>
          <tr>
            <th>Employee Id</th>
            <th>Username</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees
            .filter((e) => e.userId !== store.loggedInUser.userId)
            .map((employee: Employee) => (
              <tr key={employee.userId}>
                <td>{employee.userId}</td>
                <td>{employee.username}</td>
                <td>{employee.role}</td>
                <td style={{ display: "flex", gap: "10px" }}>
                  <Button
                    variant="danger"
                    onClick={() => deleteEmployee(employee)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          {/* WHY parenthesis to open the arrow func? because it implicitly returns */}
        </tbody>
      </Table>
    </>
  );
};
