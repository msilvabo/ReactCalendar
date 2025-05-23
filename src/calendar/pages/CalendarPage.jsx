import { useEffect, useState } from "react";
import { CalendarEvent, CalendarModal, FabAddNew, FabDelete, NavBar } from "../";
import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { localizer, getMessagesES } from "../../helpers/";
import { useSelector } from "react-redux";
import { useUiStore } from "../../hooks";
import { useCalendarStore } from "../../hooks/useCalendarStore";



export const CalendarPage = () => {
  
  const {events, setActiveEvent, startLoadingEvents } = useCalendarStore();
  const activeEvent = useSelector(state => state.calendar.activeEvent);
  const {user} = useSelector(state => state.auth);
  const {openDateModal} = useUiStore();

  const eventStyleGetter = (event, start, end, isSelected ) => {
    const isOwn = event.user._id === user.uid;
    console.log({isOwn});
    
    const isSelectEvent = activeEvent && activeEvent.id === event.id;
    const style = {
      backgroundColor: isSelectEvent 
                              ? "#FF5733" 
                              : isOwn 
                                ? "#8e44ad"
                                : "#347C7F",
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white'
    }
    return {style}
  } 

useEffect(() => {
  startLoadingEvents()
}, []);  

const onDoubleClick = (event) => {
  openDateModal();
}

const onSelect = (event) => {
  setActiveEvent(event);
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
       <FabDelete/>
    </>   
  );
};
