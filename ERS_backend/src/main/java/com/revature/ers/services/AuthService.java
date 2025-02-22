package com.revature.ers.services;

import com.revature.ers.DAOs.EmployeeDAO;
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

        Employee returnedEmployee = employeeDAO.save(employee); //save() returns the inserted data. Convenient!

        //We need to convert the User to a UserDTO before we send it to the client
        OutgoingEmployeeDTO outEmployeeDTO = new OutgoingEmployeeDTO(
                returnedEmployee.getUserId(),
                returnedEmployee.getUsername(),
                returnedEmployee.getRole()
        );

        return outEmployeeDTO;

    }

}
