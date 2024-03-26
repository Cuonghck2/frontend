/* eslint-disable no-unused-vars */
import { Add, Delete, Edit } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
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
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  StyleTableCell,
  StyledTableRow,
} from "../../../../Layouts/adminLayouts/component/customMUI/customMUI";

const Member = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { id } = useParams();

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
        Thành viên của chủ nhiệm {id}
      </Typography>
      <div className="grid grid-cols-10">
        <div className="col-span-3 mx-6">
          <div className="flex flex-col w-max-[400px]">
            <TextField
              sx={{ marginBottom: "16px" }}
              id="outlined-basic"
              label="Mã thành viên"
              variant="outlined"
            />
            <TextField
              sx={{ marginBottom: "16px" }}
              id="outlined-basic"
              label="Tên thành viên"
              variant="outlined"
            />
            <TextField
              sx={{ marginBottom: "16px" }}
              id="outlined-multiline-static"
              label="Nhiệm vụ"
              multiline
              rows={4}
              defaultValue=""
              variant="outlined"
            />
            <Button
              variant="contained"
              sx={{ margin: "24px 0", float: "right" }}
              startIcon={<Add />}
            >
              Thêm
            </Button>
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
                <StyledTableRow>
                  <StyleTableCell align="center"></StyleTableCell>
                  <StyleTableCell align="center"></StyleTableCell>
                  <StyleTableCell align="center"></StyleTableCell>
                  <StyleTableCell align="center">
                    <IconButton color="primary" size="medium" variant="text">
                      <Edit />
                    </IconButton>
                    <IconButton color="primary" size="medium" variant="text">
                      <Delete />
                    </IconButton>
                  </StyleTableCell>
                </StyledTableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 15]}
            component="div"
            //   count={s?.length || 0}
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
