import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from "../store/calendar/calendarSlice";
import { calendarApi } from "../api";
import { ConvertEventToDateEvents } from "../helpers/convertEventToDateEvents";
import Swal from "sweetalert2";


export const useCalendarStore = () =>{

    const dispatch = useDispatch();
    const {events, activeEvent} = useSelector(store => store.calendar);
    const {user} = useSelector( store => store.auth);

    const setActiveEvent = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent));
    }



    const startSavingEvent = async(calendarEvent) => {
        console.log({calendarEvent});
        try {
            if (calendarEvent.id) {
                await calendarApi.put(`event/${calendarEvent.id}`,calendarEvent)
                dispatch(onUpdateEvent(calendarEvent));
                return;
            } 
            const {data} = await calendarApi.post('/event/', calendarEvent);
            dispatch(onAddNewEvent({...calendarEvent, id: data.evento.id, user: user}));
        } catch (error) {
            console.log(error);
            Swal.fire('Erro al guardar', error.response.data.msg, 'error');
        }        
    }



    const startdeleteEvent = async() => {

        try {
            await calendarApi.delete(`/event/${activeEvent.id}`)
            dispatch(onDeleteEvent());
        } catch (error) {
            console.log(error);
            Swal.fire('Erro al eliminar', error.response.data.msg, 'error');
        }
    }

    const startLoadingEvents = async() => {
        try {
            const {data} = await calendarApi.get('/event/');
            const newEvents = ConvertEventToDateEvents(data.eventos)
            dispatch(onLoadEvents(newEvents));
        } catch (error) {
            console.log(error);
        }
    }

    return {
        // Propiedades
        events,
        activeEvent,
        hasEventSelected: !!activeEvent,
        
        //metodos
        setActiveEvent,
        startSavingEvent,
        startdeleteEvent,
        startLoadingEvents
    };
}