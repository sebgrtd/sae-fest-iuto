from BD import Style_Musical, Groupe
from ConnexionBD import ConnexionBD
from sqlalchemy.sql.expression import text
from sqlalchemy.exc import SQLAlchemyError

class Groupe_StyleBD:
    def __init__(self, conx: ConnexionBD):
        self.connexion = conx
        
    def get_groupes_selon_style(self, idStyle):
        try:
            query = text("SELECT idG, idSt, idH, nomG, descriptionG FROM groupe_style natural join groupe WHERE idSt = :idStyle")
            result = self.connexion.get_connexion().execute(query, {"idStyle": idStyle})
            groupes = []
            for idG, idSt, idH, nomG, descriptionG in result:
                groupes.append(Groupe(idG, idH, nomG, descriptionG))
            return groupes
        except SQLAlchemyError:
            print("Erreur lors de la récupération des groupes selon le style musical")
