from flask import Flask, send_file
from flask_cors import CORS
from flask import Flask, request, jsonify, render_template, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
import sys

sys.path.append('../BD')
sys.path.append('../mail')

from GroupeBD import GroupeBD
from LienRS_BD import LienRS_BD
from HebergementBD import HebergementBD
from Membre_GroupeBD import Membre_GroupeBD
from ConnexionBD import ConnexionBD
from UserBD import UserBD
from emailSender import EmailSender
from generateurCode import genererCode
from FaqBD import FaqBD
from EvenementBD import EvenementBD
from Style_MusicalBD import Style_MusicalBD
from Groupe_StyleBD import Groupe_StyleBD

from BD import Groupe, Hebergement
from BD import Membre_Groupe

MAIL_FESTIUTO = "festiuto@gmail.com"
MDP_FESTIUTO = "xutxiocjikqolubq"

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://coursimault:coursimault@servinfo-mariadb/DBcoursimault'
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
    
@app.route("/recherche/", methods=["GET", "POST"])
def recherche():
    if request.method == "POST":
        recherche = request.form.get("recherche", "")
    else:
        recherche = request.args.get("recherche", "")
    connexion_bd = ConnexionBD()
    groupebd = GroupeBD(connexion_bd)
    membre_groupebd = Membre_GroupeBD(connexion_bd)
    groupes = groupebd.search_groupes(recherche) if recherche else []
    artistes = membre_groupebd.search_membres_groupe(recherche) if recherche else []
    return render_template("recherche.html", recherche=recherche, groupes=groupes, artistes=artistes)

@app.route("/styles_musicaux", methods=["GET", "POST"])
def filtrer_styles():
    connexion_bd = ConnexionBD()
    style_musicalbd = Style_MusicalBD(connexion_bd)
    styles_musicaux = style_musicalbd.get_all_styles()
    liste_groupes = []
    if request.method == "POST":
        nomStyle = request.form.get("nomStyle", "")
        idStyle = style_musicalbd.get_id_style_by_name(nomStyle)
        if idStyle is not None:
            groupe_stylebd = Groupe_StyleBD(connexion_bd)
            liste_groupes = groupe_stylebd.get_groupes_selon_style(idStyle)
    return render_template("styles_musicaux.html", styles_musicaux=styles_musicaux, liste_groupes=liste_groupes)

@app.route("/menu_admin")
def menu_admin():
    return render_template("menu_admin.html")

@app.route("/groupes_festival")
def groupes_festival():
    connexionbd = ConnexionBD()
    groupebd = GroupeBD(connexionbd)
    liste_groupes = groupebd.get_all_groupes()

    if liste_groupes is None:
        liste_groupes = []

    return render_template("groupes_festival.html", liste_groupes=liste_groupes)

@app.route("/hebergements_festival")
def hebergements_festival():
    connexionbd = ConnexionBD()
    hebergementbd = HebergementBD(connexionbd)
    liste_hebergements = hebergementbd.get_all_hebergements()

    if liste_hebergements is None:
        liste_hebergements = []

    return render_template("hebergements_festival.html", liste_hebergements=liste_hebergements)


@app.route("/modifier_groupe", methods=["POST"])
def modifier_groupe():
    connexionbd = ConnexionBD()
    groupebd = GroupeBD(connexionbd)
    id_groupe = request.form["id_groupe"]
    nom_groupe = request.form["nom_groupe"]
    description_groupe = request.form["description_groupe"]
    groupe = groupebd.get_groupe_by_id(id_groupe)
    groupe.set_nomG(nom_groupe)
    groupe.set_descriptionG(description_groupe)
    groupebd.modifier_img(id_groupe, request.files['image_groupe'].read())
    succes = groupebd.update_groupe(groupe)
    if succes:
        print(f"Le groupe {id_groupe} a été mis à jour.")
    else:
        print(f"La mise à jour du groupe {id_groupe} a échoué.")
    return redirect(url_for("groupes_festival"))

@app.route("/modifier_hebergement", methods=["POST"])
def modifier_hebergement():
    connexionbd = ConnexionBD()
    hebergementbd = HebergementBD(connexionbd)
    id_hebergement = request.form["id_hebergement"]
    nom_hebergement = request.form["nom_hebergement"]
    adresse_hebergement = request.form["adresse_hebergement"]
    limite_places_hebergement = request.form["limite_places"]
    hebergement = hebergementbd.get_hebergement_by_id(id_hebergement)
    hebergement.set_nomH(nom_hebergement)
    hebergement.set_adresseH(adresse_hebergement)
    hebergement.set_limitePlacesH(limite_places_hebergement)
    succes = hebergementbd.update_hebergement(hebergement)
    if succes:
        print(f"L'hebergement {id_hebergement} a été mis à jour.")
    else:
        print(f"La mise à jour de l'hebergement {id_hebergement} a échoué.")
    return redirect(url_for("hebergements_festival"))

@app.route("/supprimer_groupe", methods=["POST"])
def supprimer_groupe():
    connexionbd = ConnexionBD()
    groupebd = GroupeBD(connexionbd)
    id_groupe = request.form["id_groupe"]
    groupe = groupebd.get_groupe_by_id(id_groupe)
    nom_groupe = groupe.get_nomG()
    groupebd.delete_groupe_by_name(groupe, nom_groupe)
    return redirect(url_for("groupes_festival"))

@app.route("/supprimer_hebergement", methods=["POST"])
def supprimer_hebergement():
    connexionbd = ConnexionBD()
    hebergementbd = HebergementBD(connexionbd)
    id_hebergement = request.form["id_hebergement"]
    hebergementbd.delete_hebergement_by_id(id_hebergement)
    return redirect(url_for("hebergements_festival"))

@app.route("/ajouter_groupe", methods=["POST"])
def ajouter_groupe():
    connexionbd = ConnexionBD()
    groupebd = GroupeBD(connexionbd)
    nom_groupe = request.form["nom_nouveau_groupe"]
    description_groupe = request.form["description_nouveau_groupe"]
    groupe = Groupe(None, None, nom_groupe, description_groupe)
    groupebd.insert_groupe(groupe)
    idG = groupebd.get_id_groupe_by_name(nom_groupe)
    image_file = request.files['image_nouveau_groupe']
    
    if image_file:
        image = image_file.read()
        connexion_bd = ConnexionBD()
        groupebd = GroupeBD(connexion_bd)
        res = groupebd.add_image(idG, image)
        if (res):
            print("image ajoutée")
        else:
            print("erreur lors de l'ajout de l'image")

    return redirect(url_for("groupes_festival"))

@app.route("/ajouter_hebergement", methods=["POST"])
def ajouter_hebergement():
    connexionbd = ConnexionBD()
    hebergementbd = HebergementBD(connexionbd)
    nom_hebergement = request.form["nom_nouveau_hebergement"]
    adresse_hebergement = request.form["adresse_hebergement"]
    limite_places_hebergement = request.form["limite_places"]
    hebergement = Hebergement(None, nom_hebergement, limite_places_hebergement, adresse_hebergement)
    hebergementbd.insert_hebergement(hebergement)
    return redirect(url_for("hebergements_festival"))

@app.route("/consulter_groupe/<int:id_groupe>")
def consulter_groupe(id_groupe):
    connexionbd = ConnexionBD()
    groupebd = GroupeBD(connexionbd)
    groupe = groupebd.get_groupe_by_id(id_groupe)
    membres_groupe = groupebd.get_membres_groupe(id_groupe)
    return render_template("membres_groupe.html", groupe=groupe, membres_groupe=membres_groupe)

@app.route("/consulter_hebergement/<int:id_hebergement>")
def consulter_hebergement(id_hebergement):
    connexionbd = ConnexionBD()
    hebergementbd = HebergementBD(connexionbd)
    hebergement = hebergementbd.get_hebergement_by_id(id_hebergement)
    groupes_hebergement = hebergementbd.get_groupes_hebergement(id_hebergement)
    print(groupes_hebergement)
    return render_template("groupes_hebergement.html", hebergement=hebergement, groupes_hebergement=groupes_hebergement)

@app.route("/modifier_membre", methods=["POST"])
def modifier_membre_groupe():
    connexionbd = ConnexionBD()
    membre_groupebd = Membre_GroupeBD(connexionbd)
    nom_membre_groupe = request.form["nom_membre"]
    prenom_membre_groupe = request.form["prenom_membre"]
    nom_scene_membre_groupe = request.form["nom_scene_membre"]
    id_membre_groupe = request.form["id_membre"]
    membre_groupe = membre_groupebd.get_artiste_by_id(id_membre_groupe)
    membre_groupe.set_nomMG(nom_membre_groupe)
    membre_groupe.set_prenomMG(prenom_membre_groupe)
    membre_groupe.set_nomDeSceneMG(nom_scene_membre_groupe)
    succes = membre_groupebd.update_membre_groupe(membre_groupe)
    if succes:
        print(f"Le membre {id_membre_groupe} a été mis à jour.")
    else:
        print(f"La mise à jour du membre {id_membre_groupe} a échoué.")
    return redirect(url_for("consulter_groupe", id_groupe=membre_groupe.get_idGroupe()))

@app.route("/supprimer_membre", methods=["POST"])
def supprimer_membre_groupe():
    connexionbd = ConnexionBD()
    membre_groupebd = Membre_GroupeBD(connexionbd)
    id_membre_groupe = request.form["id_membre"]
    membre_groupe = membre_groupebd.get_artiste_by_id(id_membre_groupe)
    nom_scene_membre_groupe = membre_groupe.get_nomDeSceneMG()
    membre_groupebd.delete_membre_groupe_by_name_scene(membre_groupe, nom_scene_membre_groupe)
    return redirect(url_for("consulter_groupe", id_groupe=membre_groupe.get_idGroupe()))

@app.route("/supprimer_groupe_hebergement", methods=["POST"])
def supprimer_groupe_hebergement():
    connexionbd = ConnexionBD()
    groupebd = GroupeBD(connexionbd)
    id_hebergement = request.form["id_hebergement"]
    id_groupe = request.form["id_groupe"]
    groupe = groupebd.get_groupe_by_id(id_groupe)
    groupe.set_idHebergement(None)
    print(groupe.get_idHebergement())
    groupebd.update_groupe(groupe)
    return redirect(url_for("consulter_hebergement", id_hebergement=id_hebergement))

@app.route("/ajouter_membre", methods=["POST"])
def ajouter_membre_groupe():
    connexionbd = ConnexionBD()
    membre_groupebd = Membre_GroupeBD(connexionbd)
    id_groupe = request.form["id_groupe"]
    nom_membre_groupe = request.form["nom_nouveau_membre"]
    prenom_membre_groupe = request.form["prenom_nouveau_membre"]
    nom_scene_membre_groupe = request.form["nom_scene_nouveau_membre"]
    membre_groupe = Membre_Groupe(None, id_groupe, nom_membre_groupe, prenom_membre_groupe, nom_scene_membre_groupe)
    membre_groupebd.insert_membre_groupe(membre_groupe)
    return redirect(url_for("consulter_groupe", id_groupe=id_groupe))

if __name__ == '__main__':
    app.run(debug=True, port=8080)
    