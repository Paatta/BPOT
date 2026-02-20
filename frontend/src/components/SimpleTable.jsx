import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Checkbox,
    Box,
    IconButton,
    Typography,
  } from "@mui/material";
  import { Visibility, Edit, Delete } from "@mui/icons-material";
  import { colors } from "../constants/colors";
import useAuth from "../hooks/useAuth";
  
  const SimpleTable = ({
    rows = [],
    columns = [],
    showCheckbox = false,
    showDemandForecast = true,
    showActions = false,
    selectedRows = [],
    onSelectAll,
    onSelectRow,
    onDelete,
  }) => {
    const{role} = useAuth()
    return (
      <TableContainer
        component={Paper}
        sx={{ backgroundColor: "transparent", boxShadow: "none" }}
      >
        <Table
          stickyHeader
          size="small"
          sx={{
            "& td:not(:last-child), & th:not(:last-child)": {
              borderRight: `1px solid ${colors.secondaryDark}`,
            },
          }}
        >
          {/* HEADER */}
          <TableHead>
            <TableRow sx={{ backgroundColor: colors.secondary }}>
              {showCheckbox && (
                <TableCell
                  padding="checkbox"
                  sx={{ borderBottom: `1px solid ${colors.divider}` }}
                >
                  <Checkbox
                    checked={
                      rows.length > 0 &&
                      selectedRows.length === rows.length
                    }
                    indeterminate={
                      selectedRows.length > 0 &&
                      selectedRows.length < rows.length
                    }
                    onChange={onSelectAll}
                    sx={{
                      color: colors.textPrimary,
                      "&.Mui-checked": {
                        color: colors.primary,
                      },
                    }}
                  />
                </TableCell>
              )}
  
              {columns.map((col) => (
                <TableCell
                  key={col.field}
                  align={col.align || "left"}
                  sx={{
                    color: colors.textPrimary,
                    fontWeight: 600,
                    borderBottom: `1px solid ${colors.divider}`,
                  }}
                >
                  {col.header}
                </TableCell>
              ))}
  
              {showDemandForecast && (
                <TableCell
                  align="right"
                  sx={{
                    color: colors.textPrimary,
                    fontWeight: 600,
                    borderBottom: `1px solid ${colors.divider}`,
                  }}
                >
                  Calculated Demand Forecast
                </TableCell>
              )}
  
              {showActions && (
              <TableCell
                align="center"
                sx={{
                  color: colors.textPrimary,
                  fontWeight: 600,
                  borderBottom: `1px solid ${colors.divider}`,
                }}
              >
                Action
              </TableCell>
              )}
              
            </TableRow>
          </TableHead>
  
          {/* BODY */}
          <TableBody>
            {rows.map((row, index) => (
              <TableRow
                key={row.id}
                sx={{
                  backgroundColor:
                    index % 2 === 0
                      ? colors.tableRowEven
                      : colors.tableRowOdd,
                  "&:hover": {
                    backgroundColor: colors.tableRowHover,
                  },
                }}
              >
                {showCheckbox && (
                  <TableCell
                    padding="checkbox"
                    sx={{
                      borderBottom: `1px solid ${colors.divider}`,
                    }}
                  >
                    <Checkbox
                      checked={selectedRows.includes(row.id)}
                      onChange={() => onSelectRow(row.id)}
                      sx={{
                        color: colors.secondaryDark,
                        "&.Mui-checked": {
                          color: colors.primary,
                        },
                      }}
                    />
                  </TableCell>
                )}
  
                {columns.map((col) => (
                  <TableCell
                    key={col.field}
                    align={col.align || "left"}
                    sx={{
                      color: colors.secondaryDark,
                      borderBottom: `1px solid ${colors.divider}`,
                    }}
                  >
                    {col.render ? (
                      col.render(row)
                    ) : col.field === "description" ? (
                      <Typography
                        variant="body2"
                        sx={{
                          maxWidth: 300,
                          color: colors.secondaryDark,
                        }}
                      >
                        {row[col.field]}
                      </Typography>
                    ) : (
                      row[col.field]
                    )}
                  </TableCell>
                ))}
  
                {showDemandForecast && (
                  <TableCell
                    align="right"
                    sx={{
                      color: colors.primary,
                      fontWeight: 600,
                      borderBottom: `1px solid ${colors.divider}`,
                    }}
                  >
                    {row.demand_forecast}
                  </TableCell>
                )}
  
                {showActions && (
                <TableCell
                  align="center"
                  sx={{
                    borderBottom: `1px solid ${colors.divider}`,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      gap: 1,
                      justifyContent: "center",
                    }}
                  >
                    <IconButton
                      size="small"
                      sx={{ color: colors.secondaryDark }}
                    >
                      <Visibility fontSize="small" />
                    </IconButton>
                    {role=="admin"?
                      <>
                        <IconButton
                        size="small"
                        sx={{ color: colors.secondaryDark }}
                      >
                        <Edit fontSize="small" />
                      </IconButton>
    
                      <IconButton
                        size="small"
                        sx={{ color: colors.error }}
                        onClick={() => onDelete?.(row.id)}
                      >
                        <Delete fontSize="small" />
                      </IconButton>
                     </> : null
                    }
                  </Box>
                </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };
  
export default SimpleTable;