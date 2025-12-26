import dotenv from 'dotenv'
dotenv.config({
    path:"./env",
});
let myusername= process.env.username
let mydatabase= process.env.database
console.log("value",myusername)
console.log("value",mydatabase)
console.log("Start of backend Project ");
