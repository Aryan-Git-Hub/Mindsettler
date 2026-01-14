// utils/emailService.js (add this function)
import nodemailer from "nodemailer";

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SENDER_EMAIL,
      pass: process.env.SENDER_PASSWORD,
    },
  });
};

// Helper: Format time to 12-hour
const formatTime = (time24) => {
  if (!time24) return "";
  const [hours, minutes] = time24.split(":");
  const h = parseInt(hours);
  const ampm = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 || 12;
  return `${h12}:${minutes} ${ampm}`;
};

// Helper: Format date
const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};


export const sendBookingConfirmationEmail = async (email, bookingDetails) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SENDER_EMAIL,
      pass: process.env.SENDER_PASSWORD,
    },
  });

  const {
    userName,
    therapyType,
    sessionType,
    date,
    timeSlot,
    isPaidViaWallet,
    sessionPrice,
    bookingId,
  } = bookingDetails;

  // Format date
  const formattedDate = new Date(date).toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Format time to 12-hour
  const formatTime = (time24) => {
    const [hours, minutes] = time24.split(":");
    const h = parseInt(hours);
    const ampm = h >= 12 ? "PM" : "AM";
    const h12 = h % 12 || 12;
    return `${h12}:${minutes} ${ampm}`;
  };

  const formattedTime = formatTime(timeSlot);
  const isOnline = sessionType === "online";

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Booking Confirmed</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f7;">
      <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
        
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #3F2965 0%, #DD1764 100%); border-radius: 20px 20px 0 0; padding: 40px; text-align: center;">
          <div style="font-size: 50px; margin-bottom: 10px;">✅</div>
          <h1 style="color: white; margin: 0; font-size: 24px;">Booking Confirmed!</h1>
          <p style="color: rgba(255,255,255,0.8); margin: 10px 0 0 0; font-size: 14px;">Your therapy session has been scheduled</p>
        </div>
        
        <!-- Body -->
        <div style="background: white; padding: 40px; border-radius: 0 0 20px 20px; box-shadow: 0 10px 40px rgba(0,0,0,0.1);">
          
          <p style="color: #333; font-size: 16px; line-height: 1.6; margin: 0 0 25px 0;">
            Hi <strong>${userName}</strong>,
          </p>
          
          <p style="color: #666; font-size: 16px; line-height: 1.6; margin: 0 0 30px 0;">
            Great news! Your therapy session has been successfully booked. Here are your booking details:
          </p>
          
          <!-- Booking Details Card -->
          <div style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border-radius: 16px; padding: 25px; margin-bottom: 30px;">
            
            <!-- Booking ID -->
            <div style="text-align: center; margin-bottom: 20px; padding-bottom: 15px; border-bottom: 1px dashed #ccc;">
              <p style="color: #999; font-size: 12px; margin: 0; text-transform: uppercase; letter-spacing: 1px;">Booking ID</p>
              <p style="color: #3F2965; font-size: 14px; font-weight: bold; margin: 5px 0 0 0; font-family: 'Courier New', monospace;">${bookingId}</p>
            </div>
            
            <!-- Details Grid -->
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0;">
                  <span style="color: #999; font-size: 12px; text-transform: uppercase;">📋 Therapy Type</span>
                </td>
                <td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0; text-align: right;">
                  <span style="color: #3F2965; font-size: 14px; font-weight: 600;">${therapyType}</span>
                </td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0;">
                  <span style="color: #999; font-size: 12px; text-transform: uppercase;">${isOnline ? "💻" : "🏥"} Session Type</span>
                </td>
                <td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0; text-align: right;">
                  <span style="color: #3F2965; font-size: 14px; font-weight: 600;">${isOnline ? "Online Session" : "In-Person Visit"}</span>
                </td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0;">
                  <span style="color: #999; font-size: 12px; text-transform: uppercase;">📅 Date</span>
                </td>
                <td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0; text-align: right;">
                  <span style="color: #3F2965; font-size: 14px; font-weight: 600;">${formattedDate}</span>
                </td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0;">
                  <span style="color: #999; font-size: 12px; text-transform: uppercase;">⏰ Time</span>
                </td>
                <td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0; text-align: right;">
                  <span style="color: #3F2965; font-size: 14px; font-weight: 600;">${formattedTime}</span>
                </td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0;">
                  <span style="color: #999; font-size: 12px; text-transform: uppercase;">⏱️ Duration</span>
                </td>
                <td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0; text-align: right;">
                  <span style="color: #3F2965; font-size: 14px; font-weight: 600;">60 Minutes</span>
                </td>
              </tr>
              <tr>
                <td style="padding: 12px 0;">
                  <span style="color: #999; font-size: 12px; text-transform: uppercase;">💰 Payment</span>
                </td>
                <td style="padding: 12px 0; text-align: right;">
                  <span style="color: ${isPaidViaWallet ? "#10b981" : "#f59e0b"}; font-size: 14px; font-weight: 600;">
                    ${isPaidViaWallet ? `₹${sessionPrice} (Paid via Wallet)` : `₹${sessionPrice} (Pay at Clinic)`}
                  </span>
                </td>
              </tr>
            </table>
          </div>
          
          ${!isPaidViaWallet ? `
          <!-- Cash Payment Notice -->
          <div style="background: linear-gradient(135deg, #fef3cd 0%, #ffeeba 100%); border: 1px solid #ffc107; padding: 15px 20px; border-radius: 12px; margin-bottom: 25px;">
            <p style="color: #856404; font-size: 14px; margin: 0; text-align: center;">
              💵 <strong>Payment Reminder:</strong> Please pay ₹${sessionPrice} in cash at the clinic before your session.
            </p>
          </div>
          ` : ""}
          
          ${isOnline ? `
          <!-- Online Session Info -->
          <div style="background: linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%); border: 1px solid #0ea5e9; padding: 15px 20px; border-radius: 12px; margin-bottom: 25px;">
            <p style="color: #0369a1; font-size: 14px; margin: 0;">
              💻 <strong>Online Session:</strong> You will receive a video call link 30 minutes before your session.
            </p>
          </div>
          ` : `
          <!-- In-Person Visit Info -->
          <div style="background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border: 1px solid #22c55e; padding: 15px 20px; border-radius: 12px; margin-bottom: 25px;">
            <p style="color: #166534; font-size: 14px; margin: 0 0 10px 0;">
              🏥 <strong>Clinic Address:</strong>
            </p>
            <p style="color: #166534; font-size: 14px; margin: 0;">
              MindSettler Wellness Center<br>
              123 Healing Street, Wellness District<br>
              City - 123456
            </p>
          </div>
          `}
          
          <!-- What to Expect -->
          <div style="margin-bottom: 25px;">
            <h3 style="color: #3F2965; font-size: 16px; margin: 0 0 15px 0;">📝 What to Expect:</h3>
            <ul style="color: #666; font-size: 14px; line-height: 1.8; padding-left: 20px; margin: 0;">
              <li>Please be ready 5 minutes before your scheduled time</li>
              <li>Find a quiet, private space for your session</li>
              <li>Keep a notebook handy if you'd like to take notes</li>
              <li>Feel free to prepare any topics you'd like to discuss</li>
            </ul>
          </div>
          
          <!-- CTA Button -->
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.FRONTEND_URL}/profile#My%20Bookings" 
               style="display: inline-block; background: linear-gradient(135deg, #3F2965 0%, #DD1764 100%); color: white; padding: 15px 40px; text-decoration: none; border-radius: 50px; font-weight: bold; font-size: 14px; box-shadow: 0 4px 15px rgba(63, 41, 101, 0.3);">
              View My Bookings
            </a>
          </div>
          
          <!-- Cancellation Policy -->
          <div style="border-top: 1px solid #eee; padding-top: 20px; margin-top: 20px;">
            <p style="color: #999; font-size: 12px; line-height: 1.6; margin: 0;">
              <strong>Cancellation Policy:</strong> You can reschedule or cancel your appointment up to 24 hours before the scheduled time. 
              For any assistance, please contact us at support@mindsettler.com
            </p>
          </div>
          
        </div>
        
        <!-- Footer -->
        <div style="text-align: center; margin-top: 30px;">
          <p style="color: #999; font-size: 12px; margin: 0 0 10px 0;">
            Need help? Contact us at <a href="mailto:support@mindsettler.com" style="color: #DD1764;">support@mindsettler.com</a>
          </p>
          <p style="color: #999; font-size: 12px; margin: 0;">
            © ${new Date().getFullYear()} MindSettler. All rights reserved.
          </p>
        </div>
        
      </div>
    </body>
    </html>
  `;

  const textContent = `
    Booking Confirmed!
    
    Hi ${userName},
    
    Your therapy session has been successfully booked.
    
    Booking Details:
    - Booking ID: ${bookingId}
    - Therapy Type: ${therapyType}
    - Session Type: ${isOnline ? "Online Session" : "In-Person Visit"}
    - Date: ${formattedDate}
    - Time: ${formattedTime}
    - Duration: 60 Minutes
    - Payment: ${isPaidViaWallet ? `₹${sessionPrice} (Paid via Wallet)` : `₹${sessionPrice} (Pay at Clinic)`}
    
    ${!isPaidViaWallet ? `Payment Reminder: Please pay ₹${sessionPrice} in cash at the clinic before your session.` : ""}
    
    ${isOnline ? "You will receive a video call link 30 minutes before your session." : "Clinic Address: MindSettler Wellness Center, 123 Healing Street, Wellness District, City - 123456"}
    
    For any assistance, contact us at support@mindsettler.com
    
    © ${new Date().getFullYear()} MindSettler
  `;

  await transporter.sendMail({
    from: `"MindSettler" <${process.env.SENDER_EMAIL}>`,
    to: email,
    subject: `🎉 Booking Confirmed - ${formattedDate} at ${formattedTime}`,
    html: htmlContent,
    text: textContent,
  });
};


export const sendSessionRejectedEmail = async (email, bookingDetails) => {
  const transporter = createTransporter();

  const {
    userName,
    therapyType,
    sessionType,
    date,
    timeSlot,
    bookingId,
    isPaid,
    refundAmount,
    rejectionReason,
  } = bookingDetails;

  const formattedDate = formatDate(date);
  const formattedTime = formatTime(timeSlot);

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Session Cancelled</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f7;">
      <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
        
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); border-radius: 20px 20px 0 0; padding: 40px; text-align: center;">
          <div style="font-size: 50px; margin-bottom: 10px;">😔</div>
          <h1 style="color: white; margin: 0; font-size: 24px;">Session Cancelled</h1>
          <p style="color: rgba(255,255,255,0.8); margin: 10px 0 0 0; font-size: 14px;">We're sorry for the inconvenience</p>
        </div>
        
        <!-- Body -->
        <div style="background: white; padding: 40px; border-radius: 0 0 20px 20px; box-shadow: 0 10px 40px rgba(0,0,0,0.1);">
          
          <p style="color: #333; font-size: 16px; line-height: 1.6; margin: 0 0 25px 0;">
            Hi <strong>${userName}</strong>,
          </p>
          
          <p style="color: #666; font-size: 16px; line-height: 1.6; margin: 0 0 25px 0;">
            We regret to inform you that your scheduled therapy session has been cancelled. We sincerely apologize for any inconvenience this may cause.
          </p>
          
          <!-- Cancelled Booking Details -->
          <div style="background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%); border: 1px solid #fecaca; border-radius: 16px; padding: 25px; margin-bottom: 25px;">
            
            <!-- Booking ID -->
            <div style="text-align: center; margin-bottom: 20px; padding-bottom: 15px; border-bottom: 1px dashed #fca5a5;">
              <p style="color: #999; font-size: 12px; margin: 0; text-transform: uppercase; letter-spacing: 1px;">Cancelled Booking</p>
              <p style="color: #dc2626; font-size: 14px; font-weight: bold; margin: 5px 0 0 0; font-family: 'Courier New', monospace;">${bookingId}</p>
            </div>
            
            <!-- Details -->
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #fecaca;">
                  <span style="color: #999; font-size: 12px; text-transform: uppercase;">📋 Therapy</span>
                </td>
                <td style="padding: 10px 0; border-bottom: 1px solid #fecaca; text-align: right;">
                  <span style="color: #7f1d1d; font-size: 14px; font-weight: 600;">${therapyType}</span>
                </td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #fecaca;">
                  <span style="color: #999; font-size: 12px; text-transform: uppercase;">${sessionType === "online" ? "💻" : "🏥"} Type</span>
                </td>
                <td style="padding: 10px 0; border-bottom: 1px solid #fecaca; text-align: right;">
                  <span style="color: #7f1d1d; font-size: 14px; font-weight: 600;">${sessionType === "online" ? "Online Session" : "In-Person Visit"}</span>
                </td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #fecaca;">
                  <span style="color: #999; font-size: 12px; text-transform: uppercase;">📅 Date</span>
                </td>
                <td style="padding: 10px 0; border-bottom: 1px solid #fecaca; text-align: right;">
                  <span style="color: #7f1d1d; font-size: 14px; font-weight: 600; text-decoration: line-through;">${formattedDate}</span>
                </td>
              </tr>
              <tr>
                <td style="padding: 10px 0;">
                  <span style="color: #999; font-size: 12px; text-transform: uppercase;">⏰ Time</span>
                </td>
                <td style="padding: 10px 0; text-align: right;">
                  <span style="color: #7f1d1d; font-size: 14px; font-weight: 600; text-decoration: line-through;">${formattedTime}</span>
                </td>
              </tr>
            </table>
          </div>
          
          ${rejectionReason ? `
          <!-- Rejection Reason -->
          <div style="background: #f8f9fa; border-left: 4px solid #ef4444; padding: 15px 20px; border-radius: 0 12px 12px 0; margin-bottom: 25px;">
            <p style="color: #666; font-size: 13px; margin: 0 0 5px 0; font-weight: bold;">Reason for Cancellation:</p>
            <p style="color: #333; font-size: 14px; margin: 0; line-height: 1.5;">${rejectionReason}</p>
          </div>
          ` : ""}
          
          ${isPaid ? `
          <!-- Refund Notice -->
          <div style="background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border: 1px solid #86efac; border-radius: 16px; padding: 25px; margin-bottom: 25px; text-align: center;">
            <div style="font-size: 40px; margin-bottom: 10px;">💰</div>
            <h3 style="color: #166534; font-size: 18px; margin: 0 0 10px 0;">Refund Processed!</h3>
            <p style="color: #166534; font-size: 14px; margin: 0 0 15px 0;">
              Your payment has been refunded to your wallet.
            </p>
            <div style="background: white; border-radius: 12px; padding: 15px; display: inline-block;">
              <p style="color: #999; font-size: 12px; margin: 0 0 5px 0; text-transform: uppercase;">Refund Amount</p>
              <p style="color: #166534; font-size: 28px; font-weight: bold; margin: 0;">₹${refundAmount}</p>
            </div>
            <p style="color: #166534; font-size: 12px; margin: 15px 0 0 0;">
              ✅ Amount credited to your MindSettler Wallet
            </p>
          </div>
          ` : `
          <!-- No Payment Notice -->
          <div style="background: #f8f9fa; border-radius: 12px; padding: 20px; margin-bottom: 25px; text-align: center;">
            <p style="color: #666; font-size: 14px; margin: 0;">
              💡 Since you had selected <strong>Cash Payment at Clinic</strong>, no refund is required.
            </p>
          </div>
          `}
          
          <!-- Apology Message -->
          <div style="background: linear-gradient(135deg, #fef3cd 0%, #ffeeba 100%); border: 1px solid #ffc107; padding: 20px; border-radius: 12px; margin-bottom: 25px;">
            <p style="color: #856404; font-size: 14px; margin: 0; line-height: 1.6;">
              🙏 <strong>We apologize</strong> for any inconvenience caused. Our therapist may have had an unavoidable conflict. 
              We encourage you to book another session at your earliest convenience.
            </p>
          </div>
          
          <!-- CTA Buttons -->
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.FRONTEND_URL}/book-session" 
               style="display: inline-block; background: linear-gradient(135deg, #3F2965 0%, #DD1764 100%); color: white; padding: 15px 40px; text-decoration: none; border-radius: 50px; font-weight: bold; font-size: 14px; box-shadow: 0 4px 15px rgba(63, 41, 101, 0.3); margin: 5px;">
              Book Another Session
            </a>
          </div>
          
          <div style="text-align: center; margin-bottom: 20px;">
            <a href="${process.env.FRONTEND_URL}/profile#My%20Bookings" 
               style="color: #3F2965; font-size: 14px; font-weight: 600; text-decoration: none;">
              View My Bookings →
            </a>
          </div>
          
          <!-- Support Info -->
          <div style="border-top: 1px solid #eee; padding-top: 20px; margin-top: 20px;">
            <p style="color: #999; font-size: 13px; line-height: 1.6; margin: 0;">
              <strong>Need assistance?</strong> If you have any questions or concerns about this cancellation, 
              please don't hesitate to reach out to our support team at 
              <a href="mailto:support@mindsettler.com" style="color: #DD1764;">support@mindsettler.com</a>
            </p>
          </div>
          
        </div>
        
        <!-- Footer -->
        <div style="text-align: center; margin-top: 30px;">
          <p style="color: #999; font-size: 12px; margin: 0 0 10px 0;">
            We value your mental wellness journey with us 💜
          </p>
          <p style="color: #999; font-size: 12px; margin: 0;">
            © ${new Date().getFullYear()} MindSettler. All rights reserved.
          </p>
        </div>
        
      </div>
    </body>
    </html>
  `;

  const textContent = `
    Session Cancelled
    
    Hi ${userName},
    
    We regret to inform you that your scheduled therapy session has been cancelled.
    
    Cancelled Booking Details:
    - Booking ID: ${bookingId}
    - Therapy: ${therapyType}
    - Type: ${sessionType === "online" ? "Online Session" : "In-Person Visit"}
    - Date: ${formattedDate}
    - Time: ${formattedTime}
    
    ${rejectionReason ? `Reason: ${rejectionReason}` : ""}
    
    ${isPaid ? `
    REFUND PROCESSED:
    ₹${refundAmount} has been credited to your MindSettler Wallet.
    ` : "Since you selected Cash Payment at Clinic, no refund is required."}
    
    We apologize for any inconvenience caused. Please book another session at your convenience.
    
    Book Another Session: ${process.env.FRONTEND_URL}/book-session
    
    Need help? Contact us at support@mindsettler.com
    
    © ${new Date().getFullYear()} MindSettler
  `;

  await transporter.sendMail({
    from: `"MindSettler" <${process.env.SENDER_EMAIL}>`,
    to: email,
    subject: `❌ Session Cancelled - ${formattedDate} | ${isPaid ? "Refund Processed" : "No Action Required"}`,
    html: htmlContent,
    text: textContent,
  });
};