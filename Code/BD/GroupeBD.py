import json
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

    def get_groupe_by_id(self, id):
        try:
            query = text("SELECT idG, idH, nomG, descriptionG FROM groupe WHERE idG = :id")
            result = self.connexion.get_connexion().execute(query, {"id": id})
            for idG, idH, nomG, descriptionG in result:
                return Groupe(idG, idH, nomG, descriptionG)
        except SQLAlchemyError as e:
            print(f"La requête a échoué : {e}") 

    # renvoie le nom, l'id, la date et l'heure de passage d'un groupe EN JSON
    def get_groupes_json(self):
        groupes = self.get_all_groupes()
        groupes_json = []
        for groupe in groupes:
            groupes_json.append(groupe.to_dict())
        return json.dumps(groupes_json)
    
    def add_image(self, idGroupe, image):
        try:
            query = text("UPDATE groupe SET imgG = :imgG WHERE idG = :idG")
            self.connexion.get_connexion().execute(query, {"imgG": image, "idG": idGroupe})
            self.connexion.get_connexion().commit()
            return True
        except SQLAlchemyError as e:
            print(f"La requête a échoué : {e}")
            return False
        
    def get_image(self,idGroupe):
        try:
            query = text("SELECT imgG FROM groupe WHERE idG = :idG")
            result = self.connexion.get_connexion().execute(query, {"idG": idGroupe})
            for imgMG in result:
                return imgMG[0]
        except SQLAlchemyError as e:
            print(f"La requête a échoué : {e}")
            return None
        
    def search_groupes(self, groupe_recherche):
        try:
            groupe_recherche = f"%{groupe_recherche}%"
            query = text("SELECT idG, idH, nomG, descriptionG FROM groupe WHERE nomG LIKE :search")
            groupes = []
            result = self.connexion.get_connexion().execute(query, {"search": groupe_recherche})
            for idG, idH, nomG, descriptionG in result:
                groupes.append(Groupe(idG, idH, nomG, descriptionG).to_dict())
            return groupes
        except SQLAlchemyError as e:
            print(f"La requête a échoué : {e}")
            return []
        
    def update_groupe(self, groupe):
        try:
            query = text("UPDATE groupe SET nomG = :nomG, descriptionG = :descriptionG WHERE idG = :idG")
            self.connexion.get_connexion().execute(query, {"nomG": groupe.get_nomG(), "descriptionG": groupe.get_descriptionG(), "idG": groupe.get_idG()})
            self.connexion.get_connexion().commit()
            return True
        except SQLAlchemyError as e:
            print(f"La requête a échoué : {e}")
            return False
