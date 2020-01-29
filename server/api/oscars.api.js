import Nominee from '../models/Nominee';
import Category from '../models/Category';
import Vote from '../models/Vote';
import User from '../models/User';


export function findCategories() {

  return Category.find();

}

export function createCategorywNominees(data) {

  const {title, nominees, isFilmNominated} = data;
  Nominee.insertMany(nominees, (err, docs) => {
    if(!err) {
      Category.create({title: title, nominees: docs, isFilmNominated: isFilmNominated}, (err, res) => {
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