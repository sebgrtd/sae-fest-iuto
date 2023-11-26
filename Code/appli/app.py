from flask import Flask
from flask_cors import CORS
from flask import Flask, request, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy
import sys

sys.path.append('../BD')

from GroupeBD import GroupeBD
from LienRS_BD import LienRS_BD
from Membre_GroupeBD import Membre_GroupeBD
from ConnexionBD import ConnexionBD
from UserBD import UserBD

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:root@localhost/festiuto'
CORS(app, resources={r"/*": {"origins": "*"}})
db = SQLAlchemy(app)

app.config['BOOTSTRAP_SERVE_LOCAL'] = True

@app.route('/')
def index():
    return render_template('API.html')

@app.route('/getNomsArtistes')
def getNomsArtistes():
    connexion_bd = ConnexionBD()
    membre_groupebd = Membre_GroupeBD(connexion_bd)
    res = membre_groupebd.getNomsArtistes_json()
    if res is None:
        return jsonify({"error": "Aucun artiste trouve"})
    else:
        return res

@app.route('/getArtistes')
def getArtistes():
    connexion_bd = ConnexionBD()
    groupebd = GroupeBD(connexion_bd)
    res = groupebd.get_groupes_json()
    if res is None:
            return jsonify({"error": "Aucun artiste trouve"})
    else:
        return res

@app.route('/getInformationsSupplementairesArtiste/<int:id>')
def getInformationsSupplementairesArtiste(id):
    connexion_bd = ConnexionBD()
    lienRS = LienRS_BD(connexion_bd)
    res = lienRS.get_lienRS_json(id)
    if res is None:
        return jsonify({"error": "Aucun artiste trouve"})
    else:
        return res

@app.route('/getArtiste/<int:id>')
def getArtiste(id):
    return "Informations de l'artiste " + str(id)

@app.route('/connecter', methods=['POST'])
def connecter():
    connexion_bd = ConnexionBD()
    userbd = UserBD(connexion_bd)
    data = request.get_json()
    print(data)
    email = data["email"]
    password = data["password"]
    if userbd.exist_user(email, password):
        return userbd.user_to_json(userbd.get_user_by_email(email))
    else:
        return jsonify({"error": "Utilisateur non trouve"})
    
@app.route('/inscription', methods=['POST'])
def inscription():
    connexion_bd = ConnexionBD()
    userbd = UserBD(connexion_bd)
    data = request.get_json()
    print(data)
    pseudo = data["pseudo"]
    email = data["email"]
    password = data["password"]
    if userbd.exist_user(email, password):
        return jsonify({"error": "Utilisateur déjà existant"})
    else:
        if userbd.add_user(pseudo, email, password):
            return userbd.user_to_json(userbd.get_user_by_email(email))
        else:
            return jsonify({"error": "Erreur lors de l'ajout de l'utilisateur"})

if __name__ == '__main__':
    app.run(debug=True, port=8080)