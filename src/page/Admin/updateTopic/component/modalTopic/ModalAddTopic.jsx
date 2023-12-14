import React, { useEffect, useState } from 'react'
import { Box, Button, FormControl, InputLabel, MenuItem, Modal, Select, TextField, Typography } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import useTopic from '../../../../../api/useTopic';
import { useDispatch, useSelector } from 'react-redux';
import { addTopic } from '../../../../../slice/topicsSlice';
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

const ModalAddTopic = ({ openAdd, onCloseAdd }) => {
    const dispatch = useDispatch()
    const [idTopic, setIdTopic] = useState("")
    const [nameTopic, setNameTopic] = useState("")
    const [nameHead, setNameHead] = useState("")
    const [type, setType] = useState("");
    const [unit, setUnit] = useState("")
    const [timeStart, setTimeStart] = useState(null)
    const [timeEnd, setTimeEnd] = useState(null)
    const [acceptanceResult, setAcceptanceResult] = useState("")
    const { postTopic, getTopic } = useTopic()
    const handleChangeIdTopic = (event) => {
        setIdTopic(event.target.value)
    }
    const handleChangeNameTopic = (event) => {
        setNameTopic(event.target.value)
    }
    const handleChangeNameHead = (event) => {
        setNameHead(event.target.value)
    }
    const handleChangeUnit = (event) => {
        setUnit(event.target.value)
    }
    const handleChangeTimeStart = (date) => {
        const formatTimeStart = dayjs(date).format("DD/MM/YYYY")
        setTimeStart(formatTimeStart)
    }
    const handleChangeTimeEnd = (date) => {
        const formatTimeEnd = dayjs(date).format("DD/MM/YYYY")
        setTimeEnd(formatTimeEnd)
    }
    const handleChangeAcceptanceResult = (event) => {
        setAcceptanceResult(event.target.value)
    }
    const handleChangeType = (event) => {
        setType(event.target.value);
    };

    const handleAddTopic = async () => {
        const dataTopics = {
            idTopic,
            nameTopic,
            nameHead,
            type,
            unit,
            timeStart,
            timeEnd,
            acceptanceResult
        };
        dispatch(addTopic(dataTopics))
        setIdTopic("");
        setNameTopic("");
        setNameHead("");
        setUnit("");
        setType("");
        setTimeStart(null);
        setTimeEnd(null);
        setAcceptanceResult("");
        onCloseAdd();
        try {
            await postTopic(dataTopics);
        } catch (error) {
            console.log(error);
        }
    };
    getTopic()


    return (
        <Modal
            onClose={onCloseAdd}
            keepMounted
            open={openAdd}
            aria-labelledby="keep-mounted-modal-title"
            aria-describedby="keep-mounted-modal-description"
        >
            <Box sx={styleModal}>
                <Typography variant="h5" >
                    Thêm đề tài
                </Typography>
                <div className='flex items-center justify-around my-3'>
                    <div className='mx-4'>
                        <TextField onChange={handleChangeIdTopic} value={idTopic} sx={{ margin: "12px 0", width: "100%" }} id="outlined-basic" label="Mã đề tài" variant="outlined" />
                        <TextField onChange={handleChangeNameTopic} value={nameTopic} sx={{ margin: "12px 0", width: "100%" }} id="outlined-basic" label="Tên đề tài" variant="outlined" />
                        <TextField onChange={handleChangeNameHead} value={nameHead} sx={{ margin: "12px 0", width: "100%" }} id="outlined-basic" label="Tên chủ nhiệm" variant="outlined" />
                        <FormControl sx={{ margin: "12px 0", width: "100%" }}>
                            <InputLabel id="demo-simple-select-label">Loại</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                defaultValue=""
                                value={type}
                                label="Loại"
                                onChange={handleChangeType}
                            >
                                <MenuItem value={"Giảng viên"}>Giảng viên</MenuItem>
                                <MenuItem value={"Sinh viên"}>Sinh viên</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div className='mx-4'>
                        <TextField onChange={handleChangeUnit} value={unit} sx={{ margin: "12px 0", width: "100%" }} id="outlined-basic" label="Đơn vị" variant="outlined" />
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer sx={{ padding: "12px 0", width: "100%", }} components={['DatePicker']}>
                                <DatePicker format='DD/MM/YYYY' onChange={handleChangeTimeStart} value={timeStart} label="Bắt đầu" />
                            </DemoContainer>
                        </LocalizationProvider>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer sx={{ padding: "12px 0", width: "100%" }} components={['DatePicker']}>
                                <DatePicker format='DD/MM/YYYY' onChange={handleChangeTimeEnd} value={timeEnd} label="Kết thúc" />
                            </DemoContainer>
                        </LocalizationProvider>
                        <TextField onChange={handleChangeAcceptanceResult} value={acceptanceResult} sx={{ margin: "12px 0", width: "100%" }} id="outlined-basic" label="Kết quả nghiệm thu" variant="outlined" />
                    </div>
                </div>
                <Button variant="text" sx={{ margin: "24px 0", float: "right" }} onClick={onCloseAdd}>Hủy Bỏ</Button>
                <Button onClick={handleAddTopic} variant="contained" sx={{ margin: "24px 12px", float: "right" }}>Thêm</Button>
            </Box>
        </Modal>
    )
}

export default ModalAddTopic