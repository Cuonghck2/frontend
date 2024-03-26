/* eslint-disable no-unused-vars */
import { Add, Delete, Edit, Save } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  Modal,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import request from "../../../../utils/request";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  StyleTableCell,
  StyledTableRow,
} from "../../../../Layouts/adminLayouts/component/customMUI/customMUI";
import {
  addMemberSync,
  deleteMemberSync,
  listMember,
  uppdateMemberSync,
} from "../../../../slice/memberSlice";

const Member = () => {
  const { id } = useParams();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [editMember, setEditMember] = useState(null);
  const [emtyError, setEmtyError] = useState(false);
  const [confirmDel, setConfirmDel] = useState(false);
  const [selectedIdMember, setSelectedIdMember] = useState(null);
  const [formData, setFormData] = useState({
    idMember: "",
    nameMember: "",
    taskMember: "",
    idLeader: id,
  });
  const { members } = useSelector((state) => state.members);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await request(`/api/members/${id}`);
        dispatch(listMember(res?.data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  const { idMember, nameMember, taskMember } = formData;
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  //add member
  const handleAddMember = async () => {
    if (!idMember || !nameMember || !taskMember) {
      setEmtyError(true);
    } else {
      dispatch(addMemberSync(formData));
      setFormData({
        idMember: "",
        nameMember: "",
        taskMember: "",
      });
    }
  };

  // edit member
  const uppdateMember = (id) => {
    const memberSelected = members.find((member) => member.idMember === id);
    setEditMember(memberSelected);
  };
  const handleSaveMember = async () => {
    if (!idMember || !nameMember || !taskMember) {
      setEmtyError(true);
    } else {
      dispatch(
        uppdateMemberSync({
          idMember: editMember.idMember,
          nameMember: nameMember,
          taskMember: taskMember,
          idLeader: id,
        })
      );
      setEditMember(null);
      setFormData({
        idMember: "",
        nameMember: "",
        taskMember: "",
      });
    }
  };
  const cancelEdit = () => {
    setEditMember(null);
    setFormData({
      idMember: "",
      nameMember: "",
      taskMember: "",
    });
  };

  useEffect(() => {
    if (editMember) {
      setFormData({
        idMember: editMember?.idMember,
        nameMember: editMember?.nameMember,
        taskMember: editMember?.taskMember,
      });
    }
  }, [editMember]);
  // delete member
  const handelOpenDelete = (id) => {
    setConfirmDel(true);
    setSelectedIdMember(id);
  };
  const handleCancelDel = () => {
    setConfirmDel(false);
    setSelectedIdMember(null);
  };

  const handleDeleteMember = async () => {
    dispatch(deleteMemberSync(selectedIdMember));
    setConfirmDel(false);
  };
  //pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <>
      <Typography
        variant="h4"
        sx={{ marginBottom: "20px", textAlign: "center" }}
      >
        Thành viên
      </Typography>
      <div className="grid grid-cols-10">
        <div className="col-span-3 mx-6">
          {emtyError && (
            <span style={{ marginBottom: "20px", color: "red" }}>
              Vui lòng nhập đầy đủ thông tin*
            </span>
          )}
          <div className="flex flex-col w-max-[400px] mt-[16px]">
            <TextField
              name="idMember"
              sx={{ marginBottom: "16px" }}
              value={idMember}
              id="outlined-basic"
              label="Mã thành viên"
              variant="outlined"
              onChange={handleChange}
            />
            <TextField
              name="nameMember"
              value={nameMember}
              onChange={handleChange}
              sx={{ marginBottom: "16px" }}
              id="outlined-basic"
              label="Tên thành viên"
              variant="outlined"
            />
            <TextField
              name="taskMember"
              value={taskMember}
              onChange={handleChange}
              sx={{ marginBottom: "16px" }}
              id="outlined-multiline-static"
              label="Nhiệm vụ"
              multiline
              rows={4}
              defaultValue=""
              variant="outlined"
            />
            {!editMember ? (
              <Button
                variant="contained"
                sx={{ margin: "24px 0", float: "right" }}
                startIcon={<Add />}
                onClick={handleAddMember}
              >
                Thêm
              </Button>
            ) : (
              <div className="flexitems-center">
                <Button
                  variant="outlined"
                  sx={{ margin: "24px 16px", float: "right" }}
                  onClick={cancelEdit}
                >
                  Hủy
                </Button>
                <Button
                  variant="contained"
                  sx={{ margin: "24px 0", float: "right" }}
                  startIcon={<Save />}
                  onClick={handleSaveMember}
                >
                  Lưu
                </Button>
              </div>
            )}
          </div>
        </div>
        <div className="col-span-7">
          <TableContainer sx={{ maxHeight: 500 }} component={Paper}>
            <Table stickyHeader aria-label="custom-table">
              <TableHead>
                <TableRow>
                  <StyleTableCell align="center">Mã thành viên</StyleTableCell>
                  <StyleTableCell align="center">Tên thành viên</StyleTableCell>
                  <StyleTableCell align="center">Nhiệm vụ</StyleTableCell>
                  <StyleTableCell align="center">Chức năng</StyleTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {members?.map((member, index) => (
                  <StyledTableRow key={index}>
                    <StyleTableCell align="center">
                      {member?.idMember}
                    </StyleTableCell>
                    <StyleTableCell align="center">
                      {member?.nameMember}
                    </StyleTableCell>
                    <StyleTableCell align="center">
                      {member?.taskMember}
                    </StyleTableCell>
                    <StyleTableCell align="center">
                      <IconButton
                        color="primary"
                        size="medium"
                        variant="text"
                        onClick={() => {
                          uppdateMember(member?.idMember);
                        }}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        color="primary"
                        size="medium"
                        variant="text"
                        onClick={() => handelOpenDelete(member?.idMember)}
                      >
                        <Delete />
                      </IconButton>
                    </StyleTableCell>
                    <Modal
                      onClose={handleCancelDel}
                      keepMounted
                      open={confirmDel}
                    >
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
                            handleDeleteMember();
                          }}
                          variant="contained"
                          sx={{ margin: "24px 12px", float: "right" }}
                        >
                          Xóa
                        </Button>
                      </Box>
                    </Modal>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 15]}
            component="div"
            count={members.length || 0}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      </div>
    </>
  );
};

export default Member;
