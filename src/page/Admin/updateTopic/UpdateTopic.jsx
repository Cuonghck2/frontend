import React from 'react'
import { Add, Delete, Edit, Search } from '@mui/icons-material'
import {
    Button, Divider, FormControl, IconButton, InputBase, InputLabel, MenuItem, Paper,
    Select, Table, TableBody, TableContainer,
    TableHead, TablePagination, TableRow
} from '@mui/material'
import { StyleTableCell, StyledTableRow } from '../../../Layouts/component/customMUI/customMUI';
import { useState } from 'react';
import ModalAddTopic from '../../../component/modal/modalTopic/ModalAddTopic';
import ModalEditTopic from '../../../component/modal/modalTopic/ModalEditTopic';


function createData(id, nameTopic, nameTeach, type, unit, timeStart, timeEnd, result) {
    return { id, nameTopic, nameTeach, type, unit, timeStart, timeEnd, result };
}

const rows = [
    createData('DT01', "Quản lý nhà xe", "Nguyễn Đức Cương", "Sinh viên", "CNTT", "04/12/2023", "10/12/2023", "Xuất sắc"),
    createData('DT01', "Quản lý nhà xe", "Nguyễn Đức Cương", "Sinh viên", "CNTT", "04/12/2023", "10/12/2023", "Xuất sắc"),
    createData('DT01', "Quản lý nhà xe", "Nguyễn Đức Cương", "Sinh viên", "CNTT", "04/12/2023", "10/12/2023", "Xuất sắc"),
    createData('DT01', "Quản lý nhà xe", "Nguyễn Đức Cương", "Sinh viên", "CNTT", "04/12/2023", "10/12/2023", "Xuất sắc"),
    createData('DT01', "Quản lý nhà xe", "Nguyễn Đức Cương", "Sinh viên", "CNTT", "04/12/2023", "10/12/2023", "Xuất sắc"),
    createData('DT01', "Quản lý nhà xe", "Nguyễn Đức Cương", "Sinh viên", "CNTT", "04/12/2023", "10/12/2023", "Xuất sắc"),
    createData('DT01', "Quản lý nhà xe", "Nguyễn Đức Cương", "Sinh viên", "CNTT", "04/12/2023", "10/12/2023", "Xuất sắc"),
    createData('DT01', "Quản lý nhà xe", "Nguyễn Đức Cương", "Sinh viên", "CNTT", "04/12/2023", "10/12/2023", "Xuất sắc"),
    createData('DT01', "Quản lý nhà xe", "Nguyễn Đức Cương", "Sinh viên", "CNTT", "04/12/2023", "10/12/2023", "Xuất sắc"),
    createData('DT01', "Quản lý nhà xe", "Nguyễn Đức Cương", "Sinh viên", "CNTT", "04/12/2023", "10/12/2023", "Xuất sắc"),
    createData('DT01', "Quản lý nhà xe", "Nguyễn Đức Cương", "Sinh viên", "CNTT", "04/12/2023", "10/12/2023", "Xuất sắc"),
    createData('DT01', "Quản lý nhà xe", "Nguyễn Đức Cương", "Sinh viên", "CNTT", "04/12/2023", "10/12/2023", "Xuất sắc"),
    createData('DT01', "Quản lý nhà xe", "Nguyễn Đức Cương", "Sinh viên", "CNTT", "04/12/2023", "10/12/2023", "Xuất sắc"),
    createData('DT01', "Quản lý nhà xe", "Nguyễn Đức Cương", "Sinh viên", "CNTT", "04/12/2023", "10/12/2023", "Xuất sắc"),
    createData('DT01', "Quản lý nhà xe", "Nguyễn Đức Cương", "Sinh viên", "CNTT", "04/12/2023", "10/12/2023", "Xuất sắc"),
    createData('DT01', "Quản lý nhà xe", "Nguyễn Đức Cương", "Sinh viên", "CNTT", "04/12/2023", "10/12/2023", "Xuất sắc"),
    createData('DT01', "Quản lý nhà xe", "Nguyễn Đức Cương", "Sinh viên", "CNTT", "04/12/2023", "10/12/2023", "Xuất sắc"),
    createData('DT01', "Quản lý nhà xe", "Nguyễn Đức Cương", "Sinh viên", "CNTT", "04/12/2023", "10/12/2023", "Xuất sắc"),

];
const UpdateTopic = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [typeSearch, setTypeSearch] = useState('');
    const [openAdd, setOpenAdd] = useState(false);
    const [openEdit, setOpenEdit] = useState(false)

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChange = (event) => {
        setTypeSearch(event.target.value);
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
            <FormControl size='small' sx={{ m: 1, minWidth: 200, float: "right" }}>
                <InputLabel id="demo-simple-select-label">Tìm Kiếm</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={typeSearch}
                    label="Tìm kiếm"
                    onChange={handleChange}
                >
                    <MenuItem value={10}>Mã đề tài</MenuItem>
                    <MenuItem value={20}>Tên đề tài</MenuItem>
                    <MenuItem value={30}>Tên chủ nhiệm</MenuItem>
                </Select>
            </FormControl>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 500 }} component={Paper}>
                    <Table stickyHeader aria-label='custom-table'>
                        <TableHead>
                            <TableRow>
                                <StyleTableCell align="center">Mã đề tài</StyleTableCell>
                                <StyleTableCell align="center">Tên đề tài</StyleTableCell>
                                <StyleTableCell align="center">Tên chủ nhiệm</StyleTableCell>
                                <StyleTableCell align="center">Loại</StyleTableCell>
                                <StyleTableCell align="center">Đơn vị</StyleTableCell>
                                <StyleTableCell align="center">Bắt đầu</StyleTableCell>
                                <StyleTableCell align="center">Kết thúc</StyleTableCell>
                                <StyleTableCell align="center">Kết quả nghiệm thu</StyleTableCell>
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
                                        <StyleTableCell align="center">{item.nameTopic}</StyleTableCell>
                                        <StyleTableCell align="center">{item.nameTeach}</StyleTableCell>
                                        <StyleTableCell align="center">{item.type}</StyleTableCell>
                                        <StyleTableCell align="center">{item.unit}</StyleTableCell>
                                        <StyleTableCell align="center">{item.timeStart}</StyleTableCell>
                                        <StyleTableCell align="center">{item.timeEnd}</StyleTableCell>
                                        <StyleTableCell align="center">{item.result}</StyleTableCell>
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
            <ModalAddTopic openAdd={openAdd} onCloseAdd={handleCloseAdd} />
            <ModalEditTopic openEdit={openEdit} onCloseEdit={handleCloseEdit} />
        </>
    )
}

export default UpdateTopic