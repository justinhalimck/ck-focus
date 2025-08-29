import { useEffect, useState } from "react";
import { getUsers } from "../../lib/api";
import UserListItem from "./UserListItem";
import { Box } from "@mui/material";

export default function UserList({onSelect, projectCode}) {
    const [users, setUsers] = useState(null);

  useEffect(() => {
    (async () => {
      const users = (await getUsers()).users;
      setUsers(users);
    })();
  }, []);

  if (!users) return <div>Loading users...</div>;

  let projectUsers;

  switch (projectCode) {
    case "933251":
      projectUsers = [users[0]];
      break;
    case "933264":
      projectUsers = [users[1], users[2]];
      break;
    case "933255":
      projectUsers = [users[0], users[1], users[3]];
      break;
    case "902294":
      projectUsers = users;
      break;
    case "953277":
      projectUsers = [users[0], users[2], users[3]];
      break;
    case "943215":
      projectUsers = [users[0], users[3]];
      break;
    case "923303":
      projectUsers = [users[3]];
      break;
    case "943226":
      projectUsers = [users[0], users[1], users[3]];
      break;
    default:
      projectUsers = [];
  }

  return (
    <Box sx={{ width: "80vw", padding: "2vh 0 2vh 0" }}>
      {projectUsers.map((u) => {
        return <UserListItem key={u.uuid} user={u} onClick={onSelect} />;
      })}
    </Box>
  );
}
