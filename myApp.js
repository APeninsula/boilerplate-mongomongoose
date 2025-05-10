require('dotenv').config();
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const PersonSchema = new Schema({
  name:{
    type: String,
    required: true
  },
  age: Number,
  favoriteFoods:[String]
});

let Person = mongoose.model("Person", PersonSchema);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const createAndSavePerson = (done) => {
  try {
    var ItsaWinnerBaby = new Person({
      name:"ItsaWinnerBaby", age:9, favoriteFoods:["Apples","Sugar Cubes","Toasted Oats"]
    });
    ItsaWinnerBaby.save((err, data) => {
      if(err) return err;
      done(null, data);
    })
  } catch (error) {
    console.error(error);
    done(error);
  }
};
let peopleArray = [
  {
    Name:"ImaLoserHoney", age: 99, favoriteFoods:["Mushy Apples", "Dentures"]
  },
  {
    Name:"Clareece", age: 178, favoriteFoods:["kerrn", "blueberries :)", "chocolate chips winky face"]
  }
]
const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, ((err, data)=>{
    if(err) return err;
    done(null,data);
  }));
};

const findPeopleByName = (personName, done) => {
  Person.find({
    name:personName
  }, ((err, data) =>{
    if(err) return err;
    done(null, data);
  }));
};

const findOneByFood = (food, done) => {
  Person.findOne({
    favoriteFoods:food
  }, ((err, data) =>{
    if(err) return err;
    done(null, data);
  }));
};

const findPersonById = (personId, done) => {
  Person.findById({
    _id:personId
  }, ((err, data) =>{
    if(err) return err;
    done(null, data);
  }));
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById({
    _id:personId
  }, ((err, data) =>{
    if(err) return err;
    data.favoriteFoods.push(foodToAdd);
    data.save((err,updatedData)=>{
      if(err) return err;
      done(null,updatedData);
    })
  }));
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name:personName}, {age:ageToSet}, {new:true}, ((err, data)=>{
    if(err) return err;
    done(null,data);
  }))
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove({
    _id:personId
  }, ((err, data) =>{
    if(err) return err;
    done(null, data);
  }));
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name:nameToRemove}, ((err,data) => {
    if(err) return err;
    done(null, data);
  }))

};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person
  .find({favoriteFoods:foodToSearch})
  .sort({name:1})
  .limit(2)
  .select({age:0})
  .exec(((err, dataFind)=>{
    if(err) return err;
    done(null,dataFind);
  }))
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
