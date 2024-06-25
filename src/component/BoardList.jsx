import React, { useEffect, useState } from 'react';
import { Table, Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

const BoardList = () => {
    const [boards, setBoards] = useState([]);

    useEffect(() => {
        fetchBoards();
    }, []);

    const fetchBoards = async () => {
        try {
            const response = await axios.get(`/boards`);
            setBoards(response.data);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <Container>
            <h2>게시글 목록</h2>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Content</th>
                    <th>Writer</th>
                </tr>
                </thead>
                <tbody>
                {boards.map(board => (
                    <tr key={board.boardIdx}>
                        <td>{board.boardIdx}</td>
                        <td>{board.boardTitle}</td>
                        <td>{board.boardContent}</td>
                        <td>{board.boardWriter}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
            <Button variant="outline-primary" as={Link} to="/boards/register" style={{width: '100%'}}>Register</Button>
        </Container>
    );
}

export default BoardList;