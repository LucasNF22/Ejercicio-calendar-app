import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from "../store"
import calendarApi from "../api/calendarApi";
import { convertEventsToDateEvents } from "../helpers";
import Swal from "sweetalert2";


export const useCalendarStore = () => {
  
    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector( state => state.calendar );
    const { user } = useSelector( state => state.auth );

    const setActiveEvent = ( calendarEvent ) => {
        dispatch( onSetActiveEvent( calendarEvent ) )
    };

    const startSavingEvent = async( calendarEvent ) => {
        // TODO: update event


        try {
            if( calendarEvent.id ){
                //actualizando
                const { data } = await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent );
    
                dispatch( onUpdateEvent({ ...calendarEvent }) );
    
            } else{
                //creando
                const { data } = await calendarApi.post( '/events', calendarEvent )
                dispatch( onAddNewEvent({ ...calendarEvent, id: data.evento.id, user }) )
    
            };
        } catch (error) {
            console.log(error);
            Swal.fire({
                title: 'Error al guardar', 
                text: error.response.data.msg, 
                icon: 'error',
                showConfirmButton: false,
                toast: true,
                position: 'top-end',
                timer: 2000,
                padding: "5px 5px 5px 20px"
            });
        }
        

    };

    const startDeletingEvent = async() => {
        dispatch( onDeleteEvent() );
    };

    const startLoadingEvents = async() => {
        
        try {
            const { data } = await calendarApi.get('/events');
            const events = convertEventsToDateEvents( data.eventos );
            //console.log(events);
            dispatch( onLoadEvents( events ) )


        } catch (error) {
            console.log('Error al cargar eventos');
            console.log(error);
        }
    };

    return {

        // propiedades
        events,
        activeEvent,
        hasEventSelected: !!activeEvent,

        // Metodos
        setActiveEvent,
        startSavingEvent,
        startDeletingEvent,
        startLoadingEvents,
    }
    
}
