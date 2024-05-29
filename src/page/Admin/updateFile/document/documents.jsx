/* eslint-disable no-unused-vars */
import {
  Add,
  CloudUpload,
  Delete,
  Download,
  Edit,
  Save,
} from "@mui/icons-material";
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
import React, { useEffect, useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import request from "../../../../utils/request";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  StyleTableCell,
  StyledTableRow,
} from "../../../../Layouts/adminLayouts/component/customMUI/customMUI";
import {
  addDocsAsync,
  deleteDocsAsync,
  listDocs,
} from "../../../../slice/docsSlice";

const Document = () => {
  const { id } = useParams();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [emtyError, setEmtyError] = useState(false);
  const [confirmDel, setConfirmDel] = useState(false);
  const [selectIdDoc, setSelectIdDoc] = useState("");
  const [formData, setFormData] = useState({
    typeDocs: "",
    file: "",
    idTopic: id,
  });
  const { docs } = useSelector((state) => state.docs);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await request(`/api/document/${id}`);
        dispatch(listDocs(res?.data));
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);
  const { typeDocs, file } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleDownload = async (id) => {
    try {
      const response = await request.get(`/api/document/download/${id}`, {
        responseType: "blob",
      });
      console.log(response);

      // Xử lý nội dung tệp tin
      const blob = new Blob([response.data], {
        type: response.headers["content-type"],
      });
      const url = window.URL.createObjectURL(blob);

      // Tạo một thẻ a để tải xuống tệp tin
      const link = document.createElement("a");
      link.href = url;

      // Lấy tên tệp tin từ response headers
      const contentDisposition = response.headers["content-disposition"];
      let fileName = "TaiLieu.doc";
      if (contentDisposition) {
        const fileNameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
        const match = fileNameRegex.exec(contentDisposition);
        if (match != null && match[1]) {
          fileName = match[1].replace(/['"]/g, "");
        }
      }
      link.download = fileName;

      // Kích hoạt sự kiện click để tải xuống tệp tin
      link.click();

      // Giải phóng URL đã tạo ra
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error);
    }
  };
  //add
  const handleAddDocs = () => {
    dispatch(addDocsAsync(formData));
    setFormData({
      typeDocs: "",
      file: "",
      idTopic: id,
    });
  };
  const onDrop = useCallback(
    (acceptedFiles) => {
      setFormData({ ...formData, file: acceptedFiles[0] });
    },
    [formData]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });
  const handelOpenDelete = (id) => {
    setConfirmDel(true);
    setSelectIdDoc(id);
  };
  const handleDelete = async () => {
    dispatch(deleteDocsAsync(selectIdDoc));
    setConfirmDel(false);
  };
  const handleCancelDel = () => {
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
        Tài liệu
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
              name="typeDocs"
              sx={{ marginBottom: "16px" }}
              id="outlined-basic"
              label="Loại tài liệu"
              variant="outlined"
              onChange={handleChange}
            />
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <div className="flex items-center hover:cursor-pointer">
                <IconButton>
                  <CloudUpload />
                </IconButton>
                <p>Chọn tệp tải lên</p>
              </div>
            </div>
            <Button
              variant="contained"
              sx={{ margin: "24px 0", float: "right" }}
              startIcon={<Add />}
              onClick={handleAddDocs}
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
                  <StyleTableCell align="center">STT</StyleTableCell>
                  <StyleTableCell align="center">Loại tài liệu</StyleTableCell>
                  <StyleTableCell align="center">Tên tài liệu</StyleTableCell>
                  <StyleTableCell align="center">Chức năng</StyleTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {docs?.map((item, index) => (
                  <StyledTableRow key={index}>
                    <StyleTableCell align="center">{index + 1}</StyleTableCell>
                    <StyleTableCell align="center">
                      {item?.typeDocs}
                    </StyleTableCell>
                    <StyleTableCell align="center">{item?.file}</StyleTableCell>
                    <StyleTableCell align="center">
                      <IconButton
                        color="primary"
                        size="medium"
                        variant="text"
                        onClick={() => handleDownload(item?.id)}
                      >
                        <Download />
                      </IconButton>
                      <IconButton
                        color="primary"
                        size="medium"
                        variant="text"
                        onClick={() => handelOpenDelete(item?.id)}
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
                          variant="contained"
                          sx={{ margin: "24px 12px", float: "right" }}
                          onClick={handleDelete}
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
            count={docs?.length || 0}
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

export default Document;
