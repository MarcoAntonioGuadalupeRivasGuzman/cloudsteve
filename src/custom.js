import express from 'express'

const app = express();

app.listen(3300)

app.post('/upload', (req,res)=>{
    console.log(req.headers['content-type'])
    
    const boundary = req.headers['content-type'].split('boundary=')[1]

    let body=''
    req.on('data',(chunk)=>(body+=chunk))

    req.on('end',()=>{
        body.split(boundary).map((data,index)=>console.log(index,data))
    });

    res.sendStatus(200)
})

console.log('Sever runing on port 3000')
console.log('Happy Hacking')