import axios from 'axios';
import { ApiError } from '../utils/ApiError';
import { ApiResponse } from '../utils/ApiResponse';

class ApiClient {

    constructor(baseUrl) {
        //  instance creation of axios
        this.client = axios.create({
            baseUrl,
            headers :{
                "Content-Type":"application/json"
            }
        })
        
    }

    async get(endpoint , params = {}, headers = {}  ) {
        try {
            await this.client.get(endpoint, { params, headers})
            .then(function (response){
                ApiResponse(200, response.data, "success")
                console.log(response.data)
            })
        } 
        catch{
            (function (error){
            if (error.response) {
                throw new ApiError(error.response.status, error.response.data.message, error.response.data.errors, error.response.data.stack)
                
            } else if (error.request) {
                throw new ApiError(500, "internal server error", [], error.request.stack)
            } else {
                throw new ApiError(500, error.message, [], error.stack)
            }
            
        })}
    }


    async post(endpoint, file , headers = {}) {
        try {
            const formData = new FormData();
            formData.append('file', file);
            const response = await this.client.post(endpoint, formData, {
                headers: {
                    ...headers,
                    'Content-Type': 'multipart/form-data'
                }
            });
            ApiResponse(200, response.data, "success")
            
        } catch (error) {
            if (error.response) {
                throw new ApiError(error.response.status, error.response.data.message, error.response.data.errors, error.response.data.stack)
                
            } else if (error.request) {
                throw new ApiError(500, "internal server error", [], error.request.stack)
            } else {
                throw new ApiError(500, error.message, [], error.stack)
            }
            
        }
    }

}