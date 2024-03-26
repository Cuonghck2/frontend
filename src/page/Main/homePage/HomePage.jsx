/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import request from "../../../utils/request";
import Carousel from "./component/Carousel";
import { logoutUserAsync } from "../../../slice/authSlice";
import { Backdrop, CircularProgress, Menu, MenuItem } from "@mui/material";
import { Person } from "@mui/icons-material";
import Header from "./component/Header";

const HomePage = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [studentTopic, setStudentTopic] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLogin(true);
    }
  }, []);
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
      <Box className="w-[1200px] mx-auto ">
        <Header
          setIsLoading={setIsLoading}
          setIsLogin={setIsLogin}
          isLogin={isLogin}
          setStudentTopic={setStudentTopic}
        />
        <CssBaseline />
        <Box className="w-full mt-24 mx-12">
          <Carousel />
        </Box>
        <Box sx={{ marginTop: "50px" }}>
          <Typography
            variant="h4"
            sx={{
              textAlign: "center",
              fontWeight: "bold",
              marginBottom: "24px",
              color: "#1976d2",
            }}
          >
            NGÀNH ĐÀO TẠO
          </Typography>
          <div className="grid grid-cols-3 gap-12">
            <div className="flex flex-col items-center justify-center rounded-md shadow-md">
              <img
                className="rounded-t-md h-[210px]"
                src="public/revenue-operations-concept_23-2150902406.avif"
                alt=""
              />
              <span className="text-2xl text-center font-medium  mt-4 text-[#176dc2] p-5">
                Tài chính - Ngân hàng
              </span>
            </div>
            <div className="flex flex-col items-center justify-center rounded-md shadow-md">
              <img
                className="rounded-t-md h-[210px] w-full "
                src="public/person-using-ai-tool-job.jpg"
                alt=""
                height={"210px"}
              />
              <span className="text-2xl font-medium  mt-4 text-[#176dc2] p-5">
                Công nghệ thông tin
              </span>
            </div>
            <div className="flex flex-col items-center justify-center rounded-md shadow-md">
              <img
                className="rounded-t-md h-[210px] w-full"
                src="public/businessmen-hands-white-table-with-documents-drafts.jpg"
                alt=""
                height={"210px"}
              />
              <span className="text-2xl font-medium  mt-4 text-[#176dc2] p-5">
                Kế toán - Kiểm toán
              </span>
            </div>
            <div className="flex flex-col items-center justify-center rounded-md shadow-md">
              <img
                className="rounded-t-md h-[210px] w-full"
                src="public/different-language-speech-bubble-hello-concept.jpg"
                alt=""
                height={"210px"}
              />
              <span className="text-2xl font-medium  mt-4 text-[#176dc2] p-5">
                Ngôn ngữ nước ngoài
              </span>
            </div>
            <div className="flex flex-col items-center justify-center rounded-md shadow-md">
              <img
                className="rounded-t-md h-[210px] w-full"
                src="public/young-ethnic-coworkers-using-tablet.jpg"
                alt=""
                height={"210px"}
              />
              <span className="text-2xl font-medium  mt-4 text-[#176dc2] p-5">
                Quản trị kinh doanh
              </span>
            </div>
            <div className="flex flex-col items-center justify-center rounded-md shadow-md">
              <img
                className="rounded-t-md h-[210px] w-full"
                src="public/still-life-dollar-coins-scale.jpg"
                alt=""
                height={"210px"}
              />
              <span className="text-2xl font-medium  mt-4 text-[#176dc2] p-5">
                Luật kinh tế
              </span>
            </div>
          </div>
        </Box>
        <Box sx={{ margin: "50px 0" }}>
          <Typography
            variant="h4"
            sx={{
              textAlign: "center",
              fontWeight: "bold",
              margin: "20px 0",
              color: "#176dc2",
            }}
          >
            TIN TỨC
          </Typography>
          <div className="grid grid-cols-3 gap-12">
            <div className="col-span-2">
              <Typography
                variant="h4"
                sx={{
                  textAlign: "start",
                  fontWeight: "semi-bold",
                  fontSize: "24px",
                  color: "#1976d2",
                  marginBottom: "24px",
                }}
              >
                Tin Mới
              </Typography>
              <div className="grid grid-cols-2 gap-8">
                <div className="flex flex-col border-[1px] hover:cursor-pointer">
                  <img
                    src="public/nghien-cuu-khoa-hoc-FBU.jpg"
                    alt=""
                    className=" h-[210px] w-full"
                  />
                  <div className="py-3 px-3">
                    <p className="font-normal text-sm italic">23/03/2024</p>
                    <h6 className="font-semibold mt-2">
                      {" "}
                      Quyết định về việc phê duyệt Kế hoạch nghiên cứu khoa học
                      năm học 2023-2024{" "}
                    </h6>
                  </div>
                </div>
                <div className="flex flex-col border-[1px] hover:cursor-pointer">
                  <img
                    src="public/Picture1-00.jpg"
                    alt=""
                    className=" h-[210px] w-full"
                  />
                  <div className="py-3 px-3">
                    <p className="font-normal text-sm italic">23/03/2024</p>
                    <h6 className="font-semibold mt-2">
                      Hội thảo khoa học “Đảm bảo liêm chính học thuật trong hoạt
                      động đào tạo và nghiên cứu khoa học tại cơ sở giáo dục đại
                      học”
                    </h6>
                  </div>
                </div>
                <div className="flex flex-col border-[1px] hover:cursor-pointer">
                  <img
                    src="public/hieu-qua-tu-van-tuyen-sinh-nganh-quan-tri-kinh-doanh-hinh2.jpg"
                    alt=""
                    className=" h-[210px] w-full"
                  />
                  <div className="py-3 px-3">
                    <p className="font-normal text-sm italic">23/03/2024</p>
                    <h6 className="font-semibold mt-2">
                      Ban hành quy định về liêm chính trong đào tạo và NCKH của
                      trường ĐH TCNH Hà Nội
                    </h6>
                  </div>
                </div>
                <div className="flex flex-col border-[1px] hover:cursor-pointer">
                  <img
                    src="public/h1.jpg"
                    alt=""
                    className=" h-[210px] w-full"
                  />
                  <div className="py-3 px-3">
                    <p className="font-normal text-sm italic">23/03/2024</p>
                    <h6 className="font-semibold mt-2">
                      Quy định về quản lý đề tài khoa học và công nghệ
                    </h6>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-1">
              <Typography
                variant="h4"
                sx={{
                  textAlign: "start",
                  fontWeight: "semi-bold",
                  fontSize: "24px",
                  color: "#1976d2",
                  marginBottom: "24px",
                }}
              >
                Đề tài mới cập nhật
              </Typography>
              <div className="">
                <div className="flex flex-col items-start justify-start bg-[#6db0f2] p-4 hover:cursor-pointer">
                  <span className="text-base font-medium">
                    Tên đề tài: Quản lý đề tài nghiên cứu khoa học FBU
                  </span>
                  <span className="text-base font-medium">
                    Ngày đăng ký: 23/12/2023
                  </span>
                  <span className="text-base font-medium">
                    Tên chủ nhiệm: Nguyễn Đức Cương
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Box>
      </Box>
    </>
  );
};

export default HomePage;
