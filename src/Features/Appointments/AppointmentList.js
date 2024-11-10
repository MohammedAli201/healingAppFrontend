import React, { useState, useEffect } from 'react';
import { GetAppointments } from '../../Services/AppointmentServices';
import './AppointmentList.css';

const AppointmentList = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const appointmentsPerPage = 10;

    useEffect(() => {
        // Fetch appointments data from the server
        const fetchAppointments = async () => {
            try {
                const appointmentsData = await GetAppointments();
                setAppointments(appointmentsData);
            } catch (error) {
                console.error("Error fetching appointments:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAppointments();
    }, []);

    // Calculate indexes for current page
    const indexOfLastAppointment = currentPage * appointmentsPerPage;
    const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage;
    const currentAppointments = appointments.slice(indexOfFirstAppointment, indexOfLastAppointment);

    // Handle page navigation
    const nextPage = () => {
        if (currentPage < Math.ceil(appointments.length / appointmentsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="appointment-container">
            <h1 className="title">Appointment List</h1>
            {loading ? (
                <div className="loading">Loading...</div>
            ) : (
                <>
                    <table className="appointment-table">
                        <thead>
                            <tr>
                                <th>Doctor Name</th>
                                <th>Patient Name</th>
                                <th>Scheduled Time</th>
                                <th>Status</th>
                                <th>Video Link</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentAppointments.map((appointment) => (
                                <tr key={appointment.id}>
                                    <td>{appointment.doctor.firstName} {appointment.doctor.lastName}</td>
                                    <td>{appointment.patient.firstName} {appointment.patient.lastName}</td>
                                    <td>{new Date(appointment.scheduledTime).toLocaleString()}</td>
                                    <td>{appointment.status === 1 ? 'Confirmed' : 'Pending'}</td>
                                    <td>
                                        <a href={appointment.videoLink} target="_blank" rel="noopener noreferrer" className="video-link">
                                            Join Video
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="pagination">
                        <button onClick={prevPage} disabled={currentPage === 1}>
                            Previous
                        </button>
                        <span>Page {currentPage}</span>
                        <button onClick={nextPage} disabled={currentPage >= Math.ceil(appointments.length / appointmentsPerPage)}>
                            Next
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

export default AppointmentList;
