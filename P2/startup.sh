# install pip and virtualenv
sudo apt update
sudo apt install python3-pip
sudo apt install python3-virtualenv

# set up virtual env
virtualenv venv
source venv/bin/activate

# install project packages
pip install Django
pip install Pillow
pip install djangorestframework
pip install djangorestframework-simplejwt

# run migrations and data population
python3 manage.py makemigrations
python3 manage.py migrate