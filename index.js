const http=require("http")
const express=require("express")
const sock=require("socket.io")

const app=express()
const server=http.createServer(app)
const io=new sock.Server(server,{
    cors: {
        origin: "*",
      }
})



io.on("connection",(soc)=>{

    

    soc.on("join",(data)=>{
        soc.join(data.roomid)
        
        io.in(data.roomid).allSockets().then(result=>{
            io.to(data.roomid).emit("userJoined",{data:data.peerid,result:result.size})
            console.log(result.size) })
    })
    soc.on("msg",(data)=>{
        io.to(data.roomid).emit("data",data)
    })
})

app.get("/",(req,res)=>{
  
    res.send("Hi")
})

server.listen(1230,(err)=>{
    console.log("listening")
})