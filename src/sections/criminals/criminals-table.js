import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  IconButton,
  Tooltip,
} from '@mui/material';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
// import PencilSquareIcon from '@heroicons/react/24/solid/PencilSquareIcon';
// import TrashIcon from '@heroicons/react/24/solid/TrashIcon';
import { Scrollbar } from 'src/components/scrollbar';
import { Stack } from '@mui/system';
import * as constants from '../../constants/constants';
import Chip from '@mui/material/Chip';

export const CriminalsTable = (props) => {
  const {
    count = 0,
    items = [],
    onPageChange = () => { },
    onRowsPerPageChange,
    page = 0,
    rowsPerPage = 0,
  } = props;

  const colorsCriminal = {
    0: 'warning',
    1: 'success',
    2: 'error',
    3: 'info',
    4: 'secondary',
    5: 'primary'
  };

  const handleDeleteClick = (criminalId) => {
    // Implement delete logic or redirect to delete page
  };

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Mã tội phạm
                </TableCell>
                <TableCell>
                  Họ và tên
                </TableCell>
                <TableCell>
                  Năm sinh
                </TableCell>
                <TableCell>
                  Nơi ĐK HKTT
                </TableCell>
                <TableCell
                  sx={{
                    textAlign: 'center',
                  }}
                >
                  Tình trạng
                </TableCell>
                <TableCell>
                  Tội danh gần nhất
                </TableCell>
                <TableCell sx={{ width: 150 }}>
                  Thời gian phạm tội gần nhất
                </TableCell>
                <TableCell>
                  Hành động
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((criminal) => {
                return (
                  <TableRow
                    hover
                    key={criminal.id}
                  >
                    <TableCell>
                      <Typography variant="subtitle2">
                        {criminal.id}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2">
                        {criminal.name}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      {criminal.yearOfBirth}
                    </TableCell>
                    <TableCell>
                      {criminal.permanentResidence}
                    </TableCell>
                    <TableCell
                      sx={{
                        textAlign: 'center',
                      }}
                    >
                      <Chip
                        label={constants.criminalStatus[criminal.status]}
                        color={colorsCriminal[criminal.status]}
                        variant='outlined'
                      />
                    </TableCell>
                    <TableCell>
                      {criminal.charge}
                    </TableCell>
                    <TableCell sx={{ width: 150 }}>
                      {criminal.dateOfMostRecentCrime}
                    </TableCell>
                    <TableCell
                      sx={{
                        textAlign: 'center'
                      }}
                    >
                      <Stack
                        alignItems="center"
                        direction="row"
                        spacing={-1}
                      >
                        <Tooltip title="Chỉnh sửa tội phạm">
                          <IconButton
                            LinkComponent={Link}
                            href={{
                              pathname: '/criminals/[id]',
                              query: { id: criminal.id },
                            }}
                          >
                            <BorderColorIcon />
                          </IconButton>
                        </Tooltip>

                        <Tooltip title="Xóa tội phạm">
                          <IconButton>
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                        {/* <SvgIcon
                          color="action"
                          fontSize="small"
                          onClick={() => handleEditClick(criminal.id)}
                        >
                          <PencilSquareIcon />
                        </SvgIcon>
                        <SvgIcon
                          color="action"
                          fontSize="small"
                        >
                          <TrashIcon />
                        </SvgIcon> */}
                      </Stack>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      {/* <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      /> */}
    </Card>
  );
};

CriminalsTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
};

export const getCriminalStatusById = (id) => {
  switch (id) {
    case 0:
      return "Đang ngồi tù";
    case 1:
      return "Đã được thả";
    case 2:
      return "Bị truy nã";
    case 3:
      return "Chưa kết án";
    case 4:
      return "Án treo";
  }
};
