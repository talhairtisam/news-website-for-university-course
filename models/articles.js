const mongoose = require('mongoose');

const articleSchema = mongoose.Schema({
    img:String,
    title:String,
    datetime:Date,
    body:String,
    keywords:String,
    slug: {
         type: String,
          unique: true
        }
});
articleSchema.pre("save",function(next){
    this.slug = slugify(this.title + this.datetime);
    next();
  });

function slugify(text){
    return new String(text).toString().toLowerCase().replace(/\s+/g,"-").replace(/[^\w\-]+/g,"").replace(/\-\-+/g,"-").replace(/^-+/,"").replace(/-+$/,"");
}



const articleModel = mongoose.model("articles",articleSchema);

module.exports = articleModel;