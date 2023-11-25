from flask import Flask
from flask_cors import CORS
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
import sys

sys.path.append('../BD')

from Membre_GroupeBD import Membre_GroupeBD
from ConnexionBD import ConnexionBD
from UserBD import UserBD

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:irvyn@localhost/festiuto'
CORS(app, resources={r"/": {"origins": "*"}})
db = SQLAlchemy(app)

app.config['BOOTSTRAP_SERVE_LOCAL'] = True

@app.route('/')
def renvoyer_json():
    connexion_bd = ConnexionBD()
    membre_groupebd = Membre_GroupeBD(connexion_bd)
    return membre_groupebd.artistes_to_json()

@app.route('/connecter', methods=['POST'])
def connecter():
    data = request.get_json()
    print(data)
    email = data["email"]
    password = data["password"]
    if gestion_connexion(email, password):
        return jsonify({"connexion" : True})
    else:
        return jsonify({"connexion" : False})
    
def gestion_connexion(email, password):
    connexion_bd = ConnexionBD()
    userbd = UserBD(connexion_bd)
    if userbd.exist_user(email, password):
        return True
    return False

if __name__ == '__main__':
    app.run(debug=True, port=8080)