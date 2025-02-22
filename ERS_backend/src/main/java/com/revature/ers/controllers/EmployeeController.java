package com.revature.ers.controllers;
import com.revature.ers.models.DTOs.OutgoingEmployeeDTO;
import com.revature.ers.services.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController //Make this class a bean and turn HTTP response bodies into JSON
@RequestMapping("/employees")
public class EmployeeController {
    // Autowire the UserService to use its methods
    private final EmployeeService employeeService;

    @Autowired
    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    //Return all users to the client
    @GetMapping
    public ResponseEntity<List<OutgoingEmployeeDTO>> getAllEmployees(){

        //Let's return the Users in one line
        return ResponseEntity.ok(employeeService.getAllEmployees());

    }
}
