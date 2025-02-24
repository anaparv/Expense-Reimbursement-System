package com.revature.ers.models;

import jakarta.persistence.*;
import org.springframework.stereotype.Component;

@Component //Make the class a bean
@Entity //This makes the class a DB entity
@Table(name = "expenses")
public class Expense {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int expenseId;
    private String status;
    @Column(nullable = false) //every expense must have a title
    private String description;
    private double amount;

    /* FK connection to the users table PK

     -cascade: defines how changes to User records will affect videogames records
        -cascade.ALL = any change to User will be reflected in dependent records

     -fetch: defines when the data gets loaded
        -FetchType.EAGER = dependencies are loaded when the app starts
        -FetchType.LAZY = dependencies are loaded on an as-needed basis

      -What's a dependency? In this case, videogames has a FK to User
        -User is a dependency of videogames
        -When we fetch a videogame, the DB fetches the appropriate user

     -JoinColumn: this is how we reference the PK of the users table*/
    @ManyToOne(cascade = {CascadeType.REMOVE}, fetch = FetchType.EAGER)
    @JoinColumn(name = "userId")
    private Employee employee;

    public Expense() {
    }

    public Expense(int expenseId, String status, String description, double amount, Employee employee) {
        this.expenseId = expenseId;
        this.status = status;
        this.description = description;
        this.amount = amount;
        this.employee = employee;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public int getExpenseId() {
        return expenseId;
    }

    public void setExpenseId(int expenseId) {
        this.expenseId = expenseId;
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

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    @Override
    public String toString() {
        return "Expense{" +
                "expenseId=" + expenseId +
                ", status='" + status + '\'' +
                ", description='" + description + '\'' +
                ", amount=" + amount +
                ", employee=" + employee +
                '}';
    }
}
