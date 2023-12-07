import { Add, Delete, Edit, Search } from '@mui/icons-material'
import {
    Button, Divider, IconButton, InputBase, Paper,
    Table, TableBody, TableContainer,
    TableHead, TablePagination, TableRow
} from '@mui/material'
import React from 'react'
import { useState } from 'react';
import { StyleTableCell, StyledTableRow } from '../../../Layouts/component/customMUI/customMUI';
import ModalAddUser from '../../../component/modal/modalUser/ModalAddUser';
import ModalEditUser from '../../../component/modal/modalUser/ModalEditUser';

function createData(id, nameUser, idUnit) {
    return { id, nameUser, idUnit };
}
const rows = [
    createData("ND01", "Nguyễn Đức Cương", "DV01"),
    createData("ND01", "Nguyễn Đức Cương", "DV01"),
    createData("ND01", "Nguyễn Đức Cương", "DV01"),
    createData("ND01", "Nguyễn Đức Cương", "DV01"),
    createData("ND01", "Nguyễn Đức Cương", "DV01"),
    createData("ND01", "Nguyễn Đức Cương", "DV01"),

]
const updateUser = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [openAdd, setOpenAdd] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const handleOpenAdd = () => setOpenAdd(true);
    const handleCloseAdd = () => setOpenAdd(false);
    const handleOpenEdit = () => { setOpenEdit(true) }
    const handleCloseEdit = () => { setOpenEdit(false) }

    return (
        <>
            <Button variant="contained" startIcon={<Add />} onClick={handleOpenAdd}>Thêm</Button>
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
                                <StyleTableCell align="center">Mã danh mục</StyleTableCell>
                                <StyleTableCell align="center">Chức năng</StyleTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(rowsPerPage > 0
                                ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : rows
                            ).map((item, index) => {
                                return (
                                    <StyledTableRow key={index}>
                                        <StyleTableCell align="center">{item.id}</StyleTableCell>
                                        <StyleTableCell align="center">{item.nameUser}</StyleTableCell>
                                        <StyleTableCell align="center">{item.idUnit}</StyleTableCell>
                                        <StyleTableCell align="center">
                                            <IconButton color='primary' size='medium' variant="text" onClick={handleOpenEdit}><Edit /></IconButton>
                                            <IconButton color='primary' size='medium' variant="text"><Delete /></IconButton>
                                        </StyleTableCell>
                                    </StyledTableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 15]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            <ModalAddUser openAdd={openAdd} onCloseAdd={handleCloseAdd} />
            <ModalEditUser openEdit={openEdit} onCloseEdit={handleCloseEdit} />
        </>
    )
}

export default updateUser