package com.example.servingwebcontent;

import com.example.servingwebcontent.domain.User;
import com.example.servingwebcontent.repos.UserRepo;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Map;
import java.util.HashMap;


@RestController
@RequestMapping("/auth")
public class AuthentificationController {

    @Autowired
    private UserRepo userRepo;

    @PostMapping(value = "/register", consumes = "application/json", produces = "application/json")
    public Map<String, Object> register(@RequestBody String jsonString) throws IOException {
        JSONObject jsonObj = new JSONObject(jsonString);
        String login = jsonObj.getString("login");
        String password = jsonObj.getString("password");
        String email = jsonObj.getString("email");

        if (null != userRepo.findByLogin(login)) {
            return new HashMap<String, Object>() {{
                put("result", "There is user with the same login");
            }};
        }

        userRepo.save(new User(login, email, password));

        return new HashMap<String, Object>() {{
            put("result", "OK");
        }};
    }

    @PostMapping(value = "/login", consumes = "application/json", produces = "application/json")
    public Map<String, Object> login(@RequestBody String jsonString) throws IOException {
        JSONObject jsonObj = new JSONObject(jsonString);
        String login = jsonObj.getString("login");
        String password = jsonObj.getString("password");

        User user = userRepo.findByLoginAndPassword(login, password);

        if (null == user) {
            return new HashMap<String, Object>() {{
                put("result", "there is no user with this login and password");
            }};
        }

        return new HashMap<String, Object>() {{
            put("result", "OK");
            put("user", new HashMap<String, Object>() {{
                put("login", user.getLogin());
                put("id", user.getId());
            }});
        }};
    }

}
