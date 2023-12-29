const http = require('http');
const fs = require('fs');

const index = fs.readFileSync('index.html', 'utf-8');
const data = JSON.parse(fs.readFileSync('data.json', 'utf-8'));
const product = data.products[0];



const server = http.createServer((req, res) => {

    switch(req.url){
        case '/':
            res.setHeader('Content-Type', 'text/html');
            res.end(index);
            break;
        case '/api':
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(data));
            break;
        case '/product':
            res.setHeader('Content-Type', 'text/html');
            // res.end(JSON.stringify(data));
            let modifiedIndex = index
                                    .replace('**title**', product.title)
                                    .replace('**price**', product.price)
                                    .replace('**rating**', product.rating) 
                                    .replace('**discount**', product.discountPercentage) 
                                    .replace('**url**', product.thumbnail);
            res.end(modifiedIndex);
            break;
        default:
            res.writeHead(404, 'Not Founded');
            res.end();
    }
    
    console.log("Server Started");

    // console.log(req.url);
    // res.setHeader('Dummy', 'DummyValue');
    // res.end(JSON.stringify(data));


})

server.listen(8080);