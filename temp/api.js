import axios from 'axios'

// const data = {
//     phone: 5552555555,
//     password: 'john@exam'
// };

// axios.post('http://localhost:3000/create', data)
//     .then((response) => {
//         console.log(response.data);
//     })
//     .catch((error) => {
//         console.error(error); 
//     }); 



//sender, receiver, message, time, status
// const chatData = {
//     senderNumber: 725645,
//     receiverNumber: 9939,
//     message: "Hed",
//     time: "12:23",
//     status: 10
// };

const chatData = {
    myNumber: 9939,
    friendNumber: 725645
};

// const chatData = {
//     chatId: 8
// };


axios.post('http://localhost:3000/chats/getChats', chatData)
    .then((response) => {
        console.log(response.data);
    })
    .catch((error) => {
        console.error(error);
    }); 

