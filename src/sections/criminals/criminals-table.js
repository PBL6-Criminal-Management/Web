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
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Button,
  SvgIcon,
} from '@mui/material';
import React from 'react';
import PencilSquareIcon from '@heroicons/react/24/outline/PencilSquareIcon';
import TrashIcon from '@heroicons/react/24/outline/TrashIcon';
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
    onDeleteCriminal
  } = props;

  const colorsCriminal = {
    0: 'warning',
    1: 'success',
    2: 'error',
    3: 'info',
    4: 'secondary',
    5: 'primary'
  };

  const [openDeletePopup, setOpenDeletePopup] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState('');

  const handleDeleteConfirm = () => {
    onDeleteCriminal(selectedId);
    setOpenDeletePopup(false);
  };

  const handleDeleteCancel = () => {
    setOpenDeletePopup(false);
    setSelectedId('');
  };

  const handleDeleteClick = (id) => {
    setOpenDeletePopup(true);
    setSelectedId(id);
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
                <TableCell
                  sx={{
                    textAlign: 'center',
                  }}
                >
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
                        {criminal.code}
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
                        textAlign: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Stack
                        justifyContent="center"
                        alignItems="center"
                        direction="row"
                        spacing={-1}
                      >
                        <Tooltip title="Chỉnh sửa tội phạm">
                          <IconButton
                            LinkComponent={Link}
                            href={{
                              pathname: '/criminals/[id]',
                              query: { id: encodeURIComponent(criminal.id), name: encodeURIComponent(criminal.name) },
                            }}
                          >
                            <SvgIcon
                              color="action"
                              fontSize="small"
                            >
                              <PencilSquareIcon />
                            </SvgIcon>
                          </IconButton>
                        </Tooltip>

                        <Tooltip title="Xóa tội phạm">
                          <IconButton onClick={() => handleDeleteClick(criminal.id)}>
                            <SvgIcon
                              color="action"
                              fontSize="small"
                            >
                              <TrashIcon />
                            </SvgIcon>
                          </IconButton>
                        </Tooltip>
                      </Stack>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <Dialog open={openDeletePopup} onClose={handleDeleteCancel}>
        <DialogTitle>Xác nhận xóa tội phạm</DialogTitle>
        <DialogContent>
          Bạn có chắc chắn muốn xóa tội phạm này?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">
            Hủy
          </Button>
          <Button onClick={handleDeleteConfirm} color="error">
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>
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
  onDeleteCriminal: PropTypes.func,
};

