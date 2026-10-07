"import { Resend } from 'resend';\
\
export class EmailService {\
  private static resend = new Resend(process.env.EMAIL_API_KEY || 're_123');\
\
  static async sendLicenseEmail(to: string, product: any, license: string, orderId: string) {\
    if (!process.env.EMAIL_API_KEY) {\
      console.log(`Mock Email to ${to}: License ${license} for ${product.name}`);\
      return;\
    }\
    \
    await this.resend.emails.send({\
      from: 'Store <noreply@store.com>',\
      to,\
      subject: `Your license for ${product.name}`,\
      html: `\
        <h1>Thank you for your purchase!</h1>\
        <p>Order ID: ${orderId}</p>\
        <p>Product: ${product.name}</p>\
        <h2>License Key:</h2>\
        <code>${license}</code>\
      `,\
    });\
  }\
\
  static async sendSoftwareEmail(to: string, product: any, downloadLink: string, orderId: string) {\
    if (!process.env.EMAIL_API_KEY) {\
      console.log(`Mock Email to ${to}: Download link for ${product.name}: ${downloadLink}`);\
      return;\
    }\
\
    await this.resend.emails.send({\
      from: 'Store <noreply@store.com>',\
      to,\
      subject: `Download link for ${product.name}`,\
      html: `\
        <h1>Thank you for your purchase!</h1>\
        <p>Order ID: ${orderId}</p>\
        <p>Product: ${product.name}</p>\
        <h2>Download:</h2>\
        <a href=\"${downloadLink}\">Click here to download</a>\
      `,\
    });\
  }\
}\
"