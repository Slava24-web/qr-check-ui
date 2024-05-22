import React, { useEffect } from 'react';
import QRCode from 'react-qr-code';
import { useCustomContext } from "../../context/useCustomContext";
import { useNavigate } from "react-router-dom";
import './style.css';

export default function QRGenerate() {
    const navigate = useNavigate();

    // @ts-ignore
    const { authState } = useCustomContext();

    useEffect(() => {
        if (!authState.isAuth) {
            navigate('/auth');
        }
    }, [authState, navigate]);

    return (
        <>
            {
                !!authState.login && (
                    <div className="generate-wrapper">
                        <QRCode value={authState.login} />
                        <p className="generate-note">Отсканируйте QR-код у преподавателя!</p>
                    </div>
                )
            }
        </>
    );
};