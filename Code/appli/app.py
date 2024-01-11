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
from ConcertBD import ConcertBD
from Activite_AnnexeBD import Activite_AnnexeBD
from LieuBD import LieuBD
from BilletBD import BilletBD
from Type_BilletBD import Type_BilletBD
from SpectateurBD import SpectateurBD
from InstrumentBD import InstrumentBD

from BD import * 


MAIL_FESTIUTO = "festiuto@gmail.com"
MDP_FESTIUTO = "xutxiocjikqolubq"

app = Flask(__name__)
# app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://coursimault:coursimault@servinfo-mariadb/DBcoursimault'
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:root@localhost/gestiuto'
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

@app.route("/menu_admin/", methods=["GET", "POST"])
def menu_admin():
    return render_template("menu_admin.html")

@app.route("/login_admin")
def login_admin():
    return render_template("login.html")

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
    nom_groupe = request.form["nom_nouveau_groupe"] if request.form["nom_nouveau_groupe"] else None
    description_groupe = request.form["description_nouveau_groupe"] if request.form["description_nouveau_groupe"] else None
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
    if not membres_groupe:
        return render_template("membres_groupe.html", groupe=groupe, membres_groupe=[])
    return render_template("membres_groupe.html", groupe=groupe, membres_groupe=membres_groupe)

@app.route("/consulter_hebergement/<int:id_hebergement>")
def consulter_hebergement(id_hebergement):
    connexionbd = ConnexionBD()
    hebergementbd = HebergementBD(connexionbd)
    hebergement = hebergementbd.get_hebergement_by_id(id_hebergement)
    groupes_hebergement = hebergementbd.get_groupes_hebergement(id_hebergement)
    groupes_not_in_hebergement = hebergementbd.get_groupes_not_in_hebergement(id_hebergement)

    dict_groupes_not_in_hebergement = {}
    for groupe in groupes_not_in_hebergement:
        id_hebergement_groupe = groupe.get_idHebergement()
        nom_hebergement_groupe = hebergementbd.get_hebergement_by_id(id_hebergement_groupe).get_nomH() if id_hebergement_groupe is not None else None
        dict_groupes_not_in_hebergement[groupe] = nom_hebergement_groupe

    return render_template("groupes_hebergement.html", hebergement=hebergement, groupes_hebergement=groupes_hebergement, dict_groupes_not_in_hebergement=dict_groupes_not_in_hebergement)

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
    nom_membre_groupe = request.form["nom_nouveau_membre"] if request.form["nom_nouveau_membre"] else None
    prenom_membre_groupe = request.form["prenom_nouveau_membre"] if request.form["prenom_nouveau_membre"] else None
    nom_scene_membre_groupe = request.form["nom_scene_nouveau_membre"] if request.form["nom_scene_nouveau_membre"] else None
    membre_groupe = Membre_Groupe(None, id_groupe, nom_membre_groupe, prenom_membre_groupe, nom_scene_membre_groupe)
    membre_groupebd.insert_membre_groupe(membre_groupe)
    return redirect(url_for("consulter_groupe", id_groupe=id_groupe))

@app.route("/ajouter_groupe_hebergement", methods=["POST"])
def ajouter_groupe_hebergement():
    connexion_bd = ConnexionBD()
    groupebd = GroupeBD(connexion_bd)
    id_groupe = request.form["nom_groupe"]
    id_hebergement = request.form["id_hebergement"]
    groupe = groupebd.get_groupe_by_id(id_groupe)
    groupe.set_idHebergement(id_hebergement)
    groupebd.update_groupe(groupe)
    return redirect(url_for("consulter_hebergement", id_hebergement=id_hebergement))

@app.route("/evenements_festival")
def evenements_festival():
    connexionbd = ConnexionBD()
    evenementbd = EvenementBD(connexionbd)
    groupebd = GroupeBD(connexionbd)
    liste_groupes = groupebd.get_all_groupes()
    liste_evenements = evenementbd.get_all_evenements()
    liste_evenements_concerts = []
    liste_evenements_activites_annexes = []
    if not liste_evenements:
        return render_template("evenements_festival.html", liste_evenements=[], liste_evenements_concerts=[], liste_evenements_activites_annexes=[], liste_lieux=[], liste_groupes=[])
    lieubd = LieuBD(connexionbd)
    liste_lieux = lieubd.get_all_lieux()
    for evenement in liste_evenements:
        if evenementbd.verify_id_in_concert(evenement.get_idE()):
            liste_evenements_concerts.append(evenement)
        elif evenementbd.verify_id_in_activite_annexe(evenement.get_idE()):
            liste_evenements_activites_annexes.append(evenement)
    return render_template("evenements_festival.html", liste_evenements=liste_evenements, liste_evenements_concerts=liste_evenements_concerts, liste_evenements_activites_annexes=liste_evenements_activites_annexes, liste_lieux=liste_lieux, liste_groupes=liste_groupes)

@app.route("/modifier_evenement", methods=["POST"])
def modifier_evenement():
    connexionbd = ConnexionBD()
    evenementbd = EvenementBD(connexionbd)
    id_evenement = request.form["id_evenement"]
    id_lieu = request.form["lieu_evenement"] if request.form["lieu_evenement"] else None
    id_groupe = request.form["groupe_evenement"] if request.form["groupe_evenement"] else None
    nom_evenement = request.form["nom_evenement"]
    date_debut = request.form["date_debut"]
    date_fin = request.form["date_fin"]
    heure_debut = request.form["heure_debut"]
    heure_fin = request.form["heure_fin"]
    evenement = evenementbd.get_evenement_by_id(id_evenement)
    evenement.set_idG(id_groupe)
    evenement.set_idL(id_lieu)
    evenement.set_nomE(nom_evenement)
    evenement.set_dateDebutE(date_debut)
    evenement.set_dateFinE(date_fin)
    evenement.set_heureDebutE(heure_debut)
    evenement.set_heureFinE(heure_fin)
    succes = evenementbd.update_evenement(evenement)
    if succes:
        print(f"L'événement {id_evenement} a été mis à jour.")
    else:
        print(f"La mise à jour de l'événement {id_evenement} a échoué.")
    return redirect(url_for("evenements_festival"))

@app.route("/supprimer_evenement", methods=["POST"])
def supprimer_evenement():
    connexionbd = ConnexionBD()
    evenementbd = EvenementBD(connexionbd)
    concert_bd = ConcertBD(connexionbd)
    id_evenement = request.form["id_evenement"]
    evenement = evenementbd.get_evenement_by_id(id_evenement)
    nom_evenement = evenement.get_nomE()
    if evenementbd.verify_id_in_concert(id_evenement):
        concert_bd.delete_concert_by_id(id_evenement)
    elif evenementbd.verify_id_in_activite_annexe(id_evenement):
        activite_annexe_bd = Activite_AnnexeBD(connexionbd)
        activite_annexe_bd.delete_activite_annexe_by_id(id_evenement)
    evenementbd.delete_evenement_by_name(evenement, nom_evenement)
    return redirect(url_for("evenements_festival"))

@app.route("/ajouter_evenement", methods=["POST"])
def ajouter_evenement():
    connexionbd = ConnexionBD()
    evenementbd = EvenementBD(connexionbd)
    id_lieu = request.form["lieu_evenement"] if request.form["lieu_evenement"] else None
    id_groupe = request.form["groupe_evenement"] if request.form["groupe_evenement"] else None
    nom_evenement = request.form["nom_evenement"] if request.form["nom_evenement"] else None
    date_debut = request.form["date_debut"] if request.form["date_debut"] else None
    date_fin = request.form["date_fin"] if request.form["date_fin"] else None
    heure_debut = request.form["heure_debut"] if request.form["heure_debut"] else None
    heure_fin = request.form["heure_fin"] if request.form["heure_fin"] else None
    evenement = Evenement(None, id_groupe, id_lieu, nom_evenement, heure_debut, heure_fin, date_debut, date_fin)
    id_evenement = evenementbd.insert_evenement(evenement)
    type_evenement = request.form["type_evenement"]

    if type_evenement == "concert":
        temps_montage = request.form["temps_montage"] if request.form["temps_montage"] else None
        temps_demontage = request.form["temps_demontage"] if request.form["temps_demontage"] else None
        concert_bd = ConcertBD(connexionbd)
        concert = Concert(id_evenement, temps_montage, temps_demontage)
        concert_bd.insert_concert(concert)

    elif type_evenement == "activite":
        type_activite = request.form["type_activite"] if request.form["type_activite"] else None
        ouvert_public = True if "ouvert_public" in request.form else False
        print(ouvert_public)
        activite_annexebd = Activite_AnnexeBD(connexionbd)
        activite_annexe = Activite_Annexe(id_evenement, type_activite, ouvert_public)
        print(activite_annexe.get_ouvertAuPublic())
        activite_annexebd.insert_activite_annexe(activite_annexe)
    return redirect(url_for("evenements_festival"))

@app.route("/billets_festival")
def billets_festival():
    connexionbd = ConnexionBD()
    billetbd = BilletBD(connexionbd)
    liste_billets = billetbd.get_all_billets()
    if not liste_billets:
        return render_template("admin_billets.html", liste_billets=[])
    return render_template("admin_billets.html", liste_billets=liste_billets)

@app.route("/lieux_festival")
def lieux_festival():
    connexionbd = ConnexionBD()
    lieubd = LieuBD(connexionbd)
    liste_lieux = lieubd.get_all_lieux()
    if not liste_lieux:
        return render_template("admin_lieux.html", liste_lieux=[])
    return render_template("admin_lieux.html", liste_lieux=liste_lieux)

@app.route("/types_billet_festival")
def types_billet_festival():
    connexionbd = ConnexionBD()
    type_billetbd = Type_BilletBD(connexionbd)
    liste_types_billet = type_billetbd.get_all_types_billets()
    if not liste_types_billet:
        return render_template("admin_types_billet.html", liste_types_billet=[])
    return render_template("admin_types_billet.html", liste_types_billet=liste_types_billet)

@app.route("/spectateurs_festival")
def spectateurs_festival():
    connexionbd = ConnexionBD()
    spectateurbd = SpectateurBD(connexionbd)
    liste_spectateurs = spectateurbd.get_all_spectateurs()
    if not liste_spectateurs:
        return render_template("admin_spectateurs.html", liste_spectateurs=[])
    return render_template("admin_spectateurs.html", liste_spectateurs=liste_spectateurs)

@app.route("/styles_musicaux_festival")
def styles_musicaux_festival():
    connexionbd = ConnexionBD()
    style_musicalbd = Style_MusicalBD(connexionbd)
    liste_styles_musicaux = style_musicalbd.get_all_styles()
    if not liste_styles_musicaux:
        return render_template("admin_styles.html", liste_styles_musicaux=[])
    return render_template("admin_styles.html", liste_styles_musicaux=liste_styles_musicaux)

@app.route("/instruments_festival")
def instruments_festival():
    connexionbd = ConnexionBD()
    instrumentbd = InstrumentBD(connexionbd)
    liste_instruments = instrumentbd.get_all_instruments()
    if not liste_instruments:
        return render_template("admin_instruments.html", liste_instruments=[])
    return render_template("admin_instruments.html", liste_instruments=liste_instruments)

@app.route("/users_festival")
def users_festival():
    connexionbd = ConnexionBD()
    userbd = UserBD(connexionbd)
    liste_users = userbd.get_all_users()
    if not liste_users:
        return render_template("admin_users.html", liste_users=[])
    return render_template("admin_users.html", liste_users=liste_users)

if __name__ == '__main__':
    app.run(debug=True, port=8080)
    