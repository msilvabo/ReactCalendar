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
  _id: new Date().getTime()+123456,
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
      isLoadingEvents: true,
        events: [
            // tempEvent, tempEvent2
        ],
        activeEvent: null
    },
    reducers: {
        onSetActiveEvent: (state, {payload} ) => {
            state.activeEvent = payload;
        },

        onAddNewEvent: (state,{payload}) => {
            state.events.push(payload);
            state.activeEvent = null;
        },
        onUpdateEvent: (state,{payload}) => {
            state.events = state.events.map(event => {
              if (event.id === payload.id) {
                return payload;
              }  
              return event;
            })
            state.activeEvent = null;
        },
        onDeleteEvent: (state) => {
          if (state.activeEvent){
            state.events = state.events.filter(event => (event.id != state.activeEvent.id));
            state.activeEvent = null;
          }
        },
        onLoadEvents: (state, {payload =[] }) => {
          state.isLoadingEvents = false;
          state.events = payload;
          payload.forEach( event => {
            const exists = state.events.some(dbEvent => dbEvent.id === event.id );
            if(!exists){
              state.events.push( event );
            }
          });
        },
        onLogOutCalendar: (state)  => {
          state.isLoadingEvents = true;
          state.events = [];
          state.activeEvent = null;
        }
    }
});


// Action creators are generated for each case reducer function
export const { 
  onSetActiveEvent, 
  onAddNewEvent, 
  onUpdateEvent, 
  onDeleteEvent, 
  onLoadEvents,
  onLogOutCalendar,
} = calendarSlice.actions;