import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { addHours } from 'date-fns';


import { Navbar } from "../components/Navbar";
import { localizer, getMessagesES } from '../../helpers';

export const CalendarPage = () => {


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

  const eventStyleGetter = ( event, start, end, isSelected )=> {
    console.log({ event, start, end, isSelected }); 
    
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


  return (
    <>
      <Navbar />

      <Calendar
        culture= 'es'
        messages= { getMessagesES() }
        localizer={ localizer }
        events={ events }
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc( 100vh - 80px )' }}
        eventPropGetter={ eventStyleGetter }
      />

    </>
  )
}
