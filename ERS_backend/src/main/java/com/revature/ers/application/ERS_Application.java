package com.revature.ers.application;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EntityScan("com.revature.ers.models") //Tells spring to scan this package for DB entities
@ComponentScan("com.revature.ers") //Tells spring to scan this package for beans
@EnableJpaRepositories("com.revature.ers.DAOs") //Enables JPA repositories in our DAOs package
public class ERS_Application {

	public static void main(String[] args) {
		SpringApplication.run(ERS_Application.class, args);
		System.out.println("Ana says I'm running!");
	}

}
