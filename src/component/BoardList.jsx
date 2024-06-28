import React, {useContext, useEffect, useState} from 'react';
import {Table, Button, Container, Nav, Dropdown} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {UserContext} from "./UserProvider";
import Pagination from 'react-js-pagination';

const BoardList = () => {
    const [boards, setBoards] = useState([]);
    const { user, setUser } = useContext(UserContext);


    const fetchBoards = async () => {
        try {
            const response = await axios.get(`/boards?page=${activePage - 1}&size=5&sort=desc`);
            setBoards(response.data);
        } catch (e) {
            console.log(e);
        }
    };

    const [activePage, setActivePage] = useState(1);

    const handlePageChange = (pageNumber) => {
        console.log(`active page is ${pageNumber}`);
        setActivePage(pageNumber);
    }
    useEffect(() => {
        fetchBoards();
    }, [activePage]);
    return (
        <Container>
            <h2>게시글 목록</h2>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>제목</th>
                    <th>작성자</th>
                    <th>작성일</th>
                </tr>
                </thead>
                <tbody>
                {boards.map(board => {
                    const regDate = new Date(board.regDate);
                    const now = new Date();

                    const isToday =
                        regDate.getFullYear() === now.getFullYear() &&
                        regDate.getMonth() === now.getMonth() &&
                        regDate.getDate() === now.getDate();

                    const dateString = isToday
                        ? regDate.toLocaleTimeString()
                        : regDate.toLocaleDateString();

                    return (
                        <tr key={board.boardIdx}>
                            <td className="col-7">
                                <Link to={`/boards/read/${board.boardIdx}`}>
                                    {board.boardTitle}
                                </Link>
                            </td>
                            <td className="col-3">
                                {
                                    board.boardWriter.length > 4
                                        ? board.boardWriter.substring(0, 4) + '*'.repeat(board.boardWriter.length - 4)
                                        : board.boardWriter
                                }
                            </td>
                            <td className="col-2">{dateString}</td>
                        </tr>
                    )
                })}
                </tbody>
            </Table>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Pagination
                    activePage={activePage}
                    itemsCountPerPage={10}
                    totalItemsCount={450}
                    pageRangeDisplayed={5}
                    onChange={handlePageChange}
                    itemClass="page-item"
                    linkClass="page-link"
                    style={{margin:"auto"}}
                />
            </div>

            { user ? (
                <Button variant="outline-primary" as={Link} to="/boards/register" style={{width: '100%'}}>글쓰기</Button>
            ) : (
                null
            )}
        </Container>
    );
}

export default BoardList;