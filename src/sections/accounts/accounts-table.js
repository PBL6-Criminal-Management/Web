import PropTypes from 'prop-types';
import { format } from 'date-fns';
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
  Tooltip
} from '@mui/material';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
// import PencilSquareIcon from '@heroicons/react/24/solid/PencilSquareIcon';
// import TrashIcon from '@heroicons/react/24/solid/TrashIcon';
import { Scrollbar } from 'src/components/scrollbar';
import { Stack } from '@mui/system';
import * as constants from '../../constants/constants';
import Chip from '@mui/material/Chip';

export const AccountsTable = (props) => {
  const {
    count = 0,
    items = [],
    onPageChange = () => { },
    onRowsPerPageChange,
    page = 0,
    rowsPerPage = 0,
  } = props;

  const colorsAccount = {
    0: 'success',
    1: 'primary',
    2: 'error'
  }

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Tên tài khoản
                </TableCell>
                <TableCell>
                  Họ và tên
                </TableCell>
                <TableCell>
                  Email
                </TableCell>
                <TableCell
                  sx={{
                    textAlign: 'center',
                  }}
                >
                  Vai trò
                </TableCell>
                <TableCell>
                  Ngày tạo
                </TableCell>
                <TableCell>
                  Hành động
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((account) => {
                return (
                  <TableRow
                    hover
                    key={account.username}
                  >
                    <TableCell>
                      <Typography variant="subtitle2">
                        {account.username}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2">
                        {account.name}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      {account.email}
                    </TableCell>
                    <TableCell
                      sx={{
                        textAlign: 'center',
                      }}
                    >
                      <Chip
                        label={constants.role[account.roleId]}
                        color={colorsAccount[account.roleId]}
                        variant='outlined'
                      />
                    </TableCell>
                    <TableCell>
                      {account.createdAt}
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
                        <Tooltip title="Chỉnh sửa tài khoản">
                          <IconButton
                            LinkComponent={Link}
                            href={{
                              pathname: '/accounts/[id]',
                              query: { id: account.id },
                            }}
                          >
                            <BorderColorIcon />
                          </IconButton>
                        </Tooltip>

                        <Tooltip title="Xóa tài khoản">
                          <IconButton>
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

AccountsTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
};