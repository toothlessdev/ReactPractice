import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: -1,
};

export const modalSlice = createSlice({
    name: "moal",
    initialState,
    reducers: {
        setModal: function (state, param) {
            state.value = param.payload;
        },
    },
});

export const { setModal } = modalSlice.actions;
export default modalSlice.reducer;
