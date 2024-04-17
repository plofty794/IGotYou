import { differenceInDays } from "date-fns";

export const emailServiceCancellationApproval = (
  reservationID: string,
  reservationDates: string[],
  hostName: string,
  serviceTitle: string,
  cancellationPolicy: string,
  cancellationDate: string,
  price: number
) => `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <html dir="ltr" lang="en">
  <head>
  <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reservation Cancellation Request Update</title>
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
    h1, h2, p, ul, li {
      margin: 0;
      padding: 0;
    }
    h2 {
      margin-top: 20px;
    }
    .policy-list {
      list-style-type: disc;
      margin-left: 20px;
    }
    .policy-list li {
      margin-bottom: 5px;
    }
  </style>
  </head>
  <body>
    <div class="container">
      <h1>Reservation Cancellation Request Approved</h1>
      <p>Your reservation cancellation request has been approved.</p>
      <p>Details of the reservation:</p>
      <ul class="policy-list">
        <li><strong>Reservation ID:</strong> ${reservationID}</li>
        <li><strong>Service Title:</strong> ${serviceTitle}</li>
        <li><strong>Reservation Date:</strong> ${reservationDates[0]} - ${
  reservationDates[1]
}</li>
        <li><strong>Cancelled By:</strong> ${hostName}</li>
        <li><strong>Cancellation Date:</strong> ${cancellationDate}</li>
      </ul>

      <h2>Cancellation Policy:</h2>
      <p>This reservation follows the <strong>${cancellationPolicy}</strong> cancellation policy.</p>
      <p>Here's a breakdown of the policy:</p>
      <ul class="policy-list">
        <li><strong>Flexible:</strong> Full refund 1 day prior to service.</li>
        <li><strong>Moderate:</strong> Full refund at least 3 days prior to service.</li>
        <li><strong>Strict:</strong> Full refund for cancellations made if the service date is at least 5 days away. 50% refund for cancellations made at least 3-5 days before service. No refunds for cancellations made within 3 days before service.</li>
        <li><strong>Non-refundable:</strong> Guests pay 10% less, but you keep your payout no matter when they cancel.</li>
      </ul>
  
      <h2>Refund Details:</h2>
      <p>Based on the cancellation policy and your cancellation date of ${cancellationDate}, 
      your refund amount is calculated as follows:</p>
      <p><strong>Refund Amount:</strong> ${calculateRefund(
        reservationDates[0],
        cancellationDate,
        cancellationPolicy,
        price
      )}</p>
      <hr style="width:100%;border:none;border-top:1px solid #eaeaea;border-color:#e6ebf1;margin:20px 0" />
      <p class="paragraph">IGotYou, Brgy. Bubukal Sta. Cruz, Laguna</p>
      <p class="paragraph">If you have any further questions or concerns, feel free to contact us.</p>
      <p class="paragraph">Thank you.</p>
    </div>
  </body>
  </html>`;

export const calculateRefund = (
  bookingStartsAt: string,
  cancellationDate: string,
  cancellationPolicy: string,
  bookingAmount: number
) => {
  let refundPercentage = 0;
  switch (cancellationPolicy) {
    case "Flexible":
      refundPercentage =
        differenceInDays(
          new Date(bookingStartsAt).setHours(0, 0, 0, 0),
          new Date(cancellationDate).setHours(0, 0, 0, 0)
        ) >= 1
          ? 100
          : 0;
      break;
    case "Moderate":
      refundPercentage =
        differenceInDays(
          new Date(bookingStartsAt).setHours(0, 0, 0, 0),
          new Date(cancellationDate).setHours(0, 0, 0, 0)
        ) >= 3
          ? 100
          : 0;
      break;
    case "Strict":
      if (
        differenceInDays(
          new Date(bookingStartsAt).setHours(0, 0, 0, 0),
          new Date(cancellationDate).setHours(0, 0, 0, 0)
        ) >= 5
      )
        refundPercentage = 100;
      else if (
        differenceInDays(
          new Date(bookingStartsAt).setHours(0, 0, 0, 0),
          new Date(cancellationDate).setHours(0, 0, 0, 0)
        ) >= 3
      )
        refundPercentage = 50;
      break;
    case "Non-refundable":
      refundPercentage = 0;
      break;
    default:
      refundPercentage = 0;
  }

  const refundAmount = (refundPercentage / 100) * bookingAmount;
  return refundAmount.toFixed(2);
};
