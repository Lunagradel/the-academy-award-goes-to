import Nominee from '../models/Nominee';
import Category from '../models/Category';

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