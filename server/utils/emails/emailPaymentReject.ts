export const emailPaymentReject = (
  name: string,
  subscriptionExpiresAt: string
) => `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <html dir="ltr" lang="en">
  <head>
  <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Subscription Payment Update</title>
  <style>
      body {
          margin: 0;
          padding: 0;
      }
      .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          border: 1px solid #ccc;
      }
      h1, p {
          margin: 0;
          padding: 0;
      }
  
      .paragraph {
          text-align: center;
      }
  </style>
  </head>
  <body>
  <div class="container">
  
                    <p >Hi ${name},</p>
                    <p >We regret to inform you that your payment for IGotYou Hosting has failed. This may be due to various reasons such as insufficient funds, expired card, or other issues. As a result, your subscription benefits have been temporarily suspended.</p>
                    <p >Please ensure that your payment information is up to date to avoid any disruption in your service. You can update your payment details by logging into your account.</p>     
                    <br/>
                    <p >Thanks for your understanding,<br />IGotYou Team</p>
                
                    <hr style="width:100%;border:none;border-top:1px solid #eaeaea;border-color:#e6ebf1;margin:20px 0" />
                    <p class="paragraph">If you have any questions or need assistance, please don't hesitate to contact us.</p>
                    <p class="paragraph">Sincerely,<br />IGotYou Team</p>
                    <p class="paragraph">IGotYou, Brgy. Bubukal Sta. Cruz, Laguna</p>
           
    </body>
  </html>`;
