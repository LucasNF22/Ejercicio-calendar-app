import { createSlice } from '@reduxjs/toolkit'
import { addHours } from 'date-fns';

const tempEvent = {
    title: 'Cumpleanito',
    notes: 'Tomar Fernet',
    start: new Date(),
    end: addHours( new Date(), 2 ),
    bgColor: '#fafafa',
    user: {
      _id: '123',
      name: 'Lucas'
    }
  }

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState: {
    events: [
        tempEvent
    ],
    activeEvent: null,
  },
  reducers: {
    onPrueba: (state) => {
        
    },

  }
});


export const { onPrueba } = calendarSlice.actions;


