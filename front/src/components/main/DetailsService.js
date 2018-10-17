import axios from 'axios';

export default class DetailsService {
  constructor() {
    this.service = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}/products`,
      withCredentials: true
    });
  }

  getSingleProduct = (id) => {
    return this.service.get(`/id/${id}`)
    .then(response => response.data)
  }

  
}







 