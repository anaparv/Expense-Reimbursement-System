package com.revature.ers.models.DTOs;

//Here's another DTO - but we aren't leaving out a password or anything
//This time we want to make a cleaner request body when inserting a new game
//We don't want to have to insert an entire user object to insert a game
//What is the game has like 10 objects it depends on? that's gonna be ugly JSON
//SOLUTION: just pass in the User's ID instead of the whole object
//Side note: we'll also leave out gameId since the DB handles that
public class IncomingExpenseDTO {
    private String title;
    private String description;
    private int userId;

    public IncomingExpenseDTO() {
    }

    public IncomingExpenseDTO(String title, String description, int userId) {
        this.title = title;
        this.description = description;
        this.userId = userId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    @Override
    public String toString() {
        return "IncomingExpenseDTO{" +
                "title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", userId=" + userId +
                '}';
    }
}
