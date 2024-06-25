import React, { useState, useEffect, useRef } from 'react';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

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
        <div className="container-fluid">
            <div className="row">
                <div className="col-12" style={{height: '40vh', overflowY: 'auto'}}>
                    <ul>
                        {messages.map((msg, idx) => <li key={idx}><strong>{msg.sender}</strong>: {msg.content}</li>)}
                        <div ref={messagesEndRef}></div>
                    </ul>
                </div>

                <div className="col-10 mt-3">
                    <input
                        type="text"
                        value={messageInput}
                        onChange={handleInputChange}
                        className="form-control"
                    />
                </div>

                <div className="col-2 mt-3">
                    <button onClick={sendMessage} className="btn btn-primary">
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatRoom;