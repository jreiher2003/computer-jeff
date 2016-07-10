#!/bin/bash 
sudo apt-get update 
sudo apt-get install -y upgrade 
sudo apt-get install -y python-dev 
sudo apt-get install -y python-pip
sudo apt-get install -y git 

sudo pip install virtualenvwrapper 
export WORKON_HOME=~/Envs
mkdir -p $WORKON_HOME
source /usr/local/bin/virtualenvwrapper.sh
mkvirtualenv computer-jeff 
#workon computer-jeff >> to activate
# set environmental vars
# sudo nano $VIRTUAL_ENV/bin/postactivate 
# export APP_SETTINGS="config.DevelopmentConfig"
# export SECRET_KEY="this is secret"

pip install Flask 