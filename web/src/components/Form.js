import React, { useState, useEffect, useReducer } from "react";
import Modal from "./Modal.js";

import checkIcon from "../assets/check.svg";
import crossIcon from "../assets/cross.svg";
import spinnerIcon from "../assets/spinner.svg";

import "./Form.scss";

const formReducer = (state, action) => {
    switch (action.type) {
        case "USERNAME_INPUT":
            return {
                usernameValue: action.payload,
            };
        case "API_RETURN_USERNAME":
            return {
                ...state,
                usernameValue: action.payload.match
                    ? action.payload.username
                    : "",
                usernameIsValid: !action.payload.match,
                emailValue: action.payload.match ? action.payload.email : "",
                emailIsValid: !action.payload.email,
                apiReturned: true,
            };
        case "EMAIL_INPUT":
            return {
                ...state,
                emailValue: action.payload.value,
                emailIsValid: action.payload.isValid,
                formIsValid: action.payload.isValid && state.usernameIsValid,
                apiReturned: false,
            };
        default:
            return {
                usernameValue: "",
                emailValue: "",
                usernameIsValid: false,
                emailIsValid: false,
                formIsValid: false,
                apiReturned: false,
            };
    }
};

const Form = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const [formState, dispatchForm] = useReducer(formReducer, {
        usernameValue: "",
        emailValue: "",
        usernameIsValid: false,
        emailIsValid: false,
        formIsValid: false,
        apiReturned: false,
    });

    useEffect(() => {
        if (formState.usernameValue === "") {
            setIsLoading(false);
        } else {
            setIsLoading(true);
            const myTimer = setTimeout(() => {
                fetch(`http://localhost:3002/people/${formState.usernameValue}`)
                    .then((result) => {
                        return result.json();
                    })
                    .then((data) => {
                        setIsLoading(false);
                        dispatchForm({
                            type: "API_RETURN_USERNAME",
                            payload: data,
                        });
                        console.log(data);
                    });
            }, 500);

            return () => clearTimeout(myTimer);
        }
    }, [formState.usernameValue]);

    const changeUsernameHandler = (event) => {
        dispatchForm({ type: "USERNAME_INPUT", payload: event.target.value });
    };

    const changeEmailHandler = (event) => {
        dispatchForm({
            type: "EMAIL_INPUT",
            payload: {
                value: event.target.value,
                isValid: event.target.checkValidity(),
            },
        });
    };

    const submitFormHandler = (e) => {
        e.preventDefault();
    };

    return (
        <React.Fragment>
            <Modal open={isOpen} onClose={() => setIsOpen(false)} />
            <form className="form" onSubmit={submitFormHandler}>
                <section className="form__section">
                    <label htmlFor="username">Usuário</label>
                    <div className="form__search">
                        <input
                            id="username"
                            name="username"
                            type="text"
                            defaultValue={formState.usernameValue}
                            onChange={changeUsernameHandler}
                            className="form__input"
                            required
                        ></input>
                        {isLoading && (
                            <img
                                src={spinnerIcon}
                                alt={"Spinner icon"}
                                height={32}
                                width={32}
                                className="form__image form__image--spinner"
                            />
                        )}
                        {!isLoading && formState.usernameIsValid && (
                            <img
                                src={checkIcon}
                                alt={"Check icon"}
                                height={20}
                                width={20}
                                className="form__image"
                            />
                        )}
                        {!isLoading &&
                            formState.apiReturned &&
                            !formState.usernameIsValid && (
                                <img
                                    src={crossIcon}
                                    alt={"Cross icon"}
                                    height={20}
                                    width={20}
                                    className="form__image"
                                />
                            )}
                    </div>
                </section>
                <section className="form__section">
                    <label htmlFor="age">E-mail</label>
                    <div className="form__search">
                        <input
                            id="email"
                            name="email"
                            type="email"
                            defaultValue={formState.emailValue}
                            onChange={changeEmailHandler}
                            className="form__input"
                            disabled={!formState.usernameIsValid}
                            required
                        ></input>
                    </div>
                </section>
                <button
                    type="submit"
                    className="form__button"
                    disabled={!formState.formIsValid}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    Enviar
                </button>
            </form>
        </React.Fragment>
    );
};

export default Form;
