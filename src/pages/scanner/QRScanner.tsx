import React, { useEffect, useState } from 'react';
import { QrReader } from 'react-qr-reader';
import './style.css';
import { useCustomContext } from "../../context/useCustomContext";
import { Alert, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function QRScanner() {
    const navigate = useNavigate();

    // @ts-ignore
    const { scannerState, scannerDispatch, authState } = useCustomContext();
    const [successScan, setSuccessScan] = useState(false);

    useEffect(() => {
        if (!authState.isAuth) {
            navigate('/auth');
        }
    }, [authState, navigate]);

    return (
        <div id="scanner-page">
            <>
                <Button variant="link" className="qr-scanner-cancel-btn" onClick={() => navigate('/lessons')}>К списку
                    занятий</Button>
                <QrReader
                    onResult={async (result, error) => {
                        // @ts-ignore
                        if (result?.text) {
                            // @ts-ignore
                            await fetch(`http://localhost:8090/kubsu/lesson/markStudent?studentLogin=${result.text}&lessonId=${parseInt(scannerState.lessonId)}`, {
                                method: "POST"
                            })
                            // @ts-ignore
                            scannerDispatch({ type: 'successScan', scannerResult: result.text });
                            setSuccessScan(true);
                            setTimeout(() => setSuccessScan(false), 1500);
                        }
                        if (error) console.info(error)
                    }}
                    constraints={{ facingMode: 'user' }}
                />
                <Button variant="danger" className="qr-scanner-stop-btn" onClick={() => navigate('/form')}>Завершить
                    занятие</Button>
            </>
            {
                successScan &&
                <Alert key="success" variant="success" className="qr-scanner-alert">QR-код отсканирован!</Alert>
            }
        </div>
    );
};