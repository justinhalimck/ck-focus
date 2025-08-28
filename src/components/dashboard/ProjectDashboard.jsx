import { Paper, Typography } from "@mui/material";
import { BarChart } from "@mui/x-charts";
import { mockUsers } from "../../mock/users";
import { mockProjects } from "../../mock/projects";
import { mockHistory } from "../../mock/history";

export const ProjectDashboard = (props) => {
  const prjToHours = new Map();
  for (const his of mockHistory) {
    const prjId = his.projectId;
    if (!prjToHours.has(prjId)) {
      prjToHours.set(prjId, 0);
    }
    prjToHours.set(prjId, prjToHours.get(prjId) + 0.5);
  }

  const prjToHoursByUser = new Map()

  return (
    <Paper sx={{ width: "100%", p: 2, overflow: 'hidden' }}>
      <Typography variant="h4">Hour</Typography>
      <BarChart
        xAxis={[{ data: mockProjects.map((project) => project.name) }]}
        series={[{ data: Array.from(prjToHours.values()) }]}
        height={300}
        sx={{width: '100%'}}
      />
      <BarChart
        layout="horizontal"
        yAxis={[{ data: mockUsers.map((user) => user.name) }]}
        series={[{ data: Array.from(prjToHours.values()) }]}
        height={300}
        sx={{width: '100%'}}
       />
    </Paper>
  );
};
