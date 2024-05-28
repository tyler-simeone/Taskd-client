import React, { useEffect, useState } from 'react';
import { Route, Routes, Navigate } from "react-router-dom";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Board } from './components/board/Board';
import { Login } from './components/auth/Login';
import { AuthContainer } from './components/auth/AuthContainer';

const ApplicationViews = () => {
    const [didMove, setDidMove] = useState(false);

    useEffect(() => {
    }, [didMove]);

    return (
        <Routes>
            <Route exact path="/" element={<Navigate to="/board" />} />
            <Route path="/oauth/login" element={<AuthContainer isLogin={true} />} />
            <Route path="/oauth/register" element={<AuthContainer isSignup={true} />} />
            <Route path="/oauth/confirm" element={<AuthContainer isConfirmAccount={true} />} />
            <Route path="/board" element={<DndProvider backend={HTML5Backend}><Board didMove={didMove} setDidMove={setDidMove} /></DndProvider>} />
        </ Routes>
    )
}

export default ApplicationViews;
