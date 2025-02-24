package com.revature.ers.controllers;

import com.revature.ers.models.DTOs.IncomingExpenseDTO;
import com.revature.ers.models.Expense;
import com.revature.ers.services.ExpenseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/expense")
@CrossOrigin //allows HTTP requests from anywhere
public class ExpenseController {
    //autowire the service
    private final ExpenseService expenseService;

    @Autowired
    public ExpenseController(ExpenseService expenseService) {
        this.expenseService = expenseService;
    }

    //A method that inserts a new game into the DB
    @PostMapping("/add")
    public ResponseEntity<Expense> insertExpense(@RequestBody IncomingExpenseDTO incomingExpenseDTO){

        //send the DTO to the service and return the VideoGame object that comes back
        return ResponseEntity.accepted().body(expenseService.insertExpense(incomingExpenseDTO));

    }

    @GetMapping("/{employeeId}/history")
    public ResponseEntity<List<Expense>> getEmployeeExpenseHistory(@PathVariable int employeeId){

        List<Expense> employeeExpenseList = expenseService.getAllExpensesForEmployee(employeeId);
        return ResponseEntity.ok(employeeExpenseList);
    }

    @PutMapping("/{expenseId}/approve")
    public ResponseEntity<Expense> approveEmployeeExpense(@PathVariable int expenseId){
        Expense response = expenseService.approveExpense(expenseId);
        return ResponseEntity.ok(response);
    }


    @PutMapping("/{expenseId}/deny")
    public ResponseEntity<Expense> denyEmployeeExpense(@PathVariable int expenseId){
        Expense response = expenseService.denyExpense(expenseId);
        return ResponseEntity.ok(response);
    }
}
