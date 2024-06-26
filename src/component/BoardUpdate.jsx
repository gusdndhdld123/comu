import React, { useEffect, useState } from 'react';
import {Table, Button, Container, Form} from 'react-bootstrap';
import {Link, useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';

const BoardUpdate = () => {
    let { id } = useParams();
    const [boardTitle, setBoardTitle] = useState('');
    const [boardWriter, setBoardWriter] = useState('');
    const [boardContent, setBoardContent] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBoard = async () => {
            try {
                const response = await axios.get(`/boards/${id}`);
                setBoardTitle(response.data.boardTitle);
                setBoardWriter(response.data.boardWriter);
                setBoardContent(response.data.boardContent);
            } catch (error) {
                console.error(error);
            }
        };
        fetchBoard();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`/boards/${id}`, {
                boardTitle: boardTitle,
                boardWriter: boardWriter,
                boardContent: boardContent
            });
            if (response.status === 200) {
                alert('수정되었습니다.');
                navigate('/');  // 홈 페이지로 이동한다.
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Container style={{paddingTop : '50px;'}}>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" value={boardTitle} onChange={e => setBoardTitle(e.target.value)} required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Content</Form.Label>
                    <Form.Control as="textarea" rows={3} value={boardContent} onChange={e => setBoardContent(e.target.value)} required />
                </Form.Group>
                <Form.Group className="mb-3" style={{display : "none"}}>
                    <Form.Label>Writer</Form.Label>
                    <Form.Control type="text" value={boardWriter} onChange={e => setBoardWriter(e.target.value)} readOnly />
                </Form.Group>
                <Button variant="primary" type="submit">완료</Button>
            </Form>
        </Container>
    )
}
export default BoardUpdate;