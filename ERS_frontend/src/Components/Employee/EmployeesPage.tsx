import { Button, Container } from "react-bootstrap";
import { EmployeeTable } from "./EmployeeTable";
import { Employee } from "../../Interfaces/Employee";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { store } from "../../GlobalData/store";

export const EmployeesPage: React.FC = () => {
  const navigate = useNavigate();
  const isAdmin = store?.loggedInUser?.role === "admin" || false;

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

  const deleteEmployee = async (employee: Employee) => {
    // alert("Employee " + employee.userId + " has been fake updated or deleted");
    try {
      const response = await axios.delete(
        `http://localhost:8080/employees/delete/${employee.userId}`
      );
      console.log(response);
      if (response.status === 200) {
        getAllEmployees();
      }
    } catch (error) {
      console.log(error);
    }

    //TODO: Could definitely make another call to getAllUsers for automatic updates
    //TODO2: Cache the list of users and update THAT so we don't make a repeat DB call
  };
  console.log(isAdmin);
  if (!isAdmin) {
    <Container className="d-flex flex-column mt-3">
      <section
        style={{
          display: "flex",
          paddingBottom: "20px",
          justifyContent: "space-between",
        }}
      >
        Not Authorized
      </section>
    </Container>;
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
        {isAdmin && (
          <>
            <Button
              variant="outline-dark"
              onClick={() => navigate("/expenses")}
            >
              See expenses
            </Button>
          </>
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

      <EmployeeTable employees={employees} deleteEmployee={deleteEmployee} />
    </Container>
  );
};
