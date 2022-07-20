import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './app.css'

import Home from './Home.jsx'
import NotFound from './404.jsx'

import MainLayout from './MainLayout.jsx'

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<Home />} />
                    <Route path="search" element={<Home />} />
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
