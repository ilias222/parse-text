const http = require("http");
const io = require('socket.io');
const routes = require('./service.js')
const path = require('path');
const fs = require('fs');
 
let dat = [];
let datas = new Promise((request, response) => {});
const app = http.createServer((request, response) => {



    switch (request.url) {
        case '/' :
            const filePath = path.join(__dirname, 'list.html');
            readStream = fs.createReadStream(filePath);
            readStream.pipe(response);
            break;

        case '/progress':
           datas = routes.progress(request);
           datas.then((chunk) => {
            if(chunk){
                dat.push(chunk)
            }
           });
            break;

        case '/newfile' :
            datas = routes.progress(request);
            datas.then((chunk) => {
                routes.writeFiles(chunk);
            });
            break;
        
        case '/FAQ':
            const fileP = path.join(__dirname, 'listFAQ.html');
            readStream = fs.createReadStream(fileP);
            readStream.pipe(response);
            break;
            
        default:
            const extname = path.extname(request.url);
            let type = '';
            if(extname == '.js'){
                type = {'content': 'text/javascript'}
            } else{
                type = {'content': 'text/css'}
            }

            fs.readFile(`.${request.url}`,  function(error, content) {
                response.writeHead(200, { 'Content-Type': type.content });
                response.end(content, 'utf-8');
            })
            break;
    }

    });

        const socket = io(app);

 
        socket.on('connection', function (socket) {
        console.log('New connection');
        if(dat.length > 0){
            let item = '';
            dat.forEach((chunk) => {
                item += `${chunk}\n`;
            })
            socket.emit('datas', {msg: item});
            return;
        }
        console.log('Не задан чанк, перезапустить страницу!');
    })
        
app.listen(3000, 'localhost');

