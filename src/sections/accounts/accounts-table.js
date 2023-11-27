import PropTypes from 'prop-types';
import { format } from 'date-fns';
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
  SvgIcon
} from '@mui/material';
import PencilSquareIcon from '@heroicons/react/24/solid/PencilSquareIcon';
import TrashIcon from '@heroicons/react/24/solid/TrashIcon';
import { Scrollbar } from 'src/components/scrollbar';
import { Stack } from '@mui/system';

export const AccountsTable = (props) => {
  const {
    count = 0,
    items = [],
    onPageChange = () => {},
    onRowsPerPageChange,
    page = 0,
    rowsPerPage = 0,
  } = props;

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
                <TableCell>
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
                    <TableCell>
                      {getRoleById(account.roleId)}
                    </TableCell>
                    <TableCell>
                      {account.createdAt}
                    </TableCell>
                    <TableCell>
                    <Stack
                      alignItems="center"
                      direction="row"
                      spacing={1}
                    >
                      <SvgIcon
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
                      </SvgIcon>
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
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
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

export const getRoleById = (id) => {
  switch (id) {
    case 0: 
      return "Admin";
    case 1: 
      return "Người nhập liệu";
    case 2:
      return "Người điều tra";
    default:
      return "None";
  }
};