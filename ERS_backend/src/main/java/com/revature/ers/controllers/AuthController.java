package com.revature.ers.controllers;
import com.revature.ers.models.DTOs.OutgoingEmployeeDTO;
import com.revature.ers.services.AuthService;
import com.revature.ers.models.Employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController //Combines @Controller and @ResponseBody (makes a class a bean, and lets us send JSON responses)
@RequestMapping("/auth") //Requests ending in /auth will go to this Controller
@CrossOrigin(value = "http://localhost:5173", allowCredentials = "true")
public class AuthController {

    private final AuthService authService;

    @Autowired
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register") //Requests ending in /auth/register will invoke this method
    public ResponseEntity<OutgoingEmployeeDTO> registerEmployee(@RequestBody Employee employee){

        OutgoingEmployeeDTO returnedEmployee = authService.registerEmployee(employee);

        //Send the inserted User back to the client in a response
        return ResponseEntity.ok(returnedEmployee);
        //.ok() sends a 200 OK status code and allows us to send a response body

    }
}
