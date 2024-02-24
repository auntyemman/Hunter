export const resetPasswordEmail = (firstName: string, code: string): string => {
  return `
      <!DOCTYPE html>
      <html>
      
      <head>
          <title>Password Reset</title>
          <style>
              body {
                  font-family: 'Arial', sans-serif;
                  background-color: #f4f4f4;
                  margin: 0;
                  padding: 0;
              }
      
              .container {
                  background-color: #ffffff;
                  max-width: 600px;
                  margin: 20px auto;
                  padding: 20px;
                  border-radius: 8px;
                  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
              }
      
              .header {
                  text-align: center;
                  padding-bottom: 10px;
                  border-bottom: 2px solid #f2f2f2;
              }
      
              .header h1 {
                  color: #333;
              }
      
              .content {
                  padding: 20px 0;
                  color: #444;
              }
      
              .footer {
                  color: #666;
                  font-size: 14px;
              }
          </style>
      </head>
      
      <body>
          <div class="container">
              <div class="header">
                  <h1>Password Reset Request</h1>
              </div>
              <div class="content">
                  <p>Hello ${firstName},</p>
                  <p>We've received a request to reset your password. If this wasn't you, please disregard this message.</p>
                  <p>To proceed with resetting your password, use the following one-time code:</p>
                  <div style="background-color: #f9f9f9; padding: 10px; border-radius: 5px;">
                      <code style="font-size: 18px; font-weight: bold; color: #333;">${code}</code>
                  </div>
                  <p>For security reasons, this code can only be used once.</p>
              </div>
              <div class="footer">
                  <p>Best regards,</p>
                  <p>Molecules Ltd</p>
              </div>
          </div>
      </body>
      
      </html>
    `;
};
