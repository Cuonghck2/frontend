/* eslint-disable no-unused-vars */
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Backdrop,
  Box,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import {
  AcUnitRounded,
  DateRange,
  GroupRounded,
  Groups2Rounded,
  School,
} from "@mui/icons-material";
import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import { axisClasses } from "@mui/x-charts";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import request from "../../../utils/request";
import { listTopics } from "../../../slice/topicsSlice";
import { removeDuplicates } from "../../../utils/test";
const DashBoard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { topics } = useSelector((state) => state.topics);
  const [filtersData, setFiltersData] = useState([]);
  //Thống kê số lượng theo 4 tiêu chí
  const [totalCount, setTotalCount] = useState(0);
  const [totalUnit, setTotalUnit] = useState(0);
  const [totalStudent, setTotalStudent] = useState(0);
  const [totalTeacher, setTotalTeacher] = useState(0);
  //////////////////////////////////////////////////////
  const dispatch = useDispatch();
  useEffect(() => {
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
    fetchData();
  }, []);
  //Start filter

  useEffect(() => {
    setDataFilter((prev) => ({
      ...prev,
      removeDuplicateYear: YEAR,
      removeDuplicateUnit: UNIT,
    }));
  }, [topics]);

  const YEAR = removeDuplicates(
    topics.map((item) => {
      return dayjs(item?.timeStart).format("YYYY");
    })
  );
  // const removeDuplicateYear = Array.from(new Set(YEAR));
  const sortedYears = YEAR.sort((a, b) => a - b);
  const UNIT = removeDuplicates(
    topics.map((item) => item?.leader?.unit?.nameUnit)
  );
  // const removeDuplicateUnit = Array.from(new Set(UNIT));

  const [dataFilter, setDataFilter] = useState({
    removeDuplicateYear: null,
    removeDuplicateUnit: null,
  });

  const handleChange = (e) => {
    const { value, name } = e.target;
    const object = {
      removeDuplicateYear: YEAR,
      removeDuplicateUnit: UNIT,
    };
    console.log({ object, name, test: object[name] });
    console.log("🚀 ~ handleChange ~ object:", object);
    if (value === "ALL") {
      setDataFilter((prev) => ({
        ...prev,
        [name]: object[name].filter((option) => option !== "ALL"),
      }));
    } else {
      setDataFilter((prev) => ({ ...prev, [name]: [value] }));
    }
  };

  useEffect(() => {
    const dataFiltered = topics.filter((item) => {
      return (
        dataFilter.removeDuplicateYear?.includes(
          dayjs(item?.timeStart).format("YYYY")
        ) &&
        dataFilter.removeDuplicateUnit.includes(item?.leader?.unit?.nameUnit)
      );
    });

    setTotalCount(dataFiltered.length);
    setFiltersData(dataFiltered);
  }, [topics, dataFilter]);

  useEffect(() => {
    const filterUnit = filtersData.map((item) => item?.leader?.unit?.nameUnit);
    setTotalUnit(filterUnit.length);
  }, [filtersData, totalUnit]);

  useEffect(() => {
    const filterStudent = filtersData.filter(
      (item) => item?.typeTopic === "Sinh viên"
    );
    setTotalStudent(filterStudent.length);
  }, [filtersData, totalStudent]);

  useEffect(() => {
    const filterTeacher = filtersData.filter(
      (item) => item?.typeTopic === "Giảng viên"
    );
    setTotalTeacher(filterTeacher.length);
  }, [filtersData, totalTeacher]);
  //End filter

  //Chart col
  const chartSetting = {
    yAxis: [],
    width: 700,
    height: 400,
    sx: {
      [`.${axisClasses.left} .${axisClasses.label}`]: {
        transform: "translate(-20px, 0)",
      },
    },
  };
  const yearCounts = useMemo(() => {
    const counts = {};
    filtersData.forEach((item) => {
      const year = dayjs(item?.timeStart).format("YYYY");
      counts[year] = (counts[year] || 0) + 1;
    });
    return counts;
  }, [filtersData]);
  const totalStudentCounts = useMemo(() => {
    const studentCounts = {};
    const filterStudent = filtersData.filter(
      (item) => item?.typeTopic === "Sinh viên"
    );
    filterStudent.forEach((item) => {
      const year = dayjs(item?.timeStart).format("YYYY");
      studentCounts[year] = (studentCounts[year] || 0) + 1;
    });

    return studentCounts;
  }, [filtersData]);

  const totalTeacherCounts = useMemo(() => {
    const teacherCounts = {};
    const filterTeacher = filtersData.filter(
      (item) => item?.typeTopic === "Giảng viên"
    );
    filterTeacher.forEach((item) => {
      const year = dayjs(item?.timeStart).format("YYYY");
      teacherCounts[year] = (teacherCounts[year] || 0) + 1;
    });

    return teacherCounts;
  }, [filtersData]);
  const dataset = sortedYears.map((year) => {
    const totalTopic = yearCounts[year] || 0;
    const student = totalStudentCounts[year] || 0;
    const teacher = totalTeacherCounts[year] || 0;

    return {
      year,
      totalTopic,
      student,
      teacher,
    };
  });
  //End chart col

  //Chart Pie
  const unitCounts = useMemo(() => {
    const countUnit = {};
    filtersData.forEach((item) => {
      const unit = item?.leader?.unit?.nameUnit;
      countUnit[unit] = (countUnit[unit] || 0) + 1;
    });
    return countUnit;
  }, [filtersData]);

  const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF4242"];
  const defaultDataUnit = [];
  const dataUnit = UNIT
    ? UNIT.map((unit, index) => {
        const totalTopic = unitCounts[unit] || 0;
        const color = colors[index % colors.length];
        return {
          label: unit,
          value: totalTopic,
          color: color,
        };
      })
    : defaultDataUnit;
  const data = dataUnit;
  const sizing = {
    margin: { right: 5 },
    width: 500,
    height: 400,
  };
  const TOTAL = data.map((item) => item.value).reduce((a, b) => a + b, 0);

  const getArcLabel = (params) => {
    const percent = params.value / TOTAL;
    return `${(percent * 100).toFixed(0)}%` || "";
  };
  //End chart pie
  return (
    <div className="flex flex-col">
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
      <div>
        <FormControl size="small" sx={{ m: 1, minWidth: 200, float: "right" }}>
          <InputLabel id="demo-simple-select-label">Đơn vị</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Báo cáo đơn vị"
            defaultValue=""
            name="removeDuplicateUnit"
            onChange={handleChange}
          >
            <MenuItem value={"ALL"}>Tất cả</MenuItem>
            {UNIT.map((title, index) => {
              return (
                <MenuItem key={index} value={title}>
                  {title}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ m: 1, minWidth: 200, float: "right" }}>
          <InputLabel id="demo-simple-select-label">Năm</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Báo cáo năm"
            defaultValue=""
            name="removeDuplicateYear"
            onChange={handleChange}
          >
            <MenuItem value={"ALL"}>Tất cả</MenuItem>
            {sortedYears.map((title, index) => {
              return (
                <MenuItem key={index} value={title}>
                  {title}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </div>
      <div className="flex mt-8 justify-around">
        <div className="flex mr-5 flex-col px-3 py-4 w-[25%] rounded-md shadow-lg">
          <div className="flex justify-between items-center mb-5">
            <DateRange sx={{ fontSize: 30, marginRight: 2 }} color="primary" />
            <span className="font-normal text-base line-clamp-2">
              Tổng số lượng đề tài
            </span>
          </div>
          <div className="flex justify-between mt-5">
            <span className="font-medium text-3xl">{totalCount}</span>
          </div>
        </div>
        <div className="flex flex-col mr-5 px-3 py-4 w-[25%] rounded-md shadow-lg">
          <div className="flex items-center justify-between mb-5">
            <AcUnitRounded
              sx={{ fontSize: 30, marginRight: 2 }}
              color="primary"
            />
            <span className="font-normal text-base">
              Số lượng đề tài các đơn vị
            </span>
          </div>
          <div className="flex justify-between mt-5">
            <span className="font-medium text-3xl">{totalUnit}</span>
          </div>
        </div>
        <div className="flex flex-col mr-5 px-3 py-4 w-[25%] rounded-md shadow-lg">
          <div className="flex items-center justify-between mb-5">
            <School sx={{ fontSize: 30, marginRight: 2 }} color="primary" />
            <span className="font-normal text-base">
              Số lượng đề tài sinh viên
            </span>
          </div>
          <div className="flex justify-between mt-5">
            <span className="font-medium text-3xl">{totalStudent}</span>
          </div>
        </div>
        <div className="flex flex-col mr-5 px-3 py-4 w-[25%] rounded-md shadow-lg">
          <div className="flex items-center justify-between mb-5">
            <Groups2Rounded
              sx={{ fontSize: 30, marginRight: 2 }}
              color="primary"
            />
            <span className="font-normal text-base">
              Số lượng đề tài giảng viên
            </span>
          </div>
          <div className="flex justify-between mt-5">
            <span className="font-medium text-3xl">{totalTeacher}</span>
          </div>
        </div>
      </div>

      <div className="my-8 flex justify-center items-center">
        <div className="rounded-md shadow-lg mr-4">
          <h5 className="text-center my-5 text-2xl font-medium">
            Thống kê đề tài sinh viên và giảng viên
          </h5>
          {dataset.length > 0 && (
            <BarChart
              dataset={dataset || []}
              xAxis={[{ scaleType: "band", dataKey: "year" }]}
              series={[
                { dataKey: "totalTopic", label: "Tổng số đề tài" },
                { dataKey: "student", label: "Sinh viên" },
                { dataKey: "teacher", label: "Giảng viên" },
              ]}
              {...(chartSetting || {})}
            />
          )}
        </div>
        <div className="rounded-md shadow-lg">
          <h5 className="text-center my-5 text-2xl font-medium">
            Thống kê đề tài các viện
          </h5>
          {dataset.length > 0 && (
            <PieChart
              series={[
                {
                  outerRadius: 150,
                  data,
                  arcLabel: getArcLabel,
                },
              ]}
              sx={{
                [`& .${pieArcLabelClasses.root}`]: {
                  fill: "white",
                  fontSize: 14,
                },
              }}
              {...sizing}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
