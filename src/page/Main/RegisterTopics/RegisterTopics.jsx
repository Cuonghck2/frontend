import React from 'react'
import { AppBar, Box, Button, CssBaseline, Toolbar, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const navItems = [
    {
        name: 'Trang chủ',
        path: '/',
    },
    {
        name: 'Đăng ký đề tài',
        path: '/register-topics',
    },
    {
        name: 'Liên hệ',
        path: '/contact',
    },
    {
        name: 'Đăng nhập',
        path: '/login',
    }

];
const RegisterTopics = () => {
    const navigate = useNavigate()
    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar component="nav">
                    <Toolbar>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                        >
                            <img src="public/sv_logo_dashboard.png" alt="" />
                        </Typography>
                        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                            {navItems.map((item, index) => (
                                <Button key={index} sx={{ color: '#fff', margin: ' 0 16px' }} onClick={() => navigate(item.path)}>
                                    {item.name}
                                </Button>
                            ))}
                        </Box>
                    </Toolbar>
                </AppBar>
            </Box>
            <Typography variant='h6' sx={{ textAlign: 'center', mt: 2 }}>Đăng ký đề tài</Typography>
        </>
    )
}

export default RegisterTopics