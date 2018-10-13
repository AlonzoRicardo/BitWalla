import axios from 'axios';

export default class DetailsService {
  constructor() {
    this.service = axios.create({
      baseURL: 'http://localhost:3000/products',
      withCredentials: true
    });
  }

  getSingleProduct = (id) => {
    return this.service.get(`/id/${id}`)
    .then(response => response.data)
  }

  
}







 