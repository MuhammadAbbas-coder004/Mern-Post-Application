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

app.post('/generate-image', async (req, res) => {
  try {
    const { prompt } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    // Using Pollinations.ai (Free, No API Key Required)
    const encodedPrompt = encodeURIComponent(prompt);
    // model=flux gives the best quality, nologo=true removes watermark
    const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?model=flux&width=1024&height=1024&nologo=true`;

    const response = await fetch(imageUrl);

    if (!response.ok) {
      return res.status(response.status).json({ error: 'Failed to generate image from AI provider.' });
    }

    const buffer = await response.arrayBuffer();
    const base64Image = Buffer.from(buffer).toString('base64');
    
    // Send back a base64 string that can be used directly as an image source or converted to a File on the frontend
    res.status(200).json({ 
      image: `data:image/jpeg;base64,${base64Image}` 
    });

  } catch (error) {
    console.error("Server Error generating image:", error);
    res.status(500).json({ error: 'Internal server error while generating image' });
  }
});





export default app
