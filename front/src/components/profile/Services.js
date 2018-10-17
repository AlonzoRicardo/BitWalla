import axios from 'axios';

export default class Services {
  constructor() {
    this.service = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}/products`,
      withCredentials: true
    });

    this.service2 = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}/profile`,
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

   getPublicProfile = (username) => {
    return this.service2.get(`/public/${username}`)
      .then((response) => response.data)
  } 

  getAllProducts = () => {
    return this.service.get('/main')
    .then(response => response.data)
  }

  deleteProduct = (id) => {
    return this.service.post(`/delete/${id}`)
    .then(response => response.data)
  }
}







 