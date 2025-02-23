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
    @Column(nullable = false) //every game must have a title
    private String title;
    private String description;

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
    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "userId")
    private Employee employee;

    public Expense() {
    }

    public Expense(int expenseId, String title, String description, Employee employee) {
        this.expenseId = expenseId;
        this.title = title;
        this.description = description;
        this.employee = employee;
    }

    public int getExpenseId() {
        return expenseId;
    }

    public void setExpenseId(int expenseId) {
        this.expenseId = expenseId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
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
        return "Expenses{" +
                "expenseId=" + expenseId +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", employee=" + employee +
                '}';
    }
}
