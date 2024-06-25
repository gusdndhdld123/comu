package com.exam.comu.Config;


import com.exam.comu.Entity.ChatMessage;
import com.exam.comu.Enum.MessageType;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

//이를 통해 WebSocket 연결 해제 이벤트를 처리하고,
//해당 이벤트에 따라 클라이언트에게 메시지를 전송하여 사용자가 채팅방을 나갔음을 알림

//Spring 컴포넌트로 이 클래스가 등록되어야 함을 나타내는 어노테이션
@Component
//Lombok의 @Slf4j 어노테이션을 사용하여 로깅을 위한 Logger를 자동으로 생성
@Slf4j
//Lombok의 기능으로, final 필드가 있는 생성자를 생성
//이 경우에는 messagingTemplate 필드를 생성자의 매개변수로 받음
@RequiredArgsConstructor
public class WebSocketEventListener {

    private final SimpMessageSendingOperations messagingTemplate;

    //Spring의 이벤트 리스너로, WebSocket 연결이 끊길 때 발생하는 SessionDisconnectEvent를 처리하는 메서드
    @EventListener
    //SessionDisconnectEvent event: WebSocket 연결이 끊길 때 발생하는 이벤트
    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
        //연결 해제 이벤트에서 헤더 정보에 접근하기 위해 StompHeaderAccessor를 사용
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
        //연결 해제된 세션에서 사용자명(username)을 가져옴
        String username = (String) headerAccessor.getSessionAttributes().get("username");
        //사용자명이 null이 아닌 경우에만 실행
        if (username != null) {
            //사용자가 연결을 해제했음을 로그로 남김
            log.info("user disconnected: {}", username);
            //사용자가 채팅에서 나갔음을 나타내는 ChatMessage 객체를 생성
            var chatMessage = ChatMessage.builder()
                    .type(MessageType.LEAVE)
                    .sender(username)
                    .build();
            //생성된 ChatMessage 객체를 "/topic/public" 주제로 보냄
            //이는 채팅방에 사용자가 나갔음을 알리는 역할을 함
            messagingTemplate.convertAndSend("/topic/public", chatMessage);
        }
    }
}