
const nodemailer = require('nodemailer');


const emailRegistry = async userData =>{

  const { name, email, address, phone, file } = userData;
  
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'fabiola.marks@ethereal.email',
        pass: 'M5SK3KYsmQ2baxFVaJ'
    }
});
       //email's info 
    try{
       const info = await transporter.sendMail({
            from:"'Admin Node Server' <accounts@nodeserver.com>",
            to: email,
            subject:"Confirm your account",
            text:"Confirm your account on Node Server",
            html: `<p>Hi ${name} Confirm your account on Node Server</p> 
                   <p>Your account is almost ready, confirm it on the next link</p>
                   <p>${address}</p>
                   <p>${file}</p>
                   We've sent a message to <p>${phone}</p>
                   <p>If you didn't create this account, ignore this email. Thanks!</p>
                `,
        })
        console.log(info);
    } catch(err) {
        console.log(err);
    }
}


module.exports  = {
    emailRegistry
}
