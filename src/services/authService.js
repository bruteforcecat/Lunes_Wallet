import axios from "axios";
import { BASE_URL, API_HEADER, API_HEADER_AUTH } from "../constants/apiBaseUrl";

class AuthService {
    async authenticate(email, password) {
        try {
            let response = await axios.post(`${BASE_URL}/login`, {
                login: email,
                password
            }, API_HEADER);
            return response;
        } catch (error) {
            console.error(error);
        }
    }

    async hasTwoFactorAuth() {
        try {
            console.warn("2", API_HEADER_AUTH);
            let response = await axios.get(`${BASE_URL}/user/2fa`,
                API_HEADER_AUTH);
            
                
            return response;
        } catch (error) {
             error.message;
        }
    }

    async createTwoFactorAuth() {
        try {
            let response = await axios.post(`${BASE_URL}/user/2fa`,
                {},
                API_HEADER_AUTH);

            return response;
        } catch (error) {
            return error.message;
        }
    }

    async verifyTwoFactoryAuth(token) {
        try {
            let response = await axios.post(`${BASE_URL}/user/2fa/verify`, {
                token
            }, API_HEADER_AUTH);
            return response;

        } catch (error) {
            return error.message;
        }
    }
}

export default AuthService;