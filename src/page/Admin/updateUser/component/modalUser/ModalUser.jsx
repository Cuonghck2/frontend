import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { addUser, editUser } from '../../../../../slice/usersSlice';
import useUser from '../../../../../api/useUsers';

const styleModal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: '#fff',
    boxShadow: 24,
    borderRadius: "12px",
    padding: 4,
};
const ModalUser = ({ openModal, onCloseModal, modalMode, modalName, modalData }) => {
    const dispatch = useDispatch()
    const [emptyError, setEmptyError] = useState("")
    const [formData, setFormData] = useState({
        idUser: "",
        fullName: "",
        account: "",
        password: "",
        idUnit: "",
    })
    useEffect(() => {
        if (modalData) {
            setFormData({
                idUser: modalData.data.data.idUser,
                fullName: modalData.data.data.fullName,
                account: modalData.data.data.account,
                password: modalData.data.data.password,
                idUnit: modalData.data.data.idUnit
            })
        }
    }, [modalData])
    const { idUser, fullName, account, password, idUnit } = formData
    const { postUser, putUser } = useUser()
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }))
    }
    const handleAddUsers = () => {
        const dataUsers = {
            idUser,
            fullName,
            account,
            password,
            idUnit
        }
        if (!idUser || !fullName || !account || !password || !idUnit) {
            setEmptyError("Vui lòng nhập đầy đủ thông tin")
        } else {
            dispatch(addUser({
                data: {
                    idUser,
                    fullName,
                    account,
                    password,
                    idUnit
                }
            }))
            setFormData({
                idUser: "",
                fullName: "",
                account: "",
                password: "",
                idUnit: ""
            })
            onCloseModal()
            postUser(dataUsers)
        }
    }
    const handleEditUser = () => {
        dispatch(editUser({
            id: modalData?.id,
            data: {
                idUser,
                fullName,
                account,
                password,
                idUnit
            }
        }))
        putUser(formData, modalData?.id)
        onCloseModal()
    }
    return (
        <Modal
            onClose={onCloseModal}
            keepMounted
            open={openModal}
            aria-labelledby="keep-mounted-modal-title"
            aria-describedby="keep-mounted-modal-description"
        >
            <Box sx={styleModal}>
                <Typography variant="h5" >
                    {modalName}
                </Typography>
                {emptyError && <span className='m-5 text-red-500'>{emptyError}</span>}
                <TextField onChange={handleChange} value={idUser} name='idUser' sx={{ margin: "16px 0", width: "100%" }} id="outlined-basic" label="Mã người dùng" variant="outlined" />
                <TextField onChange={handleChange} value={fullName} name='fullName' sx={{ margin: "12px 0", width: "100%" }} id="outlined-basic" label="Họ và tên" variant="outlined" />
                <TextField onChange={handleChange} value={account} name='account' sx={{ margin: "12px 0", width: "100%" }} id="outlined-basic" label="Tài khoản" variant="outlined" />
                <TextField onChange={handleChange} value={password} name='password' sx={{ margin: "12px 0", width: "100%" }} type='password' id="outlined-basic" label="Mật khẩu" variant="outlined" />
                <TextField onChange={handleChange} value={idUnit} name='idUnit' sx={{ margin: "12px 0", width: "100%" }} id="outlined-basic" label="Mã đơn vị" variant="outlined" />
                <Button variant="text" sx={{ margin: "24px 0", float: "right" }} onClick={onCloseModal}>Hủy Bỏ</Button>
                {modalMode === "add" && <Button variant="contained" sx={{ margin: "24px 12px", float: "right" }} onClick={handleAddUsers}>Thêm</Button>}
                {modalMode === "update" && <Button variant="contained" sx={{ margin: "24px 12px", float: "right" }} onClick={handleEditUser}>Sửa</Button>}
            </Box>
        </Modal>
    )
}

export default ModalUser