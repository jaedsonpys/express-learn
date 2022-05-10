const http = require('http')

http.createServer((request, response) => {
    if(request.url == '/') {
        response.writeHead(200, 'OK', {'Content-Type': 'text/plain'})
        response.end('Hello World!')
    } else {
        response.writeHead(404, 'Not Found', {'Content-Type': 'text/plain'})
        response.end('Page not Found')
    }
}).listen(5500, 'localhost')

console.log('The server is started in http://127.0.0.1:5550')