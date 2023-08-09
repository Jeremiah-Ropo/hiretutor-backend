import nodemailer from 'nodemailer';
import { Service } from 'typedi';

@Service()
export class EmailService {
  async sendEmail(email: string, text: string, subject: string) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      // port: 465,
      // secure: true,
      auth: {
        user: process.env.USERMAIL,
        pass: process.env.PASSWORDMAIL,
      },
    });

    const info = {
      from: {
        name: "Jeremiah",
        address: 'oluwafiropojeremiah59@gmail.com',
      },
      to: email,
      subject: subject,
      html: text,
    };
    try {
      await transporter.sendMail(info, (err, inf) => {
        console.log(err);
        inf
      });
      return true;
    } catch(err) {
      // console.log(err)
      throw new Error('email did not send ooo');
    }
  }
  async forgotPassword(token: string, email: string) {
    // const text = `<p>This token expires in 15 minutes</p><p>${token}</p><p>If you didn’t initiate this request, you can ignore this mail.</p><p>Thanks,</p><p>Your Puff 'n' pazz team</p>`;
    const text2 = `
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Email Design</title>
            <!-- <link rel="stylesheet" href="styles.css"> -->
            <style>
                body{
                    background-color: rgb(218, 214, 214);
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    font-family:serif;
                    font-size: 16px;
                }
        ​
                p{
                    color: blue;
                }
        ​
                .parent-div{
                    background-color: white;
                    width: 370px;
                    color:#4d4d50;
                    margin-left: auto 0;
                    margin-right: auto 0;
                    height: 400px;
                    padding-left: 40px;
                    padding-right: 40px;
                    border-radius: 20px;
                }
                p{
                    color: #4d4d50;
                }
                .logo{
                    font-size: 20px;
                    font-weight: 600;
                    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
                    color: rgb(8, 55, 8);
                    text-align: center;
                    padding-top: 5px;
                    padding-bottom: 5px;
                }
                .green{
                    color: rgb(48, 147, 48);
                    font-size: 20px;
                    font-weight: 500;
                    
                }
                button{
                    text-align: center;
                    width: 200px;
                    margin-right: 70px;
                    margin-left: 80px;
                    padding: 10px;
                    margin-top: 20px;
                    background-color: rgb(8, 55, 8);
                    border: none;
                    color: white;
                    border-radius: 10px;
                    
                }
                a{
                    text-decoration: none;
                    color: white;
                    font-size: 20px;
                }
        ​
                @media only screen and (max-width: 600px) {
                    .parent-div {
                    width: 320px;
                    padding-left: 20px;
                    padding-right: 0px;
                    margin-left:  0;
                    margin-right:  0;
                    }
                    button{
                        text-align: center;
                        width: 150px;
                        margin-right: 60px;
                        margin-left: 70px;
                        padding: 10px;
                        margin-top: 20px;
                        background-color: rgb(8, 55, 8);
                        border: none;
                        color: white;
                        border-radius: 10px;
                        
                    }
                }
            </style>
        </head>
        ​
        <body class="">
            <h2 class="logo">PUFF 'N' PAZZ</h2>
            <div class="parent-div">
                <h3 style="padding-top: 15px;">Reset Your Password</h3>
                <p>Hi there,</p>
                <p>Reset Password</p>
                <p>Here is the token to reset your password:  <span class="green">${token}</span></p>
                <p>This token expires in 15 minutes</p>
                <p>If you didn’t initiate this request, you can ignore this mail.</p>
                <p style="padding-top:5px">Thanks,</p>
                <p>The HireTutor Team</p>
            </div>
        </body>

    `
    const subject = 'Forgot Passowrd';
    const result = await this.sendEmail(email, text2, subject);
    return result;
  }

  async welcome(email: string, name: string, id) {
    const link = `https://jeremiah.web.app/verify/${id}`;
    const text2 = `
    
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Design</title>
        <!-- <link rel="stylesheet" href="styles.css"> -->
        <style>
            body{
                background-color: rgb(218, 214, 214);
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                font-family:serif;
            }
    ​
            p{
                color: blue;
            }
    ​
            .parent-div{
                background-color: white;
                width: 370px;
                color:#4d4d50;
                margin-left: auto 0;
                margin-right: auto 0;
                height: 400px;
                padding-left: 40px;
                padding-right: 40px;
                border-radius: 20px;
            }
            p{
                color: #4d4d50;
            }
            .logo{
                font-size: 20px;
                font-weight: 600;
                font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
                color: rgb(8, 55, 8);
                text-align: center;
                padding-top: 5px;
                padding-bottom: 5px;
            }
            button{
                text-align: center;
                width: 200px;
                margin-right: 70px;
                margin-left: 80px;
                padding: 10px;
                margin-top: 20px;
                background-color: rgb(8, 55, 8);
                border: none;
                color: white;
                border-radius: 10px;
                
            }
            a{
                text-decoration: none;
                color: white;
                font-size: 20px;
            }
    ​
            @media only screen and (max-width: 600px) {
                .parent-div {
                width: 320px;
                padding-left: 20px;
                padding-right: 0px;
                margin-left:  0;
                margin-right:  0;
                }
                button{
                    text-align: center;
                    width: 150px;
                    margin-right: 60px;
                    margin-left: 70px;
                    padding: 10px;
                    margin-top: 20px;
                    background-color: rgb(8, 55, 8);
                    border: none;
                    color: white;
                    border-radius: 10px;
                    
                }
            }
        </style>
    </head>
    ​
    <body class="">
        <h2 class="logo">PUFF 'N' PAZZ</h2>
        <div class="parent-div">
             <h3 style="padding-top: 15px;">Complete Your Registration</h3>
             <p>Hi ${name},</p>
             <p>Welcome to Puff and Pazz!</p>
             <p>Please click the link below to complete your Registration</p>
             <p style="padding-top:5px">Thanks,</p>
             <p>The HireTutor Team</p>
            <button><a href=${link}>Link</a></button> 
        </div>
    </body>
  
    `
    // const text = `<p>Hello ${name},</p><p>Welcome to puff and pazz.</p><p>Follow this link to verify your email address.</p><p><a href=${link}>link</a></p><p>Thanks,</p><p>Your Puff 'n'Pazz team</p>`;
    const subject = "Welcome to HireTutor";
    const result = await this.sendEmail(email, text2, subject);
    return result;
  }
}
