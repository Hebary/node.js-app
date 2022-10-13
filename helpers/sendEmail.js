
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

const cartRegistry = async (cartData) => {
    const { buyer , date, products, total } = cartData;

    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'fabiola.marks@ethereal.email',
            pass: 'M5SK3KYsmQ2baxFVaJ'
        }
    });
   
    try{

        let list = "";
        products.forEach(product=>{
            list += `<li>${product.name} - ${product.price}</li><br>`
        })
        const info = await transporter.sendMail({
             from:"'Admin Node Server' <accounts@nodeserver.com>",
             to: buyer.email,
             subject:"Your Cart",
             text:"Confirm your account on Node Server",
             html: `<p>Hi ${buyer.name} your order has been created!</p> 
                    <p>Your order is ready</p>
                    <p>the products will be sent to ${buyer.address}</p>
                    <ul>${list}</ul>
                    <p>Order created at ${date}</p>
                    <p>Total of this cart ${total}</p>
                    We've sent a message to <p>${buyer.phone}</p>
                    <p>If you didn't create this order, ignore this email. Thanks!</p>
                 `,
         })
         console.log(info);
     } catch(err) {
         console.log(err);
     }
    
}

module.exports  = {
    emailRegistry,
    cartRegistry
}
