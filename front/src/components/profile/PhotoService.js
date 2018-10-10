import axios from 'axios';

export default class PhotoService {
  constructor() {
    this.service = axios.create({
      baseURL: 'http://localhost:3000/products',
      withCredentials: true
    });

    this.service2 = axios.create({
      baseURL: 'http://localhost:3000/profile',
      withCredentials: true
    });
  }

  addPicture(file, productName, productDescription, productPrice) {
    const formData = new FormData();
    formData.append("photo", file)
    formData.append("productName", productName)
    formData.append("productDescription", productDescription)
    formData.append("productPrice", productPrice)

    console.log('DEBUG formData', formData.get("photo"));
    
    return this.service
      .post('new', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(res => res.data)
  }

  getProfileProducts = (username) => {
    return this.service2.get(`/${username}`)
    .then(response => response.data)
  }

  getAllProducts = () => {
    return this.service.get('/main')
    .then(response => response.data)
  }
}







 