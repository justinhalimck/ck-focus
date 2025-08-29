import { Box, Button, Paper, Typography } from "@mui/material";
import { mockUsers } from "../../mock/users";
import { mockProjects } from "../../mock/projects";
import { useMemo, useState } from "react";

export const ProjectDashboard = (props) => {
  const [selectedProject, setSelectedProject] = useState(mockProjects[0]);

  // Map project IDs to total hours
  const projectHours = useMemo(() => {
    const arr = [];
    for (const p of mockProjects) {
      arr.push(
        props.data.reduce((acc, entry) => {
          if (entry.projectId === p.id) {
            return acc + 0.5;
          }
          return acc;
        }, 0),
      );
    }
    return arr;
  }, [props.data]);

  const userHoursForProject = useMemo(() => {
    const arr = [];
    const filteredData = props.data.filter(
      (d) => d.projectId === selectedProject.id,
    );
    for (const u of mockUsers) {
      arr.push([
        u.name,
        filteredData.reduce((acc, entry) => {
          if (entry.userId === u.id) {
            return acc + 0.5;
          }
          return acc;
        }, 0),
      ]);
    }
    return arr.filter((v) => v[1] > 0).toSorted((a, b) => -(a[1] - b[1]));
  }, [props.data, selectedProject.id]);

  const handleSelectProject = (projectId) => {
    setSelectedProject(mockProjects.find((p) => p.id === projectId));
  };

  const maxHours = Math.max(...projectHours);
  const maxUserHoursForProject = Math.max(
    ...userHoursForProject.map((u) => u[1]),
  );

  const colors = mockProjects.map((p) => p.color);

  // Generate grid lines
  const gridLines = useMemo(() => {
    const lines = [0];
    const numLines = 3; // Number of horizontal grid lines
    for (let i = 1; i <= numLines; i++) {
      const percentage = (i / numLines) * 100;
      lines.push(percentage);
    }
    return lines;
  }, []);

  return (
    <Paper
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
        gap: 2,
      }}
    >
      <Typography variant="h4" padding='24px'>Hours</Typography>

      <Box
        sx={{
          width: "100%",
          padding: 2,
        }}
      >
        {/* Custom Bar Chart */}
        <Box
          sx={{
            height: 300,
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-around",
            borderRadius: 1,
            p: 2,
            // mb: 2,
            position: "relative",
          }}
        >
          {/* Horizontal Grid Lines */}
          {gridLines.map((percentage, index) => (
            <Box
              key={index}
              sx={{
                position: "absolute",
                left: 16,
                right: 16,
                bottom: `calc(${percentage}% + 16px)`,
                height: "1px",
                borderTop: "1px dashed #D2D5DA",
                zIndex: 1,
              }}
            />
          ))}
          {mockProjects.map((project, index) => {
            const hours = projectHours[index];
            const barHeight = maxHours > 0 ? (hours / maxHours) * 250 : 0; // Max height 250px

            return (
              <Box
                key={project.id}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  cursor: "pointer",
                  transition: "transform 0.2s ease-in-out",
                  "&:hover": {
                    transform: "translateY(-2px)",
                  },
                }}
                onClick={() => handleSelectProject(project.id)}
              >
                {/* Hours label on top of bar */}
                <Typography
                  variant="caption"
                  sx={{
                    mb: 0.5,
                    fontWeight: "bold",
                    color: "#666",
                  }}
                >
                  {hours}h
                </Typography>

                {/* Bar */}
                <Box
                  sx={{
                    width: "160px",
                    height: barHeight,
                    backgroundColor: colors[index % colors.length],
                    transition: "all 0.2s ease-in-out",
                    "&:hover": {
                      opacity: 0.8,
                      filter: "brightness(1.1)",
                    },
                  }}
                />
              </Box>
            );
          })}
        </Box>

        {/* Project Selection Buttons */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            width: "100%",
            padding: 2,
          }}
        >
          {mockProjects.map((p) => (
            <Button
              key={p.id}
              variant={p.id === selectedProject.id ? "contained" : "outlined"}
              onClick={() => handleSelectProject(p.id)}
              sx={{
                width: "92px",
                height: "36px",
                color: p.id === selectedProject.id ? "#fff" : "#6D7280",
                border:
                  p.id !== selectedProject.id ? "1px solid #000" : undefined,
                borderRadius: "40px",
                textTransform: "none",
              }}
            >
              {p.name}
            </Button>
          ))}
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          gap: 0.5,
          width: "100%",
          padding: 3,
          backgroundColor: selectedProject.bgcolor,
        }}
      >
        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
          {selectedProject.name ?? ""}
        </Typography>
        <Typography variant="h4">{`${projectHours[selectedProject.id - 1] ?? 0} hrs total`}</Typography>

        {/* Custom Horizontal Bar Chart for Users */}
        <Box sx={{ width: "100%", mt: 2 }}>
          {userHoursForProject.map(([userName, hours]) => {
            const barWidth =
              maxUserHoursForProject > 0
                ? (hours / maxUserHoursForProject) * 100
                : 0;

            return (
              <Box
                key={userName}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: 1,
                  gap: 3,
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    width: 120,
                    textAlign: "left",
                    fontWeight: "medium",
                  }}
                >
                  {userName}
                </Typography>
                <Box sx={{ flex: 1, position: "relative" }}>
                  <Box
                    sx={{
                      height: 24,
                      width: "100%",
                      backgroundColor: "#F9FAFB",
                      borderRadius: 1,
                      position: "relative",
                    }}
                  />
                  <Box
                    sx={{
                      height: 24,
                      width: `${barWidth}%`,
                      backgroundColor: selectedProject.color,
                      borderRadius: 1,
                      position: "absolute",
                      top: 0,
                      left: 0,
                    }}
                  />
                </Box>
                  <Typography
                    variant="caption"
                    sx={{
                      fontWeight: 600,
                      textWrap: "nowrap",
                      minWidth: "auto",
                    }}
                  >
                    {hours}hrs
                  </Typography>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Paper>
  );
};
