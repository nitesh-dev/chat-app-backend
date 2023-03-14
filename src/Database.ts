import sqlite3 from "sqlite3";

export class Database {
    db: sqlite3.Database
    constructor(filename: string) {
        this.db = this.createDb(filename)
    }
    async verifyAccount(phone: number, password: string) {
        try {
            const data = await this.allSql(
                `select * from users where password=${password} and phone=${phone};`
            )
        } catch (error) {

        }

    }
    async addUser(phone: number, password: string) {
        try {
            await this.runSql(
                `insert  into users(phone,password) values(${phone},${password});`
            )
        } catch (error) {
        }
    }
    async getChats(phone: number, phoneFriend: number) {

    }
    async readTable(tableName: string = "users") {
        return await this.allSql(`select * from ${tableName};`)
    }
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
            `create table if not  exists chats(id integer primary key, sender integer ,receiver integer, message text);`
        )
        //create friends table
        await this.runSql(
            `create table if not  exists friends(id integer primary key, me integer ,friend integer);`
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