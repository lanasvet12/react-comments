var http = require('http'),
    url = require('url'),
    fs = require('fs')
    ;

function start() {
    http.createServer(function (request, response) {
        var pathname = url.parse(request.url).pathname;
        // console.log(pathname);
        if (pathname === '/') {
            fs.readFile('./public/index.html', function (error, data) {
                response.writeHead(200, {'Content-Type': 'text/html'});
                response.write(data);
                response.end();
            });
        } else if (pathname === '/comments.json') {
            if (request.method === 'POST') {
                var postData = '';
                request.on('data', function (chunk) {
                    postData += chunk;
                });
                request.on('end', function () {
                    fs.readFile('./comments.json', function (error, data) {
                        var comments = JSON.parse(data.toString());
                        comments.push(JSON.parse(postData));
                        var commentsData = JSON.stringify(comments, null, 4);
                        fs.writeFile('./comments.json', commentsData, function () {
                            response.writeHead(200, {'Content-Type': 'application/json'});
                            response.write(commentsData);
                            response.end();
                        });
                    });
                });
            } else {
                response.writeHead(200, {'Content-Type': 'application/json'});
                fs.readFile('./comments.json', function (error, data) {
                    response.write(data);
                    response.end();
                });
            }
    
        } else if (pathname.substr(0, 6) === '/build') {
            response.writeHead(200, {'Content-Type': 'application/javascript'});
            fs.readFile('./public' + pathname, function (error, data) {
                response.write(data);
                response.end();
            });
        } else {
            response.writeHead(404);
            response.write('FILE NOT FOUND');
            response.end();
        }

    }).listen(8888);
}

exports.start = start;
