from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask import render_template, url_for, redirect
import sys
sys.path.append('../BD')

from Membre_GroupeBD import Membre_GroupeBD
from ConnexionBD import ConnexionBD

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:root@localhost/festiuto'
db = SQLAlchemy(app)

app.config['BOOTSTRAP_SERVE_LOCAL'] = True

@app.route('/')
def renvoyer_json():
    connexion_bd = ConnexionBD()
    membre_groupebd = Membre_GroupeBD(connexion_bd)
    return membre_groupebd.artistes_to_json(3)