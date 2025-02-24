import { useRef, useEffect, useState } from "react";
import { Container, Button, Form } from "react-bootstrap";
import { store } from "../../GlobalData/store";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AddExpense: React.FC = () => {
  const navigate = useNavigate();

  const [getExpenseInfo, setExpenseInfo] = useState({
    description: "",
    amount: "",
  });

  function handleExpenseChange(event: {
    target: { name: string; value: string };
  }): void {
    console.log(event.target.name);
    const eventName = event.target.name;
    const eventValue = event.target.value;

    setExpenseInfo((oldValues) => ({ ...oldValues, [eventName]: eventValue }));
  }

  const save = async () => {
    if (
      getExpenseInfo.description.length === 0 ||
      getExpenseInfo.amount.length === 0
    ) {
      alert("Description or amount cannot be empty!");

      // return: exit function
      return;
    }

    try {
      console.log(store);

      //POST request with hardcoded user info
      const response = await axios.post("http://localhost:8080/expense/add", {
        ...getExpenseInfo,
        status: "pending",
        employeeId: store.loggedInUser.userId,
      });
      console.log(response);

      if (response.status === 202) {
        navigate(-1);
      } else {
        alert("Couldn't register expense");
      }
    } catch (error) {
      console.log(error);
      alert("Couldn't register expense");
    }
  };

  //Using the useRef and useEffect hooks to focus our username input box on component load
  const expenseRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    //if the current value of the ref is truthy...
    if (expenseRef.current) {
      expenseRef.current.focus(); //focus it so the user can type right away
    }
  }, []); //remember [] means this happens on component load

  return (
    <Container>
      <h1 className="mb-5">Add new expense</h1>

      <div>
        <Form.Control
          type="text"
          placeholder="expense description"
          name="description"
          ref={expenseRef} //attach our usernameRef here!
          //This is how our useRef knows what to focus.
          onChange={handleExpenseChange}
          value={getExpenseInfo.description}
        />
      </div>

      <div>
        <Form.Control
          type="number"
          placeholder="expense amount"
          name="amount"
          onChange={handleExpenseChange}
          value={getExpenseInfo.amount}
        />
      </div>

      <Button variant="outline-success m-1" onClick={save}>
        Add expense
      </Button>
    </Container>
  );
};
