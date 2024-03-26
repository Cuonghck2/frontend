/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { Add, Delete, Edit, Search } from "@mui/icons-material";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Divider,
  IconButton,
  InputBase,
  Modal,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import {
  StyleTableCell,
  StyledTableRow,
} from "../../../Layouts/adminLayouts/component/customMUI/customMUI";
import request from "../../../utils/request";
import { useDispatch, useSelector } from "react-redux";
import ModalAddCategories from "./component/ModalAddCategories";
import {
  addCategoriesAsync,
  deleteCategoriesAsync,
  listCategories,
  updateCategoriesAsync,
} from "../../../slice/categoriesSlice";
import ModalEditCategories from "./component/ModalEditCategories";
const styleModal = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "#fff",
  boxShadow: 24,
  borderRadius: "12px",
  padding: 4,
};
const updateCategories = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { categories } = useSelector((state) => state.categories);
  const [isLoading, setIsLoading] = useState(true);
  const [emtyError, setEmtyError] = useState(false);
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [confirmDel, setConfirmDel] = useState(false);
  const [selectIdCategories, setSelectIdCategories] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await request("/api/categories");
        dispatch(listCategories(res?.data));
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);
  //add
  const handleAddCategories = (data) => {
    const { idCategories, nameCategories } = data;
    if (!idCategories || !nameCategories) {
      setEmtyError(true);
    } else {
      dispatch(addCategoriesAsync(data));
      setOpenModalAdd(false);
    }
  };
  //edit
  const handleEditCategories = (data) => {
    dispatch(updateCategoriesAsync(data));
    setOpenModalEdit(false);
  };
  //delete
  const handleDeleteCategories = () => {
    dispatch(deleteCategoriesAsync(selectIdCategories));
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
  const handleOpenModalAdd = () => {
    setOpenModalAdd(true);
  };
  const handleCloseModalAdd = () => setOpenModalAdd(false);
  const handleOpenModalEdit = () => setOpenModalEdit(true);
  const handleCloseModalEdit = () => setOpenModalEdit(false);

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
      <Button
        variant="contained"
        startIcon={<Add />}
        onClick={handleOpenModalAdd}
      >
        Thêm
      </Button>
      <Paper sx={{ width: "100%", overflow: "hidden", marginTop: "16px" }}>
        <TableContainer sx={{ maxHeight: 500 }} component={Paper}>
          <Table stickyHeader aria-label="custom-table">
            <TableHead>
              <TableRow>
                <StyleTableCell align="center">Mã danh mục</StyleTableCell>
                <StyleTableCell align="center">Tên danh mục </StyleTableCell>
                <StyleTableCell align="center">Chức năng</StyleTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.length ? (
                (rowsPerPage > 0
                  ? categories?.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : categories
                )?.map((category, index) => {
                  return (
                    <StyledTableRow key={index}>
                      <StyleTableCell align="center">
                        {category?.idCategories}
                      </StyleTableCell>
                      <StyleTableCell align="center">
                        {category?.nameCategories}
                      </StyleTableCell>
                      <StyleTableCell align="center">
                        <IconButton
                          color="primary"
                          size="medium"
                          variant="text"
                          onClick={() => {
                            setModalData(category);
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
                            setSelectIdCategories(category?.idCategories);
                            setConfirmDel(true);
                          }}
                        >
                          <Delete />
                        </IconButton>
                        <Modal
                          keepMounted
                          onClose={() => setConfirmDel(false)}
                          open={confirmDel}
                        >
                          <Box sx={styleModal}>
                            <Typography variant="h5">
                              Bạn có chắc chắn muốn xóa không?
                            </Typography>
                            <Button
                              variant="text"
                              sx={{ margin: "24px 0", float: "right" }}
                              onClick={() => {
                                setConfirmDel(false);
                              }}
                            >
                              Hủy Bỏ
                            </Button>
                            <Button
                              variant="contained"
                              sx={{ margin: "24px 12px", float: "right" }}
                              onClick={() => {
                                handleDeleteCategories();
                              }}
                            >
                              Xóa
                            </Button>
                          </Box>
                        </Modal>
                      </StyleTableCell>
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
          count={categories?.length || 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <ModalAddCategories
        openModalAdd={openModalAdd}
        modalData={modalData}
        handleAddCategories={handleAddCategories}
        handleUpdateCategories={handleEditCategories}
        handleCancelAddCategories={handleCloseModalAdd}
        emtyError={emtyError}
      />
      <ModalEditCategories
        modalData={modalData}
        openModalEdit={openModalEdit}
        handleCancelEditCategories={handleCloseModalEdit}
        handleEditCategories={handleEditCategories}
      />
    </>
  );
};

export default updateCategories;
