import { Paper, Table, TableBody, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import React, { useState } from 'react'
import { StyleTableCell, StyledTableRow } from '../../../Layouts/component/customMUI/customMUI';

function createData(id, nameTopic, nameTeach, type, unit, level, typeResult, awardlevel) {
    return { id, nameTopic, nameTeach, type, unit, level, typeResult, awardlevel };
}
const rows = [
    createData('DT01', "Quản lý nhà xe", "Nguyễn Đức Cương", "Sinh viên", "CNTT", "Trường", "Xuất sắc", "Đặc biệt"),
    createData('DT01', "Quản lý nhà xe", "Nguyễn Đức Cương", "Sinh viên", "CNTT", "Trường", "Xuất sắc", "Đặc biệt"),
    createData('DT01', "Quản lý nhà xe", "Nguyễn Đức Cương", "Sinh viên", "CNTT", "Trường", "Xuất sắc", "Đặc biệt"),
    createData('DT01', "Quản lý nhà xe", "Nguyễn Đức Cương", "Sinh viên", "CNTT", "Trường", "Xuất sắc", "Đặc biệt"),
    createData('DT01', "Quản lý nhà xe", "Nguyễn Đức Cương", "Sinh viên", "CNTT", "Trường", "Xuất sắc", "Đặc biệt"),
    createData('DT01', "Quản lý nhà xe", "Nguyễn Đức Cương", "Sinh viên", "CNTT", "Trường", "Xuất sắc", "Đặc biệt"),
    createData('DT01', "Quản lý nhà xe", "Nguyễn Đức Cương", "Sinh viên", "CNTT", "Trường", "Xuất sắc", "Đặc biệt"),
    createData('DT01', "Quản lý nhà xe", "Nguyễn Đức Cương", "Sinh viên", "CNTT", "Trường", "Xuất sắc", "Đặc biệt"),
]
const Report = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    return (
        <>

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
                                <StyleTableCell align="center">Cấp</StyleTableCell>
                                <StyleTableCell align="center">Loại giải thưởng</StyleTableCell>
                                <StyleTableCell align="center">Mức giải thưởng</StyleTableCell>
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
                                        <StyleTableCell align="center">{item.level}</StyleTableCell>
                                        <StyleTableCell align="center">{item.typeResult}</StyleTableCell>
                                        <StyleTableCell align="center">{item.awardlevel}</StyleTableCell>


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
        </>
    )
}

export default Report