import { Server as SocketServer } from "socket.io";
import express from 'express'
import http from 'http'
import cors from 'cors'
import { Database } from "./Database.js";
import { DatabaseResponse, MessageStatus, repeat, Status } from "./Utils.js";

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


    // ------------------------------------------- Account ---------------------------

    app.post('/login', async (req, res) => {

        const response: DatabaseResponse = { status: Status.Ok, data: "", error: "" }
        const info = req.body
        try {
            const isExist = await db.isAccountExist(info.phone, info.password)
            if (isExist) {
                response.data = "success"
            } else {
                response.data = "failed"
            }
        } catch (error) {
            response.error = "Something went wrong!"
        }

        res.send(JSON.stringify(response))
    })

    app.post('/create', async (req, res) => {
        const response: DatabaseResponse = { status: Status.Ok, data: "", error: "" }
        const info = req.body
        try {
            // check account existance
            const isExist = await db.isAccountExist(info.phone, info.password)
            if (isExist) {
                response.data = "exist"
            } else {

                // create new account
                await db.addAccount(info.phone, info.password)

                response.data = "created"
            }

        } catch (error) {
            response.error = "Something went wrong!"
        }

        res.send(JSON.stringify(response))
    })



    // ----------------------------------------------- Friends query -------------------------------

    // get friend list
    app.post('/chats/friendList', async (req, res) => {
        // {myNumber}

        const response: DatabaseResponse = { status: Status.Ok, data: [], error: "" }
        const info = req.body
        try {
            const friendList = await db.getAllFriends(info.myNumber)
            response.data = friendList
        } catch (error) {
            response.error = "Something went wrong!"
        }

        res.send(JSON.stringify(response))
    })

    app.post('/chats/addFriend', async (req, res) => {
        // {myNumber, friendNumber}

        const response: DatabaseResponse = { status: Status.Ok, data: "", error: "" }
        const info = req.body

        try {
            var isExist = await db.isFriendExist(info.myNumber, info.friendNumber)
            if(isExist) await db.addFriend(info.myNumber, info.friendNumber)

            // opposite
            isExist = await db.isFriendExist(info.friendNumber, info.myNumber)
            if(isExist) await db.addFriend(info.friendNumber, info.myNumber)

            response.data = "added"

        } catch (error) {
            console.log(error)
            response.error = "Something went wrong!"
            
        }

        res.send(JSON.stringify(response))
    })

    app.post('/chats/removeFriend', async (req, res) => {
        // {myNumber, friendNumber}

        const response: DatabaseResponse = { status: Status.Ok, data: "", error: "" }
        const info = req.body
        try {
            var isExist = await db.isFriendExist(info.myNumber, info.friendNumber)
            if(isExist) await db.removeFriend(info.myNumber, info.friendNumber)

            response.data = "removed"

        } catch (error) {
            console.log(error)
            response.error = "Something went wrong!"
        }

        res.send(JSON.stringify(response))
    })




    // -------------------------------------- chats query ----------------------

    app.post('/chats/getChats', async (req, res) => {
        // {myNumber, friendNumber}

        const response: DatabaseResponse = { status: Status.Ok, data: [], error: "" }
        const info = req.body
        try {
            var friendChats = await db.getChats(info.myNumber, info.friendNumber)
            response.data = friendChats

        } catch (error) {
            console.log(error)
            response.error = "Something went wrong!"
        }

        res.send(JSON.stringify(response))
    })


    app.post('/chats/addChat', async (req, res) => {
        // {senderNumber, receiverNumber, message, time, status}

        const response: DatabaseResponse = { status: Status.Ok, data: "", error: "" }
        const info = req.body
        try {
            await db.addChat(info.senderNumber, info.receiverNumber, info.message, info.time, MessageStatus.NotReached)
            response.data = "added"
        } catch (error) {
            console.log(error)
            response.error = "Something went wrong!"
        } 

        res.send(JSON.stringify(response))
    })

    app.post('/chats/removeChat', async (req, res) => {
        // {id}

        const response: DatabaseResponse = { status: Status.Ok, data: "", error: "" }
        const info = req.body
        try {
            await db.removeChat(info.chatId)
            response.data = "removed"
        } catch (error) {
            console.log(error)
            response.error = "Something went wrong!"
        }

        res.send(JSON.stringify(response))
    })


}
