import React, { Fragment } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import routes from "../../router/routesAdmin"
import DefaultLayouts from '../../Layouts/adminLayouts/defaultsLayout/DefaultLayout'

const Admin = () => {
    return (
        <BrowserRouter>
            <Routes>
                {
                    routes.map((route, index) => {
                        let Layout = DefaultLayouts;
                        if (route.layout) {
                            Layout = route.layout
                        }
                        const Page = route.component
                        return (
                            <Route key={index} path={route.path} element={<Layout><Page /></Layout>} />
                        )
                    })
                }
            </Routes>
        </BrowserRouter>
    )
}

export default Admin