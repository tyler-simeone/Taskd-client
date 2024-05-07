import React, { useContext, useEffect, useState } from 'react';
import { Route, Routes, Navigate } from "react-router-dom";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Board } from './components/board/Board';

const ApplicationViews = () => {

    return (
        <Routes>
            <Route exact path="/" element={<Navigate to="/board" />} />
            <Route path="/board" element={<DndProvider backend={HTML5Backend}><Board /></DndProvider>} />
            {/* <Route path="/boards" element={<Board />} /> */}
        </ Routes>
    )
}

export default ApplicationViews;
