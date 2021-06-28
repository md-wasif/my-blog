const Path = "./data.json";
const fs = require('fs');

class Post {

    get()
    {
      return this.readData();
    }


    getIndividual(postId)
    {
        const posts  = this.readData();  
        const foundPost = posts.find((post) => post.id == postId);
         return foundPost;
    }
    
    //Add Post
    add(newPost)
    {
        const currentPosts = this.readData();
        currentPosts.unshift(newPost);
        return this.storeData(currentPosts);
    }

    readData()
    {
        const rawdata = fs.readFileSync(Path);
        const postdata = JSON.parse(rawdata);
        return postdata;
    }

    storeData(rawData)
    {
      const data = JSON.stringify(rawData);
      fs.writeFileSync(Path, data);
    }
}

module.exports = Post;
