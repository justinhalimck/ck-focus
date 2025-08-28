import { Box, Paper, Typography, useTheme } from "@mui/material";
import { mockUsers } from "../../mock/users";
import { mockProjects } from "../../mock/projects";
import { mockHistory } from "../../mock/history";

export const UserDashboard = (props) => {
  const theme = useTheme();
  const users = mockUsers;
  const projects = mockProjects;
  const history = mockHistory;

  // Process timeline data to organize by user, date, and time slot
  const timelineData = history.reduce((acc, entry) => {
    const { userId, projectId, timestamp } = entry;
    const date = new Date(timestamp);
    const dateStr = date.toISOString().split("T")[0]; // Get date in YYYY-MM-DD format
    const timeStr = `${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;

    if (!acc[userId]) {
      acc[userId] = {};
    }
    if (!acc[userId][dateStr]) {
      acc[userId][dateStr] = {};
    }

    acc[userId][dateStr][timeStr] = {
      projectId,
      projectName: projects.find((p) => p.id === projectId)?.name || "Unknown",
    };

    return acc;
  }, {});

  // create time slots every 30 mins
  const timeSlots = [];
  for (let hour = 9; hour < 18; hour++) {
    timeSlots.push(`${hour.toString().padStart(2, "0")}:00`);
    timeSlots.push(`${hour.toString().padStart(2, "0")}:30`);
  }

  const getProjectColor = (projectId) => {
    const project = projects.find((p) => p.id === projectId);
    return project?.color || theme.palette.grey[500];
  };

  return (
      <Paper sx={{ overflow: "auto", width: "100%" }}>
        {/* Header Row with Time Slots */}
        <Box
          sx={{
            display: "flex",
            borderBottom: `2px solid ${theme.palette.divider}`,
            backgroundColor: theme.palette.grey[50],
            minWidth: `${133 + timeSlots.length * 67}px`, // Fixed width calculation
          }}
        >
          {/* User Name Column Header */}
          <Box
            sx={{
              width: 100,
              minWidth: 100,
              p: 2,
              borderRight: `1px solid ${theme.palette.divider}`,
              display: "flex",
              alignItems: "center",
              fontWeight: "bold",
              backgroundColor: theme.palette.grey[50],
            }}
          >
            +
          </Box>

          {/* Time Slot Headers */}
          {timeSlots.map((timeSlot) => (
            <Box
              key={timeSlot}
              sx={{
                width: 50,
                minWidth: 50,
                p: 1,
                textAlign: "center",
                borderRight: `1px solid ${theme.palette.divider}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: 60,
                backgroundColor: theme.palette.grey[50],
              }}
            >
              <Typography variant="subtitle1" fontWeight="bold">
                {timeSlot}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* User Rows */}
        {Object.values(users).map((user, userIndex) => (
          <Box
            key={user.id}
            sx={{
              display: "flex",
              borderBottom: `1px solid ${theme.palette.divider}`,
              backgroundColor:
                userIndex % 2 === 0 ? "inherit" : theme.palette.grey[25],
              "&:hover": {
                backgroundColor: theme.palette.action.hover,
              },
              minWidth: `${133 + timeSlots.length * 67}px`, // Match header width
            }}
          >
            {/* User Name Column */}
            <Box
              sx={{
                width: 100,
                minWidth: 100,
                p: 2,
                borderRight: `1px solid ${theme.palette.divider}`,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Typography variant="body2" fontWeight="medium">
                {user.name}
              </Typography>
            </Box>

            {/* Project Slots */}
            {(() => {
              const userTimelineData = timelineData[user.id];
              const dayData =
                userTimelineData?.[props.displayDate.toFormat("yyyy-MM-dd")] || {};

              // Group consecutive time slots with the same project
              const groupedSlots = [];
              let currentGroup = null;

              timeSlots.forEach((timeSlot, index) => {
                const projectData = dayData[timeSlot];

                if (
                  projectData &&
                  currentGroup &&
                  currentGroup.projectId === projectData.projectId
                ) {
                  // Extend current group - each additional slot adds 117px (100px + 16px padding + 1px border)
                  currentGroup.endIndex = index;
                  currentGroup.slotCount += 1;
                } else {
                  // Start new group or create single slot
                  if (currentGroup) {
                    groupedSlots.push(currentGroup);
                  }
                  currentGroup = projectData
                    ? {
                        startIndex: index,
                        endIndex: index,
                        slotCount: 1,
                        projectId: projectData.projectId,
                        projectName: projectData.projectName,
                        timeSlot,
                      }
                    : {
                        startIndex: index,
                        endIndex: index,
                        slotCount: 1,
                        projectId: null,
                        projectName: null,
                        timeSlot,
                      };
                }
              });

              // Add the last group
              if (currentGroup) {
                groupedSlots.push(currentGroup);
              }

              return groupedSlots.map((group, groupIndex) => {
                // Calculate proper width to match header slots exactly
                // Each header slot is: 100px width + 16px padding + 1px border = 117px total
                // For grouped slots: we want the same total width as the individual header slots they replace
                const groupWidth = group.slotCount * 67 - 16 - 1; // Total space minus padding and border we'll add

                return (
                  <Box
                    key={`${user.id}-group-${groupIndex}`}
                    sx={{
                      width: groupWidth,
                      minWidth: groupWidth,
                      p: 1, // This adds 16px total (8px each side)
                      borderRight: `1px solid ${theme.palette.divider}`, // This adds 1px
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      minHeight: 60,
                      backgroundColor: group.projectId
                        ? getProjectColor(group.projectId)
                        : "transparent",
                    }}
                  >
                    {group.projectId ? (
                      <Typography
                        variant="caption"
                        sx={{
                          color: "white",
                          fontWeight: "bold",
                          fontSize: "0.7rem",
                          textAlign: "center",
                          textShadow: "1px 1px 1px rgba(0,0,0,0.5)",
                        }}
                      >
                        {group.projectName}
                      </Typography>
                    ) : (
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          backgroundColor: theme.palette.grey[300],
                        }}
                      />
                    )}
                  </Box>
                );
              });
            })()}
          </Box>
        ))}
      </Paper>
  );
};
