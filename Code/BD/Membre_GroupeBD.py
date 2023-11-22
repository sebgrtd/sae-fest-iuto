from BD import Membre_Groupe
from ConnexionBD import ConnexionBD
from sqlalchemy.sql.expression import text
from sqlalchemy.exc import SQLAlchemyError
import json

class Membre_GroupeBD:
    def __init__(self, conx: ConnexionBD):
        self.connexion = conx
    
    def get_artistes_of_groupe(self, idGroupe):
        try:
            query = text("SELECT idMG, idG, nomMG, prenomMG FROM membre_groupe WHERE idG = :idGroupe")
            artistes = []
            result = self.connexion.get_connexion().execute(query, {"idGroupe": idGroupe})
            for idMG, idG, nomMG, prenomMG in result:
                artistes.append(Membre_Groupe(idMG, idG, nomMG, prenomMG))
            return artistes
        except SQLAlchemyError as e:
            print(f"La requête a échoué : {e}")
            
    def artistes_to_json(self, idG):
        artistes = self.get_artistes_of_groupe(idG)
        return json.dumps([artiste.to_dict() for artiste in artistes], ensure_ascii=False)