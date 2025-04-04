import { createSlice } from '@reduxjs/toolkit';
import { addDays, addHours } from 'date-fns';

const tempEvent ={
  _id: new Date().getTime(),
  title: 'Cumpleaños',
  notes: 'festejar',
  start: new Date(),
  end: addHours(new Date(),2),
  bgColor: '#fafafa',
  user:{
    id:'123',
    name: 'Moisés'
  }
}
const tempEvent2 ={
  _id: new Date().getTime(),
  title: 'Reunión',
  notes: 'Coordinar',
  start: addDays(new Date(),2),
  end: addDays(new Date(),3),
  bgColor: '#fafafa',
  user:{
    id:'123',
    name: 'Carlos'
  }
}

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        events: [
            tempEvent, tempEvent2
        ],
        activeEvent: null
    },
    reducers: {
        onSetActiveEvent: (state, {payload} ) => {
            state.activeEvent = payload;
        },
    }
});


// Action creators are generated for each case reducer function
export const { onSetActiveEvent } = calendarSlice.actions;