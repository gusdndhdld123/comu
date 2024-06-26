import React, { useState, useEffect, useRef } from 'react';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import {Container, Row} from "react-bootstrap";

const ChatRoom = () => {
    const [stompClient, setStompClient] = useState(null);
    const [messageInput, setMessageInput] = useState('');
    const [messages, setMessages] = useState([]);

    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(scrollToBottom, [messages]);

    useEffect(() => {
        const socket = new SockJS('http://localhost:8080/ws');

        const client = Stomp.over(socket);

        client.connect({}, frame => {
            setStompClient(client);
            client.subscribe('/topic/public', message => {
                const receivedMessage = JSON.parse(message.body);
                setMessages(prevMessages => [...prevMessages, receivedMessage]);
            });
        });

        return () => {
            if (client.connected) {
                client.disconnect();
            }
        }
    }, []);

    const sendMessage = () => {
        if (stompClient) {
            const chatMessage = {
                sender: "익명",
                content: messageInput,
                type: 'CHAT'
            };

            stompClient.send("/app/chat.sendMessage", {}, JSON.stringify(chatMessage));
            setMessageInput('');
        }
    };

    const handleInputChange = (event) => {
        setMessageInput(event.target.value);
    }

    return (
        <Container>
            <Row>
                <div style={{width: '100%', height: '600px', backgroundColor: 'lightgrey'}}>
                    <ul>
                        {messages.map((msg, idx) => <li key={idx}><strong>{msg.sender}</strong>: {msg.content}</li>)}
                        <div ref={messagesEndRef}></div>
                    </ul>
                </div>
                <div className="flex-row">
                    <input
                        type="text"
                        value={messageInput}
                        onChange={handleInputChange}
                        className="form-control col-10"
                    />
                    <button onClick={sendMessage} className="btn btn-primary col-2">
                        Send
                    </button>
                </div>
            </Row>

        </Container>
    );
};

export default ChatRoom;