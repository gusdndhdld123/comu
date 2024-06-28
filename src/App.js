import React, { useEffect } from 'react';
import './App.css';
import { Navbar, Container, Nav, Dropdown } from "react-bootstrap";
import { Link, BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BoardList from "./component/BoardList";
import BoardRegister from "./component/BoardRegister";
import UserRegister from './component/UserRegister';
import Login from './component/Login';
import { UserProvider } from './component/UserProvider';
import { useContext } from 'react';
import { UserContext } from './component/UserProvider';
import ChatComponent from './component/ChatComponent';
import BoardRead from "./component/BoardRead";
import BoardUpdate from "./component/BoardUpdate";
import UserInfo from "./component/UserInfo";
import 'bootstrap-icons/font/bootstrap-icons.css';
import UserUpdate from "./component/UserUpdate";
import TitleBanner from "./component/TitleBanner";
import HomePage from "./component/HomePage";
import RestaurantList from "./component/RestaurantList";
import RestaurantRead from "./component/RestaurantRead";
function App() {

    return (
        <UserProvider>
            <Router>
                <Content />
            </Router>
        </UserProvider>
    );
}

function Content() {
    const { user, setUser } = useContext(UserContext);


    useEffect(() => {
        const loggedInUser = localStorage.getItem('user');
        if (loggedInUser) {
            const foundUser = JSON.parse(loggedInUser);
            setUser(foundUser);
        }
    }, [setUser]);

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('user');
        alert('로그아웃되었습니다.');
    };
    return (
        <div className="App">
           <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand as={Link} to="/">HonBob</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/boards">게시판</Nav.Link>
                        <Nav.Link as={Link} to="/restaurant">맛집탐방</Nav.Link>
                        <Nav.Link as={Link} to="/chat">채팅방</Nav.Link>
                    </Nav>

                    { user ? (
                        <Nav className="ml-auto">
                            <Dropdown>
                                <Dropdown.Toggle variant="primary" id="dropdown-basic">
                                    <i className="bi-person-circle"></i>
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                <Dropdown.Item href="/userinfo">내 정보</Dropdown.Item>
                                    <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Nav>
                    ) : (
                        <Nav className="ml-auto">
                            <Nav.Link as={Link} to="/login">Login</Nav.Link>
                        </Nav>
                    )}
                </Container>
            </Navbar>

            <Container>
                <Routes>
                    <Route path="/" element={<HomePage></HomePage>} />
                    <Route path="/restaurant" element={<RestaurantList></RestaurantList>} />
                    <Route path="/restaurant/read/:id" element={<RestaurantRead />}></Route>
                    <Route path="/chat" element={<ChatComponent></ChatComponent>} />
                    <Route path="/boards" element={<BoardList />} />
                    <Route path="/boards/register" element={<BoardRegister />} />
                    <Route path="/boards/read/:id" element={<BoardRead />}></Route>
                    <Route path="/boards/update/:id" element={<BoardUpdate />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<UserRegister />} />
                    <Route path="/userinfo" element={<UserInfo></UserInfo>}></Route>
                    <Route path="/userupdate" element={<UserUpdate></UserUpdate>}></Route>
                </Routes>
            </Container>
        </div>
    );
}

export default App;