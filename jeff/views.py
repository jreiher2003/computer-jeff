from flask import render_template
from jeff import app

@app.route('/')
def index():
    return render_template('home.html')

@app.route('/antivirus')
def virusRemoval():
	return render_template('antivirus.html')

@app.route('/computer-repair')
def computerRepair():
	return render_template('computer-repair.html')

@app.route('/computer-tune-up')
def computerTuneUp():
	return render_template('computer-tune-up.html')

@app.route('/pricing')
def pricing():
	return render_template('pricing.html')
	
@app.route('/contact-us')
def contact():
	return render_template('contact.html')


    