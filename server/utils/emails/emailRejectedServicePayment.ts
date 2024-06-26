export const emailRejectedServicePayment = (
  name: string,
  serviceTitle: string
) => `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html dir="ltr" lang="en">
<head>
<meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Service Payment Update</title>
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
               
                <h1>Service Payment Update</h1>
                <p >Hi ${name},</p>
                <p >We regret to inform you that your payment for ${serviceTitle} has been rejected due to the following reason:</p>
                <ul>
                  <li>Insufficient funds in your account.</li>
                  <li>Payment method declined by your bank or card issuer.</li>
                  <li>Invalid payment details provided.</li>
                  <li>Security concerns related to the payment transaction.</li>
                </ul>
                <p >Please review the reason provided and take appropriate action if needed.</p>
                <hr style="width:100%;border:none;border-top:1px solid #eaeaea;border-color:#e6ebf1;margin:20px 0" />
                <p class="paragraph">If you have any questions, please don't hesitate to contact us.</p>
                <p class="paragraph">Sincerely,<br />IGotYou Team</p>
                <p class="paragraph">IGotYou, Brgy. Bubukal Sta. Cruz, Laguna</p>
          </div>
</body>

</html>`;
