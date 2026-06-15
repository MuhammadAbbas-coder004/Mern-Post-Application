import express from 'express';
import postModel from './models/post.model.js';
import multer from 'multer';
import uploadFile from './services/storage.services.js';
import cors from 'cors';


const app = express();
app.use(cors());
app.use(express.json());
let upload = multer({ storage: multer.memoryStorage() });


app.post('/create-post',upload.single("image"), async (req,res)=>{

const result = await uploadFile(req.file.buffer);

const post =  await postModel.create({
image: result.url,
caption: req.body.caption

})

return res.status(201).json({
message: 'Post Created Sussessfully',
post

})

})


app.get('/posts', async(req,res)=>{

const posts = await postModel.find();

return res.status(200).json({
posts

    
})

})









export default app
