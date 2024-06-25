package com.exam.comu.Config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

//이를 통해 WebSocket을 구성하고, 클라이언트와 서버 간의 메시징을 처리할 수 있게 됨

// Spring의 설정 클래스임을 나타내는 어노테이션
@Configuration
//WebSocket 메시징을 활성화하는 어노테이션, 이를 통해 메시지 브로커를 사용할 수 있게 됨
@EnableWebSocketMessageBroker
//WebSocketMessageBrokerConfigurer 인터페이스를 구현
//이 인터페이스는 WebSocket 관련 구성을 제공하는 메서드를 정의
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        //"/ws" 엔드포인트를 등록하고 SockJS를 사용하여 클라이언트의 WebSocket 연결을 활성화
        //SockJS는 WebSocket이 지원되지 않는 브라우저에서도 WebSocket을 사용할 수 있도록 지원
        registry.addEndpoint("/ws").withSockJS();
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        //클라이언트에서 메시지를 전송할 때 사용할 프리픽스를 설정
        //이 설정은 클라이언트에서 서버로 메시지를 전송할 때 해당 프리픽스가 붙게 됨
        registry.setApplicationDestinationPrefixes("/app");
        //메시지 브로커를 활성화하고, 클라이언트에게 메시지를 보낼 때 사용할 주제(prefix)를 설정
        //클라이언트는 "/topic" 주제를 구독하고 있는 경우에만 해당 주제로 메시지를 수신할 수 있음
        registry.enableSimpleBroker("/topic");
    }
}
