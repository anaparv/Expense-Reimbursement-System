package com.revature.ers.services;

import com.revature.ers.DAOs.EmployeeDAO;
import com.revature.ers.models.DTOs.LoginDTO;
import com.revature.ers.models.DTOs.OutgoingEmployeeDTO;
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

    public OutgoingEmployeeDTO registerEmployee(Employee employee){

        // 1. save employee data in db
        // 2. save() returns the inserted data in a Employee (model object)
        Employee returnedEmployee = employeeDAO.save(employee);

        // We need to convert the Employee to a EmployeeDTO before we send it to the client
        // by creating OutgoingEmployeeDTO object and populate it's fields with the returned fields from returnedEmployee^
        OutgoingEmployeeDTO outEmployeeDTO = new OutgoingEmployeeDTO(
                returnedEmployee.getUserId(),
                returnedEmployee.getUsername(),
                returnedEmployee.getRole()
        );

        return outEmployeeDTO;

    }

    //Login - takes a LoginDTO and uses those fields to try to get a User from the DAO
    public OutgoingEmployeeDTO login(LoginDTO loginDTO){

        //input validation (actually doing it this time!)

        //check if the username is null, or if it is only an empty string or space-only string
        if(loginDTO.getUsername() == null || loginDTO.getUsername().isBlank()){
            throw new IllegalArgumentException("Username cannot be empty!");
        }

        //same for password
        if(loginDTO.getPassword() == null || loginDTO.getPassword().isBlank()){
            throw new IllegalArgumentException("Password cannot be empty!");
        }

        //TODO: could do more checks, but this is the gist

        //Try to get a User from the DAO
        Employee returnedEmployee = employeeDAO.findByUsernameAndPassword(
                loginDTO.getUsername(),
                loginDTO.getPassword()).orElse(null);

        //orElse(null) is a convenient way to extract data (or a null value) from an Optional
        //we could also use orElseThrow() to throw an Exception outright, but I'll spell it out a bit

        //If no User is found (if returnedUser is null) throw an Exception
        if(returnedEmployee == null){
            throw new IllegalArgumentException("Invalid username or password!");
        }

        //If we get here, login was successful so return a User to the controller
        return new OutgoingEmployeeDTO(returnedEmployee); //using our convenient constructor that takes in a User
    }

}
