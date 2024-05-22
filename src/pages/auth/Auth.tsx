import React, { useState, ChangeEvent, useEffect } from 'react';
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import KubsuLogoPath from './../../assets/Эмблема_КубГу.png';
import './style.css';
import { useCustomContext } from "../../context/useCustomContext";
import { getProfileTypeByLogin } from "../../utils/helpers";
import { sha512 } from 'crypto-hash';

type FormState = {
    login: string
    password: string
}

const initialFormState: FormState = {
    login: '',
    password: ''
}

type FormControlElement = HTMLInputElement | HTMLTextAreaElement;

export default function Auth() {
    // @ts-ignore
    const { authState, authDispatch } = useCustomContext();
    const navigate = useNavigate();

    // Состояние формы
    const [form, setForm] = useState<FormState>(initialFormState);

    const isValidForm: boolean = !!form.login && !!form.password;

    useEffect(() => {
        if (!authState.isAuth) {
            navigate('/auth')
        }
    }, [authState, navigate]);

    useEffect(() => {
        if (!localStorage.hasOwnProperty('lessons')) {
            localStorage.setItem('lessons', JSON.stringify([]));
        }
    }, []);

    const onChangeField = (event: ChangeEvent<FormControlElement>) => {
        const { name, value } = event.target;
        setForm((prevState: FormState) => ({ ...prevState, [name]: value }));
    }

    // @ts-ignore
    const loginHandler = async (event) => {
        const url = getProfileTypeByLogin(form.login) === 'student' ?
            'http://localhost:8090/kubsu/student/login' : 'http://localhost:8090/kubsu/teacher/login'

        if (isValidForm) {
            event.preventDefault();
            const sha512Password = await sha512(form.password);

            const authResponse = await fetch(url, {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    login: form.login,
                    password: sha512Password
                })
            })

            if (authResponse.ok) {
                const authData = await authResponse.json()

                // @ts-ignore
                authDispatch({ type: 'auth', payload: { login: form.login, teacherId: String(authData?.teacherId) } });
                if (getProfileTypeByLogin(form.login) === 'student') {
                    navigate('/generate');
                } else {
                    navigate('/form');
                }
            }
        }
    }

    return (
        <Form className="auth-wrapper">
            <img className="auth-logo" src={KubsuLogoPath} alt="Логотип КубГу" />

            <Form.Group className="mb-3" controlId="login">
                <Form.Label>Логин</Form.Label>
                <Form.Control
                    name="login"
                    type="text"
                    placeholder="Введите логин"
                    onChange={onChangeField}
                    value={form.login}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
                <Form.Label>Пароль</Form.Label>
                <Form.Control
                    name="password"
                    type="password"
                    placeholder="Введите пароль"
                    onChange={onChangeField}
                    value={form.password}
                />
            </Form.Group>

            <Button disabled={!isValidForm} variant="primary" type="submit" onClick={loginHandler}>
                Войти
            </Button>
        </Form>
    );
};