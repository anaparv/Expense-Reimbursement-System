import { Button, Container, Table } from "react-bootstrap";
import { Employee } from "../../Interfaces/Employee";
import { useEffect, useState } from "react";
import axios from "axios";

export const EmployeeTable: React.FC = () => {
  //state object to store the User Array from the backend
  const [employees, setEmployees] = useState<Employee[]>([]);

  //useEffect - we'll call a GET request for all users when the component loads
  useEffect(() => {
    //TODO: make sure the user is a manager, redirect them to login if not

    getAllEmployees();
  }, []); //we want this to run once on load, so we use []

  //Function to get all users from the backend (HTTP request!)
  const getAllEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:8080/employees", {
        withCredentials: true,
      });
      //Again, we need withCredentials if the request requires specific session info (existence of a session, role stored in the session, etc)

      //TODO: error throwing code

      console.log(response.data); //print out the data just to see it

      //store the user data in our "users" state object
      setEmployees(response.data);
    } catch {
      alert("Something went wrong trying to fetch users");
    }
  };

  //function that does a fake update delete (wanna show how to extract data from a map)
  const updateEmployee = (employee: Employee) => {
    alert("Employee " + employee.userId + " has been fake updated or deleted");

    //TODO: Could definitely make another call to getAllUsers for automatic updates
    //TODO2: Cache the list of users and update THAT so we don't make a repeat DB call
  };

  return (
    <Container className="d-flex flex-column align-items-center mt-3">
      <h3>Employees: </h3>

      <Table className="table-dark table-hover table-striped">
        <thead>
          <tr>
            <th>Employee Id</th>
            <th>Username</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody className="table-secondary">
          {employees.map((employee: Employee) => (
            <tr key={employee.userId}>
              <td>{employee.userId}</td>
              <td>{employee.username}</td>
              <td>{employee.role}</td>
              <td>
                <Button
                  variant="outline-success"
                  onClick={() => updateEmployee(employee)}
                >
                  Promote
                </Button>
                <Button
                  variant="outline-danger"
                  onClick={() => updateEmployee(employee)}
                >
                  Fire
                </Button>
              </td>
            </tr>
          ))}
          {/* WHY parenthesis to open the arrow func? because it implicitly returns */}
        </tbody>
      </Table>
    </Container>
  );
};
