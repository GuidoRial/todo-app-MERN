# Todo-app made with MERN Stack

## Live Preview

https://todo-app-mern-guidorial.vercel.app/

## Project description

This project was meant to test me to the extent of my abilities. I already had done a todo-app in the past, but this time I made sure to create the backend on my own making this project my first full-stack project.

## Challenges

I already feel comfortable with the frontend, so all my issues were backend-related, although I struggled for a little bit I got everything up and running fairly quickly.
<br>
The only **challenge** I had was hosting this to Heroku, initially I thought I had to host front AND backend there, it took me way too long to realize that I could host the backend there, then modify my queries in the frontend using that link and then hosting the frontend to Vercel, Netlify or Firebase

## What I used

1. HTML
2. CSS
3. JavaScript
4. React
5. Axios
6. NodeJS
7. Express
8. MongoDB
9. Mongoose

## Features

0. Responsive: Can be used on mobile or desktop
1. Login page
    - Ability to login with **DEMO USER**
    - Login with your account
2. Signup page
    - Ability to create an account
3. Homepage
    - Logout
    - Display your todos
        - On click, open a detailed description of this todo
        - Edit todo
        - Delete todo
        - Go back to home

## What I learned

1. React && React Router && Axios
    - How to use axios to make http requests (GET, POST, PATCH and DELETE) and store data in React, then I stored it in localStorage for future use
    - How to make protected routes using React Router by using the <Navigate /> component
2. NodeJS && Express
    - How to create HTTP requests
    - How to handle errors using middlewares
3. MongoDB && Mongoose
    - How to create models to ensure that the necessary information is passed onto the database
    - How to connect to my database from my project
