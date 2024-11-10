
import React from 'react';

import AppointmentList from './Features/Appointments/AppointmentList';
import AppointmentForm from './Features/Appointments/AppointmentForm';
import AppointmentByDoctor from './Features/Appointments/AppointmentByDoctor';
import ViewAppointmentsBypatient from './Features/Appointments/ViewAppointmentsBypatient';
import CreateAvDctor from './Features/Appointments/Availability/CreateAvDctor';

function App() {
  return (
    <div className="App">
     
      
        <AppointmentByDoctor />

    </div>
  );
}

export default App;
