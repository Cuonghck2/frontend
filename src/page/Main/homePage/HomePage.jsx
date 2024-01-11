import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const navItems = [
    {
        name: 'Trang chủ',
        path: '/',
    },
    {
        name: 'Đăng ký đề tài',
        path: '/register-topics',
    },

];
const HomePage = () => {
    const { isLogin } = useSelector(state => state.users)
    const navigate = useNavigate()

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar component="nav">
                <Toolbar>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                        onClick={() => navigate('/')}

                    >
                        <img src="public/sv_logo_dashboard.png" alt="" />
                    </Typography>
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        {navItems.map((item, index) => (
                            <Button key={index} sx={{ color: '#fff', margin: ' 0 16px' }} onClick={() => navigate(item.path)}>
                                {item.name}
                            </Button>
                        ))}
                        {
                            isLogin &&
                            <Button onClick={() => navigate('/login')} sx={{ color: '#fff', margin: ' 0 16px' }}>
                                Đăng xuất
                            </Button>
                        }
                        {
                            !isLogin &&
                            <Button onClick={() => navigate('/login')} sx={{ color: '#fff', margin: ' 0 16px' }}>
                                Đăng nhập
                            </Button>
                        }
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default HomePage