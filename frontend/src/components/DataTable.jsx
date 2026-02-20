import { useState, useEffect, useMemo  } from "react";
import {
  DataGrid,
  GridRowModes,
  GridActionsCellItem,
} from "@mui/x-data-grid";
import {
  Edit,
  Delete,
  Save,
  Close,
  Visibility,
} from "@mui/icons-material";
import { colors } from "../constants/colors";


const DataTable = ({
  rows,
  columns,
  enableRowEditing = false,
  onUpdate,
  onDelete,
  renderActions = true,
  checkBoxSelection=false,
  rowModesModel,
  setRowModesModel,
  selectionModel,
  setSelectionModel,
  handleMultiSelect
}) => {


  const handleEditClick = (id) => {
    setRowModesModel((prev) => ({
      ...prev,
      [id]: { mode: GridRowModes.Edit },
    }));
  };

  const handleSaveClick = (id) => {
    setRowModesModel((prev) => ({
      ...prev,
      [id]: { mode: GridRowModes.View },
    }));
  };

  const handleCancelClick = (id) => {
    setRowModesModel((prev) => ({
      ...prev,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    }));
  };

  const processRowUpdate = (newRow) => {
    onUpdate?.(newRow);
    return newRow;
  };

  const finalColumns = useMemo(() => {
    let cols = [...columns];
  
    if (renderActions) {
      if (enableRowEditing) {
        cols.push({
          field: "actions",
          type: "actions",
          headerName: "Actions",
          cellClassName: "action-cell",
          getActions: ({ id }) => {
            const isInEditMode =
              rowModesModel[id]?.mode === GridRowModes.Edit;
  
            return isInEditMode
              ? [
                  <GridActionsCellItem
                    icon={<Save sx={{ color: colors.textPrimary }} />}
                    label="Save"
                    onClick={() => handleSaveClick(id)}
                  />,
                  <GridActionsCellItem
                    icon={<Close sx={{ color: colors.textPrimary }} />}
                    label="Cancel"
                    onClick={() => handleCancelClick(id)}
                  />,
                ]
              : [
                  <GridActionsCellItem
                    icon={<Edit sx={{ color: colors.secondaryDark }} />}
                    label="Edit"
                    onClick={() => handleEditClick(id)}
                  />,
                  <GridActionsCellItem
                    icon={<Delete sx={{ color: colors.error }} />}
                    label="Delete"
                    onClick={() => onDelete?.(id)}
                  />,
                ];
          },
        });
      }
    }
  
    return cols;
  }, [columns, renderActions, enableRowEditing, rowModesModel]);

  return (
    <>
      <DataGrid
        rows={rows || []}
        columns={finalColumns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={setRowModesModel}
        processRowUpdate={processRowUpdate}
        checkboxSelection={checkBoxSelection}
        selectionModel={selectionModel}
        onRowSelectionModelChange={(newSelection)=>{
          setSelectionModel(newSelection || []);
          handleMultiSelect?.(newSelection || [])
        }}
        disableRowSelectionOnClick
      /> 
    </>
  );
};

export default DataTable;