from BD import Style_Musical
from ConnexionBD import ConnexionBD
from sqlalchemy.sql.expression import text
from sqlalchemy.exc import SQLAlchemyError

class Style_MusicalBD:
    def __init__(self, conx: ConnexionBD):
        self.connexion = conx
    
    def get_all_styles(self):
        try:
            query = text("SELECT * FROM STYLE_MUSICAL")
            result = self.connexion.get_connexion().execute(query)
            styles = []
            for idSM, nomSM in result:
                styles.append(Style_Musical(idSM, nomSM))
            return styles
        except SQLAlchemyError:
            print("Erreur lors de la récupération des styles musicaux")

    def get_id_style_by_name(self, nom):
       try:
            query = text("SELECT idSt FROM STYLE_MUSICAL WHERE nomSt = :nom")
            result = self.connexion.get_connexion().execute(query, {"nom": nom})
            for idSt in result:
                return idSt[0]
       except SQLAlchemyError:
           print("Erreur lors de la récupération de l'id du style musical")
           
    def insert_style(self, style):
        try:
            query = text("INSERT INTO STYLE_MUSICAL (nomSt) VALUES (:nom)")
            self.connexion.get_connexion().execute(query, {"nom": style.get_nomSt()})
        except SQLAlchemyError:
            print("Erreur lors de l'insertion du style musical")
            
    def update_style(self, style):
        try:
            query = text("UPDATE STYLE_MUSICAL SET nomSt = :nom WHERE idSt = :idSt")
            self.connexion.get_connexion().execute(query, {"idSt": style.get_idSt(), "nom": style.get_nomSt()})
            print(f"Le style musical {style.get_idSt()} a été modifié")
        except SQLAlchemyError:
            print("Erreur lors de la modification du style musical")

    def delete_style_by_name(self, style, nom):
        try:
            query = text("DELETE FROM STYLE_MUSICAL WHERE idSt = :idSt AND nomSt = :nom")
            self.connexion.get_connexion().execute(query, {"idSt": style.get_idSt(), "nom": nom})
            print(f"Le style musical {style.get_idSt()} a été supprimé")
        except SQLAlchemyError:
            print("Erreur lors de la suppression du style musical")