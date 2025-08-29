import { Box, Typography } from "@mui/material";

export default function UserListItem({user, onClick}) {
  return (
    <Box sx={{
        width: '100%',
        height: '46px',
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        borderRadius: '10px',
        ':hover': {
            backgroundColor: '#00000011'
        }
    }}
    onClick={onClick}
    >
        <img src={user.img} style={{
            width: '40px',
            height: '40px',
            borderRadius: '100%'
        }}/>
        <Box>
            <Box sx={{
                display: 'flex',
                gap: 1,
                height: '16px'
            }}>
                <Typography fontSize={'16px'} fontWeight={'bold'}>{user.firstName}</Typography>
                <Typography fontSize={'16px'} fontWeight={'bold'}>{user.lastName}</Typography>
            </Box>
            <Box sx={{
                textAlign: 'left',
                height: '20px'
            }}>
                <Typography fontWeight={'light'} color="#535D6E">{user.department}</Typography>
            </Box>
        </Box>
    </Box>
  )
}
