import json
from BD import Lien_Reseaux_Sociaux_Membre
from ConnexionBD import ConnexionBD
from sqlalchemy.sql import text
from sqlalchemy.exc import SQLAlchemyError

class LienRS_Membre_BD:
    def __init__(self, conx: ConnexionBD):
        self.connexion = conx

    def get_all_liensRS_membres(self):
        try:
            query = text("SELECT idLRSM, idMG, reseau, URL FROM LIEN_RESEAUX_SOCIAUX_MEMBRE")
            liensRS_membres = []
            result = self.connexion.get_connexion().execute(query)
            for idLRSM, idMG, reseau, URL in result:
                liensRS_membres.append(Lien_Reseaux_Sociaux_Membre(idLRSM, idMG, reseau, URL).to_dict())
            return liensRS_membres
        except SQLAlchemyError as e:
            print(f"La requête a échoué : {e}")

    def get_liensRS_membre(self, idMG):
        try:
            query = text("SELECT idLRSM, idMG, reseau, URL FROM LIEN_RESEAUX_SOCIAUX_MEMBRE WHERE idMG = :idMG")
            liensRS_membre = []
            result = self.connexion.get_connexion().execute(query, {"idMG": idMG})
            for idLRSM, idMG, reseau, URL in result:
                liensRS_membre.append(Lien_Reseaux_Sociaux_Membre(idLRSM, idMG, reseau, URL).to_dict())
            return liensRS_membre
        except SQLAlchemyError as e:
            print(f"La requête a échoué : {e}")

    def get_liensRS_membre_json(self, idMG):
        liensRS_membre = self.get_liensRS_membre(idMG)
        if not liensRS_membre:
            return None
        else:
            return json.dumps(liensRS_membre, ensure_ascii=False)