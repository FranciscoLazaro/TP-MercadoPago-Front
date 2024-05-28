import React, { useState } from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, TableSortLabel, TablePagination, Box } from '@mui/material';
import DeleteButton from './DeleteButton';
import EditButton from './EditButton';
import Row from '../../../types/Row';
import Column from '../../../types/Column';

interface Props {
  data: any[];
  columns: Column[];
  onEdit?: (item: any) => void;
  onDelete?: (item: any) => void;
}

const TableComponent: React.FC<Props> = ({ data, columns, onEdit, onDelete }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [orderBy, setOrderBy] = useState<keyof Row>('');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRequestSort = (property: keyof Row) => () => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedData = orderBy
    ? data.slice().sort((a, b) => {
      if (order === 'asc') {
        return a[orderBy] > b[orderBy] ? 1 : -1;
      } else {
        return a[orderBy] < b[orderBy] ? 1 : -1;
      }
    })
    : data;

  return (
    <>
<Table>
  <TableHead>
    <TableRow>
      {columns.map((column) => (
        <TableCell key={column.id}>
          <TableSortLabel
            active={orderBy === column.id}
            direction={orderBy === column.id ? order : 'asc'}
            onClick={handleRequestSort(column.id)}
          >
            {column.label}
          </TableSortLabel>
        </TableCell>
      ))}
      {/* Renderizamos la celda de acciones solo si se proporcionan las funciones onEdit y onDelete */}
      {(onEdit || onDelete) &&
        <TableCell>Acciones</TableCell>
      }
    </TableRow>
  </TableHead>
  <TableBody>
    {sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
      <TableRow key={index}>
        {columns.map((column) => (
          <TableCell key={column.id}>
            {column.renderCell ? column.renderCell(row) : row[column.id]}
          </TableCell>
        ))}
        {(onEdit || onDelete) && // Renderizamos la celda de acciones solo si se proporcionan las funciones onEdit y onDelete
          <TableCell>
            <Box sx={{ display: 'flex' }}>
              {onEdit &&
                <EditButton onClick={() => onEdit(row)} />
              }
              {onDelete &&
                <DeleteButton onClick={() => onDelete(row)} />}
            </Box>
          </TableCell>
        }
      </TableRow>
    ))}
  </TableBody>
</Table>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default TableComponent;
