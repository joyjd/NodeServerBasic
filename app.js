const http = require('http');
const fs = require('fs');


const server = http.createServer((req, res) => {
    // console.log(req.url, req.method, req.headers);
    const url = req.url;
    const method = req.method;
    if (url === '/') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<form action="/message" method="POST"><input type="text" name="message" /><button type="submit">Send</button></form>');
        return res.end();
    }

    if (url === '/message' && method === 'POST') {
        const body = [];

        req.on('data', chunk => {
            body.push(chunk);
        });

        req.on('end', () => {
            body = Buffer.concat(body).toString();
            console.log(body);
            fs.writeFileSync('message.txt', "test");
            res.statusCode = 302;
            res.setHeader('Location', '/');
            return res.end();

        });

    }
    res.setHeader('Content-Type', 'text/html');
    res.write('<h1>Hello World</h1>');
    res.end();

});

server.listen(3000);

