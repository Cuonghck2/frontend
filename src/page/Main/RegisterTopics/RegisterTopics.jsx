import React from 'react'
import { AppBar, Box, Button, Checkbox, CssBaseline, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Select, TextField, Toolbar, Typography } from '@mui/material'
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
                        </Box>
                    </Toolbar>
                </AppBar>
            </Box>
            <Typography variant='h4' sx={{ textAlign: 'center', marginTop: "100px" }}>Đăng ký đề tài</Typography>
            <Box sx={{ width: '100%', maxWidth: 800, margin: 'auto', }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            name="nameTopics"
                            label="Tên đề tài"
                            fullWidth
                            variant="standard"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            name="fullName"
                            label="Họ và tên chủ nhiệm"
                            fullWidth
                            variant="standard"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            name="unit"
                            fullWidth
                            required
                            variant="standard"
                            label="Đơn vị"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl variant='standard' fullWidth>
                            <InputLabel >Loại</InputLabel>
                            <Select
                                name='type'
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Loại"
                                required
                            >
                                <MenuItem value={"Sinh viên"}>Sinh viên</MenuItem>
                                <MenuItem value={"Giảng viên"}>Giảng viên</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            name="class"
                            fullWidth
                            required
                            variant="standard"
                            label="Lớp"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            name="year"
                            fullWidth
                            required
                            variant="standard"
                            label="Năm"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            name="numberPhone"
                            fullWidth
                            required
                            variant="standard"
                            label="Số điện thoại"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            name="email"
                            fullWidth
                            required
                            variant="standard"
                            label="Email"
                        />
                    </Grid>
                </Grid>
                <Button variant='contained' sx={{ width: '100%', marginTop: '40px' }}>Đăng ký</Button>
            </Box>
        </>
    )
}

export default RegisterTopics