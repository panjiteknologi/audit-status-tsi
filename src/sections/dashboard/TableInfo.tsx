import { Fragment, useEffect, useMemo, useState } from "react";
import MainCard from "@/components/MainCard";
import { AllProject, Standar } from "@/types/Project";
import ScrollX from "@/components/ScrollX";
import {
  Box,
  Chip,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import {
  flexRender,
  useReactTable,
  getExpandedRowModel,
  getCoreRowModel,
  ColumnDef,
  getFilteredRowModel,
  getPaginationRowModel,
  SortingState,
  getSortedRowModel,
} from "@tanstack/react-table";
import {
  getDataTable,
  getNextStep,
  getlatestProgress,
} from "@/utils/getProgressAndField";
import IconButton from "@/components/@extended/IconButton";
import { StopOutlined, ArrowDropUp, ArrowRight } from "@mui/icons-material";
import DataTable from "@/components/table/DataTable";
import DebouncedInput from "@/components/table/DebouncedInput";
import TablePagination from "@/components/table/TablePagination";
import HeaderSort from "@/components/table/HeaderSort";

const ItemLateProgress = styled(Paper)(() => ({
  textAlign: "left",
  color: "#059212",
  boxShadow: "none",
  fontSize: 20,
  fontWeight: "bold",
  textTransform: "capitalize",
  fontStyle: "italic",
}));

interface TableInfoProps {
  data: AllProject[];
}

const TableInfo = ({ data }: TableInfoProps) => {
  const theme = useTheme();
  const backColor = alpha(`${theme.palette.primary.lighter}`, 0.1);

  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [sorting, setSorting] = useState<SortingState>([]);

  const columns = useMemo<ColumnDef<AllProject>[]>(
    () => [
      {
        id: "expander",
        header: () => null,
        cell: ({ row }) => {
          return row.getCanExpand() ? (
            <IconButton
              color={row.getIsExpanded() ? "primary" : "secondary"}
              onClick={row.getToggleExpandedHandler()}
              size="small"
            >
              {row.getIsExpanded() ? <ArrowDropUp /> : <ArrowRight />}
            </IconButton>
          ) : (
            <StopOutlined style={{ color: theme.palette.text.secondary }} />
          );
        },
      },
      {
        header: "Nama Perusahaan",
        accessorKey: "nama_perusahaan",
        meta: {
          className: "cell-center",
        },
        cell: ({ row }) => {
          return (
            <Typography variant="h3" sx={{ color: "rgb(30, 32, 95)" }}>
              {row.original.nama_perusahaan}
            </Typography>
          );
        },
      },
      {
        header: "Nama Sales",
        accessorKey: "nama_sales_or_crr",
        meta: {
          className: "cell-center",
        },
        cell: ({ row }) => {
          return (
            <Typography variant="h4" sx={{ color: "rgb(30, 32, 95)" }}>
              {row.original.nama_sales_or_crr}
            </Typography>
          );
        },
      },
      {
        header: "Standar",
        accessorKey: "standar",
        meta: {
          className: "cell-center",
        },
        cell: ({ row }) => {
          const standar: Standar[] | undefined = row.original.standar;
          let label: string = "-";

          if (standar && standar?.length > 0) {
            label = standar
              ?.map((item) => item.nama_standar)
              .join(", ") as string;
          }

          return standar?.map((item, index) => {
            return (
              <Chip
                key={index}
                label={item.nama_standar}
                sx={{ m: 0.2, fontSize: 18 }}
                color="primary"
                variant="outlined"
              />
            );
          });
        },
      },
      {
        header: "Akreditasi",
        accessorKey: "nama_akreditasi",
        meta: {
          className: "cell-center",
        },
        cell: ({ row }) => {
          return (
            <Typography variant="h3" sx={{ color: "rgb(30, 32, 95)" }}>
              {row.original.nama_akreditasi}
            </Typography>
          );
        },
      },
      {
        header: "Tahapan",
        accessorKey: "nama_tahapan",
        meta: {
          className: "cell-center",
        },
        cell: ({ row }) => {
          return (
            <Typography variant="h3" sx={{ color: "rgb(30, 32, 95)" }}>
              {row.original.nama_tahapan}
            </Typography>
          );
        },
      },
      {
        header: "Latest Progress",
        accessorKey: "tahapan",
        meta: {
          className: "cell-center",
        },
        cell: ({ row }) => {
          return (
            <ItemLateProgress>
              {getlatestProgress(row.original)}
            </ItemLateProgress>
          );
        },
      },
      {
        header: "Next Step",
        accessorKey: "next_step",
        meta: {
          className: "cell-center",
        },
        cell: ({ row }) => {
          return (
            <Typography
              variant="h4"
              color="orangered"
              sx={{ fontStyle: "italic" }}
            >
              {getNextStep(row.original)}
            </Typography>
          );
        },
      },
      {
        header: "Lead Time Project",
        accessorKey: "lead_time_project_finish",
        meta: {
          className: "cell-center",
        },
        cell: ({ row }) => {
          return (
            <Typography variant="h4" sx={{ color: "rgb(30, 32, 95)" }}>
              {row.original?.lead_time_project_finish
                ? row.original?.lead_time_project_finish
                : "-"}
            </Typography>
          );
        },
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
      sorting,
    },
    onSortingChange: setSorting,
    getRowCanExpand: () => true,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onGlobalFilterChange: setGlobalFilter,
  });

  useEffect(() => {
    const dataLength = data.length;

    const intervalId = setInterval(() => {
      const pageSize = table.getState().pagination.pageSize;
      const pageIndex = table.getState().pagination.pageIndex;
      const maxPage = dataLength / pageSize;

      table.setPageIndex(pageIndex < maxPage - 1 ? pageIndex + 1 : 0);
    }, 30000);

    // Membersihkan interval saat komponen di-unmount
    return () => clearInterval(intervalId);
  }, [data]);

  let headers = [];
  table.getAllColumns().map((columns) =>
    headers.push({
      label:
        typeof columns.columnDef.header === "string"
          ? columns.columnDef.header
          : "#",
      // @ts-ignore
      key: columns.columnDef.accessorKey,
    })
  );

  return (
    <MainCard content={false} sx={{ my: 1 }}>
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        justifyContent="space-between"
        sx={{ padding: 2 }}
      >
        <DebouncedInput
          value={globalFilter ?? ""}
          onFilterChange={(value) => setGlobalFilter(String(value))}
          placeholder={`Search ${data.length} records...`}
        />
        <TablePagination
          {...{
            setPageSize: table.setPageSize,
            setPageIndex: table.setPageIndex,
            getState: table.getState,
            getPageCount: table.getPageCount,
          }}
        />
      </Stack>

      <ScrollX>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow
                  key={headerGroup.id}
                  sx={{ "& > th:first-of-type": { width: "58px" } }}
                >
                  {headerGroup.headers.map((header) => (
                    <TableCell
                      key={header.id}
                      {...header.column.columnDef.meta}
                    >
                      <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <Typography variant="h5" color="GrayText">
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </Typography>
                        {header.column.getCanSort() && (
                          <HeaderSort column={header.column} sort />
                        )}
                      </Stack>
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
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                  {row.getIsExpanded() && (
                    <TableRow
                      sx={{
                        bgcolor: backColor,
                        "&:hover": { bgcolor: `${backColor} !important` },
                      }}
                    >
                      <TableCell colSpan={row.getVisibleCells().length}>
                        <Box
                          sx={{
                            margin: 1,
                            backgroundColor: "white",
                            borderWidth: 1,
                            borderColor: "gray",
                          }}
                        >
                          <DataTable data={getDataTable(row.original)} />
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
  );
};

export default TableInfo;
