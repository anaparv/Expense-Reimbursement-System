import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { store } from "../../GlobalData/store";

export const Login: React.FC = () => {
  //we can use the useNavigate hook to navigate between components programatically
  //(no more manual URL changing)
  const navigate = useNavigate();

  //Using the useRef and useEffect hooks to focus our username input box on component load
  const usernameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    //if the current value of the ref is truthy...
    if (usernameRef.current) {
      usernameRef.current.focus(); //focus it so the user can type right away
    }
  }, []); //remember [] means this happens on component load

  //Defining a state object to store the user's login credentials
  const [loginCreds, setLoginCreds] = useState({
    username: "",
    password: "",
  }); //could have defined an interface for this, but we didn't

  //Function to store use inputs
  const storeValues = (event: React.ChangeEvent<HTMLInputElement>) => {
    //I'm going to store the name and value of the inputs for ease of use below
    const name = event.target.name; //name is an attribute we set on the input boxes
    const value = event.target.value; //value is the actual value in the input at the time

    //"Take whatever input was changed, and set the matching state field to the value of that input"
    //[name] can be EITHER username or password. This ugly code lends flexibility.
    //This syntax is less necessary if we just have 2 fields, but wayyyy more useful if there are like, 50
    setLoginCreds((loginCreds) => ({ ...loginCreds, [name]: value }));
  };

  //Function to make the actual login request
  //navigates to /users if a manager logged in, and /games if a user logged in
  const login = async () => {
    //TODO: make sure the username/password are present before proceeding

    try {
      // handle username & password are present
      if (
        loginCreds.username.length === 0 ||
        loginCreds.password.length === 0
      ) {
        alert("Username or password cannot be empty!");

        // return: exit function
        return;
      }

      const response = await axios.post(
        "http://localhost:8080/auth/login",
        loginCreds,
        { withCredentials: true }
      );
      //withCredentials lets us interact with sessions on the backend
      //every request that depends on the user being logged in, being an admin, etc, needs this

      //if the catch doesn't run, login was successful! save the data to our global store, then switch components
      // store.loggedInUser = response.data; //this is our logged in user data from the backend
      localStorage.setItem("user", JSON.stringify(response.data));
      store.loggedInUser = response.data;

      //greet the user with this newly stored data
      // alert(store.loggedInUser.username + " has logged in! Welcome.");

      //users will get sent to users component if they're an "admin", or the games component if they're a "user"
      if (store.loggedInUser.role === "admin") {
        navigate("/employees");
      } else {
        navigate("/expenses");
      }
    } catch {
      alert("Login unsuccessful");
    }
  };

  return (
    <Container style={{ width: "500px" }}>
      <h1 className="mb-5">Welcome</h1>
      <h3 style={{ marginBottom: "30px" }}>Please Log In:</h3>

      <div style={{ marginBottom: "20px" }}>
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          name="username"
          ref={usernameRef} //attach our usernameRef here!
          //This is how our useRef knows what to focus.
          onChange={storeValues}
        />
      </div>

      <div style={{ marginBottom: "30px" }}>
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" name="password" onChange={storeValues} />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
        }}
      >
        <Button onClick={login}>Login</Button>
        <Button variant="outline-primary" onClick={() => navigate("/register")}>
          Register
        </Button>
      </div>
    </Container>
  );
};
