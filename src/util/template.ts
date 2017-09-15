const colors = {
  base: '#FF6138',
  baseDark: '#bf492a',
  complement: '#013440',
  complementDark: '#002635',
  contrast: '#00A388',
  content: '#EEEEEE'
};

const style = `
  body, .body {
    margin: 0;
    padding: 0;
    background-color: ${colors.content};
    font-family: sans-serif;
  }

  table {
    table-layout: fixed;
    width: 100%;
    border: 0;
    border-spacing: 0;
    border-collapse: collapse;
  }

  .container {
    max-width: 85%;
    height: 100%;
    padding: 16px 32px;
    margin: 0 auto;
  }

  .main {
    background-color: #FFFFFF;
    color: #666666;
  }

  .header {
    height: 120px;
    background: ${colors.base};
    background: linear-gradient(to bottom, ${colors.baseDark}, ${colors.base});
    padding: 8px 16px;
  }

  .header .title-container {
    margin: 0 auto;
    margin-top: 30px;
    height: 60px;
    box-sizing: border-box;
    background-color: white;
    text-align: center;
  }

  .header .title {
    color: ${colors.baseDark};
    display: inline-block;
    text-align: center;
    margin: 0;
    padding: 0;
    line-height: 60px;
  }

  .content {
    margin: 12px 0;
  }

  .alert {
    text-align: center;
    display: block;
    padding: 4px 0;
    border-top: 1px solid #CCC;
    border-bottom: 1px solid #CCC;
  }

  .label {
    display: block;
    font-size: 10px;
  }

  .author {
    margin: 0;
    padding: 0;
  }

  .message {
    margin: 0;
    padding: 0;
  }

  .footer {
    background-color: ${colors.contrast};
    height: 32px;
    line-height: 32px;
  }

  .footer .message {
    color: white;
    text-align: center;
  }
`.trim();

export function template(body: any): string {
  const message = body.message.split(/\n/).map(message => `<p>${message}</p>`);
  return `
    <html>
      <head>
        <title>${body.subject}</title>
        <style type="text/css">${style}</style>
      </head>
      <body>
        <table class="body">
          <tr>
            <td class="container">
              <table class="main">
                <tr>
                  <td class="wrapper">
                    <table>
                      <tr>
                        <td>
                          <div class="header">
                            <div class="title-container">
                              <h1 class="title">${body.subject}</h1>
                            </div>
                          </div>
                          <div class="content">
                            <p class="alert">You've got mail!</p>
                            <div class="sender">
                              <label class="label">Sender:</label>
                              <h2 class="author">${body.name} (${body.email})</h2>
                            </div>
                            <div class="message-container">
                              <label class="label">Message:</label>
                              <p class="message">${message}</p>
                            </div>
                          </div>
                          <div class="footer">
                            <h3 class="message">Sent from AWS Lamda</h3>
                          </div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
}
