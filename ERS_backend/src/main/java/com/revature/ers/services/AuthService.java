package com.revature.ers.services;

import com.revature.ers.DAOs.EmployeeDAO;
import com.revature.ers.models.Employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    private final EmployeeDAO employeeDAO;

    // this is how you inject the instance of the DAO (given by @Autowired) inside the constructor
    @Autowired
    public AuthService(EmployeeDAO employeeDAO) {
        this.employeeDAO = employeeDAO;
    }

    public Employee registerEmployee(Employee employee){

        //TODO: input validation - Tuesday

        //We use the save() method to insert data into the DB
        //save() is one of the methods we inherited from JpaRepository
        return employeeDAO.save(employee); //save() returns the inserted data. Convenient!

    }

}
