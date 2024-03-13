import express, { Router } from "express";
import multer from "multer";
import { saveFile } from "../controllers/files.js";
import { extname } from 'path'

export const filesRoutes=Router();

const tipos=["image/jpeg","image/png"]

const multerUpload=multer({
    storage: multer.diskStorage({
            //destination: join(currentDir, '../uploads'),
            destination: './uploads',
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

filesRoutes.post('/dropfile',multerUpload.single('file'),saveFile);

filesRoutes.get('/getfile',express.static('./uploads'));