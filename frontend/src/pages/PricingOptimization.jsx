import { useEffect, useMemo, useState } from "react";
import DataTable from "../components/DataTable";
import ControlBar from "../components/layout/ControlBar";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import {
  Alert,
  AlertTitle,
  Box,
  Stack
} from "@mui/material"
import useAuth from "../hooks/useAuth";
import { getAllProducts, getCategories } from "../api/productService";
import {colors} from "../constants/colors";

const PricingOptimization = () => {
  const [withDemandForecast, setWithDemandForecast] = useState(false)
  const [filterValue, setFilterValue] = useState('')
  const [searchValue, setSearchValue] = useState('')
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [alert, setAlert] = useState(null)
  const {access_token, role} = useAuth()

  useEffect (() => {

    fetchProducts()
    fetchCategories()

  },[access_token])

  // close alert after 4s
  useEffect(() => {
    if (alert) {
      window.scrollTo({top: 0, behavior: 'smooth'})
    }
  }, [alert]);

  const fetchProducts = async() => {

    try{
      const res = await getAllProducts(access_token);
      if (res.status == 200) {
        setProducts(res.message? res.message : []);
      }
      else{
        setAlert((prev)=>({
          ...prev,
          title: "Error",
          message: res.error,
          variant: "error"
        }))
      }
    }
    catch(err){
      setAlert((prev)=>({
        ...prev,
        title: "Error",
        message: "Internal Server error. Please contact support",
        variant: "error"
      }))
    }
  };

  const fetchCategories= async() => {

    try{
      const res = await getCategories(access_token);
      if (res.status == 200) {
        setCategories(res.message? res.message : []);
      }
      else{
        setAlert((prev)=>({
          ...prev,
          title: "Error",
          message: res.error,
          variant: "error"
        }))
      }
    }
    catch(err){
      setAlert((prev)=>({
        ...prev,
        title: "Error",
        message: "Internal Server error. Please contact support",
        variant: "error"
      }))
    }
  };

  const filteredProducts = useMemo(()=>{
    let filteredProds = products.filter((p) => (
      filterValue ? p.category === filterValue : true
    )). 
    filter((p) => (
      searchValue.trim().toLowerCase() != '' ? p.name.toLowerCase().includes(searchValue.toLowerCase()) : true
    ))
    return filteredProds
  }, [searchValue, filterValue, products])
  

  const formatCurrency = (value) => {
    const num = Number(value);
    return isNaN(num) ? "$ 0.00" : `$ ${num.toFixed(2)}`;
  };

  const finalColumns = useMemo(() => {
    let columns = [
      { field: "name", headerName: "Product Name", flex: 1, editable: true, filterable: false },
      { field: "category", headerName: "Category", flex: 1, editable: true, filterable: false },
      { field: "description", headerName: "Description", flex: 1, editable: true, filterable: false },
      {
        field: "cost_price",
        headerName: "Cost Price",
        type: "number",
        flex: 1,
        editable: true,
        filterable: false,
        renderCell: (params) => formatCurrency(params.value),
        headerAlign: "left",
        align: "left"

      },
      {
        field: "selling_price",
        headerName: "Selling Price",
        type: "number",
        flex: 1,
        editable: true,
        filterable: false,
        renderCell: (params) => formatCurrency(params.value),
        headerAlign: "left",
        align: "left"

      },
      {
        field: "stock_available",
        headerName: "Stock",
        type: "number",
        flex: 1,
        editable: true,
        filterable: false,
        headerAlign: "left",
        align: "left"
      },
      {
        field: "units_sold",
        headerName: "Units Sold",
        type: "number",
        flex: 1,
        editable: true,
        filterable: false,
        headerAlign: "left",
        align: "left"
      },
    ];

    if (withDemandForecast) {
      columns.push({
        field: "optimized_price",
        headerName: "Optimized Price",
        flex: 1,
        editable: true,
        renderCell: (params) => (
          <Stack
          direction="row"
          sx={{
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={{ color: colors.secondaryLight, fontWeight: 600 }}>
            ₹ {params.row.cost_price ?? "—"}
          </span>

          <span style={{ color: colors.primary, fontWeight: 600 }}>
            ₹ {params.row.optimized_price ?? "—"}
          </span>
        </Stack>   
        ),
      });
    }

    return  columns;
    
  }, [withDemandForecast])


  return(
    <Box>
      {alert &&
        <Alert><AlertTitle variant={alert.variant}>{alert.title}</AlertTitle>{alert.message}</Alert>
      }
      <Header/>
      <ControlBar
        pageTitle = "Pricing Optimization"
        withDemandForecast = {withDemandForecast}
        onDemandForecastChange = {setWithDemandForecast}
        handleFilter = {(value)=> setFilterValue(value)}
        handleSearch = {(value)=>setSearchValue(value)}
        categories = {categories}
      />
      <Box sx={{ px: 3, py: 3 }}>
        <DataTable
          rows={filteredProducts}
          columns={finalColumns}
          enableRowEditing = {role=="admin"? true: false}
          renderActions = {false}    
        />
      </Box>
      <Footer/>
    </Box>
  )
}

export default PricingOptimization;