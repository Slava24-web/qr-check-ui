import React, { ChangeEvent, useEffect, useState } from 'react';
import { Button, Form } from "react-bootstrap";
import { useCustomContext } from "../../context/useCustomContext";
import { useNavigate } from "react-router-dom";

type FormType = {
    discipline: string,
    theme: string,
    group: string
}

type FormControlElement = HTMLInputElement | HTMLTextAreaElement;

const initialStateForm: FormType = {
    discipline: '',
    theme: '',
    group: ''
}

const PreScannerForm = () => {
    const navigate = useNavigate();
    // @ts-ignore
    const { scannerDispatch, authState } = useCustomContext();

    const [form, setForm] = useState<FormType>(initialStateForm);

    const onChangeField = (event: ChangeEvent<FormControlElement>) => {
        const { name, value } = event.target;
        setForm((prevState: FormType) => ({ ...prevState, [name]: value }));
    }

    useEffect(() => {
        if (!authState.isAuth) {
            navigate('/auth');
        }
    }, [authState, navigate]);

    // @ts-ignore
    const goToScanner = async (event) => {
        event.preventDefault();

        const response = await fetch('http://localhost:8090/kubsu/lesson', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                teacherId: parseInt(authState.teacherId),
                lessonName: form.discipline,
                lessonTheme: form.theme,
                startLessonDate: Date.now()
            })
        });

        const responseData = await response.json();

        if (response.ok) {
            scannerDispatch({ type: 'goToScanner', lessonId: String(responseData?.lessonId) });

            const lessons = JSON.parse(localStorage.getItem('lessons') || '[]');
            localStorage.setItem('lessons', JSON.stringify(
                [...lessons, { discipline: form.discipline, theme: form.theme }])
            );

            navigate(`/scanner/${responseData?.lessonId}`);
        }
    }

    const isValidForm: boolean = !!form.discipline && !!form.theme && !!form.group;

    return (
        <Form id="scanner-form">
            <Form.Group className="mb-3" controlId="discipline">
                <Form.Label>Дисциплина</Form.Label>
                <Form.Control
                    name="discipline"
                    type="text"
                    placeholder="Введите название дисциплины"
                    onChange={onChangeField}
                    value={form.discipline}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="theme">
                <Form.Label>Тема занятия</Form.Label>
                <Form.Control
                    name="theme"
                    type="text"
                    placeholder="Введите тему занятия"
                    onChange={onChangeField}
                    value={form.theme}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="group">
                <Form.Label>Группа</Form.Label>
                <Form.Control
                    name="group"
                    type="text"
                    placeholder="Введите номер группы"
                    onChange={onChangeField}
                    value={form.group}
                />
            </Form.Group>

            <Button
                variant="primary"
                type="submit"
                disabled={!isValidForm}
                onClick={goToScanner}
            >
                Начать занятие
            </Button>
        </Form>
    );
};

export default PreScannerForm;
