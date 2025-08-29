import { Box, Button, Popover, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { DateTime } from "luxon";
import { StaticDatePicker } from "@mui/x-date-pickers";
import { mockHistory } from "../mock/history";
import { UserDashboard } from "../components/dashboard/UserDashboard";
import { ProjectDashboard } from "../components/dashboard/ProjectDashboard";
import MainIcon from "../assets/main_icon.svg";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

export const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("user");
  const [displayDate, setDisplayDate] = useState(DateTime.now().startOf("day"));
  const [datePickerAnchor, setDatePickerAnchor] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [historyData, setHistoryData] = useState([]);
  useEffect(() => {
    setIsLoading(true);

    try {
      // TODO: get history from backend DB
      const data = mockHistory.filter(
        (his) =>
          his.timestamp.toFormat("yyyy-MM-dd") ===
          displayDate.toFormat("yyyy-MM-dd"),
      );
      setHistoryData(data);
    } catch (err) {
      console.error("Failed to fetch history data", err);
    } finally {
      setIsLoading(false);
    }
  }, [displayDate]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleDateClick = (ev) => {
    setDatePickerAnchor(ev.currentTarget);
  };

  const handleDateClose = () => {
    setDatePickerAnchor(null);
  };

  const handleDateChange = (newDate) => {
    setDisplayDate(newDate);
    setDatePickerAnchor(null);
  };

  return (
    <Box
      sx={{
        padding: 5,
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
        gap: 2,
        width: "100vw",
        height: '100vh',
        background: "linear-gradient(0deg, #FAFAFA 0%, #F4FAFF 100%)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <img src={MainIcon} alt="main icon" />
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          ポモドーロ dashboard [by{" "}
          {`${activeTab === "user" ? "Users" : "Projects"}`}]
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Box
          onClick={handleDateClick}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            "&:hover": {
                cursor: "pointer",
            }
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {displayDate.toFormat("yyyy MMM dd")}
          </Typography>
          <ArrowDropUpIcon sx={{ color: "#666", fontSize: 20 }} />
        </Box>
        <Popover
          open={Boolean(datePickerAnchor)}
          anchorEl={datePickerAnchor}
          onClose={handleDateClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <StaticDatePicker
            value={displayDate}
            onChange={handleDateChange}
            sx={{
              "& .MuiPickersLayout-root": {
                minWidth: "280px",
              },
            }}
          />
        </Popover>
        <Box
          sx={{
            display: "flex",
            gap: 1,
          }}
        >
          <Button
            sx={{
              color: "#28272C",
              fontWeight: activeTab === "user" ? 600 : 400,
              display: "flex",
              width: "120px",
              height: "40px",
              padding: "4px 12px",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "40px",
              border: "1px solid #E1E1F3",
              backgroundColor: activeTab === "user" ? "#F1F1F1" : undefined,
            }}
            onClick={() => handleTabChange("user")}
          >
            Users
          </Button>
          <Button
            sx={{
              color: "#28272C",
              fontWeight: activeTab === "project" ? 600 : 400,
              display: "flex",
              width: "120px",
              height: "40px",
              padding: "4px 12px",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "40px",
              border: "1px solid #E1E1F3",
              backgroundColor: activeTab === "project" ? "#F1F1F1" : undefined,
            }}
            onClick={() => handleTabChange("project")}
          >
            Projects
          </Button>
        </Box>
      </Box>
      {isLoading && <Typography>Loading...</Typography>}
      {!isLoading && activeTab === "user" && (
        <UserDashboard data={historyData} />
      )}
      {!isLoading && activeTab === "project" && (
        <ProjectDashboard data={historyData} />
      )}
    </Box>
  );
};
