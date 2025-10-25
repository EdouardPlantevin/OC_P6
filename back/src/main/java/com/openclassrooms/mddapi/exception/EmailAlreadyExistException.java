package com.openclassrooms.mddapi.exception;

public class EmailAlreadyExistException extends RuntimeException {
    public EmailAlreadyExistException(String email) {
        super(email + " already exist");
    }
}
