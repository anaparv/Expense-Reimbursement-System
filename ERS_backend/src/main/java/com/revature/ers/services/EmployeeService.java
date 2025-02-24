package com.revature.ers.services;

import com.revature.ers.DAOs.EmployeeDAO;
import com.revature.ers.models.DTOs.OutgoingEmployeeDTO;
import com.revature.ers.models.Employee;
import com.revature.ers.models.Expense;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService {

    //Autowire the DAO so we can use its method
    private final EmployeeDAO employeeDAO;

    @Autowired
    public EmployeeService(EmployeeDAO employeeDAO) {
        this.employeeDAO = employeeDAO;
    }


    //Get all users from the DB
    public List<OutgoingEmployeeDTO> getAllEmployees(){

        List<Employee> returnedEmployees = employeeDAO.findAll();

        //convert the employees into a List of EmployeeDTOs
        //we're gonna use our special "User args" constructor from the DTO
        List<OutgoingEmployeeDTO> employeeDTOs = new ArrayList<>();

        //loop through the users, convert them, and add to DTO list
        for(Employee e : returnedEmployees){
            employeeDTOs.add(new OutgoingEmployeeDTO(e));
        }

        return employeeDTOs;

    }

    public boolean deleteEmployee(int employeeId){
        Optional<Employee> optionalEmployee = employeeDAO.findById(employeeId);

        if (optionalEmployee.isPresent()) {
            employeeDAO.deleteById(employeeId);

            // Verify if the employee was successfully deleted
            return !employeeDAO.existsById(employeeId);
        } else {
            throw new EntityNotFoundException("Employee not found with ID: " + employeeId);
        }
    }

}
