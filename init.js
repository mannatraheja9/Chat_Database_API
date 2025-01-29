const mongoose = require("mongoose");
const Chat = require("./models/chat.js");

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp"); 
}

main()
.then(()=>{
    console.log("connection successful");
})
.catch((err)=>{
    console.log(err);
});


let allChats = [
{
    from: "Asha",
    to: "Tisha",
    msg: "What a day!",
    created_at: new Date()
},
{
    from: "Reena",
    to: "Sana",
    msg: "There is a meeting tomorrow." ,
    created_at: new Date()
},
{
    from: "Sanjana" ,
    to: "Jiya",
    msg: "JavaScript is easy.",
    created_at: new Date()
},
{
    from: "Anisha" ,
    to: "Priyanka",
    msg: "It's a good idea.",
    created_at: new Date()
},
{
    from: "Zeenia",
    to: "Vanshika",
    msg: "Good day!",
    created_at: new Date()
}
];

Chat.insertMany(allChats);