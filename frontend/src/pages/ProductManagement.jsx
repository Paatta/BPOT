import { useState, useEffect, useMemo } from "react";
import { Box, Alert, AlertTitle } from "@mui/material";
import { Add, BarChart } from "@mui/icons-material";
import Header from "../components/layout/Header";
import ControlBar from "../components/layout/ControlBar";
import Footer from "../components/layout/Footer";
import AddProductModal from "../components/AddProductModal";
import DataTable from "../components/DataTable";
import {GridRowModes} from "@mui/x-data-grid"

import { colors } from "../constants/colors";
import {
  getAllProducts,
  deleteProduct,
  getCategories,
  updateProduct,
} from "../api/productService";
import useAuth from "../hooks/useAuth";
import { DemandForecastModal } from "../components/DemandForecastmodal";
import { useNavigate } from "react-router-dom";



const ProductManagement = () => {
  const { access_token, role } = useAuth();
  const navigate = useNavigate()

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [withDemandForecast, setWithDemandForecast] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [categoryValue, setCategoryValue] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [alert, setAlert] = useState(null);
  const [openDFModal, setOpenDFModal] = useState(false)
  const [rowModesModel, setRowModesModel] = useState({});
  const [selectionModel, setSelectionModel] = useState({
    type: "include",
    ids: new Set(),
  });



  useEffect(() => {
    if (alert) {
      window.scrollTo({top: 0, behavior: 'smooth'})
    }
  }, [alert, products]);

  //Fetch
  useEffect(() => {
    if (!access_token) return;
    fetchProducts();
    fetchCategories();
  }, [access_token]);

  const fetchProducts = async () => {
    try {
      const res = await getAllProducts(access_token);

      if (res.status === 200) {
        setProducts(res.message);
      } else {
        setAlert({
          type: "error",
          message: res.error,
        });
      }
    } catch {
      setAlert({
        type: "error",
        message: "Internal Server Error. Please contact support.",
      });
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await getCategories(access_token);

      if (res.status === 200) {
        setCategories(res.message);
      } else {
        setAlert({
          type: "error",
          message: res.error,
        });
      }
    } catch {
      setAlert({
        type: "error",
        message: "Internal Server Error. Please contact support.",
      });
    }
  };

  //Filter
  const filteredProducts = useMemo(() => {
    return products.filter((p) =>
      (!categoryValue || p.category === categoryValue) &&
      (!searchValue ||
        p.name.toLowerCase().includes(searchValue.toLowerCase()))
    );
  }, [ products, searchValue, categoryValue]);


  //Delete
  const handleDelete = async (productId) => {
    try {
      const res = await deleteProduct(productId, access_token);

      if (res.status === 200) {
        setAlert({
          type: "success",
          message: res.message,
        });
        fetchProducts();
      } else {
        setAlert({
          type: "error",
          message: res.error,
        });
      }
    } catch {
      setAlert({
        type: "error",
        message: "Internal Server Error. Please contact support.",
      });
    }
  };

  //Edit
  const handleUpdate = async (product) => {
    try {
      const res = await updateProduct(product.id, product, access_token);
      if (res.status === 200) {
        setAlert(
          {
            type: "success",
            message: res.message,
          }
        )
      }
      else {
        setAlert({
          type: "error",
          message: res.error
        })
      }
    }
    catch (err) {
      setAlert({
        type: "error",
        message: "Internal server error. Please contact support."
      })
    }
  }

  const formatCurrency = (value) => {
    const num = Number(value);
    return isNaN(num) ? "$ 0.00" : `$ ${num.toFixed(2)}`;
  };

  const columns = useMemo(() => {
    let base = [
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
      base.push({
        field: "demand_forecast",
        headerName: "Demand Forecast",
        flex: 1,
        editable: false,
        renderCell: (params) => (
          <span style={{ color: colors.primary, fontWeight: 600 }}>
            {params.value}
          </span>
        ),
      });
    }

    return base;

  }, [role, withDemandForecast])

  const selectedRows = useMemo(()=>{
    return products.filter(p=>
      selectedProducts?.ids?.has(p.id)
    )
  },[products, selectedProducts])


  const cancelAllEditing = () => {
    const newModes = {};
  
    Object.keys(rowModesModel).forEach((id) => {
      newModes[id] = {
        mode: GridRowModes.View,
        ignoreModifications: true,
      };
    });
  
    setRowModesModel(newModes);
  };
  
  const clearSelection = () => {
    setSelectionModel({
      type: "include",
      ids: new Set(),
    });
    setSelectedProducts([])
  };

  const onFooterCancel = () => {
    // console.log(Object.keys(rowModesModel).length)
    if ((Object.keys(rowModesModel).length > 0)) {
      cancelAllEditing();
      fetchProducts();
    }
    else{
      navigate("/")
    }
  }

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: colors.secondary, pb: 10 }}>
      {
      alert && (
        <Box sx={{ p:3,m:3 }}>
          <Alert
            severity={alert.type}
            onClose={() => setAlert(null)}
          >
            <AlertTitle>
              {alert.type === "success" ? "Success" : "Error"}
            </AlertTitle>
            {alert.message}
          </Alert>
        </Box>
      )}

      <Header />

      <ControlBar
        pageTitle="Create & Manage Product"
        withDemandForecast={withDemandForecast}
        onDemandForecastChange={setWithDemandForecast}
        handleSearch={(value)=>setSearchValue(value)}
        handleFilter={(value)=>setCategoryValue(value)}
        categories={categories}
        actionButtons={
          role === "admin"
            ? [
              {
                label: "Add New Products",
                icon: <Add />,
                onClick: () => setOpenModal(true),
              },
              {
                label: "Demand Forecast",
                icon: <BarChart />,
                onClick: () => setOpenDFModal(true),
              },
            ]
            : [
              {
                label: "Demand Forecast",
                icon: <BarChart />,
                onClick: () => setOpenDFModal(true),
              },
            ]
        }
      />

      {/* TABLE */}
      <Box sx={{ px: 3, py: 3 }}>
        <DataTable
          rows={filteredProducts}
          columns={columns}
          showCheckbox
          enableRowEditing = {role=="admin"? true : false}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
          checkBoxSelection={true}
          rowModesModel={rowModesModel}
          setRowModesModel={setRowModesModel}
          selectionModel={selectionModel}
          setSelectionModel={(model)=>setSelectionModel(model)}
          handleMultiSelect={(selectedRows) => {setSelectedProducts(selectedRows)}}
          />
      </Box>

      <Footer onCancel={onFooterCancel} onSave={handleUpdate} />

      <AddProductModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          fetchProducts();
        }}
        alert={setAlert}
      />

      <DemandForecastModal
        open={openDFModal}
        onClose={()=>{
          setOpenDFModal(false);
        }}
        selectedRows={selectedRows}
      />
    </Box>
  );
};

export default ProductManagement;