// @flow

export default (template: Object): string => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta http-equiv="Content-Language" content="en" />
  <meta name="description" description="${template.description}">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
  <title>${template.title}</title>
  <link rel="shortcut icon" href="https://static01.nyt.com/favicon.ico">
  <link rel="apple-touch-icon" href="apple-touch-icon.png">
  <link rel="stylesheet" href="/css/dashicons.css" />
  ${template.cssBundle ? `<link rel="stylesheet" type="text/css" href="${template.cssBundle}" />` : ''}
</head>
<body>
  <div id="root">${template.html}</div>
  <script id="preloadedState" type="application/json">${JSON.stringify(template.preloadedState)}</script>
  <script id="preloadedData" type="application/json">${JSON.stringify(template.data)}</script>
  <script src="${template.jsBundle}"></script>
</body>
</html>`;
