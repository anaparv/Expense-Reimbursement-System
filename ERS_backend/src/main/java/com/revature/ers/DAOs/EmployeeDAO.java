package com.revature.ers.DAOs;

import com.revature.ers.models.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EmployeeDAO extends JpaRepository<Employee, Integer> {
    //For login, we can check if an input username/password matches a record in the DB
    //If it returns null, the user doesn't exist and login fails
    //If it returns a User object, the user exists and login succeeds
    public Optional<Employee> findByUsernameAndPassword(String username, String password);
    public Optional<Employee> findByUsername(String username);

    public Optional<Employee> findByUserId(int userId);
}
