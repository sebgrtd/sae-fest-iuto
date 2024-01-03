from BD import Style_Musical
from ConnexionBD import ConnexionBD
from sqlalchemy.sql.expression import text
from sqlalchemy.exc import SQLAlchemyError

class Style_MusicalBD:
    def __init__(self, conx: ConnexionBD):
        self.connexion = conx
    
    def get_all_styles(self):
        try:
            query = text("SELECT * FROM style_musical")
            result = self.connexion.get_connexion().execute(query)
            styles = []
            for idSM, nomSM in result:
                styles.append(Style_Musical(idSM, nomSM))
            return styles
        except SQLAlchemyError:
            print("Erreur lors de la récupération des styles musicaux")

    def get_id_style_by_name(self, nom):
       try:
            query = text("SELECT idSt FROM style_musical WHERE nomSt = :nom")
            result = self.connexion.get_connexion().execute(query, {"nom": nom})
            for idSt in result:
                return idSt[0]
       except SQLAlchemyError:
           print("Erreur lors de la récupération de l'id du style musical")