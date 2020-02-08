import Nominee from '../models/Nominee.js';
import Category from '../models/Category.js';
import Vote from '../models/Vote.js';
import User from '../models/User.js';


export function findCategories() {

  return Category.find();

}

export function findCategorieswWinners() {

  return Category.find({winner: {$ne: null}});

}

export function findUserById(data) {
  const {id} = data;
  return User.findById(id);
}

export function findUsers() {

  return User.find();

}

export function createCategorywNominees(data) {

  const {title, nominees, isFilmNominated, winner} = data;
  Nominee.insertMany(nominees, (err, docs) => {
    if(!err) {
      Category.create({title: title, nominees: docs, isFilmNominated: isFilmNominated, winner: winner}, (err, res) => {
        if(err) {
          return err;
        } else {
          console.log(res);
          
          return res;
        }
      });
    }
  });
}

export function setWinner(data) {
  const {categoryID, nomineeID} = data;
  Category.findOneAndUpdate({_id: categoryID}, {winner: nomineeID}, (err, doc) => {
    console.log(doc);
    return doc;
  });
}

export function createUserwVotes(data) {
  const {name, votes} = data;
  Vote.insertMany(votes, (err, docs) => {
    if(!err) {
      User.create({name: name, votes: docs}, (err, res) => {
        console.log(res);
        return res;
      })
    }
  });
}