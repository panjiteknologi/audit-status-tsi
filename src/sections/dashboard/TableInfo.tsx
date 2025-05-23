import {
  Dispatch,
  Fragment,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";
import MainCard from "@/components/MainCard";
import { AllProject, Standar } from "@/types/Project";
import ScrollX from "@/components/ScrollX";
import {
  Box,
  Chip,
  Paper,
  Select,
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
  Row,
  FilterFnOption,
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
import { useLocation } from "react-router";
import { findTahapan } from "@/utils/getNormalizeTahapan";

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
  uniqueStandards: Standar;
  selectedStandard: string | null;
  setSelectedStandard: Dispatch<SetStateAction<string | null>>;
}

const TableInfo = ({
  data,
  uniqueStandards,
  selectedStandard,
  setSelectedStandard,
}: TableInfoProps) => {
  const routes = useLocation();
  const pathName = routes?.pathname?.substring(1);

  const theme = useTheme();
  const backColor = alpha(`${theme.palette.primary.lighter}`, 0.1);

  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [sorting, setSorting] = useState<SortingState>([]);

  const dataTransform = useMemo(() => {
    const stat = {
      surveilance1: "sv 1",
      surveilance2: "sv 2",
      surveilance3: "sv 3",
      surveilance4: "sv 4",
      surveilance5: "sv 5",
    } as const;

    type StatKey = keyof typeof stat;

    // const filtered = data.filter((item) => {
    //   if (globalFilter.trim() === "") return true; // tampilkan semua jika belum search

    //   // saat search, sembunyikan jika akreditasi atau standar kosong
    //   const hasAccreditation =
    //     Array.isArray(item.accreditation) && item.accreditation.length > 0;
    //   const hasStandards =
    //     Array.isArray(item.iso_standards) && item.iso_standards.length > 0;

    //   return hasAccreditation && hasStandards;
    // });

    const trans = data.map((item) => ({
      ...item,
      sv: stat[item.tahapan as unknown as StatKey] ?? item.tahapan,
    }));

    return trans;
  }, [data, globalFilter]);

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
        accessorKey: "customer",
        meta: {
          className: "cell-center",
        },
        cell: ({ row }) => {
          return (
            <Typography variant="h3" sx={{ color: "rgb(30, 32, 95)" }}>
              {row.original.customer ?? "-"}
            </Typography>
          );
        },
      },
      {
        header: "Nama Sales",
        accessorKey: "sales_person",
        meta: {
          className: "cell-center",
        },
        cell: ({ row }) => {
          return (
            <Typography variant="h4" sx={{ color: "rgb(30, 32, 95)" }}>
              {row?.original?.sales_person ?? "-"}
            </Typography>
          );
        },
      },
      {
        header: "Standar",
        accessorKey: "iso_standards",
        meta: {
          className: "cell-center",
        },
        cell: ({ row }) => {
          const standar: Standar[] | undefined = row?.original?.iso_standards;
          return Array.isArray(standar) && standar.length > 0 ? (
            standar.map((item, index) => (
              <Chip
                key={index}
                label={(item as any) ?? "-"}
                sx={{ m: 0.2, fontSize: 18 }}
                color="primary"
                variant="outlined"
              />
            ))
          ) : (
            <Typography variant="h4" sx={{ color: "text.secondary" }}>
              -
            </Typography>
          );
        },
        enableColumnFilter: true,
        filterFn: (row, columnId, filterValue) => {
          const values: string[] | undefined = row.getValue(columnId);
          if (!values || values.length === 0) return false;
          return values.some((v) =>
            v.toLowerCase().includes(filterValue.toLowerCase())
          );
        },
      },
      {
        header: "Akreditasi",
        accessorKey: "accreditation",
        id: "accreditation",
        meta: {
          className: "cell-center",
        },
        cell: ({ row }) => {
          const accreditations = row.original?.accreditation;
          return Array.isArray(accreditations) && accreditations.length > 0 ? (
            accreditations.map((item, index) => (
              <Chip
                key={index}
                label={item ?? "-"}
                sx={{ m: 0.2, fontSize: 18 }}
                color="primary"
                variant="outlined"
              />
            ))
          ) : (
            <Typography variant="h4" sx={{ color: "text.secondary" }}>
              -
            </Typography>
          );
        },
        filterFn: "includesString",
      },
      {
        header: "Tahapan",
        accessorKey: "tahapan",
        meta: {
          className: "cell-center",
        },
        cell: ({ row }) => {
          const normalizedField = findTahapan(row?.original?.tahapan as string);

          return (
            <Typography variant="h3" sx={{ color: "rgb(30, 32, 95)" }}>
              {normalizedField?.nama_tahapan ?? "-"}
            </Typography>
          );
        },
      },
      {
        header: "Latest Progress",
        accessorKey: "tahapan",
        accessorFn: (row) => getlatestProgress(row),
        id: "latest_progress",
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
        filterFn: "includesString",
      },
      {
        header: "Next Step",
        accessorKey: "next_step",
        accessorFn: (row) => getNextStep(row),
        id: "next_step",
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
        filterFn: "includesString",
      },
      {
        header: "Lead Time Project",
        accessorKey: "lead_time_finish",
        meta: {
          className: "cell-center",
        },
        cell: ({ row }) => {
          return (
            <Typography variant="h4" sx={{ color: "rgb(30, 32, 95)" }}>
              {row.original?.lead_time_finish ?? "-"}
            </Typography>
          );
        },
      },
    ],
    []
  );

  const customGlobalFilter = (
    row: Row<AllProject>,
    columnId: string,
    filterValue: string
  ) => {
    const filter = filterValue.toLowerCase();

    const flatString = Object.values(row.original)
      .map((val) => {
        if (Array.isArray(val)) return val.join(" ");
        if (typeof val === "number") return val.toString();
        return val ?? "";
      })
      .join(" ")
      .toLowerCase();

    if (columnId === "next_step") {
      const next = getNextStep(row.original);
      return next.toLowerCase().includes(filter);
    }

    // Cari di latest progress (computed)
    if (columnId === "latest_progress") {
      const latest = getlatestProgress(row.original);
      return latest.toLowerCase().includes(filter);
    }
    return flatString.includes(filterValue.toLowerCase());
  };

  const table = useReactTable({
    data: dataTransform,
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
    globalFilterFn: customGlobalFilter as FilterFnOption<AllProject>,
  });

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

  //Slider Time Table
  useEffect(() => {
    const dataLength = data.length;

    const intervalId = setInterval(() => {
      const pageSize = table.getState().pagination.pageSize;
      const pageIndex = table.getState().pagination.pageIndex;
      const maxPage = dataLength / pageSize;

      table.setPageIndex(pageIndex < maxPage - 1 ? pageIndex + 1 : 0);
    }, 40000);

    // Membersihkan interval saat komponen di-unmount
    return () => clearInterval(intervalId);
  }, [data]);

  return (
    <Fragment>
      <Stack
        sx={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          pb: 2,
          width: "100%",
        }}
      >
        <Box sx={{ width: "100%" }}>
          <DebouncedInput
            value={globalFilter ?? ""}
            onFilterChange={(value) => {
              setGlobalFilter(String(value));
            }}
            placeholder={`Search ${data.length} records...`}
          />
        </Box>
        <Box>
          <Select
            native
            value={selectedStandard ?? ""}
            onChange={(e) => {
              const value = e.target.value;
              setSelectedStandard(value === "" ? null : value);
              table
                .getColumn("iso_standards")
                ?.setFilterValue(value === "" ? undefined : value);
            }}
            sx={{
              width: "100%",
              fontSize: 16,
              borderRadius: 1,
            }}
          >
            <option value="">Semua Standar</option>
            {uniqueStandards.map((standard, idx) => (
              <option key={idx} value={standard}>
                {standard}
              </option>
            ))}
          </Select>
        </Box>
      </Stack>
      <MainCard content={false} sx={{ my: 1 }}>
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
                {table.getRowModel().rows.length ? (
                  table.getRowModel().rows.map((row) => (
                    <Fragment key={row.id}>
                      <TableRow>
                        {row.getVisibleCells().map((cell) => (
                          <TableCell
                            key={cell.id}
                            {...cell.column.columnDef.meta}
                          >
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
                              <DataTable
                                data={getDataTable(row.original)}
                                pathName={pathName}
                              />
                            </Box>
                          </TableCell>
                        </TableRow>
                      )}
                    </Fragment>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length}>
                      <Typography
                        variant="h4"
                        align="center"
                        color="text.secondary"
                        sx={{ py: 4 }}
                      >
                        Data tidak ditemukan
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </ScrollX>

        <Stack sx={{ padding: 2 }}>
          {dataTransform.length > 0 && (
            <Stack
              direction="row"
              justifyContent="flex-end"
              sx={{ px: 2, pb: 2 }}
            >
              <Typography variant="caption" color="secondary">
                Menampilkan {table.getPaginationRowModel().rows.length} dari{" "}
                {table.getFilteredRowModel().rows.length} data
              </Typography>
            </Stack>
          )}

          <TablePagination
            {...{
              setPageSize: table.setPageSize,
              setPageIndex: table.setPageIndex,
              getState: table.getState,
              getPageCount: table.getPageCount,
            }}
          />
        </Stack>
      </MainCard>
    </Fragment>
  );
};

export default TableInfo;
