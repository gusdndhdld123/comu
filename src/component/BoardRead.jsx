import React, {useContext, useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import {Button, Card, CardBody, CardHeader, Container, Table} from "react-bootstrap";
import {UserContext} from "./UserProvider";
import ReactMarkdown from 'react-markdown';
import parse from 'html-react-parser';
const BoardRead = () => {
    let { id } = useParams();
    const [board, setBoard] = useState(null);
    const {user} = useContext(UserContext);
    const navigate = useNavigate();
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

    const boardDel = async () => {
        try {
            await axios.delete(`/boards/${id}`);
            navigate("/boards")
            alert("게시물이 삭제되었습니다.")

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Container>
            {board ? (
                <>
                    <h2>{board.boardTitle}</h2>
                    <Card>
                        <CardHeader>
                            {board.boardWriter}
                        </CardHeader>
                        <CardBody style={{ minHeight: '50vh', textAlign: 'left' , maxWidth:'100%'}}>
                            {parse(board.boardContent)}
                        </CardBody>
                    </Card>
                    {user && user.email === board.boardWriter && (
                        <>
                            <Button variant="outline-info" as={Link} to={`/boards/update/${id}`}>수정하기</Button>
                            <Button variant="outline-danger" onClick={boardDel}>삭제하기</Button>
                        </>
                    )}
                    <Button variant="outline-primary" as={Link} to="/">뒤로 가기</Button>
                </>
            ): (
                <p>Loading...</p>
            )}
        </Container>
    );
};

export default BoardRead;