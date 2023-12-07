import React from 'react'
import { Box, Button, FormControl, InputLabel, MenuItem, Modal, Select, TextField, Typography } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
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
    const [type, setType] = React.useState('');

    const handleChange = (event) => {
        setType(event.target.value);
    };
    return (
        <Modal
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
                        <TextField sx={{ margin: "12px 0", width: "100%" }} id="outlined-basic" label="Mã đề tài" variant="outlined" />
                        <TextField sx={{ margin: "12px 0", width: "100%" }} id="outlined-basic" label="Tên đề tài" variant="outlined" />
                        <TextField sx={{ margin: "12px 0", width: "100%" }} id="outlined-basic" label="Tên chủ nhiệm" variant="outlined" />
                        <FormControl sx={{ margin: "12px 0", width: "100%" }}>
                            <InputLabel id="demo-simple-select-label">Loại</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={type}
                                label="Loại"
                                onChange={handleChange}
                            >
                                <MenuItem value={10}>Giảng viên</MenuItem>
                                <MenuItem value={20}>Sinh viên</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div className='mx-4'>
                        <TextField sx={{ margin: "12px 0", width: "100%" }} id="outlined-basic" label="Đơn vị" variant="outlined" />
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer sx={{ padding: "12px 0", width: "100%", }} components={['DatePicker']}>
                                <DatePicker label="Bắt đầu" />
                            </DemoContainer>
                        </LocalizationProvider>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer sx={{ padding: "12px 0", width: "100%" }} components={['DatePicker']}>
                                <DatePicker label="Kết thúc" />
                            </DemoContainer>
                        </LocalizationProvider>

                        <TextField sx={{ margin: "12px 0", width: "100%" }} id="outlined-basic" label="Kết quả nghiệm thu" variant="outlined" />
                    </div>
                </div>
                <Button variant="text" sx={{ margin: "24px 0", float: "right" }} onClick={onCloseAdd}>Hủy Bỏ</Button>
                <Button variant="contained" sx={{ margin: "24px 12px", float: "right" }}>Thêm</Button>
            </Box>
        </Modal>
    )
}

export default ModalAddTopic