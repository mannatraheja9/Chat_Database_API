const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const mongoose = require("mongoose");
const Chat = require("./models/chat");
const methodOverride = require("method-override");

app.use(express.urlencoded({extension: true}));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));

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

//Index Route
app.get("/chats", async (req,res)=>{
  let chats = await Chat.find();
  res.render("index.ejs", {chats});
});


//New Route
app.get("/chats/new", (req, res)=>{
    res.render("new.ejs");
});


//Create Route
app.post("/chats", async (req,res)=>{
    let {from, to , msg} = req.body;
    let newChat = new Chat({
        from: from,
        to: to,
        msg: msg,
        created_at: new Date()
    });

    await newChat.save();
    res.redirect("/chats");
});


//Edit Route
app.get("/chats/:id/edit", async (req, res) =>{
   let {id} = req.params;
   let chat = await Chat.findById(id);
   res.render("edit.ejs", {chat});
});


//Update Route
app.put("/chats/:id", async (req, res)=>{
    let {id} = req.params;
    let {msg : newMsg} = req.body;
    await Chat.findByIdAndUpdate(id, {msg: newMsg}, {runValidators: true, new: true});
    res.redirect("/chats");
});


//Delete Route
app.delete("/chats/:id", async (req, res)=>{
    let {id} = req.params;
    await Chat.findByIdAndDelete(id);
    res.redirect("/chats");
});


app.get("/", (req, res) =>{
    res.send("root working");
});

app.listen(port, ()=>{
    console.log("listening on port 8080");
});