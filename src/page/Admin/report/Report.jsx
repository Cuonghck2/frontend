/* eslint-disable react-hooks/exhaustive-deps */
import { Backdrop, Box, CircularProgress, FormControl, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { StyleTableCell, StyledTableRow } from '../../../Layouts/adminLayouts/component/customMUI/customMUI';
import { useDispatch, useSelector } from 'react-redux';
import request from '../../../utils/request';
import { listTopics } from '../../../slice/topicsSlice';


const Report = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [isLoading, setIsLoading] = useState(true);
    const { topics } = useSelector(state => state.topics)
    const [filtersData, setFiltersData] = useState([])
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const res = await request("/topic.json")
                const resData = Object.values(res.data)
                const keyData = Object.keys(res.data)
                const newData = keyData.map((ele, index) => {
                    return {
                        id: ele,
                        data: resData[index]
                    }
                })
                dispatch(listTopics(newData))
            } catch (error) {
                console.log(error)
            } finally {
                setIsLoading(false);
            }
        }
        fetchData()
    }, [])
    const TYPE = ["Sinh viên", "Giảng viên"];
    const YEAR = ["2023", "2024", "2025"];
    const UNIT = ["CNTT", "TCNH", "QTKD"]

    const [dataFilter, setDataFilter] = useState({
        TYPE,
        YEAR,
        UNIT
    })
    const handleChange = (e) => {
        const { value, name } = e.target
        const object = {
            TYPE,
            YEAR,
            UNIT
        }
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
        const dataFiltered = topics.filter((item) => {
            return dataFilter.TYPE.includes(item?.type) && dataFilter.YEAR.includes(item?.timeStart) && dataFilter.UNIT.includes(item?.unit)
        })
        setFiltersData(dataFiltered)
    }, [topics, dataFilter])

    const handleChangePage = (_, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <>
            {isLoading && <Backdrop
                sx={{
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                    color: "#fff",
                }}
                open={true}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <CircularProgress color="inherit" />
                </Box>
            </Backdrop>}
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
                            {filtersData.length > 0 && (rowsPerPage > 0
                                ? filtersData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : filtersData
                            ).map((topic, index) => {
                                return (
                                    <StyledTableRow key={index}>
                                        <StyleTableCell align="center">{topic.data.data?.idTopic}</StyleTableCell>
                                        <StyleTableCell align="center">{topic.data.data?.nameTopic}</StyleTableCell>
                                        <StyleTableCell align="center">{topic.data.data?.nameHead}</StyleTableCell>
                                        <StyleTableCell align="center">{topic.data.data?.type}</StyleTableCell>
                                        <StyleTableCell align="center">{topic.data.data?.unit}</StyleTableCell>
                                        <StyleTableCell align="center">{topic.data.data?.timeStart}</StyleTableCell>
                                        <StyleTableCell align="center">{topic.data.data?.awardLevel}</StyleTableCell>
                                        <StyleTableCell align="center">{topic.data.data?.acceptanceResult}</StyleTableCell>
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