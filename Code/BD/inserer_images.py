import sys
import os

from GroupeBD import GroupeBD

sys.path.append(os.path.join(os.path.dirname(__file__), "../appli"))
from BD import *
from app import *
from Membre_GroupeBD import *
from ConnexionBD import *

def liste_images(dossier):
    chemin_complet = os.path.abspath(dossier)
    return [os.path.join(chemin_complet, fichier) for fichier in os.listdir(chemin_complet) if fichier.endswith(".jpg")]

def inserer_images():
    les_images = liste_images("../img/")
    connexionBD = ConnexionBD()
    groupeBD = GroupeBD(connexionBD)
    liste_groupes = groupeBD.get_all_groupes()
    for i in range(len(les_images)):
        file = open(les_images[i], "rb")
        les_images[i] = file.read()
        file.close()
        groupeBD.update_image(liste_groupes[i], les_images[i])
        print(f"Image {les_images[i]} insérée dans le groupe {liste_groupes[i].get_nomG()}")
    connexionBD.fermer_connexion()
    
if __name__ == "__main__":
    inserer_images()
