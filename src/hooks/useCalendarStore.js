import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from "../store"
import calendarApi from "../api/calendarApi";
import { convertEventsToDateEvents } from "../helpers";


export const useCalendarStore = () => {
  
    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector( state => state.calendar );
    const { user } = useSelector( state => state.auth );

    const setActiveEvent = ( calendarEvent ) => {
        dispatch( onSetActiveEvent( calendarEvent ) )
    };

    const startSavingEvent = async( calendarEvent ) => {
        // TODO: update event


        if( calendarEvent._id ){
            //actualizando
            dispatch( onUpdateEvent({ ...calendarEvent }) );

        } else{
            //creando
            const { data } = await calendarApi.post( '/events', calendarEvent )
            dispatch( onAddNewEvent({ ...calendarEvent, id: data.evento.id, user }) )

        };

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
