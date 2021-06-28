const express = require('express');
const app = express();
const Post = require('./api/PostData');
var multer  = require('multer')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      cb(null, `${file.fieldname}-${Date.now()}${getExt(file.mimetype)}`)
    }
  })

  const getExt = (mimetype) => {
       switch(mimetype) { 
         case "image/jpeg" :
            return ".jpeg";
          case "image/png" : 
            return '.png';  
       }
  }

var upload = multer({ storage: storage })
const PostData = new Post();

app.use(express.json());

app.get("/api/post", (req, res) =>{
   res.status(200).send(PostData.get());
})



app.get('/api/post/:post_id', (req, res) => {
    const postId = req.params.post_id;
    const foundPost = PostData.getIndividual(postId);
    if(foundPost)
    {
        res.status(200).send(foundPost);
    }
    else{
        res.status(404).send("Not Found");
    }
})

//Create API endpoint for adding a new Posts.
app.post('/api/post', upload.single('upload-image'), (req, res) => {
    
    const newPost = {
        "id" : `${Date.now()}`,
        "title" : req.body.title,
        "content" : req.body.content,
        "upload_image" : req.body["upload-image"],
        "added_date" : `${Date.now()}`
    }
    res.status(201).send(PostData.add(newPost));
})



app.listen(3000, ()=> console.log("server listening on port http://localhost:3000"));