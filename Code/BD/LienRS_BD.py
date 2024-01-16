import json
from BD import Lien_Reseaux_Sociaux
from ConnexionBD import ConnexionBD
from sqlalchemy.sql.expression import text
from sqlalchemy.exc import SQLAlchemyError

class LienRS_BD:
    def __init__(self, conx: ConnexionBD):
        self.connexion = conx

    def get_all_liensRS(self):
        try:
            query = text("SELECT idLRS, idG, reseau FROM LIEN_RESEAUX_SOCIAUX")
            liensRS = []
            result = self.connexion.get_connexion().execute(query)
            for idLRS, idG, reseau in result:
                liensRS.append(Lien_Reseaux_Sociaux(idLRS, idG, reseau))
            return liensRS
        except SQLAlchemyError as e:
            print(f"La requête a échoué : {e}")

    def get_lienRS_by_groupe(self, id):
        try:
            query = text("SELECT idLRS, idG, reseau FROM LIEN_RESEAUX_SOCIAUX WHERE idG = :idG")
            result = self.connexion.get_connexion().execute(query, {"idG": id})
            liens = []
            for idLRS, idG, reseau in result:
                liens.append(Lien_Reseaux_Sociaux(idLRS, idG, reseau))
            return liens
        except SQLAlchemyError as e:
            print(f"La requête a échoué : {e}")

    def get_liensRS_membre_json(self, idG):
        lienRS = self.get_lienRS_by_groupe(idG)
        if lienRS is None:
            return None
        else:
            groupe_json = []
            for lien in lienRS:
                print(lien.to_dict())
                groupe_json.append(lien.to_dict())
        return json.dumps(groupe_json)