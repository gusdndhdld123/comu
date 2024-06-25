import React, { useState } from 'react';
import { Button, Form, Container } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [boardTitle, setBoardTitle] = useState('');
    const [boardWriter, setBoardWriter] = useState('');
    const [boardContent, setBoardContent] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const response = await axios.post('/boards', { boardTitle, boardWriter, boardContent });
            if (response.status === 201) {
                alert('등록되었습니다.');
                setBoardTitle('');
                setBoardWriter('');
                setBoardContent('');
                navigate('/');  // 홈 페이지로 이동한다.
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" value={boardTitle} onChange={e => setBoardTitle(e.target.value)} required />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Content</Form.Label>
                    <Form.Control type="text" value={boardContent} onChange={e => setBoardContent(e.target.value)} required />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Writer</Form.Label>
                    <Form.Control type="text" value={boardWriter} onChange={e => setBoardWriter(e.target.value)} required />
                </Form.Group>
                <Button variant="primary" type="submit">Register</Button>
            </Form>
        </Container>
    )
}

export default Register;