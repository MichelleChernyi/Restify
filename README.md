# Restify
A web application for booking rentals. As hosts, users can post properties, accept/deny rental requests, and post reviews. As guests, users can search through properties, request a property booking, and leave reviews.

The front-end is built on ReactJS, and the backend is built using Django REST framework.

# Running the program locally
### on Ubuntu: 

run ./startup.sh and ./run.sh 

### on MacOS (using Homebrew): 

Run the following commands in root directory to get the necessary dependencies:

`brew install python3`

`brew install node`

`pip3 install Django Pillow djangorestframework djangorestframework-simplejwt django-cors-headers`

<br />
in backend directory:

`python3 manage.py makemigrations`

`python3 manage.py migrate`

<br />
in frontend directory:

`npm install`

<br />
Run the following commands to start the program:

in backend directory: `python3 manage.py runserver`

in frontend directory: `npm start`
