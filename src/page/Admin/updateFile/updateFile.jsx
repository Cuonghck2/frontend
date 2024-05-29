/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Add, Delete, Edit, FileOpen, Topic } from "@mui/icons-material";
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
import { useNavigate } from "react-router-dom";
import { listTopics } from "../../../slice/topicsSlice";
const UpdateFile = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [typeSearch, setTypeSearch] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const naviagate = useNavigate();

  const { topics } = useSelector((state) => state.topics);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const res = await request("/api/topics");
      dispatch(listTopics(res?.data));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  console.log(topics);

  useEffect(() => {
    fetchData();
  }, []);
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
          <MenuItem value={"Mã chủ nhiệm"}>Mã đề tài</MenuItem>
          <MenuItem value={"Tên chủ nhiệm"}>Tên chủ nhiệm</MenuItem>
          <MenuItem value={"Đơn vị"}>Đơn vị</MenuItem>
        </Select>
      </FormControl>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 500 }} component={Paper}>
          <Table stickyHeader aria-label="custom-table">
            <TableHead>
              <TableRow>
                <StyleTableCell align="center">STT</StyleTableCell>
                <StyleTableCell align="center">Tên chủ nhiệm</StyleTableCell>
                <StyleTableCell align="center">Tên đề tài</StyleTableCell>
                <StyleTableCell align="center">Đơn vị</StyleTableCell>
                <StyleTableCell align="center">Tệp dữ liệu</StyleTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {topics.length ? (
                (rowsPerPage > 0
                  ? topics.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : leaders
                ).map((topic, index) => {
                  return (
                    <StyledTableRow key={index}>
                      <StyleTableCell align="center">
                        {index + 1}
                      </StyleTableCell>
                      <StyleTableCell align="center">
                        {topic?.leader?.nameLeader}
                      </StyleTableCell>
                      <StyleTableCell align="center">
                        {topic?.nameTopic}
                      </StyleTableCell>
                      <StyleTableCell align="center">
                        {topic?.leader?.unit?.nameUnit}
                      </StyleTableCell>
                      <StyleTableCell align="center">
                        <IconButton
                          color="primary"
                          size="large"
                          variant="text"
                          onClick={() =>
                            naviagate(
                              `/update-file/documents/${topic?.idTopic}`
                            )
                          }
                        >
                          <Topic />
                        </IconButton>
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
          count={topics?.length || 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
};

export default UpdateFile;
