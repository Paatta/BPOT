import { Box, Dialog,DialogContent, DialogTitle, Stack, IconButton, Typography } from '@mui/material'
import { colors } from '../constants/colors'
import { useMemo, React } from 'react'
import { DataLineChart } from './charts/DataLineChart'
import SimpleTable from './SimpleTable'
import CloseIcon from '@mui/icons-material/Close'

const columns = [
    {
      field: "name",
      header: "Product Name",
    },
    {
      field: "category",
      header: "Category",
    },
    {
      field: "cost_price",
      header: "Cost",
      render: (row) => `$ ${row.cost_price.toFixed(2)}`
    },
    {
      field: "selling_price",
      header: "Current Price",
      render: (row) => `$ ${row.selling_price.toFixed(2)}`
    },
    {
      field: "units_sold",
      header: "Units Sold",
    },
    {
      field: "stock_available",
      header: "Stock",
    }
  ];
export const DemandForecastModal = ({
    open,
    onClose,
    selectedRows
}) => {
    
    const data = useMemo(()=>{
    let info = selectedRows.map((row) => ({
        id: row.id,
        name: row.name,
        demand_forecast: row.demand_forecast,
        selling_price: row.selling_price
    }))

    return info;
  }, [selectedRows])
  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullwidth>
        <DialogTitle sx={{color: colors.primary}}>Demand Forecast</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={(theme) => ({
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
            {selectedRows.length>0?
                <Stack direction='column' gap={3}>
                <DataLineChart data={data}/>
                <SimpleTable
                    rows={selectedRows}
                    columns={columns}
                />
                </Stack>
            : <Typography variant='body1' fullwidth>No products selected. Please select a product.</Typography>  
            }
        </DialogContent>
    </Dialog>
  )
}
