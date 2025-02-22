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

}
