from flask import Flask, send_file
from flask_cors import CORS
from flask import Flask, request, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy
import sys

sys.path.append('../BD')
sys.path.append('../mail')

from GroupeBD import GroupeBD
from LienRS_BD import LienRS_BD
from Membre_GroupeBD import Membre_GroupeBD
from ConnexionBD import ConnexionBD
from UserBD import UserBD
from emailSender import EmailSender
from generateurCode import genererCode
from FaqBD import FaqBD
from EvenementBD import EvenementBD

MAIL_FESTIUTO = "festiuto@gmail.com"
MDP_FESTIUTO = "xutxiocjikqolubq"

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
    
@app.route('/filtrerArtistes')
def filtrerArtistes():
    connexion_bd = ConnexionBD()
    evenementbd = EvenementBD(connexion_bd)
    liste_groupes_21 = evenementbd.groupes_21_juillet_to_json()
    liste_groupes_22 = evenementbd.groupes_22_juillet_to_json()
    liste_groupes_23 = evenementbd.groupes_23_juillet_to_json()
    return jsonify({"21 juillet": liste_groupes_21, "22 juillet": liste_groupes_22, "23 juillet": liste_groupes_23})

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
    connexion_bd = ConnexionBD()
    membre_groupebd = Membre_GroupeBD(connexion_bd)
    mb = membre_groupebd.get_artiste_by_id(id)
    res = mb.to_dict()
    return jsonify({"error": "Aucun artiste trouve"}) if res is None else res

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
        res = userbd.add_user(pseudo, email, password)
        if res:
            return userbd.user_to_json(userbd.get_user_by_email(email))
        elif res == "emailErr":
            return jsonify({"error": "Email déjà existant"})
        else:
            return jsonify({"error": "Erreur lors de l'ajout de l'utilisateur"})
        
@app.route('/modifierProfil', methods=['POST'])
def modifierProfil():
    connexion_bd = ConnexionBD()
    userbd = UserBD(connexion_bd)
    data = request.get_json()
    print(data)
    idUser =data['id']
    pseudo = data["pseudo"]
    email = data["email"]
    password = data["password"]
    ancien_mdp = data['oldPassword']
    if userbd.exist_user_with_id(idUser, ancien_mdp):
        res = userbd.update_user(idUser, email, pseudo, password)
        if res:
            return userbd.user_to_json(userbd.get_user_by_email(email))
        elif res == "emailErr":
            return jsonify({"error": "Email déjà existant"})
        else:
            return jsonify({"error": "Erreur lors de la modification de l'utilisateur"})
    else:
        return jsonify({"error": "Utilisateur non trouve"})

@app.route('/envoyerCodeVerification', methods=['POST'])
def envoyerCodeVerification():
    data = request.get_json()
    emailUser = data["email"]
    
    connexion_bd = ConnexionBD()
    userbd = UserBD(connexion_bd)
    
    if not userbd.email_exists(emailUser):
        return jsonify({"error": "Email non existant"})
    
    code = genererCode()
    email_sender = EmailSender(MAIL_FESTIUTO, MDP_FESTIUTO)
    res = email_sender.sendCodeVerification(emailUser, code)
    if res:
        resAjout = userbd.ajouterCodeVerification(emailUser, code)
        if resAjout:
            return jsonify({"success": "code envoyé"})
    return jsonify({"error": "erreur lors de l'envoi du code"})

@app.route('/testerCodeVerification', methods=['POST'])
def tester_code_verification():
    data = request.get_json()
    emailUser = data["email"]
    code = data["code"]
    
    connexion_bd = ConnexionBD()
    userbd = UserBD(connexion_bd)
    
    if not userbd.email_exists(emailUser):
        return jsonify({"error": "Email non existant"})
    
    if userbd.tester_code_verification(emailUser, code):
        return jsonify({"success": "code correct"})
    else:
        return jsonify({"error": "code incorrect"})

@app.route("/modifierMdp", methods=['POST'])
def modifierMdp():
    data = request.get_json()
    emailUser = data["email"]
    nouveauMdp = data["password"]
    code = data["code"]
    
    connexion_bd = ConnexionBD()
    userbd = UserBD(connexion_bd)
    
    if not userbd.email_exists(emailUser):
        return jsonify({"error": "Email non existant"})
    
    if userbd.tester_code_verification(emailUser, code):
        res = userbd.update_password(emailUser, nouveauMdp)
        if res:
            return jsonify({"success": "mot de passe modifié"})
        else:
            return jsonify({"error": "erreur lors de la modification du mot de passe"})

@app.route('/ajouterImage', methods=['POST'])
def ajouterImage():
    # permet de stocker l'image dans la base de données sous forme de blob
    idG = request.form['idG']
    image_file = request.files['img']
    if image_file:
        image = image_file.read()
        connexion_bd = ConnexionBD()
        groupebd = GroupeBD(connexion_bd)
        res = groupebd.add_image(idG, image)
        if res:
            return jsonify({"success": "image ajoutée"})
    return jsonify({"error": "erreur lors de l'ajout de l'image"})

import io

@app.route('/getImageArtiste/<int:id>')
def getImageArtiste(id):
    #get l'image en blob de l'artiste et l'affiche
    try:
        connexion_bd = ConnexionBD()
        groupebd = GroupeBD(connexion_bd)
        image_blob = groupebd.get_image(id)
        if image_blob is None:
            return jsonify({"error": "Aucune image trouve"})
        else:
                image = io.BytesIO(image_blob)
                image.seek(0)
                return send_file(image, mimetype='image/jpeg')
    except Exception as e:
        print(e)
        return jsonify({"error": "erreur lors de la récupération de l'image"})

@app.route('/getFaq')
def get_faq():
    connexion_bd = ConnexionBD()
    faqbd = FaqBD(connexion_bd)
    res = faqbd.get_faqs_json()
    if res is None:
        return jsonify({"error": "Aucune faq trouve"})
    else:
        return res

if __name__ == '__main__':
    app.run(debug=True, port=8080)
    