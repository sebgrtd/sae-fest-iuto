from BD import Membre_Groupe
from ConnexionBD import ConnexionBD
from sqlalchemy.sql.expression import text
from sqlalchemy.exc import SQLAlchemyError
import json

class Membre_GroupeBD:
    def __init__(self, conx: ConnexionBD):
        self.connexion = conx
    
    def get_artistes_of_groupe(self):
        try:
            query = text("SELECT idMG, idG, nomMG, prenomMG, nomDeSceneMG, descriptionA FROM MEMBRE_GROUPE")
            artistes = []
            result = self.connexion.get_connexion().execute(query)
            for idMG, idG, nomMG, prenomMG, nomDeSceneMG, descriptionA in result:
                artistes.append(Membre_Groupe(idMG, idG, nomMG, prenomMG, nomDeSceneMG, descriptionA))
            return artistes
        except SQLAlchemyError as e:
            print(f"La requête a échoué : {e}")
            
    def get_all_artistes(self):
        try:
            query = text("SELECT idMG, idG, nomMG, prenomMG, nomDeSceneMG, descriptionA FROM MEMBRE_GROUPE")
            artistes = []
            result = self.connexion.get_connexion().execute(query)
            for idMG, idG, nomMG, prenomMG, nomDeSceneMG, descriptionA in result:
                artistes.append(Membre_Groupe(idMG, idG, nomMG, prenomMG, nomDeSceneMG, descriptionA))
            return artistes
        except SQLAlchemyError as e:
            print(f"La requête a échoué : {e}")
            
    def insert_membre_groupe(self, membre_groupe):
        try:
            query = text("INSERT INTO MEMBRE_GROUPE (idG, nomMG, prenomMG, nomDeSceneMG, descriptionA) VALUES (:idG, :nomMG, :prenomMG, :nomDeSceneMG, :descriptionA)")
            result = self.connexion.get_connexion().execute(query, {"idG": membre_groupe.get_idGroupe(), "nomMG": membre_groupe.get_nomMG(), "prenomMG": membre_groupe.get_prenomMG(), "nomDeSceneMG": membre_groupe.get_nomDeSceneMG(), "descriptionA": membre_groupe.get_descriptionA()})
            membre_groupe_id = result.lastrowid
            print(f"Le membre_groupe {membre_groupe_id} a été ajouté")
            self.connexion.get_connexion().commit()
        except SQLAlchemyError as e:
            print(f"La requête a échoué : {e}")
            
    def delete_membre_groupe_by_name_scene(self, membre_groupe, nom_de_scene):
        try:
            query = text("DELETE FROM MEMBRE_GROUPE WHERE idMG = :idMG AND nomDeSceneMG = :nomDeScene")
            self.connexion.get_connexion().execute(query, {"idMG": membre_groupe.get_idMG(), "nomDeScene": nom_de_scene})
            print(f"Le membre_groupe {membre_groupe.get_idMG()} a été supprimé")
            self.connexion.get_connexion().commit()
        except SQLAlchemyError as e:
            print(f"La requête a échoué : {e}")
            
    def getNomsArtistes_json(self):
        artistes = self.get_all_artistes()
        return json.dumps([artiste.get_nomDeSceneMG() for artiste in artistes], ensure_ascii=False)

    def get_artiste_by_id(self, idMembreGroupe):
        try:
            query = text("SELECT idMG, idG, nomMG, prenomMG, nomDeSceneMG, descriptionA FROM MEMBRE_GROUPE WHERE idMG = :idMG")
            result = self.connexion.get_connexion().execute(query, {"idMG": idMembreGroupe})
            for idMG, idG, nomMG, prenomMG, nomDeSceneMG, descriptionA in result:
                return Membre_Groupe(idMG, idG, nomMG, prenomMG, nomDeSceneMG, descriptionA)
        except SQLAlchemyError as e:
            print(f"La requête a échoué : {e}")
            
    def get_artiste_by_id_json(self, id):
        artiste = self.get_artiste_by_id(id)
        return json.dumps(artiste, ensure_ascii=False)
    
    def search_membres_groupe(self, artiste_recherche):
        try:
            artiste_recherche = f"%{artiste_recherche}%"
            query = text("SELECT idMG, idG, nomMG, prenomMG, nomDeSceneMG, descriptionA FROM MEMBRE_GROUPE WHERE nomDeSceneMG LIKE :search")
            membres = []
            result = self.connexion.get_connexion().execute(query, {"search": artiste_recherche})
            for idMG, idG, nomMG, prenomMG, nomDeSceneMG, descriptionA in result:
                membres.append(Membre_Groupe(idMG, idG, nomMG, prenomMG, nomDeSceneMG, descriptionA).to_dict())
            return membres
        except SQLAlchemyError as e:
            print(f"La requête a échoué : {e}")
            return []

    def update_membre_groupe(self, membre_groupe):
        try:
            query = text("UPDATE MEMBRE_GROUPE SET nomMG = :nomMG, prenomMG = :prenomMG, nomDeSceneMG = :nomDeSceneMG, descriptionA= :descriptionA WHERE idMG = :idMG")
            self.connexion.get_connexion().execute(query, {"nomMG": membre_groupe.get_nomMG(), "prenomMG": membre_groupe.get_prenomMG(), "nomDeSceneMG": membre_groupe.get_nomDeSceneMG(), "idMG": membre_groupe.get_idMG(), "descriptionA": membre_groupe.get_descriptionA()})
            self.connexion.get_connexion().commit()
            return True
        except SQLAlchemyError as e:
            print(f"La requête a échoué : {e}")
            return False
        
    def get_id_membre_by_name_scene(self, nom_de_scene):
        try:
            query = text("SELECT idMG FROM MEMBRE_GROUPE WHERE nomDeSceneMG = :nomDeScene")
            result = self.connexion.get_connexion().execute(query, {"nomDeScene": nom_de_scene})
            for idMG in result:
                return idMG[0]
        except SQLAlchemyError as e:
            print(f"La requête a échoué : {e}")
            return None