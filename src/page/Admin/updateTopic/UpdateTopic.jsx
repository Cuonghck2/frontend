import React, { useEffect, useMemo } from 'react'
import { Add, Delete, Edit, Search } from '@mui/icons-material'
import {
    Box,
    Button, Divider, FormControl, IconButton, InputBase, InputLabel, MenuItem, Modal, Paper,
    Select, Table, TableBody, TableContainer,
    TableHead, TablePagination, TableRow, Typography
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
    const { topics } = useSelector(state => state.topics)
    const [modalName, setModalName] = useState("");
    const [modalMode, setModalMode] = useState("add");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [typeSearch, setTypeSearch] = useState('');
    const [dataTopics, setDataTopics] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const [openModal, setOpenModal] = useState(false);
    const [confirmDel, setConfirmDel] = useState(false)
    const dispatch = useDispatch()
    const { deleTopic } = useTopic()
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
        setConfirmDel(false)
    }
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    useEffect(() => {
        if (typeSearch === "Mã đề tài") {
            setDataTopics(topics.filter((topic) => topic.data.data?.idTopic.includes(searchValue)));
        } else if (typeSearch === "Tên đề tài") {
            setDataTopics(topics.filter((topic) => topic.data.data?.nameTopic.includes(searchValue)));
        } else if (typeSearch === "Tên chủ nhiệm") {
            setDataTopics(topics.filter((topic) => topic.data.data?.nameHead.includes(searchValue)));
        } else {
            setDataTopics(topics);
        }
    }, [topics, searchValue, typeSearch]);
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const handleChangeType = (event) => {
        setTypeSearch(event.target.value);
    };
    const handleOpenModal = () => {
        setOpenModal(true);
    }
    const handleCloseModal = () => {
        setOpenModal(false);
    }
    const handleConfirmDel = () => {
        setConfirmDel(true)
    }
    const handleCancelDel = () => {
        setConfirmDel(false)
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
                    sx={{ ml: 1, flex: 1, p: '6px' }}
                    placeholder="Nhập từ khóa để tìm kiếm"
                    inputProps={{ 'aria-label': 'search' }}
                    value={searchValue}
                    onChange={(e) => { setSearchValue(e.target.value) }}
                />
            </Paper>
            <FormControl size='small' sx={{ m: 1, minWidth: 200, float: "right" }}>
                <InputLabel id="demo-simple-select-label">Tìm Kiếm</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={typeSearch}
                    label="Tìm kiếm"
                    onChange={handleChangeType}
                >
                    <MenuItem value={"Mã đề tài"}>Mã đề tài</MenuItem>
                    <MenuItem value={"Tên đề tài"}>Tên đề tài</MenuItem>
                    <MenuItem value={"Tên chủ nhiệm"}>Tên chủ nhiệm</MenuItem>
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
                            {dataTopics.length ? (rowsPerPage > 0
                                ? dataTopics.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
                                            <IconButton color='primary' size='medium' variant="text" onClick={handleConfirmDel}><Delete /></IconButton>
                                        </StyleTableCell>
                                        <Modal
                                            onClose={handleCancelDel}
                                            keepMounted
                                            open={confirmDel}
                                        >
                                            <Box
                                                sx={{
                                                    position: 'absolute',
                                                    top: '50%',
                                                    left: '50%',
                                                    transform: 'translate(-50%, -50%)',
                                                    width: 600,
                                                    bgcolor: '#fff',
                                                    boxShadow: 24,
                                                    borderRadius: "12px",
                                                    padding: 4,
                                                }}
                                            >
                                                <Typography variant="h5" sx={{ marginBottom: "15px" }}>
                                                    Bạn có chắc chắn muốn xóa hay không ?
                                                </Typography>
                                                <Button variant="text" sx={{ margin: "24px 0", float: "right" }} onClick={handleCancelDel}>Hủy Bỏ</Button>
                                                <Button onClick={() => { handleDeleteTopic(topic?.id) }} variant="contained" sx={{ margin: "24px 12px", float: "right" }}>Xóa</Button>
                                            </Box>
                                        </Modal>
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