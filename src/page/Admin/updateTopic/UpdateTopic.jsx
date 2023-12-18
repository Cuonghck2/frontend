import React, { useEffect } from 'react'
import { Add, Delete, Edit, Search } from '@mui/icons-material'
import {
    Button, Divider, FormControl, IconButton, InputBase, InputLabel, MenuItem, Paper,
    Select, Table, TableBody, TableContainer,
    TableHead, TablePagination, TableRow
} from '@mui/material'
import { StyleTableCell, StyledTableRow } from '../../../Layouts/component/customMUI/customMUI';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import request from '../../../utils/request'
import { deleteTopic, listTopics } from '../../../slice/topicsSlice'
import ModalTopic from './component/modalTopic/ModalTopic';
import useTopic from '../../../api/useTopic';
const UpdateTopic = () => {
    const [modalData, setModalData] = useState(null);
    const [modalName, setModalName] = useState("");
    const [modalMode, setModalMode] = useState("add");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [typeSearch, setTypeSearch] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const dispatch = useDispatch()
    const { deleTopic } = useTopic()
    const { topics } = useSelector(state => state.topics)
    useEffect(() => {
        const fetchData = async () => {
            try {
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
            }
        }
        fetchData()
    }, [])
    const handleDeleteTopic = (id) => {
        dispatch(deleteTopic(id))
        deleTopic(id)
    }

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
    const handleOpenModal = () => {
        setOpenModal(true);

    }
    const handleCloseModal = () => {
        setOpenModal(false);
    }
    return (
        <>
            <Button variant="contained" startIcon={<Add />} onClick={() => {
                setModalMode("add")
                setModalName("Thêm đề tài")
                handleOpenModal()
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
                        <TableBody >
                            {topics.length ? (rowsPerPage > 0
                                ? topics.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : topics.topics
                            ).map((topic, index) => {
                                return (
                                    <StyledTableRow key={index}>
                                        <StyleTableCell align="center">{topic.data.data?.idTopic}</StyleTableCell>
                                        <StyleTableCell align="center">{topic.data.data?.nameTopic}</StyleTableCell>
                                        <StyleTableCell align="center">{topic.data.data?.nameHead}</StyleTableCell>
                                        <StyleTableCell align="center">{topic.data.data?.type}</StyleTableCell>
                                        <StyleTableCell align="center">{topic.data.data?.unit}</StyleTableCell>
                                        <StyleTableCell align="center">{topic.data.data?.timeStart}</StyleTableCell>
                                        <StyleTableCell align="center">{topic.data.data?.timeEnd}</StyleTableCell>
                                        <StyleTableCell align="center">{topic.data.data?.acceptanceResult}</StyleTableCell>
                                        <StyleTableCell align="center">
                                            <IconButton color='primary' size='medium' variant="text" onClick={() => {
                                                setModalMode("update")
                                                setModalName("Sửa đề tài")
                                                setModalData(topic)
                                                handleOpenModal()
                                            }}><Edit /></IconButton>
                                            <IconButton color='primary' size='medium' variant="text" onClick={() => { handleDeleteTopic(topic?.id) }}><Delete /></IconButton>
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
                    count={topics?.length || 0}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            <ModalTopic openModal={openModal} onCloseModal={handleCloseModal} modalMode={modalMode} modalName={modalName} modalData={modalMode === "update" ? modalData : null} />
        </>
    )
}

export default UpdateTopic