import React from "react";
import "../App.css";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Cards from "./Cards";
import Stack from "@mui/material/Stack";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import { useState, useEffect, useMemo } from "react";
import { useTheme } from "@mui/material/styles";

import moment from "moment";
import momentTz from "moment-timezone";
import "moment/dist/locale/ar";
moment.locale("ar");

export default function MainContent() {
  const theme = useTheme();

  // Set Time
  const [nextPray, setNextPray] = useState(null);
  // Timer For Next
  const [nextPrayTime, setNextPrayTime] = useState(null);
  // Set Timings
  const [timings, setTimings] = useState({});
  // Set City
  const [city, setCity] = useState({
    name: "جمهورية مصر العربية",
    latitude: 30.05,
    longitude: 31.25,
    method: 5,
  });
  useEffect(() => {
    axios
      .get(
        `https://api.aladhan.com/v1/timings?latitude=${city.latitude}&longitude=${city.longitude}&method=${city.method}&school=0`
      )
      .then((res) => {
        setTimings(res.data.data.timings);
      });
  }, [city]);
  // Handle Change
  let handleChange = (event) => {
    setCity(event.target.value);
  };
  // Handle next pray

  // Hold Times
  const formatPrayerData = (timings) => {
    if (!timings || Object.keys(timings).length === 0) return [];
    return [
      { name: "الفجر", time: timings.Fajr, img: "/imgs/الفجر.jpg" },
      { name: "الظهر", time: timings.Dhuhr, img: "/imgs/الظهر.jpg" },
      { name: "العصر", time: timings.Asr, img: "/imgs/العصر.jpg" },
      { name: "المغرب", time: timings.Maghrib, img: "/imgs/المغرب.jpg" },
      { name: "العشاء", time: timings.Isha, img: "/imgs/العشاء.jpg" },
    ];
  };
  // Cities Array
  const cityInfo = [
    {
      name: "جمهورية مصر العربية",
      latitude: 30.05,
      longitude: 31.25,
      method: 5,
    },
    {
      name: "المملكة العربية السعودية",
      latitude: 21.42,
      longitude: 39.83,
      method: 4,
    },
  ];

  const cityMenus = cityInfo.map((city) => {
    return (
      <MenuItem
        value={{
          name: city.name,
          latitude: city.latitude,
          longitude: city.longitude,
          method: city.method,
        }}
      >
        {city.name}
      </MenuItem>
    );
  });
  // Reaload just 1 time
  const prayersData = useMemo(() => {
    return formatPrayerData(timings);
  }, [timings]);

  const prayerCards = prayersData.map((pray) => {
    return (
      <Cards
        name={pray.name}
        time={pray.time}
        img={pray.img}
        nextPray={nextPray}
      />
    );
  });
  // Timer
  useEffect(() => {
    let interval = setInterval(() => {
      setCountDown();
    }, 1000);
    return () => clearInterval(interval);
  }, [timings]);
  // Set Count Down
  const setCountDown = () => {
    let timePerCity;

    if (city.name === "جمهورية مصر العربية") {
      timePerCity = moment.tz("Africa/Cairo");
    } else if (city.name === "المملكة العربية السعودية") {
      timePerCity = moment.tz("Asia/Riyadh");
    }

    let momentNow = timePerCity;

    let prayerIndex = null;

    if (
      momentNow.isAfter(moment(timings["Fajr"], "hh:mm")) &&
      momentNow.isBefore(moment(timings["Duhur"], "hh:mm"))
    ) {
      prayerIndex = 1;
    } else if (
      momentNow.isAfter(moment(timings["Duhur"], "hh:mm")) &&
      momentNow.isBefore(moment(timings["Asr"], "hh:mm"))
    ) {
      prayerIndex = 2;
    } else if (
      momentNow.isAfter(moment(timings["Asr"], "hh:mm")) &&
      momentNow.isBefore(moment(timings["Maghrib"], "hh:mm"))
    ) {
      prayerIndex = 3;
    } else if (
      momentNow.isAfter(moment(timings["Maghrib"], "hh:mm")) &&
      momentNow.isBefore(moment(timings["Isha"], "hh:mm"))
    ) {
      prayerIndex = 4;
    } else {
      prayerIndex = 0;
    }

    let nextPrayerObj = prayersData[prayerIndex];
    setNextPray(nextPrayerObj.name);
    // The Difference Between 2 Prayers
    let nextPrayerTime = moment.tz(
      nextPrayerObj.time,
      "hh:mm",
      timePerCity.tz()
    );

    // Only For Fajr
    if (nextPrayerTime.isSameOrBefore(momentNow)) {
      nextPrayerTime.add(1, "day");
    }
    //

    let reminaningTime = moment.duration(nextPrayerTime.diff(momentNow));
    setNextPrayTime(
      `${reminaningTime.seconds()} : ${reminaningTime.minutes()} : ${reminaningTime.hours()}`
    );
  };

  return (
    <>
      <Grid
        container
        spacing={8}
        justifyContent="space-around"
        alignItems="flex-end"
        className="responsiveStuff"
      >
        <Grid xs={6}>
          <div>
            <h3 style={{ margin: "0", fontSize: "30px", fontWeight: "normal" }}>
              {moment().format("ll")}
            </h3>
            <h1 style={{ fontWeight: "normal", marginTop: "26px" }}>
              {city.name}
            </h1>
          </div>
        </Grid>
        <Grid xs={6}>
          <div>
            <h3 style={{ margin: "0", fontSize: "25px", fontWeight: "normal" }}>
              متبقى حتى صلاة {nextPray}
            </h3>
            <h1 style={{ fontWeight: "normal" }}>{nextPrayTime}</h1>
          </div>
        </Grid>
      </Grid>
      <Divider
        style={{
          maxWidth: "1600px",
          backgroundColor: "white",
          opacity: "0.3",
        }}
      />
      {/* Cards */}
      <Stack
        direction="row"
        spacing={2}
        useFlexGap
        flexWrap="wrap"
        justifyContent="center"
        marginTop="50px"
      >
        {prayerCards}
      </Stack>
      {/* Cards */}
      {/* Select Menu */}
      <Stack direction="row" justifyContent="center">
        <FormControl sx={{ width: "25%", marginTop: "30px" }}>
          <InputLabel
            id="city-select-label"
            sx={{ color: theme.palette.text.primary }}
          >
            المدينة
          </InputLabel>
          <Select
            labelId="city-select-label"
            id="city-select"
            value={city}
            onChange={handleChange}
            renderValue={(selected) => selected.name}
            sx={{
              color: theme.palette.text.primary,
              backgroundColor: theme.palette.background.paper,
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: theme.palette.text.primary,
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: theme.palette.primary.light,
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: theme.palette.primary.main,
              },
              "& .MuiSvgIcon-root": {
                color: theme.palette.text.primary,
              },
            }}
            MenuProps={{
              PaperProps: {
                sx: {
                  backgroundColor: theme.palette.background.paper,
                  color: theme.palette.text.primary,
                },
              },
            }}
          >
            {cityMenus}
          </Select>
        </FormControl>
      </Stack>
    </>
  );
}
