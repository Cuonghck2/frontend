import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { publicRoutes } from "../../router/routesMain"

const Main = () => {

    return (
        <BrowserRouter>
            <Routes>
                {
                    publicRoutes.map((route) => {
                        const Page = route.component
                        return (
                            <Route key={route.path} path={route.path} element={<Page />} />
                        )
                    })
                }
            </Routes>
        </BrowserRouter>
    )
}

export default Main