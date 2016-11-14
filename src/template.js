export default template => `
<!DOCTYPE html>
<html lang="en">

  <head>
    <meta charSet='utf-8' />
    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
    <meta httpEquiv="Content-Language" content="en" />
    <meta name="description" description="${template.description}">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <title>${template.title}</title>
    <link rel="shortcut icon" href="https://static01.nyt.com/favicon.ico">
    <link rel="apple-touch-icon" href="apple-touch-icon.png">
  </head>
  <body>
    <div id="root">${template.html}</div>
  </body>

</html>
`;
