/* eslint-disable react/prop-types */
import { Box, Button, Modal, Typography } from "@mui/material";

const ModalDeleteLeader = ({
  handleCancelDel,
  confirmDel,
  handleDeleteLeader,
  id,
}) => {
  console.log(confirmDel);
  return (
    <Modal onClose={handleCancelDel} keepMounted open={confirmDel}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          bgcolor: "#fff",
          boxShadow: 24,
          borderRadius: "12px",
          padding: 4,
        }}
      >
        <Typography variant="h5" sx={{ marginBottom: "15px" }}>
          {id}
          Bạn có chắc chắn muốn xóa hay không ?
        </Typography>
        <Button
          variant="text"
          sx={{ margin: "24px 0", float: "right" }}
          onClick={handleCancelDel}
        >
          Hủy Bỏ
        </Button>
        <Button
          onClick={() => {
            handleDeleteLeader(id);
          }}
          variant="contained"
          sx={{ margin: "24px 12px", float: "right" }}
        >
          Xóa
        </Button>
      </Box>
    </Modal>
  );
};

export default ModalDeleteLeader;
