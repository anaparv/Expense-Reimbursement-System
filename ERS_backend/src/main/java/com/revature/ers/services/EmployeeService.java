package com.revature.ers.services;

import com.revature.ers.DAOs.EmployeeDAO;
import com.revature.ers.models.Employee;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;


public class EmployeeService {

    //Autowire the DAO so we can use its method
    private final EmployeeDAO employeeDAO;

    @Autowired
    public EmployeeService(EmployeeDAO employeeDAO) {
        this.employeeDAO = employeeDAO;
    }


    //Get all users from the DB
    public List<Employee> getAllEmployees(){

        //For get all, we don't have to do much user input validation
        //There's no user input! We just want to get all the data
        return employeeDAO.findAll();

    }
}
