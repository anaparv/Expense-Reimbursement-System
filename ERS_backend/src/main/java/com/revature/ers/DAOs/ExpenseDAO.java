package com.revature.ers.DAOs;

import com.revature.ers.models.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExpenseDAO extends JpaRepository<Expense, Integer> {
    //Find a list of expenses by their User's id
    public List<Expense> findByEmployee_UserId(int userId);

    //Why User_UserId?
    //We're digging into the Employee object in the Expense object
    //...in order to access the primary key field of Employee (userId)
}
