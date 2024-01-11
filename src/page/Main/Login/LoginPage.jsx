import { Lock } from '@mui/icons-material'
import { Avatar, Box, Button, Checkbox, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useUser from '../../../api/useUsers'
import { useDispatch } from 'react-redux'
import { addUser, login } from '../../../slice/usersSlice'
import request from '../../../utils/request'

const LoginPage = () => {
    const [isSignIn, setIsSignIn] = useState(false)
    const [isLogin, setIsLogin] = useState(false)
    const [formLogin, setFormLogin] = useState({
        accountUser: "",
        passwordUser: ""
    })
    const [emptyError, setEmptyError] = useState("")
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({
        idUser: "",
        fullName: "",
        account: "",
        password: "",
        idUnit: "",
    })
    const { idUser, fullName, account, password, idUnit } = formData
    const { accountUser, passwordUser } = formLogin
    const { postUser } = useUser()
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }))
    }
    const handleChangeLogin = (e) => {
        const { name, value } = e.target
        setFormLogin((prevFormLogin) => ({
            ...prevFormLogin,
            [name]: value
        }))
    }
    const handleLogin = async () => {
        try {
            const res = await request.get("/users.json");
            const userData = Object.values(res?.data);
            const { accountUser, passwordUser } = formLogin;

            const loggedInUser = userData.find(user => {
                return user?.data.account === accountUser && user?.data.password === passwordUser
            })

            if (loggedInUser) {
                localStorage.setItem('isLogin', 'true');
                setIsLogin(true)
            } else {
                console.log("Sai tên đăng nhập hoặc mật khẩu!");
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        if (isLogin) {
            navigate("/")
            dispatch(login(isLogin))
        }
    }, [isLogin])
    const handleSignIn = () => {
        const dataUsers = {
            idUser,
            fullName,
            account,
            password,
            idUnit
        }
        if (!idUser || !fullName || !account || !password || !idUnit) {
            setEmptyError("Vui lòng nhập đầy đủ thông tin*")
        } else {
            setFormData({
                idUser: "",
                fullName: "",
                account: "",
                password: "",
                idUnit: ""
            })
            postUser(dataUsers)
        }
    }
    const navigate = useNavigate()

    return (
        <>
            {
                !isSignIn &&
                <Box sx={{ width: '400px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Avatar sx={{ p: 3, bgcolor: '#9c27b0' }}>
                            <Lock sx={{ fontSize: '25px', color: '#fff' }} />
                        </Avatar>
                    </Box>
                    <Typography variant='h6' sx={{ textAlign: 'center', mt: 2 }}>Đăng nhập</Typography>
                    <TextField onChange={handleChangeLogin} name='accountUser' value={accountUser} sx={{ width: '100%', marginTop: '20px' }} label='Tài khoản' />
                    <TextField onChange={handleChangeLogin} name='passwordUser' value={passwordUser} sx={{ width: '100%', marginTop: '20px' }} label='Mật khẩu' type='password' />
                    <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Checkbox disabled sx={{ p: 0, mr: 1 }} />
                            <Typography >Nhớ mật khẩu</Typography>
                        </Box>
                        <Box onClick={() => setIsSignIn(true)}>
                            Bạn chưa có tài khoản?
                            {" "}
                            <span className='text-[#9c27b0] text-lg font-medium hover:cursor-pointer'>Đăng ký</span>
                        </Box>
                    </Box>
                    <Button variant='contained' sx={{ width: '100%', marginTop: '20px' }} onClick={handleLogin}>Đăng nhập</Button>
                    <span className='text-[#9c27b0] text-lg font-normal hover:cursor-pointer mt-2 float-right' onClick={() => navigate('/')}>Quay lại trang chủ</span>
                </Box>
            }

            {
                isSignIn && <Box sx={{ width: '400px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Avatar sx={{ p: 3, bgcolor: '#9c27b0' }}>
                            <Lock sx={{ fontSize: '25px', color: '#fff' }} />
                        </Avatar>
                    </Box>
                    <Typography variant='h6' sx={{ textAlign: 'center', mt: 2 }}>Đăng ký thành viên</Typography>
                    {emptyError && <span className='pt-8 text-red-500'>{emptyError}</span>}
                    <TextField onChange={handleChange} value={idUser} name='idUser' sx={{ width: '100%', marginTop: '20px' }} label='Mã người dùng' />
                    <TextField onChange={handleChange} value={fullName} name='fullName' sx={{ width: '100%', marginTop: '20px' }} label='Họ và tên' />
                    <TextField onChange={handleChange} value={account} name='account' sx={{ width: '100%', marginTop: '20px' }} label='Tài khoản' />
                    <TextField onChange={handleChange} value={password} name='password' sx={{ width: '100%', marginTop: '20px' }} label='Mật khẩu' type='password' />
                    <TextField onChange={handleChange} value={idUnit} name='idUnit' sx={{ width: '100%', marginTop: '20px' }} label='Mã đơn vị' />
                    <Box sx={{ mt: 2, float: 'right' }} >
                        Bạn đã có tài khoản?
                        {" "}
                        <span className='text-[#9c27b0] text-lg font-medium hover:cursor-pointer' onClick={() => setIsSignIn(false)}>Đăng nhập</span>
                    </Box>
                    <Button variant='contained' sx={{ width: '100%', marginTop: '20px' }} onClick={handleSignIn}>Đăng ký</Button>
                    <span className='text-[#9c27b0] text-lg font-normal hover:cursor-pointer mt-2 float-right' onClick={() => navigate('/')}>Quay lại trang chủ</span>
                </Box>
            }
        </>
    )
}

export default LoginPage 