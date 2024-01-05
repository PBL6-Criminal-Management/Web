import PropTypes from 'prop-types';
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
  SvgIcon
} from '@mui/material';
import PencilSquareIcon from '@heroicons/react/24/outline/PencilSquareIcon';
import TrashIcon from '@heroicons/react/24/outline/TrashIcon';
import React from 'react';
import { Scrollbar } from 'src/components/scrollbar';
import { Stack } from '@mui/system';
import * as constants from '../../constants/constants';
import Chip from '@mui/material/Chip';

export const ReportsTable = (props) => {
  const {
    count = 0,
    items = [],
    onPageChange = () => { },
    onRowsPerPageChange,
    page = 0,
    rowsPerPage = 0,
    onDeleteReport,
    role
  } = props;

  const colorsReport = {
    0: 'warning',
    1: 'primary',
    2: 'success',
  };

  const canEdit = role !== 2;
  const canDelete = role === 0; 

  const [openDeletePopup, setOpenDeletePopup] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState('');

  const handleDeleteConfirm = () => {
    onDeleteReport(selectedId);
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
                <TableCell sx={{ width: 120 }}>
                  Mã báo cáo
                </TableCell>
                <TableCell>
                  Tên người báo cáo
                </TableCell>
                <TableCell>
                  Email người báo cáo
                </TableCell>
                <TableCell>
                  SĐT người báo cáo
                </TableCell>
                <TableCell>
                  Địa chỉ
                </TableCell>
                <TableCell>
                  Nội dung
                </TableCell>
                <TableCell>
                  Ngày gửi
                </TableCell>
                <TableCell
                  sx={{
                    textAlign: 'center',
                  }}
                >
                  Trạng thái
                </TableCell>
                <TableCell
                  sx={{
                    textAlign: 'center',
                    width: 111,
                  }}
                >
                  Hành động
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((report) => {
                return (
                  <TableRow
                    hover
                    key={report.id}
                  >
                    <TableCell>
                      <Typography variant="subtitle2">
                        {report.code}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2">
                        {report.reporterName}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      {report.reporterEmail}
                    </TableCell>
                    <TableCell>
                      {report.reporterPhone}
                    </TableCell>
                    <TableCell>
                      {report.reporterAddress}
                    </TableCell>
                    <TableCell>
                      {report.content}
                    </TableCell>
                    <TableCell>
                      {report.sendingTime}
                    </TableCell>
                    <TableCell
                      sx={{
                        textAlign: 'center',
                      }}
                    >
                      <Chip
                        label={constants.reportStatus[report.status]}
                        color={colorsReport[report.status]}
                        variant='outlined'
                      />
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
                                pathname: '/reports/[id]',
                                query: { id: encodeURIComponent(report.id), code: encodeURIComponent(report.code) },
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
                          <Tooltip title="Xóa báo cáo">
                          <IconButton onClick={() => handleDeleteClick(report.id)}>
                            <SvgIcon
                              color="action"
                              fontSize="small"
                            >
                              <TrashIcon />
                            </SvgIcon>
                          </IconButton>
                        </Tooltip>)}
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
        <DialogTitle>Xác nhận xóa báo cáo</DialogTitle>
        <DialogContent>
          Bạn có chắc chắn muốn xóa báo cáo này?
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

ReportsTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  onDeleteReport: PropTypes.func,
  role: PropTypes.number,
};