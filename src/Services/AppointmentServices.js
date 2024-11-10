
import axios from "axios";
const API_URL = "http://localhost:5037/api/Appointment";
const API_URL_Doctors = "http://localhost:5037/api/Doctor/AppointSchedule";
const API_URL_Patients = "http://localhost:5037/api/Patient";
export const CreateAppointment = async(data) => {

// send appointment data to the server using axios

try {
    // send appointment data to the server using axios
    // return the response data
    const response = await axios.post(`${API_URL_Doctors}`, data);
    return response.data;

} catch (error) {
    console.error(error);


}

}

export const GetAppointments = async() => {

// get appointments data from the server using axios
try {
    // get appointments data from the server using axios
    // return the response data
    const response = await axios.get(`${API_URL}/getAll-appointment`);
    return response.data;
    
} catch (error) {
    console.error(error);


    
}

}

export const GetPatients = async() => {

    // get appointments data from the server using axios
    try {
        // get appointments data from the server using axios
        // return the response data
        const response = await axios.get(`${API_URL_Patients}/getAll-patient`);
        return response.data;
        
    } catch (error) {
        console.error(error);
    
    
        
    }
    
    }
export const UpdateAppointment = async(data) => {
    // update appointment data on the server using axios
    try {
        // update appointment data on the server using axios
        // return the response data
        const response = await axios.put(`${API_URL}/update-appointment`, data);
        return response.data;
        
    } catch (error) {
        console.error(error);
    }
}

export const DeleteAppointment = async(data) => {
    // delete appointment data from the server using axios
    try {
        // delete appointment data from the server using axios
        // return the response data
        const response = await axios.delete(`${API_URL}/delete-appointment`, { data });
        return response.data;
        
    } catch (error) {
        console.error(error);
    }
}

//GET APPOINTMENT BY ID

export const GetAppointmentByFirstAndLastName = async(data, selectSearch) => {
    let getAppointbyIdURL =""
    switch (selectSearch) {
        case "doctor":
             getAppointbyIdURL = "http://localhost:5037/api/Appointment/by-doctor";

            break;
        case "patient":

            getAppointbyIdURL = "http://localhost:5037/api/Appointment/by-patient";
            break;
    
        default:
            break;
    }
    // get appointment data by id from the server using axios
    try {
        // get appointment data by id from the server using axios
        // return the response data
        const response = await axios.post(`${getAppointbyIdURL}`, data)
     //   const response = await axios.post(`${getAppointbyIdURL}/${id}`);
        return response.data;
        
    } catch (error) {
        console.error(error);
    }
}




//GET APPOINTMENT BY pagesize

export const GetAppointmentByPageSize = async(pageNumber,pageSize) => {
    // get appointment data by pagesize from the server using axios
    try {
        // get appointment data by pagesize from the server using axios
        // return the response data
        const response = await axios.get(`${API_URL}/get-appointmentByPagination?pageNumber=${pageNumber}&pageSize=${pageSize}`);
        return response.data;
        
    } catch (error) {
        console.error(error);
    }
}

//GET All doctors


