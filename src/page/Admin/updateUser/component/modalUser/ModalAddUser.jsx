import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import React from 'react'

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
const ModalAddUser = ({ openAdd, onCloseAdd }) => {
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
                    Thêm người dùng
                </Typography>
                <TextField sx={{ margin: "16px 0", width: "100%" }} id="outlined-basic" label="Mã người dùng" variant="outlined" />
                <TextField sx={{ margin: "12px 0", width: "100%" }} id="outlined-basic" label="Họ và tên" variant="outlined" />
                <TextField sx={{ margin: "12px 0", width: "100%" }} id="outlined-basic" label="Mã danh mục" variant="outlined" />
                <Button variant="text" sx={{ margin: "24px 0", float: "right" }} onClick={onCloseAdd}>Hủy Bỏ</Button>
                <Button variant="contained" sx={{ margin: "24px 12px", float: "right" }}>Thêm</Button>
            </Box>
        </Modal>
    )
}

export default ModalAddUser