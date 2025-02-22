import { Container, Table } from "react-bootstrap";

export const EmployeeTable: React.FC = () => {
  return (
    <Container>
      <h3>Employees: </h3>

      <Table className="table-dark table-hover table-striped">
        <thead>
          <tr>
            <th>Employee Id</th>
            <th>Username</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody></tbody>
      </Table>
    </Container>
  );
};
