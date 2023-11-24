import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Skeleton,
  Typography
} from '@mui/material';

const user = {
  avatar: '/assets/avatars/avatar-anika-visser.png',
  city: 'Los Angeles',
  country: 'USA',
  jobTitle: 'Senior Developer',
  name: 'Anika Visser',
  timezone: 'GTM-7'
};

export const AccountPicture = ({ imageLink, loading }) => (
  <Card
    fullWidth
  >
    <CardContent>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {loading ? (
          <Skeleton variant="circular">
            <Avatar
              sx={{
                height: 250,
                mb: 2,
                width: 250
              }} />
          </Skeleton>
        ) : (
          <Avatar
            src={imageLink}
            sx={{
              height: 250,
              mb: 2,
              width: 250
            }}
          />
        )}
      </Box>
    </CardContent>
    <Divider />
    <CardActions
      sx={{ justifyContent: 'center' }}>
      {loading ? (
        <Skeleton>
          <Button
            fullWidth
            variant="contained"
          >
            Tải ảnh lên
          </Button>
        </Skeleton>
      ) : (
        <Button
          fullWidth
          variant="contained"
          
        >
          Tải ảnh lên
        </Button>
      )}
    </CardActions>
  </Card>
);
