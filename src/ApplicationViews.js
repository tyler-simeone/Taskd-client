import React, { useContext, useEffect, useState } from 'react';
import { Route, Routes } from "react-router-dom";
import { Home } from './home/Home';

const ApplicationViews = () => {

    return (
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/boards" element={<Home />} />
        </ Routes>
    )
}

export default ApplicationViews;
