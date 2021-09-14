'use strict';

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const server = express();
server.use(cors());


//access req.body
server.use(express.json());

const PORT = process.env.PORT;

//MongoDB
const mongoose = require('mongoose');

let bookModel;
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URL);

  const bookSchema = new mongoose.Schema({
    title: String,
    description: String,
    status: String,
    email :String
  });

  bookModel = mongoose.model('Books', bookSchema);

  // seedData();
}

//seeding a data function 

async function seedData()
{


    const book1 = new bookModel({ 
      title: 'Desire',
      description: 'A legendary lover and spymaster, the darkly sensual Earl of Wycliff eludes matrimony until a brush with death makes him yearn for a son to carry on his name. The moment Lucian spies the alluring Brynn Caldwell on a Cornish beach, he knows he has found the woman he wants for his bride.',

      status: 'https://images3.penguinrandomhouse.com/cover/9780804119801',

      email : 'mohammadharoun44@gmail.com',

        });

    const book2 = new bookModel({ 
      title: 'Desire',
      description: 'The incomparable Nicole Jordan weaves a seductive tale of passion and betrayal, intrigue and destiny, in her most devastatingly delicious love story yet',
      status: 'https://images2.penguinrandomhouse.com/cover/9780804119795',

      email : 'mohammadharoun44@gmail.com',
        });


    const book3 = new bookModel({ 
      title: 'The Prince of Pleasure',
      description: 'The moment Lucian spies the alluring Brynn Caldwell on a Cornish beach, he knows he has found the woman he wants for his bride',
      status: 'https://images2.penguinrandomhouse.com/cover/9780449004869',

      email : 'mohammadharoun44@gmail.com',
        });
        
    
        await book1.save();
        await book2.save();
        await book3.save();
}



// http://localhost:3030/books?email=mohammadharoun44@gmail.com
server.get('/books', booksHandler) ;

server.post('/addBook',addBookHandler);

server.delete('/deleteBook/:id',deleteBookHandler);



function booksHandler(req,res){
  const email = req.query.email;
  bookModel.find({email:email},(err,result)=>{
      if(err)
      {
          console.log(err);
      }
      else
      {
          res.send(result);
      }
  })


}

async function addBookHandler(req,res){
  console.log(req.body);

  // const title = req.body.title;
  // const description = req.body.description;
  // const status = req.body.status;
  // const email = req.body.email;

  const {title, description, status,email} = req.body;

  await bookModel.create({ 
    title: title,
    description: description,
    status: status,
    email:email,
  });

  // await bookModel.create({title,description,status,email});

  bookModel.find({email:email},(err,result)=>{
      if(err)
      {
          console.log(err);
      }
      else
      {
          res.send(result);
      }
  })

}


function deleteBookHandler(req,res){
  const bookId = req.params.id;
  const email = req.query.email;
  bookModel.deleteOne({_id:bookId},(err,result)=>{
      
    bookModel.find({email:email},(err,result)=>{
          if(err)
          {
              console.log(err);
          }
          else
          {
              res.send(result);
          }
      })

  })


}







server.listen(PORT, () => console.log(`listening on ${PORT}`));
