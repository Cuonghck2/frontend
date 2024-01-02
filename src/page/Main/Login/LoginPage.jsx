import { Lock } from '@mui/icons-material'
import { Avatar, Box, Button, Checkbox, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'

const LoginPage = () => {
    const [isSignIn, setIsSignIn] = useState(false)

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
                    <TextField sx={{ width: '100%', marginTop: '20px' }} label='Tài khoản' />
                    <TextField sx={{ width: '100%', marginTop: '20px' }} label='Mật khẩu' type='password' />
                    <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Checkbox disabled sx={{ p: 0, mr: 1 }} />
                            <Typography >Nhớ mật khẩu</Typography>
                        </Box>
                        <Box onClick={() => setIsSignIn(true)}>
                            Bạn chưa có tài khoản?
                            <span className='text-[#9c27b0] text-lg font-medium hover:cursor-pointer'>Đăng ký</span>
                        </Box>
                    </Box>
                    <Button variant='contained' sx={{ width: '100%', marginTop: '20px' }}>Đăng nhập</Button>
                </Box>
            }

            {
                isSignIn && <Box sx={{ width: '400px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Avatar sx={{ p: 3, bgcolor: '#9c27b0' }}>
                            <Lock sx={{ fontSize: '25px', color: '#fff' }} />
                        </Avatar>
                    </Box>
                    <Typography variant='h6' sx={{ textAlign: 'center', mt: 2 }}>Đăng ký</Typography>
                    <TextField sx={{ width: '100%', marginTop: '20px' }} label='Tài khoản' />
                    <TextField sx={{ width: '100%', marginTop: '20px' }} label='Mật khẩu' type='password' />
                    <TextField sx={{ width: '100%', marginTop: '20px' }} label='Nhập lại mật khẩu' type='password' />
                    <Box sx={{ mt: 2, float: 'right' }} >
                        Bạn đã có tài khoản?
                        <span className='text-[#9c27b0] text-lg font-medium hover:cursor-pointer' onClick={() => setIsSignIn(false)}>Đăng nhập</span>
                    </Box>
                    <Button variant='contained' sx={{ width: '100%', marginTop: '20px' }}>Đăng ký</Button>
                </Box>
            }

        </>
    )
}

export default LoginPage 