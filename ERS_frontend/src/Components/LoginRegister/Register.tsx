import axios, { AxiosError } from "axios";
import { useState, useRef, useEffect } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { store } from "../../GlobalData/store";
import { useNavigate } from "react-router-dom";

export const Register: React.FC = () => {
  const navigate = useNavigate();
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
  });

  const register = async () => {
    // handle username & password are present
    if (loginCreds.username.length === 0 || loginCreds.password.length === 0) {
      alert("Username or password cannot be empty!");

      // return: exit function
      return;
    }

    try {
      //POST request with hardcoded user info
      const response = await axios.post("http://localhost:8080/auth/register", {
        username: loginCreds.username,
        password: loginCreds.password,
      });

      console.log(response);

      //withCredentials lets us interact with sessions on the backend
      //every request that depends on the user being logged in, being an admin, etc, needs this

      //if the catch doesn't run, login was successful! save the data to our global store, then switch components
      store.loggedInUser = response.data; //this is our logged in user data from the backend
      localStorage.setItem("user", JSON.stringify(response.data));

      //greet the user with this newly stored data
      alert(store.loggedInUser.username + " has registered! Welcome.");

      //users will get sent to users component if they're an "admin", or the games component if they're a "user"
      navigate("/expenses");
    } catch (error) {
      const err = error as unknown as AxiosError;
      console.log(error);
      if (err.status === 409) {
        alert("User already exists!");
        return;
      }
      alert("Register unsuccessful");
    }
  };

  // function which handles user input
  const handleChange = (event: { target: { name: string; value: string } }) => {
    console.log(event.target.name);
    const eventName = event.target.name;
    const eventValue = event.target.value;

    setLoginCreds((oldValues) => ({ ...oldValues, [eventName]: eventValue }));
  };

  return (
    <Container style={{ width: "500px" }}>
      <div>
        <h1 className="mb-5">Welcome</h1>

        <h3 style={{ marginBottom: "30px" }}>
          New here? Create an Account for free!
        </h3>

        <div style={{ marginBottom: "20px" }}>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            ref={usernameRef}
            value={loginCreds.username}
            onChange={handleChange}
          />
        </div>
        <div style={{ marginBottom: "30px" }}>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={loginCreds.password}
            onChange={handleChange}
          />
        </div>

        <div>
          <Button onClick={register}>Create Account!</Button>
        </div>
      </div>
    </Container>
  );
};
