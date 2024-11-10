

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CreateAvDctor.css';

import { GetAllDoctors } from '../../../Services/DoctorSerivices';

const CreateAvDctor = () => {
    const [doctors, setDoctors] = useState([]);
    const [selectedDoctorId, setSelectedDoctorId] = useState(null);
    const [doctorDetails, setDoctorDetails] = useState({});
    const [availabilityStart, setAvailabilityStart] = useState('');
    const [availabilityEnd, setAvailabilityEnd] = useState('');
    const [daysOfWeek, setDaysOfWeek] = useState([]);

    // Fetch doctors from the backend
    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await GetAllDoctors();
                console.log(response);
                setDoctors(response);
            } catch (error) {
                console.error('Error fetching doctors:', error);
            }
        };
        fetchDoctors();
    }, []);

    // Update doctor details when a doctor is selected
    const handleDoctorChange = (e) => {
        const doctorId = parseInt(e.target.value);
        setSelectedDoctorId(doctorId);

        const selectedDoctor = doctors.find(doc => doc.id === doctorId);
        setDoctorDetails(selectedDoctor || {});
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const availabilityData = {
            availabilityStart,
            availabilityEnd,
            doctorId: selectedDoctorId,
            daysOfWeek,
            doctor: doctorDetails
        };

        try {
            await axios.post('http://localhost:5037/api/DoctorAvailability/create-availability', availabilityData);
            alert('Availability saved successfully');
        } catch (error) {
            console.error('Error saving availability:', error);
        }
    };

    // Handle day selection
    const toggleDay = (day) => {
        setDaysOfWeek(prevDays =>
            prevDays.includes(day) ? prevDays.filter(d => d !== day) : [...prevDays, day]
        );
    };

    return (
        <div className="availability-form-container">
            <h2>Set Doctor Availability</h2>
            <form onSubmit={handleSubmit} className="availability-form">
                {/* Doctor Selection */}
                <label className="form-label">Select Doctor:
                    <select value={selectedDoctorId || ''} onChange={handleDoctorChange} required>
                        <option value="">Select a doctor</option>
                        {doctors.map((doctor) => (
                            <option key={doctor.id} value={doctor.id}>
                                {doctor.firstName} {doctor.lastName} - {doctor.specialization}
                            </option>
                        ))}
                    </select>
                </label>

                {/* Display Selected Doctor Details */}
                {selectedDoctorId && (
                    <div className="doctor-details">
                        <p><strong>Specialization:</strong> {doctorDetails.specialization}</p>
                        <p><strong>Contact:</strong> {doctorDetails.contactNumber}</p>
                        <p><strong>Email:</strong> {doctorDetails.email}</p>
                        <p><strong>License Number:</strong> {doctorDetails.licenseNumber}</p>
                    </div>
                )}

                {/* Availability Start and End */}
                <label className="form-label">Availability Start:
                    <input
                        type="time"
                        value={availabilityStart}
                        onChange={(e) => setAvailabilityStart(e.target.value)}
                        required
                    />
                </label>
                <label className="form-label">Availability End:
                    <input
                        type="time"
                        value={availabilityEnd}
                        onChange={(e) => setAvailabilityEnd(e.target.value)}
                        required
                    />
                </label>

                {/* Days of the Week */}
                <div className="weekdays-container">
                    <p>Select Days:</p>
                    {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day, index) => (
                        <label key={index} className="day-checkbox">
                            <input
                                type="checkbox"
                                checked={daysOfWeek.includes(index)}
                                onChange={() => toggleDay(index)}
                            />
                            {day}
                        </label>
                    ))}
                </div>

                {/* Submit Button */}
                <button type="submit" className="submit-button">Save Availability</button>
            </form>
        </div>
    );
};

export default CreateAvDctor;
