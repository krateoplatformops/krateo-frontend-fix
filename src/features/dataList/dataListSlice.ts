import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../redux/store";

export type DataListType = {
  element: string,
  props:{
    icon: string,
    color: string,
    title: string,
    status: string,
    date: string,
    content: string,
    tags: string,
    actions: {
      name: string,
      enabled: boolean,
      path: string,
      verb: string
    }[]
  }
}

export type DataListFilterType = { fieldType: string, fieldName: string, fieldValue: string | string[] }

export type DataListState = {
  // prefix: string,
  data: DataListType[],
  filteredData: DataListType[],
  filters: DataListFilterType[]
}

const initialState: DataListState = {
  // prefix: "",
  data: [],
  filteredData: [],
  filters: []
}

export const dataListSlice = createSlice({
  name: 'dataList',
  initialState,
  reducers: {
    setDataList: (state, action: PayloadAction<DataListType[]>) => {
      state.data = action.payload;
      state.filteredData = action.payload;
    },
    filterDataList: (state, action: PayloadAction<DataListType[]>) => {
      state.filteredData = action.payload;
    },
    resetFilterDataList: (state) => {
      state.filteredData = state.data;
    },
    clearDataList: (state) => {
      state.data = [];
    },
    setFilters: (state, action: PayloadAction<DataListFilterType[]>) => {
      state.filters = action.payload;
      state.filteredData = state.data.filter(el => {
        let valid = false;
        action.payload.forEach(filter => {
          const index = Object.keys(el.props).indexOf(filter.fieldName);
          const valueToCompare: string = Object.values(el.props)[index] as string;
          // TODO: handle multiple filters, keep form data, filters number
          if (index > -1) {
            switch (filter.fieldType) {
              case "text":
              case "textArea": // tested
                valid = valueToCompare?.toLowerCase().includes((filter.fieldValue as string)?.toLowerCase()) // text, textarea -> include
                break;
              case "number": // tested
                valid = valueToCompare === filter.fieldValue
                break;
              case "select": // tested
                valid = valueToCompare === filter.fieldValue
                break;
              case "radioGroup":
                valid = valueToCompare === filter.fieldValue
                break;
              case "checkboxGroup": // tested
                valid = (filter.fieldValue as string[]).filter(filter => valueToCompare === filter).length > 0
                break;
              case "checkbox": // tested send true/false (checked)
                valid = valueToCompare === filter.fieldValue
                break;
              case "datetime": // Needs ISO from K8
                const dateFilter = new Date((filter.fieldValue as string))
                const dateToCompare = new Date(valueToCompare)
                valid = (dateFilter.getDate() === dateToCompare.getDate() && 
                         dateFilter.getMonth() === dateToCompare.getMonth() && 
                         dateFilter.getFullYear() === dateToCompare.getFullYear()
                        )
                break;
              default:
                valid = valueToCompare === filter.fieldValue
                break;
            }
          }
        })
        return valid;
      })      
    },
    clearFilters: (state) => {
      state.filters = [];
    }
  }
});

export const { setDataList, clearDataList, setFilters, clearFilters } = dataListSlice.actions;

export default dataListSlice.reducer;

export const selectDataList = (state: RootState) => state.dataList?.filteredData;
export const selectFilters = (state: RootState) => state.dataList?.filters;