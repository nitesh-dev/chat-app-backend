import { Server as SocketServer } from "socket.io";
import express from 'express'
import http from 'http'
import cors from 'cors'
import { Database } from "./Database.js";
import { repeat } from "./Utils.js";
//database 
const db = new Database("app.db")
await db.init()
//express 
const app = express();
app.use(cors())
app.use(express.json())

const server = http.createServer(app);
handlePost()
handleGet()
// start the http server
server.listen(3000, () => {
    console.log('listening on :3000');
});

function handleGet() {
    //root
    app.get('/', (req, res) => {
        res.send('Chat server is running')
    })
} 
function handlePost() {
    app.post('/login', async (req, res) => {
        /** 
            request 
                body{phone,password}
            response
                {status,reason}
        */
        const info = req.body 
        const responseDb=await db.verifyAccount(info.phone,info.password)
        console.log(responseDb)
        const reply = { status: 'success', reason: 'not exist' }
        res.send(JSON.stringify(reply))
    })
    app.post('/create', async (req, res) => {
        /** 
            request 
                body{phone,password}
            response
                {status,reason}
        */
        const info = req.body 
        const responseDb=await db.addUser(info.phone,info.password)
        console.log(responseDb)
        res.send(JSON.stringify(responseDb))
    })
}
