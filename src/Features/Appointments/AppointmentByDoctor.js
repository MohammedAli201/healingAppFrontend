import React, { useState, useEffect } from 'react';
import { GetAppointmentByFirstAndLastName } from '../../Services/AppointmentServices';
import { GetAllDoctors } from '../../Services/DoctorSerivices';
import './AppointmentByDoctor.css';

const AppointmentByDoctor = () => {
    const [appointments, setAppointments] = useState([]);
    const [doctorId, setDoctorId] = useState("");
    const [doctors, setDoctors] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

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

    const handleDoctorChange = (e) => {
        setDoctorId(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!doctorId) {
            alert("Please select a doctor.");
            return;
        }
        setLoading(true);

        const fetchAppointments = async () => {
            try {
                const selectedDoctor = doctors.find((doctor) => doctor.id === parseInt(doctorId));
                if (!selectedDoctor) {
                    alert("Doctor not found.");
                    setLoading(false);
                    return;
                }

                const data = {
                    firstName: selectedDoctor.firstName,
                    lastName: selectedDoctor.lastName,
                };

                const appointmentsData = await GetAppointmentByFirstAndLastName(data, "doctor");
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
            <h2>View Appointments by Doctor</h2>
            {submitted && <p className="success-message">Appointments fetched successfully!</p>}
            <form onSubmit={handleSubmit} className="appointment-form">
                <label className="form-label">
                    Doctor:
                    <select
                        value={doctorId}
                        onChange={handleDoctorChange}
                        required
                        className="doctor-select"
                    >
                        <option value="">Select a doctor</option>
                        {doctors.map((doctor) => (
                            <option key={doctor.id} value={doctor.id}>
                                {doctor.firstName} {doctor.lastName} - {doctor.specialization}
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

export default AppointmentByDoctor;
