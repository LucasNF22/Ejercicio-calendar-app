import { useState } from 'react'
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { addHours } from 'date-fns';


import { Navbar, CalendarEventBox } from "../";
import { localizer, getMessagesES } from '../../helpers';


const events = [{
  title: 'Cumpleanito',
  notes: 'Tomar Fernet',
  start: new Date(),
  end: addHours( new Date(), 2 ),
  bgColor: '#fafafa',
  user: {
    _id: '123',
    name: 'Lucas'
  }
}];

export const CalendarPage = () => {

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
    console.log({ onDoubleClick: event });
  };

  const onSelect = ( event ) => {
    console.log({ click: event });
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

    </>
  )
}
