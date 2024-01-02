import React, { useEffect, useRef, useState } from "react";
import Chart from 'chart.js/auto';
import { Typography } from "@mui/material";
import { AcUnitRounded, DateRange, GroupRounded, Groups2Rounded, School } from "@mui/icons-material";
function createData(id, nameTopic, nameTeach, type, unit, year, level, typeResult, awardlevel) {
    return { id, nameTopic, nameTeach, type, unit, year, level, typeResult, awardlevel };
}
const rows = [
    createData('DT01', "Quản lý nhà xe", "Nguyễn Đức Cương", "Sinh viên", "CNTT", "2023", "Trường", "Xuất sắc", "Đặc biệt"),
    createData('DT01', "Quản lý nhà xe", "Nguyễn Đức Cương", "Sinh viên", "CNTT", "2024", "Trường", "Xuất sắc", "Đặc biệt"),
    createData('DT01', "Quản lý nhà xe", "Nguyễn Đức Cương", "Sinh viên", "CNTT", "2023", "Trường", "Xuất sắc", "Đặc biệt"),
    createData('DT01', "Quản lý nhà xe", "Nguyễn Đức Cương", "Sinh viên", "CNTT", "2023", "Trường", "Xuất sắc", "Đặc biệt"),
    createData('DT01', "Quản lý nhà xe", "Nguyễn Đức Cương", "Sinh viên", "CNTT", "2024", "Trường", "Xuất sắc", "Đặc biệt"),
    createData('DT01', "Quản lý nhà xe", "Nguyễn Đức Cương", "Giảng viên", "CNTT", "2025", "Trường", "Xuất sắc", "Đặc biệt"),
    createData('DT01', "Quản lý nhà xe", "Nguyễn Đức Cương", "Sinh viên", "CNTT", "2025", "Trường", "Xuất sắc", "Đặc biệt"),
    createData('DT01', "Quản lý nhà xe", "Nguyễn Đức Cương", "Sinh viên", "CNTT", "2025", "Trường", "Xuất sắc", "Đặc biệt"),
]
const HomeAdmin = () => {

    return (
        <div>
            <Typography variant="h5">Biểu đồ thống kê</Typography>
            <div className="flex mt-8 justify-around">
                <div className="flex mr-5 flex-col px-3 py-4 w-[25%] rounded-md shadow-lg">
                    <div className="flex justify-between items-center mb-5">
                        <DateRange sx={{ fontSize: 30, marginRight: 2 }} color="primary" />
                        <span className="font-normal text-base line-clamp-2">Số lượng đề tài năm hiện tại</span>
                    </div>
                    <div className="flex justify-between mt-5">
                        <span className="font-medium text-xl">2000</span>
                        <div className="text-center px-3 -py-1 rounded-full bg-[#ffefd9]">
                            <span className="font-medium text-xs text-[#ffa16c]">20%</span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col mr-5 px-3 py-4 w-[25%] rounded-md shadow-lg">
                    <div className="flex items-center justify-between mb-5">
                        <AcUnitRounded sx={{ fontSize: 30, marginRight: 2 }} color="primary" />
                        <span className="font-normal text-base">Số lượng đề tài các đơn vị</span>
                    </div>
                    <div className="flex justify-between mt-5">
                        <span className="font-medium text-xl">4000</span>
                        <div className="text-center px-3 -py-1 rounded-full bg-[#ffefd9]">
                            <span className="font-medium text-xs text-[#ffa16c]">20%</span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col mr-5 px-3 py-4 w-[25%] rounded-md shadow-lg">
                    <div className="flex items-center justify-between mb-5">
                        <School sx={{ fontSize: 30, marginRight: 2 }} color="primary" />
                        <span className="font-normal text-base">Số lượng đề tài sinh viên</span>
                    </div>
                    <div className="flex justify-between mt-5">
                        <span className="font-medium text-xl">6000</span>
                        <div className="text-center px-3 -py-1 rounded-full bg-[#ffefd9]">
                            <span className="font-medium text-xs text-[#ffa16c]">20%</span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col mr-5 px-3 py-4 w-[25%] rounded-md shadow-lg">
                    <div className="flex items-center justify-between mb-5">
                        <Groups2Rounded sx={{ fontSize: 30, marginRight: 2 }} color="primary" />
                        <span className="font-normal text-base">Số lượng đề tài giảng viên</span>
                    </div>
                    <div className="flex justify-between mt-5">
                        <span className="font-medium text-xl">3000</span>
                        <div className="text-center px-3 -py-1 rounded-full bg-[#ffefd9]">
                            <span className="font-medium text-xs text-[#ffa16c]">20%</span>
                        </div>
                    </div>
                </div>
                <div className="">

                </div>
            </div>

        </div>
    )
}

export default HomeAdmin