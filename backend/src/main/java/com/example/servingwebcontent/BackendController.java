package com.example.servingwebcontent;

import com.example.servingwebcontent.domain.User;
import com.example.servingwebcontent.repos.UserRepo;
import com.example.servingwebcontent.domain.Message;
import com.example.servingwebcontent.repos.MessageRepo;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.*;

@RestController
@RequestMapping("/api")
public class BackendController {

    @Autowired
    private MessageRepo messageRepo;
    @Autowired
    private UserRepo userRepo;

    @PostMapping(value = "/send", consumes = "application/json", produces = "application/json")
    public Map<String, Object> send(@RequestBody String jsonString) throws IOException {
        JSONObject jsonObj = new JSONObject(jsonString);
        Integer from_id = jsonObj.getInt("from_id");
        String text = jsonObj.getString("text");
        User to_user = userRepo.findByLogin(jsonObj.getString("to_login"));
        if (null == to_user) {
            return new HashMap<String, Object>() {{
                put("result", "incorrect destination user");
            }};
        }
        Integer to_id = to_user.getId();
        Map<String, Object> ret = new HashMap<String, Object>() {{
            put("result", "OK");
        }};
        try {
            Message message = new Message(text, from_id, to_id);
            messageRepo.save(message);
        } catch (Exception e) {
            ret.put("result", "bad");
        }
        return ret;
    }

    @PostMapping(value = "/listmsg", consumes = "application/json", produces = "application/json")
    public Map<String, Object> listmsg(@RequestBody String jsonString) throws IOException {
        JSONObject jsonObj = new JSONObject(jsonString);
        Integer id = jsonObj.getInt("id");
        List<Map<String, Object>> sentedMessages = new ArrayList<Map<String, Object>>();
        List<Map<String, Object>> receivedMessages = new ArrayList<Map<String, Object>>();
        for(Message msg : messageRepo.findByFromId(id)) {
            sentedMessages.add(
                    new HashMap<String, Object>() {{
                        put("text", msg.getText());
                        put("toLogin", userRepo.findById(msg.getToId()).getLogin());
                    }}
            );
        }
        for(Message msg : messageRepo.findByToId(id)) {
            receivedMessages.add(
                    new HashMap<String, Object>() {{
                        put("text", msg.getText());
                        put("toLogin", userRepo.findById(msg.getFromId()).getLogin());
                    }}
            );
        }
        return new HashMap<String, Object>() {{
            put("sented", sentedMessages);
            put("received", receivedMessages);
        }};
    }

}