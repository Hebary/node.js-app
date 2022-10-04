
const Products =require( '../models/products');
const Carts = require( '../models/carts');
const Users = require( '../models/users');

const Mongo = require('./mongo');

const Product = new Mongo(Products);
const Cart = new Mongo(Carts);
const User = new Mongo(Users);

module.exports = {
    Product,
    User,
    Cart
}