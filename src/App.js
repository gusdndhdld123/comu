import './App.css';
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link, BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BoardList from "./component/BoardList";
import BoardRegister from "./component/BoardRegister";
import UserRegister from './component/UserRegister';
import Login from './component/Login';
import { UserProvider } from './component/UserProvider';
import { useContext } from 'react';
import { UserContext } from './component/UserProvider';
import ChatComponent from './component/ChatComponent';
function App() {

    return (
        <UserProvider>
            <Router>
                <div className="App">
                    <Navbar bg="dark" variant="dark">
                        <Container>
                            <Navbar.Brand as={Link} to="/">Navbar</Navbar.Brand>
                            <Nav className="me-auto">
                                <Nav.Link as={Link} to="/">Home</Nav.Link>
                                <Nav.Link as={Link} to="/boards">Boards</Nav.Link>
                                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                                <Nav.Link as={Link} to="/register">Register</Nav.Link>
                            </Nav>
                        </Container>
                    </Navbar>
                    <Container>

                    </Container>
                    <Container>
                        <Routes>
                            <Route path="/" element={<BoardList />} />
                            <Route path="/boards/register" element={<BoardRegister />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<UserRegister />} />
                        </Routes>
                    </Container>
                    <Container>
                        <ChatComponent></ChatComponent>
                    </Container>
                </div>
            </Router>
        </UserProvider>  // add this tag
    );
}

export default App;