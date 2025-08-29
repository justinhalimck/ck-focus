import { useEffect, useState } from "react"
import { getUsers } from "../../lib/api";
import UserListItem from "./UserListItem";
import { Box, Divider, Typography } from "@mui/material";

export default function UserList({onSelect}) {
    const me = localStorage.getItem('user');
    const [users, setUsers] = useState(null);

    useEffect(() => {
        (async () => {
            const users = (await getUsers()).users;
            console.log(users);
            setUsers(users);
        })()
    }, [])

    if (!users)
        return <div>Loading users...</div>

  return (
    <Box sx={{width: "80vw"}}>
        {users.map((u) => {
            if (u.id === String(me)) return;
            return <UserListItem key={u.uuid} user={u} onClick={onSelect}/>
        })}
    </Box>
  )
}
