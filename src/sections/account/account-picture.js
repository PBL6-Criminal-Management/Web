import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Skeleton,
  Typography
} from '@mui/material';

import CloudUploadIcon from '@mui/icons-material/CloudUpload';

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
          startIcon={<CloudUploadIcon />}
        >
          Tải ảnh lên
        </Button>
      )}
    </CardActions>
  </Card>
);
