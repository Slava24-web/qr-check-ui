import React, { useReducer } from 'react';
import { ThemeProvider } from 'react-bootstrap';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Auth from "./pages/auth/Auth";
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import QRGenerate from "./pages/generate/QRGenerate";
import QRScanner from "./pages/scanner/QRScanner";
import CustomContext from './context/useCustomContext';
import AuthReducer from "./pages/auth/reducer";
import ScannerReducer from "./pages/scanner/reducer";
import LessonList from "./pages/lessons/LessonList";
import PreScannerForm from "./pages/scanner/PreScannerForm";

function App() {
    // Состояние страницы авторизации
    const [authState, authDispatch] = useReducer(AuthReducer, {
        login: '',
        account: '',
        isAuth: false,
        teacherId: ''
    });

    const [scannerState, scannerDispatch] = useReducer(ScannerReducer, {
        openedScanner: false,
        scannerResult: '',
        lessonId: ''
    });

    const contextValue = {
        authState,
        authDispatch,
        scannerState,
        scannerDispatch
    }

    return (
        <ThemeProvider>
            <CustomContext.Provider value={contextValue}>
                <div className="qr-app">
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<Auth />} />
                            <Route path="/auth" element={<Auth />} />
                            <Route path="/generate" element={<QRGenerate />} />
                            <Route path="/scanner/:lessonId" element={<QRScanner />} />
                            <Route path="/lessons" element={<LessonList />} />
                            <Route path="/form" element={<PreScannerForm />} />
                        </Routes>
                    </BrowserRouter>
                </div>
            </CustomContext.Provider>
        </ThemeProvider>
    );
}

export default App;