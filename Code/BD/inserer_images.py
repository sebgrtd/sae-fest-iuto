# Exécuter ce fichier en étant dans l'environnement flask

import sys
import os
import re

from GroupeBD import GroupeBD

sys.path.append(os.path.join(os.path.dirname(__file__), "../appli"))
from BD import *
from app import *
from Membre_GroupeBD import *
from ConnexionBD import *

def trier_images(s):
    return [int(text) if text.isdigit() else text.lower() for text in re.split('([0-9]+)', s)]

def liste_images(dossier):
    chemin_complet = os.path.abspath(dossier)
    fichiers = os.listdir(chemin_complet)
    fichiers.sort(key=trier_images)
    return [os.path.join(chemin_complet, fichier) for fichier in fichiers if fichier.endswith(".jpg")]

def inserer_images():
    les_images = liste_images("../img/")
    connexionBD = ConnexionBD()
    groupeBD = GroupeBD(connexionBD)
    liste_groupes = groupeBD.get_all_groupes()
    if len(liste_groupes) != len(les_images):
        print("Erreur: le nombre d'images ne correspond pas au nombre de groupes")
        return
    for i in range(len(les_images)):
        file = open(les_images[i], "rb")
        image = file.read()
        file.close()
        groupeBD.update_image(liste_groupes[i], image)
        print(f"Image {les_images[i]} insérée dans le groupe {liste_groupes[i].get_nomG()}")
    connexionBD.fermer_connexion()
    
if __name__ == "__main__":
    inserer_images()
