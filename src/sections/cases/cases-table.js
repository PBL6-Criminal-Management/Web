import PropTypes from 'prop-types';
import React from 'react';
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
  Button
} from '@mui/material';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
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
    onDeleteCase
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
                <TableCell>
                  ID
                </TableCell>
                <TableCell>
                  Tội danh
                </TableCell>
                <TableCell>
                  Thời gian diễn ra
                </TableCell>
                <TableCell>
                  Lý do
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
                        {casee.id}
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
                      {casee.reason}
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
                        textAlign: 'center'
                      }}
                    >
                      <Stack
                        alignItems="center"
                        direction="row"
                        spacing={-1}
                      >
                        <Tooltip title="Chỉnh sửa vụ án">
                          <IconButton
                            LinkComponent={Link}
                          // href={{
                          //   pathname: '/criminals/[id]',
                          //   query: { id: criminal.id },
                          // }}
                          >
                            <BorderColorIcon />
                          </IconButton>
                        </Tooltip>

                        <Tooltip title="Xóa vụ án">
                          <IconButton onClick={() => handleDeleteClick(casee.id)}>
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                        {/* <SvgIcon
                          color="action"
                          fontSize="small"
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
};
