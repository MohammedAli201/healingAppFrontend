import React, { useState, useEffect } from 'react';

import { GetAllDoctors } from '../../Services/DoctorSerivices';
import { CreateAppointment } from '../../Services/AppointmentServices';

import './AppointmentForm.css';

const AppointmentForm = () => {
    const [doctors, setDoctors] = useState([]);
    const [patientFirstName, setpatientFirstName] = useState("");
    const [patientLasttName, setPatientLasttName] = useState("");

    const [phoneNumber, setPhoneNumber] = useState("");
    const [doctorId, setDoctorId] = useState("");
    const [time, setTime] = useState("");
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const doctorsData = await GetAllDoctors();
                setDoctors(doctorsData);
            } catch (error) {
                console.error("Error fetching doctors:", error);
            }
        };

        fetchDoctors();
    }, []);

    const handleSubmit = (e) => {
        console.log(doctorId);
        e.preventDefault();
        if (!doctorId || !patientFirstName || !time ||  !phoneNumber || !patientLasttName) {
         
            alert("Please fill out all fields.");
            return;
        }

        // Submit form logic here
        
        const data = {
            dctorId: doctorId,
            firstName: patientFirstName,
            lastName: patientLasttName,
            contactNumber: phoneNumber,
            desiredDate: time
        };
  const sendAppointment = async () => {
    try {
        const res = await CreateAppointment(data);
        console.log(
            "response ", res
        );

        console.log("Appointment submitted:", { doctorId, patientFirstName, time });
        setSubmitted(true);
        if (res) {
            setpatientFirstName("");
            setPatientLasttName("");
            setPhoneNumber("");
            setDoctorId("");
            setTime("");
        }
    } catch (error) {
        console.error("Error submitting appointment:", error);

        setSubmitted(false);
        
    }
      
    }

    sendAppointment();
    };

    return (
        <div className="appointment-form-container">
            <h2>Schedule an Appointment</h2>
            {submitted && <p className="success-message">Appointment successfully submitted!</p>}
            <form onSubmit={handleSubmit} className="appointment-form">
                <label>
                    Doctor:
                    <select 
                        value={doctorId} 
                        onChange={(e) => setDoctorId(e.target.value)} 
                        required
                    >
                        <option value="">Select a doctor</option>
                        {doctors.map((doctor) => (
                            <option key={doctor.id} value={doctor.id}>
                                {doctor.firstName} {doctor.lastName} - {doctor.specialization}
                            </option>
                        ))}
                    </select>
                </label>
                
                <label>
                    Patient First Name:
                    <input
                        type="text"
                        value={patientFirstName}
                        onChange={(e) => setpatientFirstName(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Patient Last Name:
                    <input
                        type="text"
                        value={patientLasttName}
                        onChange={(e) => setPatientLasttName(e.target.value)}
                        required
                    />
                </label>


                <label>
                    phoneNumber :
                    <input
                        type="number"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                    />
                </label>


                <label>
                    Desired Time:
                    <input
                        type="datetime-local"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        required
                    />
                </label>

                <button type="submit" className="submit-button">Submit</button>
            </form>
        </div>
    );
};

export default AppointmentForm;
