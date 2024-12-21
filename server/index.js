import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import GoogleStrategy from "passport-google-oauth2";
import passport from "passport";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const app=express();
const port=5000;

app.use(express.json());
app.use(cors());

// const mongoUri = process.env.MONGO_URI

const FormDataSchema=new mongoose.Schema({
    name:String,
    email:String,
    password:String
})

const FormDataModel=mongoose.model('log_reg_form',FormDataSchema);
mongoose.connect("mongodb+srv://vercel-admin-user:Asha1310@todo-list.rdfvz.mongodb.net/?retryWrites=true&w=majority&appName=todo-list");
mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB successfully!');
});

const FormDataSchema1=new mongoose.Schema({
    input:String
})

const FormDataModel1=mongoose.model('message',FormDataSchema1);


passport.use("google",new GoogleStrategy({
    clientID:"180005062248-bppovs350d544510ogqkl9g34sdpso3r.apps.googleusercontent.com",
    clientSecret:"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",
    callbackURL:"https://todo-list-tailwindcss-frontend.vercel.app/Home",
    userProfileURL:"https://www.googleapis.com/oauth2/v3/userinfo",

},async(accessToken,refreshToken,profile,cb)=>{
    console.log(profile);
}));


app.get("/auth",(req,res)=>{
    passport.authenticate("google",{
        scope:["profile","email"],
    })(req,res);
})

app.get("/auth/callback",(req,res,next)=>{
    passport.authenticate("google", (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.redirect("/login"); // Redirect to login page if authentication fails
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            // Authentication successful, redirect or respond as necessary
            res.redirect("/"); // Redirect to homepage after successful authentication
        });
    })(req, res, next);
})

app.get("/",(req,res)=>{
   res.send("hello")
})


app.get("/data",(req,res)=>{
    FormDataModel1.find({})
    .then(datas=>{
        console.log(datas)
        res.send(datas)
    })
})



app.post("/register",(req,res)=>{
    const {email}=req.body;
FormDataModel.findOne({email:email})
.then(user=>{
    if(user){
        res.json("already registered!")
    }else{
        FormDataModel.create(req.body)
        .then(res=>{
            console.log(res)
            res.send(res)
        })
        .catch(err=>{
            res.json(err)
        })
    }
})
})



app.post("/login",(req,res)=>{
   const {email,password}=req.body;
   FormDataModel.findOne({email:email})
   .then(user=>{
    if(user){
        if(user.password===password){
            res.json("success");
        }else{
            res.json("wrong password")
        }
    }else{
        res.json("no records found")
    }
   })
})


app.post("/message",(req,res)=>{
    const message=req.body.input;

    FormDataModel1.findOne({input:message})
    .then(user=>{
        if(user){
            res.send("already added")
        }else{
            FormDataModel1.create(req.body)
            .then(user=>{
                if(user){
                  console.log(user)
                  FormDataModel1.find({})
                  .then(result=>{
                    console.log(result)
                    res.json(result)
                  })
                }
            })
        }
    
    })

    
    
})

app.post("/delete",(req,res)=>{
    const id=req.body.unique;
    FormDataModel1.deleteOne({_id:id})
    .then(result=>{
        console.log(result)
    })
    FormDataModel1.find({})
    .then(res1=>{
        res.json(res1)
    })
})



app.listen(port,()=>{
    console.log(`port running in ${port}`)
})






