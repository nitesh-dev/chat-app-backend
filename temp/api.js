import axios from 'axios'

const data = {
    name: 'John Doe',
    email: 'john@example.com'
};

axios.post('http://localhost:3000/login', data)
    .then((response) => {
        console.log(response.data);
    })
    .catch((error) => {
        console.error(error); 
    }); 