/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Add, Delete, Edit } from "@mui/icons-material";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  FormControl,
  IconButton,
  InputBase,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Select,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import {
  StyleTableCell,
  StyledTableRow,
} from "../../../Layouts/adminLayouts/component/customMUI/customMUI";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import request from "../../../utils/request";

import {
  addUserAsync,
  deleteUserAsync,
  listUsers,
  updateUserAsync,
} from "../../../slice/usersSlice";
import ModalAddUser from "./component/modalUser/ModalUser";
import ModalEditUser from "./component/modalUser/ModalEditUser";
const UpdateUsers = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [typeSearch, setTypeSearch] = useState("");
  const [emtyError, setEmtyError] = useState(false);
  const [dataUsers, setDataUsers] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [modalData, setModalData] = useState(false);
  const [confirmDel, setConfirmDel] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selecIdUser, setSelecIdUser] = useState(null);

  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.users);
  //get users
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const res = await request("/api/users");
      dispatch(listUsers(res?.data));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  //search
  useEffect(() => {
    if (typeSearch === "Mã người dùng") {
      setDataUsers(users.filter((user) => user?.idUser.includes(searchValue)));
    } else if (typeSearch === "Tên người dùng") {
      setDataUsers(
        users.filter((user) => user?.username.includes(searchValue))
      );
    } else {
      setDataUsers(users);
    }
  }, [users, searchValue, typeSearch]);
  //add users
  const handleAddUser = (data) => {
    const {
      idUser,
      fullName,
      username,
      password,
      password_confirmation,
      idUnit,
    } = data;
    if (
      !idUser ||
      !fullName ||
      !username ||
      !password ||
      !password_confirmation ||
      !idUnit
    ) {
      setEmtyError(true);
    } else {
      dispatch(addUserAsync(data));
      setEmtyError(false);
      setOpenModalAdd(false);
    }
  };
  //edit users
  const handleEditUser = (data) => {
    dispatch(updateUserAsync(data));
    setOpenModalEdit(false);
  };

  //delete users
  const handleDeleteUser = () => {
    dispatch(deleteUserAsync(selecIdUser));
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
  const handleChangeType = (event) => {
    setTypeSearch(event.target.value);
  };

  //view modal add
  const handleOpenModal = () => {
    setOpenModalAdd(true);
  };
  const handleCloseModalAdd = () => {
    setOpenModalAdd(false);
  };

  //view modal edit
  const handleOpenModalEdit = () => {
    setOpenModalEdit(true);
  };
  const handleCloseModalEdit = () => {
    setOpenModalEdit(false);
  };

  const handleConfirmDel = () => {
    setConfirmDel(true);
  };
  const handleCancelDel = () => {
    setConfirmDel(false);
  };

  return (
    <>
      {isLoading && (
        <Backdrop
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
        </Backdrop>
      )}
      <Button variant="contained" startIcon={<Add />} onClick={handleOpenModal}>
        Thêm
      </Button>
      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: 300,
          float: "right",
          marginBottom: "16px",
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1, p: "6px" }}
          placeholder="Nhập từ khóa để tìm kiếm"
          inputProps={{ "aria-label": "search" }}
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
        />
      </Paper>
      <FormControl size="small" sx={{ m: 1, minWidth: 200, float: "right" }}>
        <InputLabel id="demo-simple-select-label">Tìm Kiếm</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={typeSearch}
          label="Tìm kiếm"
          onChange={handleChangeType}
        >
          <MenuItem value={"Mã người dùng"}>Mã người dùng</MenuItem>
          <MenuItem value={"Tên người dùng"}>Tên người dùng</MenuItem>
        </Select>
      </FormControl>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 500 }} component={Paper}>
          <Table stickyHeader aria-label="custom-table">
            <TableHead>
              <TableRow>
                <StyleTableCell align="center">Mã người dùng</StyleTableCell>
                <StyleTableCell align="center">Tên người dùng</StyleTableCell>
                <StyleTableCell align="center">Tài khoản</StyleTableCell>
                <StyleTableCell align="center">Đơn vị</StyleTableCell>
                <StyleTableCell align="center">Chức năng</StyleTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.length ? (
                (rowsPerPage > 0
                  ? dataUsers.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : users
                ).map((user, index) => {
                  return (
                    <StyledTableRow key={index}>
                      <StyleTableCell align="center">
                        {user?.idUser}
                      </StyleTableCell>
                      <StyleTableCell align="center">
                        {user?.fullName}
                      </StyleTableCell>
                      <StyleTableCell align="center">
                        {user?.username}
                      </StyleTableCell>
                      <StyleTableCell align="center">
                        {user?.unit?.nameUnit}
                      </StyleTableCell>
                      <StyleTableCell align="center">
                        <IconButton
                          color="primary"
                          size="medium"
                          variant="text"
                          onClick={() => {
                            setModalData(user);
                            handleOpenModalEdit();
                          }}
                        >
                          <Edit />
                        </IconButton>
                        <IconButton
                          color="primary"
                          size="medium"
                          variant="text"
                          onClick={() => {
                            setSelecIdUser(user.idUser);
                            handleConfirmDel();
                          }}
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
                          <Typography
                            variant="h5"
                            sx={{ marginBottom: "15px" }}
                          >
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
                              handleDeleteUser();
                            }}
                            variant="contained"
                            sx={{ margin: "24px 12px", float: "right" }}
                          >
                            Xóa
                          </Button>
                        </Box>
                      </Modal>
                    </StyledTableRow>
                  );
                })
              ) : (
                <></>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={users?.length || 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <ModalAddUser
        modalData={modalData}
        onCloseModalAdd={handleCloseModalAdd}
        openModaAdd={openModalAdd}
        handleAddUser={handleAddUser}
        emtyError={emtyError}
      />
      <ModalEditUser
        modalData={modalData}
        handleCancelEditUser={handleCloseModalEdit}
        openModalEdit={openModalEdit}
        handleEditUser={handleEditUser}
        emtyError={emtyError}
      />
    </>
  );
};

export default UpdateUsers;
