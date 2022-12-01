const express = require("express");
const bcrypt = require("bcryptjs")

const path = require("path");
const hbs = require("hbs")
require("./db/conn")
const Register = require("./models/register")

const app = express();
const port = process.env.PORT || 3000;

const static_path = path.join(__dirname,"../public")
const template_path = path.join(__dirname,"../tempates/views")
const partial_path = path.join(__dirname,"../tempates/partials")
// middleware if we use psotman only
app.use(express.json())

app.use(express.urlencoded({extended:false}))

app.use(express.static(static_path));
app.set("view engine", "hbs") 
app.set("views", template_path)
hbs.registerPartials(partial_path)


app.get("/", (req,res)=>{
    res.render("index")
})
app.get("/register", (req,res)=>{
    res.render("register")
})

app.get("/login", (req,res)=>{
    res.render("login")
})

//create a new user in our database
app.post("/register",async (req,res) =>{
    try{
        const registerEmployee = new Register({
            email: req.body.email,
            password: req.body.password
        })
        const register = await registerEmployee.save()
        res.status(201).render("index")
    }catch(error) {
        res.status(400).send(error)
    }
})

// login check
app.post("/login",async (req,res)=>{
    try {
        const email = req.body.email
        const password = req.body.password

        const useremail = await Register.findOne({email:email})
        if(useremail.password === password){
            res.status(201).render("index")
        }else{
            res.send("invalid login details");
        }
        
    } catch (error) {
        res.status(404).send("invalid login details")
    }
})

// bcrypt password secure
const securePassword = async (password) =>{
    const passwordHash = await bcrypt.hash(password, 6)
    console.log(passwordHash)

    const passwordCom = await bcrypt.compare(password, passwordHash)
    console.log(passwordCom)
}
securePassword("123456")


app.listen(port,()=>{
    console.log(`server is runing in ${port}`)
})