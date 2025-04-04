import { useState } from "react";
import { CalendarEvent, CalendarModal, FabAddNew, NavBar } from "../";
import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { addHours} from "date-fns";
import { localizer, getMessagesES } from "../../helpers/";
import { useSelector } from "react-redux";
import { useUiStore } from "../../hooks";
import { useCalendarStore } from "../../hooks/useCalendarStore";



export const CalendarPage = () => {
  
  const {events, setActiveEvent } = useCalendarStore();
  const {openDateModal} = useUiStore();
  const eventStyleGetter = (event, start, end, isSelected ) =>{

  const style = {
    backgroundColor: "#347C7F",
    borderRadius: '0px',
    opacity: 0.8,
    color: 'white'
  }
  return {style}
} 

const onDoubleClick = (event) => {
  console.log({onDoubleClick: event});
  
}
const onSelect = (event) => {
  console.log({click: event});
  setActiveEvent(event);
  openDateModal();
}

const onViewChanged = (event) => {
  console.log({viewChange: event});
  localStorage.setItem('lastView', event);
}


  const [lastView, setlastView] = useState(localStorage.getItem('lastView') || 'month');
  const isDateModalOpen = useSelector(state => state.ui.isDateModalOpen);
  return (
    <>
      <NavBar/>
      <Calendar
        culture= 'es'
        localizer={localizer}
        events={events}
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100vh - 80px)', width: '100vw', marginTop:'60px' }}
        messages = {getMessagesES()}
        eventPropGetter = {eventStyleGetter}
        components = {{
          event: CalendarEvent
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChanged}
      />
       <CalendarModal/>
       <FabAddNew/>
    </>
  );
};
