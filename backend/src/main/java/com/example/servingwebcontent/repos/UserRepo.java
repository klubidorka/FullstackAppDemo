package com.example.servingwebcontent.repos;

import com.example.servingwebcontent.domain.User;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface UserRepo extends CrudRepository<User, Long> {

    User findByLogin(String login);

    User findById(Integer id);

    User findByLoginAndPassword(String login, String password);

}
