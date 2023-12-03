import PropTypes from 'prop-types';
import { React } from 'react';
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

export const CasesTable = (props) => {
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
                <TableCell>
                  Loại vi phạm
                </TableCell>
                <TableCell>
                  Trạng thái
                </TableCell>
                <TableCell>
                  Danh sách tội phạm
                </TableCell>
                <TableCell>
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
                      {getTypeOfViolationById(casee.typeOfViolation)}
                    </TableCell>
                    <TableCell>
                      {getCaseStatusById(casee.status)}
                    </TableCell>
                    <TableCell>
                      {casee.criminalOfCase.map((c, index) => (
                        index > 0 ? `, ${c.name}` : c.name
                      ))}
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

CasesTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
};

export const getCaseStatusById = (id) => {
  switch (id) {
    case 0: 
      return "Chưa xét xử";
    case 1: 
      return "Đang điều tra";
    case 2:
      return "Đã xét xử";
  }
};

export const getTypeOfViolationById = (id) => {
  switch (id) {
    case 0: 
      return "Dân sự";
    case 1: 
      return "Hình sự";
  }
};
