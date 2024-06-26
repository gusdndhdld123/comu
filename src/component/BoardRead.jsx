import React, { useEffect, useState } from 'react';
import {Link, useParams} from 'react-router-dom';
import axios from 'axios';
import {Button, Card, CardBody, CardHeader, Container, Table} from "react-bootstrap";

const BoardRead = () => {
    let { id } = useParams();
    const [board, setBoard] = useState(null);

    useEffect(() => {
        const fetchBoard = async () => {
            try {
                const response = await axios.get(`/boards/${id}`);
                console.log(response.data); // Add this line
                setBoard(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchBoard();
    }, [id]);

    return (
        <Container>
            {board ? (
                <>
                    <h2>{board.boardTitle}</h2>
                    <Card>
                        <CardHeader>
                            {board.boardWriter}
                        </CardHeader>
                        <CardBody>
                            {board.boardContent}
                        </CardBody>
                    </Card>
                    <Button variant="outline-info" as={Link} to={`/boards/update/${id}`}>수정하기</Button>
                    <Button variant="outline-primary" as={Link} to="/">뒤로 가기</Button>
                </>
            ): (
                <p>Loading...</p>
            )}
        </Container>
    );
};

export default BoardRead;