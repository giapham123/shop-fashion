export default function handler(req, res) {
   const { phone, customerName, address, note  } = req.body
    var result = funcMailer(phone, customerName, address, note)
    res.status(200).json(result);
  }
  var nodemailer = require('nodemailer');

const funcMailer = async(phone, customerName, address, note) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        auth: {
          user: 'giapham121994@gmail.com',
          pass: 'pbjuacaplprkqdrq'
        }
      });
      const mailOptions = {
        from: 'giapham121994@gmail.com',
        to: 'giapham121994@gmail.com',
        subject: 'New Order ' + phone,
        text: 'The Store A has new orders',
        html: "<b> Điện Thoại: "+phone+"</b> <br> <b> Tên Khách Hàng: "+customerName+"</b> <br> <b> Địa Chỉ: "+address+"</b> <br> <b>Note: "+note+"</b>",
      };
      return await transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}