import React, { useEffect, useState } from 'react'
import { Box, Button, FormControl, InputLabel, MenuItem, Modal, Select, TextField, Typography } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import useTopic from '../../../../../api/useTopic';
import { useDispatch } from 'react-redux';
import { addTopic, updateTopic } from '../../../../../slice/topicsSlice';
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

const ModalTopic = ({ openModal, onCloseModal, modalMode, modalName, modalData }) => {
    const dispatch = useDispatch()
    const { postTopic, putTopic } = useTopic()
    const [emptyError, setEmptyError] = useState(null);
    const [formData, setFormData] = useState({
        idTopic: "",
        nameTopic: "",
        nameHead: "",
        type: "",
        unit: "",
        timeStart: null,
        timeEnd: null,
        acceptanceResult: ""
    })

    useEffect(() => {
        // handle update data
        if (modalData) {
            setFormData({
                idTopic: modalData.data.data.idTopic,
                nameTopic: modalData.data.data.nameTopic,
                nameHead: modalData.data.data.nameHead,
                type: modalData.data.data.type,
                unit: modalData.data.data.unit,
                timeStart: modalData.data.data.timeStart,
                timeEnd: modalData.data.data.timeEnd,
                acceptanceResult: modalData.data.data.acceptanceResult
            })
        }
    }, [modalData])


    const { idTopic, nameTopic, nameHead, type, unit, timeStart, timeEnd, acceptanceResult } = formData;
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,

        }));
    };
    const handleChangeTimeStart = (date) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            timeStart: dayjs(date).format("DD/MM/YYYY"),
        }));
    };
    const handleChangeTimeEnd = (date) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            timeEnd: dayjs(date).format("DD/MM/YYYY"),
        }));
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


        if (
            !idTopic ||
            !nameTopic ||
            !nameHead ||
            !type ||
            !unit ||
            !acceptanceResult
            // ||
            // !timeStart ||
            // !timeEnd
        ) {
            setEmptyError("Không được để trống!");
        } else {
            dispatch(addTopic({
                data: {
                    idTopic,
                    nameTopic,
                    nameHead,
                    type,
                    unit,
                    timeStart,
                    timeEnd,
                    acceptanceResult
                }
            }))
            setFormData({
                idTopic: "",
                nameTopic: "",
                nameHead: "",
                type: "",
                unit: "",
                timeStart: null,
                timeEnd: null,
                acceptanceResult: ""
            })
            onCloseModal();
            postTopic(dataTopics);
        }
    };
    const handleEditTopic = () => {
        dispatch(updateTopic({
            id: modalData?.id,
            data: {
                idTopic,
                nameTopic,
                nameHead,
                type,
                unit,
                timeStart,
                timeEnd,
                acceptanceResult
            }
        }))
        putTopic(modalData?.id, formData)
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
                <Typography variant="h5" sx={{ marginBottom: "15px" }} >
                    {modalName}
                </Typography>
                {emptyError && <span className='m-5 text-red-500'>Vui lòng nhập đầy đủ thông tin*</span>}
                <div className='flex items-center justify-around my-3'>
                    <div className='mx-4'>
                        <TextField name='idTopic' onChange={handleChange} value={idTopic} sx={{ margin: "12px 0 0 0", width: "100%" }} id="outlined-basic" label="Mã đề tài" variant="outlined" />
                        <TextField name='nameTopic' onChange={handleChange} value={nameTopic} sx={{ margin: "12px 0 0 0", width: "100%" }} id="outlined-basic" label="Tên đề tài" variant="outlined" />
                        <TextField name='nameHead' onChange={handleChange} value={nameHead} sx={{ margin: "12px 0 0 0", width: "100%" }} id="outlined-basic" label="Tên chủ nhiệm" variant="outlined" />
                        <FormControl sx={{ margin: "12px 0 0 0", width: "100%" }}>
                            <InputLabel id="demo-simple-select-label">Loại</InputLabel>
                            <Select
                                name='type'
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                defaultValue=""
                                value={type}
                                label="Loại"
                                required
                                onChange={handleChange}
                            >
                                <MenuItem value={"Giảng viên"}>Giảng viên</MenuItem>
                                <MenuItem value={"Sinh viên"}>Sinh viên</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div className='mx-4'>
                        <TextField name='unit' onChange={handleChange} value={unit} sx={{ margin: "12px 0 0 0", width: "100%" }} id="outlined-basic" label="Đơn vị" variant="outlined" />
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer sx={{ padding: "12px 0 0 0", width: "100%", }} components={['DatePicker']}>
                                <DatePicker format='DD/MM/YYYY' onChange={handleChangeTimeStart} value={timeStart} label="Bắt đầu" />
                            </DemoContainer>
                        </LocalizationProvider>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer sx={{ padding: "12px 0 0 0", width: "100%" }} components={['DatePicker']}>
                                <DatePicker format='DD/MM/YYYY' onChange={handleChangeTimeEnd} value={timeEnd} label="Kết thúc" />
                            </DemoContainer>
                        </LocalizationProvider>
                        <TextField name='acceptanceResult' onChange={handleChange} value={acceptanceResult} sx={{ margin: "12px 0 0 0", width: "100%" }} id="outlined-basic" label="Kết quả nghiệm thu" variant="outlined" />
                    </div>
                </div>
                <Button variant="text" sx={{ margin: "24px 0", float: "right" }} onClick={onCloseModal}>Hủy Bỏ</Button>
                {modalMode === "add" && <Button onClick={handleAddTopic} variant="contained" sx={{ margin: "24px 12px", float: "right" }}>Thêm</Button>}
                {modalMode === "update" && <Button onClick={handleEditTopic} variant="contained" sx={{ margin: "24px 12px", float: "right" }}>Sửa</Button>}
            </Box>
        </Modal>
    )
}

export default ModalTopic