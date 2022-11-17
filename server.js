const express = require('express');
const app = express();
var nodemailer = require('nodemailer');


app.use(express.json());
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/index.html');
})

app.post('/customer_query', (req, res)=>{
    console.log(req.body);  
    let name = req.body.name;
    let email = req.body.email;
    let phone = req.body.phone;
    let message = req.body.message;
    let response = [1, 1, 1, 1];
    if(name.length == 0) response[0] = 0;
    for(let i=0; i<name.length; i++){
        if(name[i] >= '0' && name[i] <= '9'){
            response[0] = 0;
            break;
        }
    }
    if(phone.length != 10) response[1] = 0;
    else{
        for(let i=0; i<10; i++){
            if(phone[i] < '0' || phone[i] > '9'){
                response[1] = 0;
                break;
            }
        }
    }
    if(message.length == 0) response[3] = 0;

    if(response[0] == 1 && response[1] == 1 && response[2] == 1 && response[3] == 1){
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
            user: 'taruntestemail057@gmail.com',
            pass: 'mcxciegtiarcbvlu'
            }
        });
        
        var mailOptions = {
            from: 'taruntestemail057@gmail.com',
            to: 'kapil.sangwan.ug20@nsut.ac.in',
            subject: "Customer Query",
            text: ('Name : ' + name + '\n' + 'contact no. : ' + '\n' + phone + '\n' + 'Email : ' + email + '\n' + 'message : ' + message)
        };
        
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
            console.log(error);
            } else {
            console.log('Email sent: ' + info.response);
            }
        });
    } 

    res.send(response);
})

app.listen(process.env.PORT || 3000, ()=>{
    console.log('server is running at port 3000');
})