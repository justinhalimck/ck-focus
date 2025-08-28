import { Paper } from "@mui/material"
import { UserDashboard } from "./UserDashboard"
import { useState } from "react"
import { DateTime } from "luxon"
import { DatePicker } from "@mui/x-date-pickers"
import { ProjectDashboard } from "./ProjectDashboard"

export const Dashboard = () => {
    const [displayDate, setDisplayDate] = useState(DateTime.fromISO('2025-08-28'))

    return (
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'start', width: 'fit-content' }}> 
            <DatePicker value={displayDate} onChange={(v) => setDisplayDate(v)} />
            <UserDashboard displayDate={displayDate} />
            <ProjectDashboard displayDate={displayDate} />
        </Paper>
    )
}