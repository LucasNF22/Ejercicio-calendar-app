import { useState } from 'react'
import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { Navbar, CalendarEventBox, CalendarModal } from "../";

import { localizer, getMessagesES } from '../../helpers';
import { useUiStore, useCalendarStore } from '../../hooks';



export const CalendarPage = () => {

  const { openDateModal } = useUiStore();
  const { events, setActiveEvent } = useCalendarStore();
  
  const [lastView, setLastView] = useState( localStorage.getItem('lastView') || 'week' );

  const eventStyleGetter = ( event, start, end, isSelected )=> {
    
    const style = {
      backgroundColor: '#347cf7',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white',
    };

    return{
      style
    };
  };

  const onDoubleClick = ( event ) => {
    // console.log({ onDoubleClick: event });
    openDateModal();
  };

  const onSelect = ( event ) => {
    // console.log({ click: event });
    setActiveEvent( event );
  };

  const onViewChange = ( event ) => {
    localStorage.setItem('lastView', event );
  }


  return (
    <>
      <Navbar />

      <Calendar
        culture= 'es'
        messages= { getMessagesES() }
        localizer={ localizer }
        events={ events }
        defaultView={ lastView }
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc( 100vh - 80px )' }}
        eventPropGetter={ eventStyleGetter }
        components={{
          event: CalendarEventBox
        }}
        onDoubleClickEvent={ onDoubleClick }
        onSelectEvent={ onSelect }
        onView={ onViewChange }
      />

      <CalendarModal />

    </>
  )
}
