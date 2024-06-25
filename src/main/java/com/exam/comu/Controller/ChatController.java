package com.exam.comu.Controller;

import com.exam.comu.Entity.ChatMessage;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;

//이 컨트롤러는 클라이언트가 메시지를 보내거나 사용자가 추가되는 상황을 처리하고, 이를 모든 구독자에게 알림

// Spring의 컨트롤러임을 나타내는 어노테이션
@Controller
public class ChatController {
    //클라이언트가 "/chat.sendMessage"로 메시지를 보낼 때 이 메서드가 호출
    @MessageMapping("/chat.sendMessage")
    //메서드의 반환 값이 "/topic/public"으로 전송됩니다.
    //이는 해당 주제를 구독하는 모든 클라이언트에게 메시지가 전달됨을 의미
    @SendTo("/topic/public")
    //@Payload ChatMessage chatMessage: 메시지의 내용을 나타내는 ChatMessage 객체를 매개변수로 받음
    //이 메시지는 클라이언트에서 전송된 메시지를 나타냄
    public ChatMessage sendMessage(@Payload ChatMessage chatMessage) {
        return chatMessage;
    }

    //클라이언트가 "/chat.addUser"로 메시지를 보낼 때 이 메서드가 호출
    @MessageMapping("/chat.addUser")
    //메서드의 반환 값이 "/topic/public"으로 전송
    @SendTo("/topic/public")
    //SimpMessageHeaderAccessor headerAccessor: WebSocket 세션의 헤더 정보에 접근할 수 있는 객체
    //이를 사용하여 사용자명(username)을 WebSocket 세션의 속성에 추가
    public ChatMessage addUser(@Payload ChatMessage chatMessage, SimpMessageHeaderAccessor headerAccessor) {
        // Add username in web socket session
        headerAccessor.getSessionAttributes().put("username", chatMessage.getSender());
        return chatMessage;
    }
}
