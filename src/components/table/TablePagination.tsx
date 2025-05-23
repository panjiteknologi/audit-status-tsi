import { ChangeEvent, useEffect, useState } from "react";

// material-ui
import {
  FormControl,
  Grid,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

// ==============================|| TABLE PAGINATION ||============================== //

interface TablePaginationProps {
  getPageCount: () => number;
  setPageIndex: (value: number) => void;
  setPageSize: (value: number) => void;
  getState: () => any;
  initialPageSize?: number;
}

const TablePagination = ({
  getPageCount,
  setPageIndex,
  setPageSize,
  getState,
  initialPageSize,
}: TablePaginationProps) => {
  const [open, setOpen] = useState<boolean>(false);
  let options = [5, 10, 25, 50, 100];

  if (initialPageSize) {
    options = [...options, initialPageSize]
      .filter(
        (item, index) => [...options, initialPageSize].indexOf(item) === index
      )
      .sort(function (a, b) {
        return a - b;
      });
  }

  // eslint-disable-next-line
  useEffect(() => setPageSize(initialPageSize || 5), []);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleChangePagination = (
    event: ChangeEvent<unknown>,
    value: number
  ) => {
    setPageIndex(value - 1);
  };

  const handleChange = (event: SelectChangeEvent<HTMLSelectElement>) => {
    setPageSize(Number(event.target.value));
  };

  return (
    <Grid
      spacing={1}
      container
      alignItems="center"
      justifyContent="space-between"
      sx={{ width: "auto" }}
    >
      <Grid item>
        <Stack direction="row" spacing={1} alignItems="center">
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography variant="caption" color="secondary">
              Row per page
            </Typography>
            <FormControl sx={{ m: 1 }}>
              <Select
                id="demo-controlled-open-select"
                open={open}
                onClose={handleClose}
                onOpen={handleOpen}
                value={getState().pagination.pageSize}
                onChange={handleChange}
                size="small"
                sx={{ "& .MuiSelect-select": { py: 0.75, px: 1.25 } }}
              >
                {options.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
          <Typography variant="caption" color="secondary">
            Go to
          </Typography>
          <TextField
            size="small"
            type="number"
            value={getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              setPageIndex(page);
            }}
            sx={{
              "& .MuiOutlinedInput-input": { py: 0.75, px: 1.25, width: 36 },
            }}
          />
        </Stack>
      </Grid>
      <Grid item sx={{ mt: { xs: 2, sm: 0 } }}>
        <Pagination
          sx={{ "& .MuiPaginationItem-root": { my: 0.5 } }}
          count={getPageCount()}
          page={getState().pagination.pageIndex + 1}
          onChange={handleChangePagination}
          color="primary"
          variant="outlined"
          showFirstButton
          showLastButton
        />
      </Grid>
    </Grid>
  );
};

export default TablePagination;
