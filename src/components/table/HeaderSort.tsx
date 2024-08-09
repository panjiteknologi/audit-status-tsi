
import { useTheme } from '@mui/material';
import { Box, Stack } from '@mui/material';

// assets
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

const SortType = {
  ASC: 'asc',
  DESC: 'desc'
};

const SortToggler = ({ type }: { type?: string | undefined }) => {
  const theme = useTheme();
  return (
    <Stack sx={{ color: 'secondary.light' }}>
      <ArrowDropUpIcon
        style={{
          fontSize: 16,
          color: type === SortType.ASC ? theme.palette.text.primary : 'inherit'
        }}
      />
      <ArrowDropDownIcon
        style={{
          fontSize: 16,
          color: type === SortType.DESC ? theme.palette.text.primary : 'inherit'
        }}
      />
    </Stack>
  );
};

// ==============================|| SORT HEADER ||============================== //

const HeaderSort = ({ column, sort }: { column: any; sort: boolean }) => {
  return (
    <Box {...(sort && { onClick: column.getToggleSortingHandler(), className: 'cursor-pointer prevent-select' })}>
      {{
        asc: <SortToggler type={SortType.ASC} />,
        desc: <SortToggler type={SortType.DESC} />
      }[column.getIsSorted() as string] ?? <SortToggler />}
    </Box>
  );
};

export default HeaderSort;
