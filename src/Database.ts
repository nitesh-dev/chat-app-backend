import sqlite3 from "sqlite3";
import { DatabaseResponse, Status } from "./Utils.js";
sqlite3.verbose()
export class Database {
    db: sqlite3.Database
    constructor(filename: string) {
        this.db = this.createDb(filename)
    }


    // -------------------------------------------- account Handler ----------------------------

    async isAccountExist(phone: number, password: string) {

        const data = await this.allSql(`SELECT * FROM users WHERE password='${password}' AND phone=${phone} LIMIT 1`)

        if (data.length == 0) {
            return false
        } else {
            return true
        }
    }

    async addAccount(phone: number, password: string) {
        await this.runSql(`INSERT INTO users (password, phone) VALUES ('${password}', ${phone})`)
    }



    // --------------------------------------- Chat Handler -----------------------

    // chats table handler code
    async getChats(myNumber: number, friendNumber: number) {
        return this.allSql(`SELECT * FROM chats WHERE sender=${myNumber} AND receiver=${friendNumber} OR sender=${friendNumber} AND receiver=${myNumber}`)
    }

    async addChat(senderNumber: number, receiverNumber: number, message: string, time: string, status: number){
        await this.runSql(`INSERT INTO chats (sender, receiver, message, time, status) VALUES (${senderNumber}, ${receiverNumber}, '${message}', '${time}', ${status})`)
    }

    async removeChat(id: number){
        await this.runSql(`DELETE FROM chats WHERE id=${id}`)
    }


    //-------------------------------------------- Friend Table Handler --------------------

    // friends table handler code
    async getAllFriends(myNumber: number){
        return await this.allSql(`SELECT (friend_number) FROM friends WHERE my_number=${myNumber}`)
    }

    async isFriendExist(myNumber: number, friendNumber: number){
        const friends = await this.allSql(`SELECT * FROM friends WHERE my_number=${myNumber} AND friend_number=${friendNumber} LIMIT 1`)
        if(friends.length == 0) return false
        return true
    }

    async addFriend(myNumber: number, friendNumber: number){
        await this.runSql(`INSERT INTO friends (my_number, friend_number) VALUES (${myNumber}, ${friendNumber})`)
    }

    async removeFriend(myNumber: number, friendNumber: number){
        await this.runSql(`DELETE FROM friends WHERE my_number=${myNumber} AND friend_number=${friendNumber}`)
    }
    


    // extra

    private createDb(filename: string) {
        sqlite3.verbose()
        return new sqlite3.Database(filename)
    }

    async init() {
        //create users table
        await this.runSql(
            `create table if not  exists users(id integer primary key, phone integer,password text,name text);`
        )
        //create chats table
        await this.runSql(
            `create table if not  exists chats(id integer primary key, sender integer ,receiver integer, message text, time text, status integer);`
        )
        //create friends table
        await this.runSql(
            `create table if not  exists friends(id integer primary key, my_number integer ,friend_number integer);`
        )
    }

    private async runSql(sql: string) {
        return new Promise<void>((resolve, reject) => {
            this.db.run(sql, function (err) {
                if (err) reject(err)
                else resolve()
            })
        });
    }

    private async allSql(sql: string) {
        return new Promise<any[]>((resolve, reject) => {
            this.db.all(sql, function (err, rows) {
                if (err) reject(err)
                else resolve(rows)
            })
        });
    }

}