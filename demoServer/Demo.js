let user = require('./User');

console.log(`userName:${user.userName}`)

let http = require('http')

let url = require('url')




let server=http.createServer((req,res)=>{
    res.statusCode = 200;

    res.setHeader("Content-Type","text/plain;charset=utf-8");

    console.log("url"+req.url)

    res.end(util.inspect(url.parse(req.url)));
})
server.listen(3000,'127.0.0.1',()=>{
    console.log("服务器已运行在3000端口上")
})