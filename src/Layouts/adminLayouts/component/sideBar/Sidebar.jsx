/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  AttachFile,
  Book,
  Category,
  Flag,
  People,
  Person3,
  PieChart,
} from "@mui/icons-material";
const SideBar = () => {
  const [active, setActive] = useState("DashBoard");
  const location = useLocation();
  const router = [
    {
      path: "/dashboard",
      text: "Thống kê",
      icon: <PieChart className="text-[#d6e3e4]" />,
    },
    {
      path: "/update-user",
      text: "Quản lý người dùng",
      icon: <People className="text-[#d6e3e4]" />,
    },
    {
      path: "/update-categories",
      text: "Quản lý danh mục",
      icon: <Category className="text-[#d6e3e4]" />,
    },
    {
      path: "/update-leader",
      text: "Chủ nhiệm đề tài",
      icon: <Person3 className="text-[#d6e3e4]" />,
    },
    {
      path: "/update-topic",
      text: "Cập nhật đề tài",
      icon: <Book className="text-[#d6e3e4]" />,
    },
    {
      path: "/update-file",
      text: "Quản lý tài liệu",
      icon: <AttachFile className="text-[#d6e3e4]" />,
    },
    {
      path: "/report",
      text: "Báo cáo",
      icon: <Flag className="text-[#d6e3e4]" />,
    },
  ];
  useEffect(() => {
    const currentPath = location.pathname;
    const activeItem = router.find((item) => item.path === currentPath);
    if (activeItem) {
      setActive(activeItem.text);
    }
  }, [location, router]);
  const navigate = useNavigate();
  const handleActive = (path, text) => {
    navigate(path);
    setActive(text);
  };
  return (
    <div className="fixed bg-[#212631] top-0 bottom-0 max-w-[270px]">
      <div className="px-2 py-3 border-[1px] border-[#323a49] flex justify-center items-center flex-wrap">
        <img src="public/Group-134.png" alt="" className="w-[50px]" />
        <span className="text-[#d6e3e4] text-center font-semibold">
          Trường Đại học Tài chính - Ngân hàng Hà Nội
        </span>
      </div>
      <div className="p-[8px]">
        <ul className="flex flex-col">
          {router.map((item, index) => {
            return (
              <div
                key={index}
                className={`flex items-center px-[16px] py-[12px] rounded-lg hover:cursor-pointer hover:bg-[#2a303d] ${
                  active == item.text ? "bg-[#2a303d]" : ""
                }`}
                onClick={() => {
                  handleActive(item.path, item.text);
                }}
              >
                <span className="mr-3">{item.icon}</span>
                <span className="text-[#d6e3e4]">{item.text}</span>
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
