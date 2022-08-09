# Art Gallery - Social Media Website

This is a social media website I created for an art gallery, where the users can create accounts, upload and share their artwork, search for others' work and share their thoughts about their work. 

The website has been implemented using MERN stack, with features such as searching, recommending similiar posts, comments, profiles and authentication, along with CRUD operations for the posts by authenticated users. 
For styling the website, material-ui and CSS has been used, and I aim to improve the styling by using Tailwind CSS in the future.
Technologies used : <br />
Mongoose/MongoDB<br />
Express<br />
ReactJS, Redux<br />
material-ui<br />
Node.js<br />
HTML, CSS<br />
jsonwebtoken and bcryptjs(for authentication)<br />
Axios<br />

<br />

#USAGE

The homepage, before signing in/registering looks as follow

![Homepage](https://user-images.githubusercontent.com/75095822/183617503-ac48ecd4-19d8-45c6-a6e9-4b5c68c1dd27.jpg)

The user can sign in by clicking the button on the Navbar
The posts are displayed one below the other, with their likes displayed as well. On the right side is the searchbar, below which is the button to add new posts.
If the user is not signed in, they are redirected to the login page upon clicking it. 
Below it is the page selector, which depends on the total number of posts in the database, and this way the entire data need not be loaded at a time.

Upon searching 'swan', we get the result as follows: 
![search](https://user-images.githubusercontent.com/75095822/183618280-64eb0f70-f6e4-4f82-9341-6c695b97b017.jpg)
It displays all the posts that have matches in the their titles and description, using mongodb regular expression matching.

Upon clicking the sign in button, or being redirected from some other page requiring authentication, the user is taken to this page![Authenticate](https://user-images.githubusercontent.com/75095822/183618657-66a1f3c0-f93c-439c-a371-b79af6ffac45.jpg)
If they do not have an account, they can create one by clicking the sign up button, or login using their email and password.

After logging in, the homepage looks as follows
![Homeafterlogin](https://user-images.githubusercontent.com/75095822/183619016-3d5e85cb-bf7f-4234-b8f1-543fb2b15598.jpg)
Now the user can like the posts, and only once per post, clicking again to unlike.

A specific post can be opened by clicking on it, after searching or from the homepage.
The post page looks as follows
![PostPage](https://user-images.githubusercontent.com/75095822/183619207-70eecfed-d279-455e-a502-e56ff33d055c.png)
The title, description, author and time of creation are displayed at the top, followed by the artwork itself. If the logged in user is the creator of the post, only then will the edit and delete buttons be visible and can be used to do those actions. 

Below the image is the comments section for the posts, and the logged in user can write as many comments as desired. 

Below the comments section is the Related/Similiar posts section, which similiar to the searching, uses regular expression matching to find similiar post

From the homepage, once logged in and after selection add posts, the following form appears, where the user can add their artwork
![New Post](https://user-images.githubusercontent.com/75095822/183620282-425ef9d8-205d-451b-b558-0f55acb6d76c.jpg)

To view their profile, the user can click on their username in the navbar, and this takes them to their profile page
![Profile](https://user-images.githubusercontent.com/75095822/183620392-f9ab5e82-62c8-44f0-88e4-023e6c74e663.jpg)
Here, the user can edit their profile if it is their own profile, and also displays their artworks and details



#INSTALLATION 
