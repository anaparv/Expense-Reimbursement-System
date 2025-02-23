package com.revature.ers.services;

import com.revature.ers.DAOs.EmployeeDAO;
import com.revature.ers.DAOs.ExpenseDAO;
import com.revature.ers.models.DTOs.IncomingExpenseDTO;
import com.revature.ers.models.Employee;
import com.revature.ers.models.Expense;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ExpenseService {
    //Autowire the UserDAO and VideoGameDAO
    private final EmployeeDAO employeeDAO;
    private final ExpenseDAO expenseDAO;

    @Autowired
    public ExpenseService(EmployeeDAO employeeDAO, ExpenseDAO expenseDAO) {
        this.employeeDAO = employeeDAO;
        this.expenseDAO = expenseDAO;
    }


    //Insert a new game into DB (get user by ID and make a game object with it)
    public Expense insertExpense(IncomingExpenseDTO incomingExpenseDTO){

        //TODO: input validation

        //Skeleton VideoGame object first
        //0 for id since the DB will handle that
        //null for the User since we need to get it first
        Expense newExpense = new Expense(
                0,
                incomingExpenseDTO.getTitle(),
                incomingExpenseDTO.getDescription(),
                null
        );

        //We need to use the userId from the DTO to get a User from the DB
        //findById() returns an Optional
        Optional<Employee> incomingExpenseUserId = employeeDAO.findById(incomingExpenseDTO.getUserId());

        //if the user doesn't exist it will be empty. Let's check for that
        if(incomingExpenseUserId.isEmpty()){
            //TODO: throw an exception
        } else {
            //If the user exists, we can set it in the game object
            newExpense.setEmployee(incomingExpenseUserId.get());
            //get() is how we extract data from an optional
        }

        //save the new game to the DB, and return it to the controller
        return expenseDAO.save(newExpense);

    }
}
