import axios from 'axios';


const API_URL = 'https://localhost:7088/api'; // URL de la API



//Función para enviar archivos
export const uploadFileApi = async (endpoint, formData) => {
    try {
        const response = await axios.post(`${API_URL}/${endpoint}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error uploading file", error);
        throw error;
    }
};




// Función para obtener datos por get
export const getApi = async (endpoint) => {
    try {
      const response = await fetch(`${API_URL}/${endpoint}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
};


//Función para actualizar objetos por Put
export const postApi = async (endpoint, object) => {
    try {
      const response = await fetch(`${API_URL}/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(object),
      });
        console.log('Raw response:', response);
    
        const data = await response.json();

        console.log('Parsed JSON:', data);
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
};


//Función para actualizar objetos por Put
export const putApi = async (endpoint, object) => {
    try {
      const response = await fetch(`${API_URL}/${endpoint}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(object),
      });
        console.log('Raw response:', response);
    
        const data = await response.json();

        console.log('Parsed JSON:', data);
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };

//Función para eliminar datos
export const deleteApi = async (endpoint) => {
    try {
      const response = await fetch(`${API_URL}/${endpoint}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
}

};