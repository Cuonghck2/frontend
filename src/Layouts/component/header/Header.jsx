import { Notifications } from '@mui/icons-material'
import { Avatar, Badge } from '@mui/material'
import React from 'react'
import Breadcrumb from '../../../component/Breadcrumbs'

const Header = () => {
    return (
        <div className=" flex justify-between items-center mb-[24px] h-[77.6px] py-3 px-[26px] shadow-sm">
            <Breadcrumb />
            <div className='flex justify-center items-center'>
                <Badge className='mr-6 hover:cursor-pointer' color="primary" badgeContent={1}>
                    <Notifications color='action' />
                </Badge>
                <div className='flex items-center justify-center'>
                    <div className='mx-3'>
                        <Avatar alt='avatar' src='public/images.jfif' />
                    </div>
                    <span>Nguyễn Đức Cương</span>
                </div>
            </div>
        </div>
    )
}

export default Header