import React, {FC} from 'react';
import {Box, Pagination} from "@mui/material";
import Select, {SelectChangeEvent} from "@mui/material/Select";
import {LIMITS} from "../../constants";
import MenuItem from "@mui/material/MenuItem";

interface IPaginationProps {
  total: number;
  limit: number;
  page: number;
  onPageChange: (event: unknown, page: number) => void;
  onLimitChange: (event: SelectChangeEvent) => void;
}

export const MyPagination: FC<IPaginationProps> = ({page, total, limit, onPageChange, onLimitChange}) => {
  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0 15px'
    }}>
      <Pagination
        count={Math.ceil(total / limit)}
        page={page}
        onChange={onPageChange}
      />

      <Box>
        <span>На странице: </span>
        <Select
          value={limit.toString()}
          onChange={onLimitChange}
        >
          {LIMITS.map((limit) =>
            <MenuItem key={limit.value} value={limit.value}>{limit.label}</MenuItem>
          )}
        </Select>
      </Box>
    </Box>
  );
};

