'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');

const sever = express();
sever.use(cors());

const PORT = process.env.PORT || 3030;

//MongoDB

const mongoose = require('mongoose');

let bookModel;
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/Books');

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




sever.get('/books', booksHandler) 



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



sever.listen(PORT, () => console.log(`listening on ${PORT}`));
