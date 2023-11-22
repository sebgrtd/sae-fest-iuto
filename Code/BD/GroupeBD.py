from BD import Groupe
from ConnexionBD import ConnexionBD
from sqlalchemy.sql.expression import text
from sqlalchemy.exc import SQLAlchemyError

class GroupeBD:
    def __init__(self, conx: ConnexionBD):
        self.connexion = conx
        
    def get_groupe_by_id(self, id):
        try:
            query = text("SELECT idG, idH, nomG, descriptionG FROM GROUPE WHERE idG = :id")
            result = self.connexion.get_connexion().execute(query, {"id": id})
            for idG, idH, nomG, descriptionG in result:
                return Groupe(idG, idH, nomG, descriptionG)
        except SQLAlchemyError as e:
            print(f"La requête a échoué : {e}")