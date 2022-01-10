const style = require("./style");
    

  export const emailBody = (first_name, emailLink) => {
    return `
    <!DOCTYPE html>
    <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
    <head>
        <meta charset="utf-8"> 
        <meta name="viewport" content="width=device-width"> 
        <meta http-equiv="X-UA-Compatible" content="IE=edge"> 
        <meta name="x-apple-disable-message-reformatting">  
        <title></title> 
    
        <link href="https://fonts.googleapis.com/css?family=Lato:300,400,700" rel="stylesheet">
    
        
        <style>
    
       ${style}
        </style>
    
    
        
    </head>
    
    <body width="100%" style="margin: 0; padding: 0 !important; mso-line-height-rule: exactly; background-color: #fff;">
        <center style="width: 100%; background-color: #fff;">
        <div style="display: none; font-size: 1px;max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; mso-hide: all; font-family: sans-serif;">
          &zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
        </div>
        <div style="max-width: 600px; margin: 0 auto;" class="email-container">
            
          <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: auto;">
              <tr>
              <td valign="top" class="bg_white" style="padding: 1em 2.5em 0 2.5em;">
                  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                          <td class="logo" style="text-align: center;">
                            <h1><a href="#">
                                <img style="width: 2.5em;" src="https://res.cloudinary.com/savanapoint/image/upload/v1615541849/3_xdtc9t.png"  srcset="https://res.cloudinary.com/savanapoint/image/upload/v1615541849/3_xdtc9t.png">
                            </a></h1>
                          </td>
                      </tr>
                  </table>
              </td>
              </tr>
              <tr>
              
              </tr>
                    <tr>
              <td valign="middle" class="hero bg_white" style="padding: 2em 0 4em 0;">
                <table>
                    <tr>
                        <td>
                            <div class="text" style="padding: 0 2.5em; text-align: center;">
                                <h2>Por favor, verifique seu e-mail</h2>
                                <h3>
                                    <strong>Olá ${first_name},</strong>
                                    você está quase pronto para começar a aproveitar a sua conta <strong style="color: #8e2ddd;">SavanaPoint</strong>.
                                    Basta clicar no botão  abaixo para verificar o seu endereço de e-mail.
                                    
                                    
                               
                                </h3>
                                <p><a target="_blank" href="${emailLink}" class="btn btn-primary">Verifique o e-mail agora!</a></p>
                                <h3>Com amor, SavanaPoint.</h3>
                            </div>
                        </td>
                    </tr>
                </table>
              </td>
              </tr>
          </table>
          <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: auto;">
              <tr>
              <td valign="middle" class="bg_light footer email-section">
                <table>
                    <tr>
                    <td valign="top" width="33.333%" style="padding-top: 20px;">
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                        
                      </table>
                    </td>
                   
                    
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td class="bg_light" style="text-align: center;">
                  <p>  <a href="https://franciscoinoque.tech/" style="color: rgba(0,0,0,.8);">&copy; 20221 Francisco Inoque</a></p>
              </td>
            </tr>
          </table>
    
        </div>
      </center>
    </body>
    </html>

    `

}
