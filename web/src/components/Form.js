import React, { useState, useEffect, useReducer } from "react";

import checkIcon from "../assets/check.svg";
import crossIcon from "../assets/cross.svg";
import spinnerIcon from "../assets/spinner.svg";

import "./Form.scss";

const nameReducer = (state, action) => {
    switch (action.type) {
        case "USER_INPUT":
            return { value: action.payload, isValid: action.payload !== "" };
        case "API_RETURN":
            return {
                value: state.value,
                isValid: !action.payload,
                apiReturned: true,
            };
        default:
            return { value: "", isValid: false, apiReturned: false };
    }
};

const Form = () => {
    const [emailInput, setEmailInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const [nameState, dispatchName] = useReducer(nameReducer, {
        value: "",
        isValid: false,
    });

    useEffect(() => {
        if (nameState.value === "") {
            setIsLoading(false);
        } else {
            setIsLoading(true);
            const myTimer = setTimeout(() => {
                fetch(`http://localhost:3002/people/${nameState.value}`)
                    .then((result) => {
                        return result.json();
                    })
                    .then((data) => {
                        setIsLoading(false);
                        dispatchName({
                            type: "API_RETURN",
                            payload: data.match,
                        });
                    });
            }, 500);

            return () => clearTimeout(myTimer);
        }
    }, [nameState.value]);

    const changeNameHandler = (event) => {
        dispatchName({ type: "USER_INPUT", payload: event.target.value });
    };

    const changeEmailHandler = (event) => {
        if (emailInput === "") {
            return;
        }
        setEmailInput(event.target.value);
    };

    return (
        <form className="form">
            <section className="form__section">
                <label htmlFor="name">Nome</label>
                <div className="form__search">
                    <input
                        id="name"
                        name="name"
                        type="text"
                        value={nameState.value}
                        onChange={changeNameHandler}
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
                    {!isLoading && nameState.isValid && (
                        <img
                            src={checkIcon}
                            alt={"Check icon"}
                            height={20}
                            width={20}
                            className="form__image"
                        />
                    )}
                    {!isLoading &&
                        nameState.apiReturned &&
                        !nameState.isValid && (
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
                        value={emailInput}
                        onChange={changeEmailHandler}
                        className="form__input"
                        required
                        disabled
                    ></input>
                </div>
            </section>
            <button type="submit" className="form__button" disabled>
                Enviar
            </button>
        </form>
    );
};

export default Form;
