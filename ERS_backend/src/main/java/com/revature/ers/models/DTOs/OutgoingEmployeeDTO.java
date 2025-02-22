package com.revature.ers.models.DTOs;

import com.revature.ers.models.Employee;

public class OutgoingEmployeeDTO {

    private int userId;
    private String username;
    private String role;

    public OutgoingEmployeeDTO() {
    }

    public OutgoingEmployeeDTO(int userId, String username, String role) {
        this.userId = userId;
        this.username = username;
        this.role = role;
    }

    //see this in use in get all users in UserService
    //way cleaner way to format a User into a DTO
    public OutgoingEmployeeDTO(Employee e) {
        this.userId = e.getUserId();
        this.username = e.getUsername();
        this.role = e.getRole();
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    @Override
    public String toString() {
        return "OutgoingEmployeeDTO{" +
                "userId=" + userId +
                ", username='" + username + '\'' +
                ", role='" + role + '\'' +
                '}';
    }
}
