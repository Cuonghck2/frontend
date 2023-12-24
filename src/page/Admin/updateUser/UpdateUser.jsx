import { Add, Delete, Edit, Search } from '@mui/icons-material'
import {
    Box,
    Button, Divider, IconButton, InputBase, Modal, Paper,
    Table, TableBody, TableContainer,
    TableHead, TablePagination, TableRow, Typography
} from '@mui/material'
import React, { useEffect } from 'react'
import { useState } from 'react';
import { StyleTableCell, StyledTableRow } from '../../../Layouts/component/customMUI/customMUI';
import ModalUser from './component/modalUser/ModalUser';
import request from '../../../utils/request';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUsers, listUsers } from '../../../slice/usersSlice';
import useUser from '../../../api/useUsers';
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
const updateUser = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [openModal, setOpenModal] = useState(false);
    const [modalMode, setModalMode] = useState("add");
    const [modalName, setModalName] = useState("")
    const [modalData, setModalData] = useState(null)
    const [confirmDel, setConfirmDel] = useState(false)
    const dispatch = useDispatch()
    const { users } = useSelector(state => state.users)
    const { delUser } = useUser()
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await request("/users.json")
                const resData = Object.values(res?.data);
                const resKey = Object.keys(res?.data);
                const newData = resKey.map((ele, index) => {
                    {
                        return {
                            id: ele,
                            data: resData[index]
                        }
                    }
                })
                dispatch(listUsers(newData))
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [])
    const handleDeleteUsers = (id) => {
        dispatch(deleteUsers(id))
        delUser(id)
        setConfirmDel(false)
    }
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);
    return (
        <>
            <Button variant="contained" startIcon={<Add />} onClick={() => {
                handleOpenModal()
                setModalName("Thêm người dùng")
            }}>Thêm</Button>
            <Paper component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 300, float: "right", marginBottom: "16px" }}>
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Nhập từ khóa để tìm kiếm"
                    inputProps={{ 'aria-label': 'search' }}
                />
                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                    <Search />
                </IconButton>
            </Paper>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 500 }} component={Paper}>
                    <Table stickyHeader aria-label='custom-table'>
                        <TableHead>
                            <TableRow>
                                <StyleTableCell align="center">Mã người dùng</StyleTableCell>
                                <StyleTableCell align="center">Họ và tên </StyleTableCell>
                                <StyleTableCell align="center">Tài khoản </StyleTableCell>
                                <StyleTableCell align="center">Mật khẩu </StyleTableCell>
                                <StyleTableCell align="center">Mã đơn vị</StyleTableCell>
                                <StyleTableCell align="center">Chức năng</StyleTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.length ? (rowsPerPage > 0
                                ? users?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : users
                            )?.map((user, index) => {
                                return (
                                    <StyledTableRow key={index}>
                                        <StyleTableCell align="center">{user?.data.data?.idUser}</StyleTableCell>
                                        <StyleTableCell align="center">{user?.data.data?.fullName}</StyleTableCell>
                                        <StyleTableCell align="center">{user?.data.data?.account}</StyleTableCell>
                                        <StyleTableCell align="center">{user?.data.data?.password}</StyleTableCell>
                                        <StyleTableCell align="center">{user?.data.data?.idUnit}</StyleTableCell>
                                        <StyleTableCell align="center">
                                            <IconButton color='primary' size='medium' variant="text" onClick={() => {
                                                setModalMode("update")
                                                setModalName("Sửa người dùng")
                                                setModalData(user)
                                                handleOpenModal()
                                            }}><Edit /></IconButton>
                                            <IconButton color='primary' size='medium' variant="text" onClick={() => { setConfirmDel(true) }}><Delete /></IconButton>
                                            <Modal
                                                keepMounted
                                                open={confirmDel}
                                                aria-labelledby="keep-mounted-modal-title"
                                                aria-describedby="keep-mounted-modal-description"
                                            >
                                                <Box sx={styleModal}>
                                                    <Typography variant="h5" >
                                                        Bạn có chắc chắn muốn xóa không?
                                                    </Typography>
                                                    <Button variant="text" sx={{ margin: "24px 0", float: "right" }} onClick={() => { setConfirmDel(false) }}>Hủy Bỏ</Button>
                                                    <Button variant="contained" sx={{ margin: "24px 12px", float: "right" }} onClick={() => { handleDeleteUsers(user.id) }}>Xóa</Button>
                                                </Box>
                                            </Modal>
                                        </StyleTableCell>
                                    </StyledTableRow>
                                )
                            }) : <></>}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 15]}
                    component="div"
                    count={users?.length || 0}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            <ModalUser openModal={openModal} onCloseModal={handleCloseModal} modalMode={modalMode} modalName={modalName} modalData={modalMode === "update" ? modalData : null} />

        </>
    )
}

export default updateUser