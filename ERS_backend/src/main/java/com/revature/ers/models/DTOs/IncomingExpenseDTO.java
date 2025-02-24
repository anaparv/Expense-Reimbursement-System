package com.revature.ers.models.DTOs;

//Here's another DTO - but we aren't leaving out a password or anything
//This time we want to make a cleaner request body when inserting a new game
//We don't want to have to insert an entire user object to insert a game
//What is the game has like 10 objects it depends on? that's gonna be ugly JSON
//SOLUTION: just pass in the User's ID instead of the whole object
//Side note: we'll also leave out gameId since the DB handles that
public class IncomingExpenseDTO {
    private String status;
    private String description;
    private double amount;

    private int employeeId;

    public IncomingExpenseDTO() {
    }

    public IncomingExpenseDTO(String status, String description, double amount, int employeeId) {
        this.status = status;
        this.description = description;
        this.amount = amount;
        this.employeeId = employeeId;
    }

    public int getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(int employeeId) {
        this.employeeId = employeeId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }
    @Override
    public String toString() {
        return "IncomingExpenseDTO{" +
                "status='" + status + '\'' +
                ", description='" + description + '\'' +
                ", amount=" + amount +
                ", employeeId=" + employeeId +
                '}';
    }
}
