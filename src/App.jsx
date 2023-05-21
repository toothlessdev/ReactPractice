import { createContext, useState } from "react";
import "./App.css";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import FormText from "react-bootstrap/FormText";

import { useDispatch, useSelector } from "react-redux";
import { setModal } from "./modalSlice";

function App() {
    let [title, setTitle] = useState([]);
    let [date, setDate] = useState([]);
    let [like, setLike] = useState([]);

    // let [modal, setModal] = useState(-1);

    const modal = useSelector((state) => state.modal.value);
    const dispatch = useDispatch();

    let newPostTitle = "";

    return (
        <div className="App">
            <NavBar></NavBar>
            <div className="main-wrapper">
                <div className="new-post-wrapper">
                    <div className="new-post-container">
                        <Form.Control
                            type="text"
                            onChange={(e) => {
                                newPostTitle = e.target.value;
                            }}
                        />

                        <Button
                            variant="primary"
                            onClick={() => {
                                let copyofTitle = [...title];
                                copyofTitle.unshift(newPostTitle);
                                setTitle(copyofTitle);

                                let copyofLikes = [...like];
                                copyofLikes.unshift(0);
                                setLike(copyofLikes);

                                let now = new Date();
                                let copyofDates = [...date];
                                copyofDates.unshift(`${now.getUTCFullYear()}년 ${now.getUTCMonth()}월 ${now.getUTCDate()}일 ${now.getHours()}시 ${now.getMinutes()}분 ${now.getSeconds()}초 에 발행`);
                                setDate(copyofDates);
                                now = null;
                            }}
                        >
                            글 추가
                        </Button>
                    </div>
                </div>

                {title.map((element, index) => {
                    return (
                        <div className="list-wrapper">
                            <div
                                className="list-container"
                                onClick={() => {
                                    dispatch(setModal(index));
                                }}
                            >
                                <h4>
                                    {element}
                                    <span
                                        className="list-likes"
                                        onClick={(e) => {
                                            let copy = [...like];
                                            copy[index] += 1;
                                            setLike(copy);
                                            e.stopPropagation();
                                        }}
                                    >
                                        ❤️{like[index]}
                                    </span>
                                </h4>
                                <p>{date[index]}</p>
                                <Button
                                    variant="danger"
                                    onClick={(e) => {
                                        let copyofTitle = [...title];
                                        copyofTitle.splice(index, 1);
                                        setTitle(copyofTitle);

                                        let copyofLikes = [...like];
                                        copyofLikes.splice(index, 1);
                                        setLike(copyofLikes);
                                        e.stopPropagation();
                                    }}
                                >
                                    글삭제
                                </Button>
                            </div>
                        </div>
                    );
                })}
                {modal != -1 ? <Modal title={title} date={date} index={modal}></Modal> : null}
            </div>
        </div>
    );
}

function currentDateToString() {
    let now = Date.now();
    return now.getMonth();
}

function NavBar() {
    return (
        <Navbar bg="light" variant="light">
            <Container>
                <Navbar.Brand href="#home">ToothlessKid의 블로그</Navbar.Brand>
            </Container>
        </Navbar>
    );
}

function Modal(props) {
    const modal = useSelector((state) => state.modal.value);
    const dispatch = useDispatch();

    return (
        <div className="modal-wrapper">
            <div className="modal-container">
                <div className="modal-top">
                    <h2>{props.title[props.index]}</h2>
                    <button
                        onClick={() => {
                            dispatch(setModal(-1));
                        }}
                    >
                        닫기
                    </button>
                </div>

                <div className="modal-item">
                    <p>{props.date[props.index]}</p>
                    <p>상세내용</p>
                </div>
            </div>
        </div>
    );
}

function Component() {
    return (
        <>
            <h1>this</h1>
            <h1>is</h1>
            <h1>component</h1>
        </>
    );
}

export default App;
