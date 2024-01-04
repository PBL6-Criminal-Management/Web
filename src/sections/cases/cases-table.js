import PropTypes from 'prop-types';
import React from 'react';
import NextLink from 'next/link';
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
import PencilSquareIcon from '@heroicons/react/24/outline/PencilSquareIcon';
import TrashIcon from '@heroicons/react/24/outline/TrashIcon';
import { Scrollbar } from 'src/components/scrollbar';
import { Stack } from '@mui/system';
import * as constants from '../../constants/constants';
import Chip from '@mui/material/Chip';

export const CasesTable = (props) => {
  const {
    count = 0,
    items = [],
    onPageChange = () => { },
    onRowsPerPageChange,
    page = 0,
    rowsPerPage = 0,
    onDeleteCase,
    role
  } = props;

  const colorsViolation = {
    0: 'warning',
    1: 'error'
  }

  const colorsCase = {
    0: 'info',
    1: 'warning',
    2: 'success'
  }

  const canEdit = role !== 2;
  const canDelete = role === 0; 

  const [openDeletePopup, setOpenDeletePopup] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState('');

  const handleDeleteConfirm = () => {
    onDeleteCase(selectedId);
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
                <TableCell sx={{ width: 100 }}>
                  Mã vụ án
                </TableCell>
                <TableCell>
                  Tội danh
                </TableCell>
                <TableCell>
                  Thời gian diễn ra
                </TableCell>
                <TableCell
                  sx={{
                    textAlign: 'center',
                  }}
                >
                  Loại vi phạm
                </TableCell>
                <TableCell
                  sx={{
                    textAlign: 'center',
                  }}
                >
                  Trạng thái
                </TableCell>
                <TableCell>
                  Danh sách tội phạm
                </TableCell>
                <TableCell
                  sx={{
                    textAlign: 'center',
                    width: 120,
                  }}
                >
                  Hành động
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((casee) => {
                return (
                  <TableRow
                    hover
                    key={casee.id}
                  >
                    <TableCell>
                      <Typography variant="subtitle2">
                        {casee.code}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2">
                        {casee.charge}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      {casee.timeTakesPlace}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={constants.typeOfViolation[casee.typeOfViolation]}
                        color={colorsViolation[casee.typeOfViolation]}
                        variant='outlined'
                      />
                    </TableCell>
                    <TableCell
                      sx={{
                        textAlign: 'center'
                      }}
                    >
                      <Chip
                        label={constants.caseStatus[casee.status]}
                        color={colorsCase[casee.status]}
                        variant='outlined'
                      />
                    </TableCell>
                    <TableCell>
                      {casee.criminalOfCase.map((c, index) => (
                        index > 0 ? `, ${c.name}` : c.name
                      ))}
                    </TableCell>
                    <TableCell
                      sx={{
                        textAlign: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Stack
                        justifyContent="center"
                        alignItems="center"
                        direction="row"
                        spacing={-1}
                      >
                        <Tooltip title="Xem chi tiết">
                            <IconButton
                              LinkComponent={NextLink}
                              href={{
                                pathname: '/cases/[id]',
                                query: { id: encodeURIComponent(casee.id), code: encodeURIComponent(casee.code) },
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
                        
                        {canDelete && (
                          <Tooltip title="Xóa vụ án">
                            <IconButton onClick={() => handleDeleteClick(casee.id)}>
                              <SvgIcon
                                color="action"
                                fontSize="small"
                              >
                                <TrashIcon />
                              </SvgIcon>
                            </IconButton>
                          </Tooltip>
                        )}
                      </Stack>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <TablePagination
        component="div"
        count={count}
        page={page}
        onPageChange={onPageChange}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={onRowsPerPageChange}
        rowsPerPageOptions={[5, 10, 20]}
      />
      <Dialog open={openDeletePopup} onClose={handleDeleteCancel}>
        <DialogTitle>Xác nhận xóa vụ án</DialogTitle>
        <DialogContent>
          Bạn có chắc chắn muốn xóa vụ án này?
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
    </Card>
  );
};

CasesTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  onDeleteCase: PropTypes.func,
  role: PropTypes.number,
};
