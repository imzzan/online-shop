/* eslint-disable prettier/prettier */
const otpMessageMail = ({ otp_code }) => {
  const message = `
    <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verifikasi Email</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        margin: 0;
        padding: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
      }
  
      .container {
        background-color: #fff;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        padding: 20px;
        border-radius: 8px;
        width: 300px;
        text-align: center;
        margin: 0 auto;
      }
  
      h2 {
        color: #333;
      }
  
      .box {
        width: 100%;
        padding: 10px;
        margin: 10px 0;
        box-sizing: border-box;
        text-align: center;
        border: 1px solid black;
        border-radius: 10px;
        font-weight: bold;
        color: #007BFF;
        letter-spacing: 3px;
        font-size: 18px;
      }
  
      button {
        background-color: #007BFF;
        color: #fff;
        padding: 10px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        width: 100%;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h2>Verifikasi Email</h2>
      <p>Berikut Kode OTP yang kami telah berikan</p>
      <div class="box">
          ${otp_code}
      </div>
    </div>
  </body>
  </html>
  
      `;
  return message;
};

export default otpMessageMail;
