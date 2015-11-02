from flask import render_template
from jeff import app

@app.route('/')
def index():
    return render_template('home.html')

@app.route('/virus-removal')
def virusremoval():
	return render_template('virus-removal.html')

@app.route('/computer-repair')
def computerrepair():
	return render_template('computer-tune-up.html')

@app.route('/contact-us')
def contact():
	return render_template('contact.html')


    