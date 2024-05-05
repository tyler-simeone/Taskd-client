import React, { useContext, useEffect, useState } from 'react';
import { Route, Routes, Navigate } from "react-router-dom";
import { Board } from './components/board/Board';

const ApplicationViews = () => {

    return (
        <Routes>
            <Route exact path="/" element={<Navigate to="/board" />} />
            <Route path="/board" element={<Board />} />
            {/* <Route path="/boards" element={<Board />} /> */}
        </ Routes>
    )
}

export default ApplicationViews;
