import axios from 'axios';

const apiUrl = "http://localhost:5174";

const service = {
  getTasks: async () => {
    const result = await axios.get(`${apiUrl}/allTasks`);
    if(result.status !== 200) {
    console.log("Error fetching data");
    return;
    }
    return result.data;
  },

  addTask: async (NameT) => {
    const result = await axios.post(`${apiUrl}/addTask?NameT=${NameT}`);
    if(result.status !== 200) {
      console.log("Error adding data");
      return;
    }
    return result.data;
  },

  setCompleted: async (id) => {
    const result = await axios.put(`${apiUrl}/updateTask/${id}`);
    if(result.status !== 200) {
      console.log("Error updating data");
      return;
    }
    return result.data;
  
  },
  deleteTask: async (id) => {      
      const result = await axios.delete(`${apiUrl}/deleteTask/${id}`);
      if(result.status !== 200) {
        console.log("Error deleting data");
        return;
      } 
      return result.data;
},
};



export default service;