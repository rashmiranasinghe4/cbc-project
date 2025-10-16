import express from "express"
import mongoose from "mongoose"
import bodyParser from "body-parser"
import studentRouter from "./routers/studentRouters.js"
import userRouter from "./routers/userRouters.js" 
import Student from "./models/student.js";

const app = express();



app.use(bodyParser.json())

app.use(
    (req,res,next)=>{
        const value = req.header("Authorization")
        if(value !=null){
            const token = value.replace("Bearer ","")
            jwt.verify(
              token,
                "cbc-6503",
                (err,decoded)=>{
                    if(decoded == null){
                        res.status(403).json({
                            message : "Unauthorized"
                        })
                    }else{
                        req.user = decoded
                        next()
                    }    

                }      
            )   
                
                
        
        }else{
            next()
        }
    }
    )

const connectionString="mongodb+srv://admin:123@cluster0.ddgltgx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"


mongoose.connect(connectionString).then(
    ()=>{
        console.log ("Database connected")
    }
).catch(
    ()=>{
        console.log("failed to connect to the database")
    }
)

app.use("/students",studentRouter)
app.use("/users", userRouter)

app.listen(5000 , 
    ()=>{
        console.log("Server started")
    }
)    










