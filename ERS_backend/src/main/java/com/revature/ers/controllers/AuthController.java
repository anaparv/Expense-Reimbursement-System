package com.revature.ers.controllers;
import com.revature.ers.models.DTOs.LoginDTO;
import com.revature.ers.models.DTOs.OutgoingEmployeeDTO;
import com.revature.ers.services.AuthService;
import com.revature.ers.models.Employee;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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

        boolean exists = authService.checkIfEmployeeExists(employee.getUsername());
        System.out.println(exists);

        if(exists){
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }

        OutgoingEmployeeDTO returnedEmployee = authService.registerEmployee(employee);

        //Send the inserted User back to the client in a response
        return ResponseEntity.ok(returnedEmployee);
        //.ok() sends a 200 OK status code and allows us to send a response body

    }

    //Login (POST request)
    @PostMapping("/login")
    public ResponseEntity<OutgoingEmployeeDTO> login(@RequestBody LoginDTO loginDTO, HttpSession session){

        //NOTE: we have an HttpSession coming in through parameters, implicitly included in every HTTP request
        //Login is where we set it up

        //try to login (send the loginDTO to the service)
        OutgoingEmployeeDTO loggedInUser = authService.login(loginDTO);
        //If anything goes wrong, the service throws an exception and our global Exception handler takes over

        //If we get here, the login was successful - we can build up the User's session!
        session.setAttribute("userId", loggedInUser.getUserId());
        session.setAttribute("username", loggedInUser.getUsername());
        session.setAttribute("role", loggedInUser.getRole());

        //it's really easy to access these values with getAttribute()!
        System.out.println("Employee " + session.getAttribute("username") + " has logged in!");

        /* WHY store all this info in a Session?

          -It lets us store user info that can be used for checks throughout the app
            -check that the user is logged in (session != null)
            -check that a user's role is appropriate (role.equals("admin"))
            -personalize the app (use the user's name in HTTP responses to use them in the UI etc)
            -simplify and secure our URLs!
                -ex: use the stored userId in "findXByUserId" methods instead of sending it in the PATH
                -This cleans up our URLs and secures them a bit more too.
           */

        //Return the User info to the client
        return ResponseEntity.ok(loggedInUser);

    }
}
