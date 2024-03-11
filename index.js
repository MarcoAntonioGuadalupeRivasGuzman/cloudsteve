import express from 'express'
import multer from 'multer'
import { dirname, extname, join } from 'path'
import { fileURLToPath } from 'url'

const currentDir = dirname(fileURLToPath(import.meta.url))
const tipos=["image/jpeg","image/png"]

const app = express();
const multerUpload = multer({
    storage: multer.diskStorage({
        //destination: join(currentDir, '../uploads'),
        destination: '/media/steve/cloudsteve/uploads',
        filename: (req,file,cb)=>{
            const fielExtension = extname(file.originalname)
            const fileName = file.originalname.split(fielExtension)[0];
            cb(null, `${fileName}-${Date.now()}${fielExtension}`)
        }
    }),
    fileFilter: (req,file,cb)=>{
        if(tipos.includes(file.mimetype)) cb(null,true)
        else cb(new Error('Only image/jpeg or image/png are are allowed'))
    },
    limits: {
        fieldSize: 200000000
    }
});

app.listen(3300)

app.post('/upload',multerUpload.single('file'),(req,res) =>{
    console.log(req.file)

    res.sendStatus(200)
});

console.log('Sever runing on port 3000')
console.log('Happy Hacking')