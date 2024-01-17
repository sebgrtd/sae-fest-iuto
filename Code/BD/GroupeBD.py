import json
from BD import Groupe
from BD import Reseaux
from BD import Membre_Groupe
from ConnexionBD import ConnexionBD
from sqlalchemy.sql.expression import text
from sqlalchemy.exc import SQLAlchemyError

class GroupeBD:
    def __init__(self, conx: ConnexionBD):
        self.connexion = conx
        
    def get_infos_artiste_json(self, idG):
        try:
            # on veut la description du groupe (descriptionG) dans Groupe
            # et tous les liens des réseaux (reseau) dans lien_reseaux_sociaux
            
            query = text("SELECT descriptionG, reseau, nomG, descriptionG, heureDebutE, dateDebutE FROM GROUPE NATURAL JOIN LIEN_RESEAUX_SOCIAUX NATURAL JOIN evenement WHERE idG = :idG") 
            result = self.connexion.get_connexion().execute(query, {"idG": idG})
            
            print(idG)
            
            descriptionG = ""
            nomG = ""
            heurePassage = ""
            datePassage = ""
            reseaux = Reseaux()
            
            for description, reseau, nomG, descriptionG, heurePassageG, datePassageG in result:
                descriptionG = description
                nomG = nomG
                heurePassage = heurePassageG
                datePassage = datePassageG
                reseaux.ajoute_reseau(reseau)
            
            print(str(heurePassage))
            print(str(datePassage))
            return Groupe(idG, None, nomG, descriptionG, datePassage, heurePassage, None, None, reseaux).to_dict()
        except SQLAlchemyError as e:
            print(f"La requête a échoué : {e}")
    
    def get_infos_supplementaires_artiste_json(self, idG):
        try:
            # on veut la description du groupe (descriptionG) dans Groupe
            # et tous les liens des réseaux (reseau) dans lien_reseaux_sociaux
            
            query = text("SELECT descriptionG, reseau FROM GROUPE NATURAL JOIN LIEN_RESEAUX_SOCIAUX WHERE idG = :idG") 
            result = self.connexion.get_connexion().execute(query, {"idG": idG})
            
            descriptionG = ""
            reseaux = Reseaux()
            
            for description, reseau in result:
                descriptionG = description
                reseaux.ajoute_reseau(reseau)
            
            return Groupe(idG, None, None, descriptionG, None, None, None, None, reseaux).to_dict()
        except SQLAlchemyError as e:
            print(f"La requête a échoué : {e}")
        
    def get_mon_planning_json(self, idUser):
        try:
            # on doit renvoyer un dico avec les dates de passages en clé et les groupes qui passent ces jours là en valeur
            res = dict()
            
            # on va récuprérer les dates de passage en faisant un call sur la fonctiion getDatesPassage
            
            query = text("call getDatesPassage()")
            result = self.connexion.get_connexion().execute(query)
            for date in result:
                res[str(date[0])] = []
            # on va récupérer les groupes qui passent ces jours là en faisant un call sur la fonction getGroupesDate
            self.connexion = ConnexionBD()
            
            for date in res.keys():
                query = text("call getGroupesDate(:idUser, :dateDebutE)")
                result = self.connexion.get_connexion().execute(query, {"idUser": idUser, "dateDebutE": "2024-07-21"})
                # affiche le résultat de la requête
                print(result.keys())
                for idE, idG, nomG, heureDebutE, heureFinE, dateDebutE, descriptionG, isSaved in result:
                    res[date].append(Groupe(idG, None, nomG, descriptionG, dateDebutE, heureDebutE, isSaved == 1, heureFinE).to_dict())
            
            return res
        except SQLAlchemyError as e:
            print(f"La requête a échoué : {e}")
        
    def get_groupes_with_save_json(self, idUser):
        try:
            # select idE, groupe.idG, nomG, heureDebutE, dateDebutE, descriptionG, isSaved(#IDUSER, groupe.idg) as isSaved from evenement INNER JOIN groupe ON groupe.idG = evenement.idG;
            query = text("SELECT idE, groupe.idG, nomG, heureDebutE, dateDebutE, descriptionG, isSaved(:idUser, groupe.idg) as isSaved FROM evenement INNER JOIN groupe ON groupe.idG = evenement.idG;")
            groupes = []
            result = self.connexion.get_connexion().execute(query, {"idUser": idUser})
            for idE, idG, nomG, heureDebutE, dateDebutE, descriptionG, isSaved in result:
                groupe = Groupe(idG, None, nomG, descriptionG, dateDebutE, heureDebutE, isSaved == 1)
                print(groupe.get_isSaved())
                print(groupe.get_datePassage())
                print(type(groupe.get_heurePassage()))
                groupes.append(groupe.to_dict())
            return json.dumps(groupes)
        except SQLAlchemyError as e:
            print(f"La requête a échoué : {e}")
        
    def get_all_groupes(self):
        try:
            query = text("select idE, groupe.idG, nomG, heureDebutE, dateDebutE, descriptionG, idH from evenement INNER JOIN groupe ON groupe.idG = evenement.idG;")
            groupes = []
            result = self.connexion.get_connexion().execute(query)
            for idE, idG, nomG, heureDebutE, dateDebutE, descriptionG, idH in result:
                print(idE, idG, nomG, heureDebutE, dateDebutE, descriptionG, idH)
                groupe = Groupe(idG, idH, nomG, descriptionG, dateDebutE, heureDebutE)
                groupes.append(groupe)
                
            return groupes
        except SQLAlchemyError as e:
            print(f"La requête a échoué : {e}")
            
    def insert_groupe(self, groupe):
        try:
            query = text("INSERT INTO GROUPE (idH, nomG, descriptionG) VALUES (:idH, :nomG, :descriptionG)")
            result = self.connexion.get_connexion().execute(query, {"idH": groupe.get_idHebergement(), "nomG": groupe.get_nomG(), "descriptionG": groupe.get_descriptionG()})
            groupe_id = result.lastrowid
            print(f"Le groupe {groupe_id} a été ajouté")
            self.connexion.get_connexion().commit()
        except SQLAlchemyError as e:
            print(f"La requête a échoué : {e}")
            
    def delete_groupe_by_name(self, groupe, nom):
        try:
            query = text("DELETE FROM GROUPE WHERE idG = :idG AND nomG = :nom")
            self.connexion.get_connexion().execute(query, {"idG": groupe.get_idG(), "nom": nom})
            print(f"Le groupe {groupe.get_idG()} a été supprimé")
            self.connexion.get_connexion().commit()
        except SQLAlchemyError as e:
            print(f"La requête a échoué : {e}")

    def get_groupe_by_id(self, id):
        try:
            query = text("SELECT idG, idH, nomG, descriptionG FROM GROUPE WHERE idG = :id")
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
            query = text("UPDATE GROUPE SET imgG = :imgG WHERE idG = :idG")
            self.connexion.get_connexion().execute(query, {"imgG": image, "idG": idGroupe})
            self.connexion.get_connexion().commit()
            return True
        except SQLAlchemyError as e:
            print(f"La requête a échoué : {e}")
            return False
        
    def modifier_img(self, idGroupe, image):
        try:
            query = text("UPDATE GROUPE SET imgG = :imgG WHERE idG = :idG")
            self.connexion.get_connexion().execute(query, {"imgG": image, "idG": idGroupe})
            self.connexion.get_connexion().commit()
            return True
        except SQLAlchemyError as e:
            print(f"La requête a échoué : {e}")
            return False
        
    def get_image(self,idGroupe):
        try:
            query = text("SELECT imgG FROM GROUPE WHERE idG = :idG")
            result = self.connexion.get_connexion().execute(query, {"idG": idGroupe})
            for imgMG in result:
                return imgMG[0]
        except SQLAlchemyError as e:
            print(f"La requête a échoué : {e}")
            return None
        
    def search_groupes(self, groupe_recherche):
        try:
            groupe_recherche = f"%{groupe_recherche}%"
            query = text("SELECT idG, idH, nomG, descriptionG FROM GROUPE WHERE nomG LIKE :search")
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
            query = text("UPDATE GROUPE SET idH = :idH, nomG = :nomG, descriptionG = :descriptionG WHERE idG = :idG")
            self.connexion.get_connexion().execute(query, {"idH": groupe.get_idHebergement(), "nomG": groupe.get_nomG(), "descriptionG": groupe.get_descriptionG(), "idG": groupe.get_idG()})
            self.connexion.get_connexion().commit()
            return True
        except SQLAlchemyError as e:
            print(f"La requête a échoué : {e}")
            return False
        
    def get_membres_groupe(self, idGroupe):
        try:
            query = text("select idMG, idG, nomMG, prenomMG, nomDeSceneMG, descriptionA from MEMBRE_GROUPE natural join GROUPE where idG=:idG")
            membres = []
            result = self.connexion.get_connexion().execute(query, {"idG": idGroupe})
            for idMG, idG, nomMG, prenomMG, nomDeSceneMG, descriptionA in result:
                membres.append(Membre_Groupe(idMG, idG, nomMG, prenomMG, nomDeSceneMG, descriptionA))
            return membres
        except SQLAlchemyError as e:
            print(f"La requête a échoué : {e}")
            return []

    def get_id_groupe_by_name(self, nom):
        try:
            query = text("SELECT idG FROM GROUPE WHERE nomG = :nom")
            result = self.connexion.get_connexion().execute(query, {"nom": nom})
            for idG in result:
                return idG[0]
        except SQLAlchemyError as e:
            print(f"La requête a échoué : {e}")
            return None
        
    def update_image(self, groupe, image):
        try:
            query = text("UPDATE GROUPE SET imgG = :imgG WHERE idG = :idG")
            self.connexion.get_connexion().execute(query, {"imgG": image, "idG": groupe.get_idG()})
            self.connexion.get_connexion().commit()
            return True
        except SQLAlchemyError as e:
            print(f"La requête a échoué : {e}")
            return False