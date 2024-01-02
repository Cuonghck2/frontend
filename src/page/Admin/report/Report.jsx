import { FormControl, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { StyleTableCell, StyledTableRow } from '../../../Layouts/adminLayouts/component/customMUI/customMUI';

function createData(id, nameTopic, nameTeach, type, unit, year, level, typeResult, awardlevel) {
    return { id, nameTopic, nameTeach, type, unit, year, level, typeResult, awardlevel };
}
const rows = [
    createData('DT01', "Quản lý nhà xe", "Nguyễn Đức Cương", "Sinh viên", "CNTT", "2023", "Trường", "Xuất sắc", "Đặc biệt"),
    createData('DT01', "Quản lý nhà xe", "Nguyễn Đức Cương", "Sinh viên", "CNTT", "2024", "Trường", "Xuất sắc", "Đặc biệt"),
    createData('DT01', "Quản lý nhà xe", "Nguyễn Đức Cương", "Sinh viên", "CNTT", "2023", "Trường", "Xuất sắc", "Đặc biệt"),
    createData('DT01', "Quản lý nhà xe", "Nguyễn Đức Cương", "Sinh viên", "CNTT", "2023", "Trường", "Xuất sắc", "Đặc biệt"),
    createData('DT01', "Quản lý nhà xe", "Nguyễn Đức Cương", "Sinh viên", "CNTT", "2024", "Trường", "Xuất sắc", "Đặc biệt"),
    createData('DT01', "Quản lý nhà xe", "Nguyễn Đức Cương", "Giảng viên", "CNTT", "2025", "Trường", "Xuất sắc", "Đặc biệt"),
    createData('DT01', "Quản lý nhà xe", "Nguyễn Đức Cương", "Sinh viên", "CNTT", "2025", "Trường", "Xuất sắc", "Đặc biệt"),
    createData('DT01', "Quản lý nhà xe", "Nguyễn Đức Cương", "Sinh viên", "CNTT", "2025", "Trường", "Xuất sắc", "Đặc biệt"),
]
const Report = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const TYPE = ["Sinh viên", "Giảng viên"];
    const YEAR = ["2023", "2024", "2025"];
    const UNIT = ["CNTT", "TCNH", "QTKD"]

    const [dataFilter, setDataFilter] = useState({
        TYPE,
        YEAR,
        UNIT
    }) // save data onchange
    const [filtersData, setFiltersData] = useState(rows)

    const handleChange = (e) => {
        const { value, name } = e.target

        const object = {
            TYPE,
            YEAR,
            UNIT
        } // handle option all

        if (value === 'ALL') {
            setDataFilter((prev) => ({
                ...prev,
                [name]: object[name].filter((option) => option !== 'ALL'),
            }));
        } else {
            setDataFilter((prev) => ({ ...prev, [name]: [value] }));
        }
    }

    useEffect(() => {
        const dataFiltered = rows.filter((item) => {
            return dataFilter.TYPE.includes(item.type) && dataFilter.YEAR.includes(item.year) && dataFilter.UNIT.includes(item.unit)
        })
        setFiltersData(dataFiltered)
    }, [dataFilter])

    const handleChangePage = (_, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <>
            <FormControl size='small' sx={{ m: 1, minWidth: 200, float: "right" }}>
                <InputLabel id="demo-simple-select-label">Loại</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Báo cáo loại"
                    defaultValue=''
                    name="TYPE"
                    onChange={handleChange}
                >
                    <MenuItem value={'ALL'}>Tất cả</MenuItem>
                    {TYPE.map((title, index) => {
                        return (
                            <MenuItem key={index} value={title}>
                                {title}
                            </MenuItem>
                        );
                    })}

                </Select>
            </FormControl>
            <FormControl size='small' sx={{ m: 1, minWidth: 200, float: "right" }}>
                <InputLabel id="demo-simple-select-label">Đơn vị</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Báo cáo đơn vị"
                    defaultValue=''
                    name="UNIT"
                    onChange={handleChange}
                >
                    <MenuItem value={'ALL'}>Tất cả</MenuItem>
                    {UNIT.map((title, index) => {
                        return (
                            <MenuItem key={index} value={title}>
                                {title}
                            </MenuItem>
                        );
                    })}
                </Select>
            </FormControl>
            <FormControl size='small' sx={{ m: 1, minWidth: 200, float: "right" }}>
                <InputLabel id="demo-simple-select-label">Năm</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Báo cáo năm"
                    defaultValue=''
                    name="YEAR"
                    onChange={handleChange}
                >
                    <MenuItem value={'ALL'}>Tất cả</MenuItem>
                    {YEAR.map((title, index) => {
                        return (
                            <MenuItem key={index} value={title}>
                                {title}
                            </MenuItem>
                        );
                    })}
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
                                <StyleTableCell align="center">Năm</StyleTableCell>
                                <StyleTableCell align="center">Cấp</StyleTableCell>
                                <StyleTableCell align="center">Loại giải thưởng</StyleTableCell>
                                <StyleTableCell align="center">Mức giải thưởng</StyleTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(rowsPerPage > 0
                                ? filtersData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : filtersData
                            ).map((item, index) => {
                                return (
                                    <StyledTableRow key={index}>
                                        <StyleTableCell align="center">{item.id}</StyleTableCell>
                                        <StyleTableCell align="center">{item.nameTopic}</StyleTableCell>
                                        <StyleTableCell align="center">{item.nameTeach}</StyleTableCell>
                                        <StyleTableCell align="center">{item.type}</StyleTableCell>
                                        <StyleTableCell align="center">{item.unit}</StyleTableCell>
                                        <StyleTableCell align="center">{item.year}</StyleTableCell>
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
                    count={filtersData.length}
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