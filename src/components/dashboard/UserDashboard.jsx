import { Box, Paper, Typography, useTheme } from "@mui/material";
import { mockUsers } from "../../mock/users";
import { mockProjects } from "../../mock/projects";

export const UserDashboard = (props) => {
  const theme = useTheme();
  const users = mockUsers;
  const projects = mockProjects;

  // Process timeline data to organize by user, date, and time slot
  const timelineData = props.data.reduce((acc, entry) => {
    const { userId, projectId, timestamp } = entry;
    const hourStr = timestamp.hour.toString().padStart(2, "0");
    const minStr = timestamp.minute.toString().padStart(2, "0");
    const timeStr = `${hourStr}:${minStr}`;

    if (!acc[userId]) {
      acc[userId] = {};
    }

    acc[userId][timeStr] = {
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
//   timeSlots.push("18:00");

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
          backgroundColor: "rgba(221, 239, 255, 1)",
          width: "100%",
          // minWidth: `${133 + timeSlots.length * 67}px`, // Fixed width calculation
        }}
      >
        {/* User Name Column Header */}
        <Box
          sx={{
            width: "100px",
            padding: 2,
            borderRight: `1px solid ${theme.palette.divider}`,
            display: "flex",
            alignItems: "center",
            fontWeight: "bold",
          }}
        >
          +
        </Box>

        {/* Time Slot Headers */}
        {timeSlots.map((timeSlot) => (
          <Box
            key={timeSlot}
            sx={{
              width: 'calc((100% - 100px) / 18)',
              padding: 1,
              textAlign: "center",
              borderRight: `1px solid ${theme.palette.divider}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: 60,
              backgroundColor: "rgba(221, 239, 255, 1)",
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
            width: '100%',
            // minWidth: `${133 + timeSlots.length * 67}px`, // Match header width
          }}
        >
          {/* User Name Column */}
          <Box
            sx={{
              width: '100px',
              padding: 2,
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

            // Group consecutive time slots with the same project
            const groupedSlots = [];
            let currentGroup = null;

            timeSlots.forEach((timeSlot, index) => {
              const projectData = userTimelineData?.[timeSlot];

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
              const groupWidth = `calc(${group.slotCount} * ((100% - 100px) / 18))`; 

              return (
                <Box
                  key={`${user.id}-group-${groupIndex}`}
                  sx={{
                    width: groupWidth,
                    minWidth: groupWidth,
                    padding: 1, // This adds 16px total (8px each side)
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
                        color: "black",
                        fontWeight: "bold",
                        fontSize: "0.7rem",
                        textAlign: "center",
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
