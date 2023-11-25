from BD import Type_Billet
from ConnexionBD import ConnexionBD
from sqlalchemy.sql.expression import text
from sqlalchemy.exc import SQLAlchemyError

class Type_BilletBD:
    def __init__(self, conx: ConnexionBD):
        self.connexion = conx
        
    def get_all_types_billets(self):
        try:
            query = text("SELECT idType, duree FROM TYPE_BILLET")
            result = self.connexion.get_connexion().execute(query)
            types = []
            for idType, duree in result:
                types.append(Type_Billet(idType, duree))
            return types
        except SQLAlchemyError as e:
            print(f"La requête a échoué : {e}")

    def get_type_billet_by_id(self, id):
        try:
            query = text("SELECT idType, duree FROM TYPE_BILLET WHERE idType = :id")
            result = self.connexion.get_connexion().execute(query, {"id": id})
            for idType, duree in result:
                return Type_Billet(idType, duree)
        except SQLAlchemyError as e:
            print(f"La requête a échoué : {e}")
            
    def get_type_billet_by_duree(self, duree):
        try:
            query = text("SELECT idType, duree FROM TYPE_BILLET WHERE duree = :duree")
            result = self.connexion.get_connexion().execute(query, {"duree": duree})
            for idType, duree in result:
                return Type_Billet(idType, duree)
        except SQLAlchemyError as e:
            print(f"La requête a échoué : {e}")
            
    def insert_type_billet(self, type):
        try:
            query = text("INSERT INTO TYPE_BILLET (duree) VALUES (:duree)")
            result = self.connexion.get_connexion().execute(query, {"duree": type.get_duree()})
            type_id = result.lastrowid
            print(f"Le type {type.get_duree()} a été ajouté avec l'id {type_id}")
            self.connexion.get_connexion().commit()
        except SQLAlchemyError as e:
            print(f"La requête a échoué : {e}")
            
    def delete_type_billet_by_duree(self, type):
        try:
            query = text("DELETE FROM TYPE_BILLET WHERE duree = :duree")
            self.connexion.get_connexion().execute(query, {"duree": type.get_duree()})
            print(f"Le type {type.get_duree()} a été supprimé")
            self.connexion.get_connexion().commit()
        except SQLAlchemyError as e:
            print(f"La requête a échoué : {e}")