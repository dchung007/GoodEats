# Goodeats

## Introduction
Welcome to goodeats, a clone of the popular [Goodreads](https://www.goodreads.com/) website. Goodreads is a popular website where you can search for the most popular books on the market. With goodreads, you can search for and write reviews for books. Similarly, with GoodEats, anyone can come on our site to find the hottest restaurants and get the scoop on where to eat next! If you have a registered account and are logged in, you can write reviews, as well as edit and delete them. If you have contacted us to set up your restaurant on goodeats, and are logged in as its owner, you can also create menu items for your restaurant, as well as edit and delete them.

## How To Start Development Enivornment
git clone https://github.com/dchung007/GoodEats.git


## Technologies Used
Languages: Javascript, HTML, CSS
Front-End: Pug, HTML, CSS
Back-End: Express, Javascript
Database: PostgreSQL
Hosting: Heroku

## Link to live site
https://thebestgoodeats.herokuapp.com/

## Link to Wiki docs
https://github.com/dchung007/GoodEats/wiki

## Features

### Register/Sign-in
Users can register an account on goodeats with a unique username and a password of their choosing. They can also sign in with their created username and password. If sign-in credentials are incorrect, error messages will alert the user to try again.

### View restaurants
All users can view any and all restaurants.

### Creating, viewing, editing, and deleting Menu-items
Only logged in users with owner status can create their own menu items. They can also edit and delete their menu items, only for their restaurants.

### Creating, viewing, editing and deleting Reviews
All logged-in users can create their own reviews on any website. They can also edit and delete only their own reviews.

## Challenges Faced
There were many obstacles we faced, at every stage step of the process. We had issues with establishing valid model and migration associations, and had to revise them numerous times whenever we decided to make changes to the data we wanted our website to have. We had to drop the database, rerun all migrations and seeder files, to solve this issue.
We also ran into many 404 errors when setting up our two full CRUD features. An example of which is that when we attempted the dynamic edit and delete features for menu items, the page would refresh when we edited a menu item. We fixed this by modifying our front end JS file and added event listeners that would adjust data without refreshing the page.


