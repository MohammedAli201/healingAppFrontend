import axios from 'axios';

const API_URL_Doctors = 'http://localhost:5037/api/Doctor';

export const GetAllDoctors = async() => {
    // get all doctors data from the server using axios
    try {
        // get all doctors data from the server using axios
        // return the response data
        const response = await axios.get(`${API_URL_Doctors}`);
        return response.data;
        
    } catch (error) {
        console.error(error);
    }
}