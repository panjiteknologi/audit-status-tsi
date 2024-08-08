import MainCard from '@/components/MainCard'
import { AllProject, Standar } from '@/types/Project';
import ScrollX from '@/components/ScrollX';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, useTheme } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { flexRender, useReactTable, getExpandedRowModel, getCoreRowModel, ColumnDef } from '@tanstack/react-table';
import { Fragment, useMemo } from 'react';
import { getDataTable, getlatestProgress } from '@/utils/getProgressAndField';
import IconButton from '@/components/@extended/IconButton';
import { StopOutlined, ArrowDropUp, ArrowRight } from '@mui/icons-material';
import DataTable from '@/components/table/DataTable';

interface TableInfoProps {
  data: AllProject[];
}

const TableInfo = ({ data }: TableInfoProps) => {
  const theme = useTheme()
  const backColor = alpha(`${theme.palette.primary.lighter}`, 0.1);

  const columns = useMemo<ColumnDef<AllProject>[]>(
    () => [
      {
        id: 'expander',
        header: () => null,
        cell: ({ row }) => {
          return row.getCanExpand() ? (
            <IconButton color={row.getIsExpanded() ? 'primary' : 'secondary'} onClick={row.getToggleExpandedHandler()} size="small">
              {row.getIsExpanded() ? <ArrowDropUp /> : <ArrowRight />}
            </IconButton>
          ) : (
            <StopOutlined style={{ color: theme.palette.text.secondary }} />
          );
        }
      },
      {
        header: 'Nama Prusahaan',
        accessorKey: 'nama_perusahaan',
        meta: {
          className: 'cell-center'
        }
      },
      {
        header: 'Nama Sales',
        accessorKey: 'nama_sales_or_crr',
        meta: {
          className: 'cell-center'
        }
      },
      {
        header: 'Standar',
        accessorKey: 'standar',
        meta: {
          className: 'cell-center'
        },
        cell: ({ row }) => {
          const standar: Standar[] | undefined = row.original.standar
          let label: string = "-"

          if (standar && standar?.length > 0) {
            label = standar?.map(((item) => item.nama_standar)).join(', ') as string
          }

          return (
            <span>{label}</span>
          )
        }
      },
      {
        header: 'Akreditasi',
        accessorKey: 'nama_akreditasi',
        meta: {
          className: 'cell-center'
        }
      },
      {
        header: 'Tahapan',
        accessorKey: 'nama_tahapan',
        meta: {
          className: 'cell-center'
        }
      },
      {
        header: 'Latest Progress',
        accessorKey: 'tahapan',
        meta: {
          className: 'cell-center'
        },
        cell: ({ row }) => {
          return (
            <span>{getlatestProgress(row.original)}</span>
          )
        }
      },
      {
        header: 'Lead Time Project',
        accessorKey: 'lead_time_project_finish',
        meta: {
          className: 'cell-center'
        },
        cell: ({ row }) => {
          return (
            <span>
              {row.original?.lead_time_project_finish
                ? row.original?.lead_time_project_finish
                : "-"}
            </span>
          )
        }
      },
    ]
    , [])

  const table = useReactTable({
    data,
    columns,
    getRowCanExpand: () => true,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel()
  });

  return (
    <MainCard
      content={false}
      sx={{ my: 1 }}
    >
      <ScrollX>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} sx={{ '& > th:first-of-type': { width: '58px' } }}>
                  {headerGroup.headers.map((header) => (
                    <TableCell key={header.id} {...header.column.columnDef.meta}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableHead>
            <TableBody>
              {table.getRowModel().rows.map((row) => (
                <Fragment key={row.id}>
                  <TableRow>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} {...cell.column.columnDef.meta}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                  {row.getIsExpanded() && (
                    <TableRow sx={{ bgcolor: backColor, '&:hover': { bgcolor: `${backColor} !important` } }}>
                      <TableCell colSpan={row.getVisibleCells().length}>
                        <Box
                          sx={{
                            margin: 1,
                            backgroundColor: "white",
                            borderWidth: 1,
                            borderColor: "gray",
                          }}
                        >
                          <DataTable
                            data={getDataTable(row.original)}
                          />
                        </Box>
                      </TableCell>
                    </TableRow>
                  )}
                </Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </ScrollX>
    </MainCard>
  )
}

export default TableInfo