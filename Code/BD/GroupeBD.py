from BD import Groupe
from ConnexionBD import ConnexionBD
from sqlalchemy.sql.expression import text
from sqlalchemy.exc import SQLAlchemyError

class GroupeBD:
    def __init__(self, conx: ConnexionBD):
        self.connexion = conx
        
    def get_all_groupes(self):
        try:
            query = text("SELECT idG, idH, nomG, descriptionG FROM groupe")
            groupes = []
            result = self.connexion.get_connexion().execute(query)
            for idG, idH, nomG, descriptionG in result:
                groupes.append(Groupe(idG, idH, nomG, descriptionG))
            return groupes
        except SQLAlchemyError as e:
            print(f"La requête a échoué : {e}")
            
    def insert_groupe(self, groupe):
        try:
            query = text("INSERT INTO groupe (idH, nomG, descriptionG) VALUES (:idH, :nomG, :descriptionG)")
            result = self.connexion.get_connexion().execute(query, {"idH": groupe.get_idHebergement(), "nomG": groupe.get_nomG(), "descriptionG": groupe.get_descriptionG()})
            groupe_id = result.lastrowid
            print(f"Le groupe {groupe_id} a été ajouté")
            self.connexion.get_connexion().commit()
        except SQLAlchemyError as e:
            print(f"La requête a échoué : {e}")
            
    def delete_groupe_by_name(self, groupe, nom):
        try:
            query = text("DELETE FROM groupe WHERE idG = :idG AND nomG = :nom")
            self.connexion.get_connexion().execute(query, {"idG": groupe.get_idG(), "nom": nom})
            print(f"Le groupe {groupe.get_idG()} a été supprimé")
            self.connexion.get_connexion().commit()
        except SQLAlchemyError as e:
            print(f"La requête a échoué : {e}")