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

export type DataListFilterType = { fieldName: string, fieldValue: string }

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
      state.filteredData = state.data.filter(el => action.payload.map(filter => {
        const index = Object.keys(el.props).indexOf(filter.fieldName);
        return ( index > -1 && el.props[index] === filter.fieldValue );
      }))
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