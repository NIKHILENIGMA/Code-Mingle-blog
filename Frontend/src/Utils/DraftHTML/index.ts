export const draftHtml = (title: string, content: string) =>  `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            font-size: 1.2rem;
            line-height: 1.6;
            background-color: #fff;" 
            width="80%; 
            height: 100vh; 
            margin-left: 10%; 
            overflow: auto; 
            
          }
          
          body::-webkit-scrollbar {
            width: 8px;
          }  

          .main {
            width: 80%;
            margin: 0 auto;
            padding: 2rem;
            
          }
        </style>
      </head>
      <body>
        <div class="main">
          <h1>${title}</h1>
          <p>${content}</p>
        </div>
      </body>
    </html>
  `;