



import React, { useState, useEffect } from 'react';
import { GetAppointmentByFirstAndLastName } from '../../Services/AppointmentServices';
import {GetPatients}from '../../Services/AppointmentServices';
import './AppointmentByDoctor.css';

const ViewAppointmentsBypatient = () => {
    const [appointments, setAppointments] = useState([]);
    const [patientId, setpatientId] = useState("");
    const [patients, setpatients] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchpatients = async () => {
            try {
                const patientsData = await GetPatients();
                setpatients(patientsData);
            } catch (error) {
                console.error("Error fetching patients:", error);
            }
        };
        fetchpatients();
    }, []);

    const handleDoctorChange = (e) => {
        setpatientId(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!patientId) {
            alert("Please select a doctor.");
            return;
        }
        setLoading(true);

        const fetchAppointments = async () => {
            try {
                const selectedDoctor = patients.find((patient) => patient.id === parseInt(patientId));
                
                if (!selectedDoctor) {
                    alert("Doctor not found.");
                    setLoading(false);
                    return;
                }

                const data = {
                    firstName: selectedDoctor.firstName,
                    lastName: selectedDoctor.lastName,
                };

                const appointmentsData = await GetAppointmentByFirstAndLastName(data, "patient");
                console.log(appointmentsData);
                setAppointments(appointmentsData);
                setSubmitted(true);
            } catch (error) {
                console.error("Error fetching appointments:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAppointments();
    };

    return (
        <div className="appointment-form-container">
            <h2>View Appointments by patient</h2>
            {submitted && <p className="success-message">Appointments fetched successfully!</p>}
            <form onSubmit={handleSubmit} className="appointment-form">
                <label className="form-label">
                    Patient:
                    <select
                        value={patientId}
                        onChange={handleDoctorChange}
                        required
                        className="patient-select"
                    >
                        <option value="">Select a doctor</option>
                        {patients.map((patient) => (
                            <option key={patient.id} value={patient.id}>
                                {patient.firstName} {patient.lastName} 
                            </option>
                        ))}
                    </select>
                </label>
                <button type="submit" className="submit-button">Submit</button>
            </form>

            {loading ? (
                <div className="loading">Loading...</div>
            ) : (
                submitted && appointments.length > 0 ? (
                    <ul className="appointment-list">
                        {appointments.map((appointment, index) => (
                            <li key={index} className="appointment-item">
                                <p><strong>Scheduled Time:</strong> {new Date(appointment.scheduledTime).toLocaleString()}</p>
                                <p><strong>Status:</strong> {appointment.status === 2 ? 'Completed' : 'Pending'}</p>
                                <p><strong>Video Link:</strong> <a href={appointment.videoLink} target="_blank" rel="noopener noreferrer">{appointment.videoLink}</a></p>
                                <p><strong>Patient:</strong> {appointment.patient.firstName} {appointment.patient.lastName}</p>
                                <p><strong>Docotor:</strong> {appointment.doctor.firstName} {appointment.doctor.lastName}  -  {appointment.doctor.specialization}</p>
                                <p><strong>Contact Number:</strong> {appointment.patient.contactNumber}</p>
                                <p><strong>Email:</strong> {appointment.patient.email}</p>
                                <p><strong>Date of Birth:</strong> {new Date(appointment.patient.dateOfBirth).toLocaleDateString()}</p>
                                <p><strong>Medical History:</strong> {appointment.patient.medicalHistory}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    submitted && <p className="no-appointments">No appointments found for this doctor.</p>
                )
            )}
        </div>
    );
};

export default ViewAppointmentsBypatient;
