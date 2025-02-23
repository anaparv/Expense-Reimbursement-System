package com.revature.ers.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<String> handleIllegalArgumentException(IllegalArgumentException e){
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        //401 == UNAUTHORIZED - good for auth errors
        //we send the message in the exception in the response body (should change based on what went wrong)
    }

    //TODO: add more exception handlers, make some custom exceptions

    //TODO: add a handler for just "Exception" as a catch all
}
