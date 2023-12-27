import PropTypes from 'prop-types';
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
    onDeleteReport
  } = props;

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
                <TableCell>
                  ID
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
                <TableCell>
                  Trạng thái
                </TableCell>
                <TableCell>
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
                        {report.id}
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
                    <TableCell>
                      {constants.reportStatus[report.status]}
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
                        <Tooltip title="Chỉnh sửa báo cáo">
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

                        <Tooltip title="Xóa báo cáo">
                          <IconButton onClick={() => handleDeleteClick(report.id)}>
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
};