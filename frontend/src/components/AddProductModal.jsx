// 
import { useState } from "react"
import { Dialog, DialogContent, DialogTitle, Stack, TextField, Box, DialogActions, Button, Typography, Alert, AlertTitle } from "@mui/material"
import { colors } from "../constants/colors"
import { createProduct } from "../api/productService"
import useAuth from "../hooks/useAuth"

const AddProductModal = ({ open, onClose, alert }) => {
  const [productData, setProductData] = useState({
    name: "",
    category: "",
    cost_price: "",
    selling_price: "",
    description: "",
    stock_availabel: "",
    units_sold: "",
  })
  const { access_token } = useAuth()
  
  const handleInputChange = (e) => {
    setProductData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleAddProduct = async () => {
    const formattedData = {
      ...productData,
      cost_price: productData.cost_price
        ? Number(productData.cost_price).toFixed(2)
        : 0,
      selling_price: productData.selling_price
        ? Number(productData.selling_price).toFixed(2)
        : 0,
      stock_available: productData.stock_available
        ? Number(productData.stock_available)
        : 0,
      units_sold: productData.units_sold
        ? Number(productData.units_sold)
        : 0,
    };

    try {
      const response = await createProduct(formattedData, access_token);
      if (response.status == 201) {
        alert({
          type: "success",
          message: response.message
        })
      }
      else {
        alert({
          type: "error",
          message: response.error
        })
      }
    }
    catch (err) {
      console.log(err);
      alert({
        type: "error",
        message: "Internal server error. Please contact support."
      })

    }


    onClose()

  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle><Typography sx={{ color: colors.primary }} variant="h5">Add Product</Typography></DialogTitle>
      <DialogContent sx={{ px: 3, py: 4 }}>
        <Box
          display='flex-column'
        >
          <Stack direction='column'>
            <TextField
              label="Product Name:"
              value={productData.name}
              name="name"
              onChange={handleInputChange}
              margin="normal"
              variant="standard"
            />
            <TextField
              label="Product Category"
              value={productData.category}
              name="category"
              onChange={handleInputChange}
              margin="normal"
              variant="standard"
            />
          </Stack>
          <Stack direction='row' gap={2}>
            <TextField
              label="Cost Price:"
              value={productData.cost_price}
              name="cost_price"
              onChange={handleInputChange}
              margin="normal"
              variant="standard"
              type="number"
            />
            <TextField
              label="Selling Price:"
              value={productData.selling_price}
              name="selling_price"
              onChange={handleInputChange}
              margin="normal"
              variant="standard"
              type="number"
            />
          </Stack>
          <TextField
            label="Product Description:"
            value={productData.description}
            name="description"
            onChange={handleInputChange}
            multiline
            minRows={3}
            margin="normal"
            fullWidth
            variant="standard"
          />
          <Stack direction='row' gap={2}>
            <TextField
              label="Stock Available:"
              value={productData.stock_availabel}
              name="stock_availabel"
              onChange={handleInputChange}
              margin="normal"
              variant="standard"
              type="number"
            />
            <TextField
              label="Units Sold:"
              value={productData.units_sold}
              name="units_sold"
              onChange={handleInputChange}
              margin="normal"
              variant="standard"
              type="number"
            />
          </Stack>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            borderColor: colors.primary
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleAddProduct}
          variant="contained"
          sx={{
            color: colors.secondaryDark,
            background: colors.primary
          }}
        >
          Add
        </Button>
      </DialogActions>



    </Dialog>
  )
}

export default AddProductModal