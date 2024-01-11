from BD import Evenement
from BD import Groupe
from ConnexionBD import ConnexionBD
from sqlalchemy.sql.expression import text
from sqlalchemy.exc import SQLAlchemyError

class EvenementBD:
    def __init__(self, conx: ConnexionBD):
        self.connexion = conx
        
    def get_all_evenements(self):
        try:
            query = text("SELECT idE, idG, idL, nomE, heureDebutE, heureFinE, dateDebutE, dateFinE FROM EVENEMENT")
            evenements = []
            result = self.connexion.get_connexion().execute(query)
            for idE, idG, idL, nomE, heureDebutE, heureFinE, dateDebutE, dateFinE in result:
                evenements.append(Evenement(idE, idG, idL, nomE, heureDebutE, heureFinE, dateDebutE, dateFinE))
            return evenements
        except SQLAlchemyError as e:
            print(f"La requête a échoué : {e}")
    
    def insert_evenement(self, evenement):
        try:
            query = text("INSERT INTO EVENEMENT (idG, idL, nomE, heureDebutE, heureFinE, dateDebutE, dateFinE) VALUES (:idG, :idL, :nomE, :heureDebutE, :heureFinE, :dateDebutE, :dateFinE)")
            result = self.connexion.get_connexion().execute(query, {"idG": evenement.get_idG(), "idL": evenement.get_idL(), "nomE": evenement.get_nomE(), "heureDebutE": evenement.get_heureDebutE(), "heureFinE": evenement.get_heureFinE(), "dateDebutE": evenement.get_dateDebutE(), "dateFinE": evenement.get_dateFinE()})
            evenement_id = result.lastrowid
            print(f"L'événement {evenement_id} a été ajouté")
            self.connexion.get_connexion().commit()
            return evenement_id
        except SQLAlchemyError as e:
            print(f"La requête a échoué : {e}")

    def delete_evenement_by_name(self, evenement, nom):
        try:
            query = text("DELETE FROM EVENEMENT WHERE idE = :idE AND nomE = :nom")
            self.connexion.get_connexion().execute(query, {"idE": evenement.get_idE(), "nom": nom})
            print(f"L'événement {evenement.get_idE()} a été supprimé")
            self.connexion.get_connexion().commit()
        except SQLAlchemyError as e:
            print(f"La requête a échoué : {e}")
            
    def get_all_groupes_from_21_juillet(self):
        try:
            query = text("select idG, idH, nomG, descriptionG, idE, idL, nomE, heureDebutE, heureFinE, dateDebutE, dateFinE from EVENEMENT natural join GROUPE where dateDebutE='2023-07-21'")
            groupes = []
            result = self.connexion.get_connexion().execute(query)
            for idG, idH, nomG, descriptionG, idE, idL, nomE, heureDebutE, heureFinE, dateDebutE, dateFinE in result:
                groupes.append((Groupe(idG, idH, nomG, descriptionG), Evenement(idE, idG, idL, nomE, heureDebutE, heureFinE, dateDebutE, dateFinE)))
            return groupes
        except SQLAlchemyError as e:
            print(f"La requête a échoué : {e}")
    
    def get_all_groupes_from_22_juillet(self):
        try:
            query = text("select idG, idH, nomG, descriptionG, idE, idL, nomE, heureDebutE, heureFinE, dateDebutE, dateFinE from EVENEMENT natural join GROUPE where dateDebutE='2023-07-22'")
            groupes = []
            result = self.connexion.get_connexion().execute(query)
            for idG, idH, nomG, descriptionG, idE, idL, nomE, heureDebutE, heureFinE, dateDebutE, dateFinE in result:
                groupes.append((Groupe(idG, idH, nomG, descriptionG), Evenement(idE, idG, idL, nomE, heureDebutE, heureFinE, dateDebutE, dateFinE)))
            return groupes
        except SQLAlchemyError as e:
            print(f"La requête a échoué : {e}")
            
    def get_all_groupes_from_23_juillet(self):
        try:
            query = text("select idG, idH, nomG, descriptionG, idE, idL, nomE, heureDebutE, heureFinE, dateDebutE, dateFinE from EVENEMENT natural join GROUPE where dateDebutE='2023-07-23'")
            groupes = []
            result = self.connexion.get_connexion().execute(query)
            for idG, idH, nomG, descriptionG, idE, idL, nomE, heureDebutE, heureFinE, dateDebutE, dateFinE in result:
                groupes.append((Groupe(idG, idH, nomG, descriptionG), Evenement(idE, idG, idL, nomE, heureDebutE, heureFinE, dateDebutE, dateFinE)))
            return groupes
        except SQLAlchemyError as e:
            print(f"La requête a échoué : {e}")
            
    def groupes_21_juillet_to_json(self):
        groupes = self.get_all_groupes_from_21_juillet()
        if groupes is None:
            return None
        else:
            res = []
            for groupe, evenement in groupes:
                res.append((groupe.to_dict(), evenement.to_dict()))
            return res
        
    def groupes_22_juillet_to_json(self):
        groupes = self.get_all_groupes_from_22_juillet()
        if groupes is None:
            return None
        else:
            res = []
            for groupe, evenement in groupes:
                res.append((groupe.to_dict(), evenement.to_dict()))
            return res
        
    def groupes_23_juillet_to_json(self):
        groupes = self.get_all_groupes_from_23_juillet()
        if groupes is None:
            return None
        else:
            res = []
            for groupe, evenement in groupes:
                res.append((groupe.to_dict(), evenement.to_dict()))
            return res
        
    def get_evenement_by_id(self, id):
        try:
            query = text("SELECT idE, idG, idL, nomE, heureDebutE, heureFinE, dateDebutE, dateFinE FROM EVENEMENT WHERE idE = :id")
            result = self.connexion.get_connexion().execute(query, {"id": id})
            for idE, idG, idL, nomE, heureDebutE, heureFinE, dateDebutE, dateFinE in result:
                return Evenement(idE, idG, idL, nomE, heureDebutE, heureFinE, dateDebutE, dateFinE)
        except SQLAlchemyError as e:
            print(f"La requête a échoué : {e}")

    def update_evenement(self, evenement):
        try:
            query = text("UPDATE EVENEMENT SET idG = :idG, idL = :idL, nomE = :nomE, heureDebutE = :heureDebutE, heureFinE = :heureFinE, dateDebutE = :dateDebutE, dateFinE = :dateFinE WHERE idE = :idE")
            self.connexion.get_connexion().execute(query, {"idG": evenement.get_idG(), "idL":evenement.get_idL() ,"nomE": evenement.get_nomE(), "heureDebutE": evenement.get_heureDebutE(), "heureFinE": evenement.get_heureFinE(), "dateDebutE": evenement.get_dateDebutE(), "dateFinE": evenement.get_dateFinE(), "idE": evenement.get_idE()})
            print(f"L'événement {evenement.get_idE()} a été modifié")
            self.connexion.get_connexion().commit()
        except SQLAlchemyError as e:
            print(f"La requête a échoué : {e}")
            
    def verify_id_in_concert(self, id):
        try:
            query = text("SELECT idE FROM EVENEMENT WHERE idE = :id and idE in (SELECT idE FROM CONCERT)")
            result = self.connexion.get_connexion().execute(query, {"id": id})
            for idE in result:
                return True
            return False
        except SQLAlchemyError as e:
            print(f"La requête a échoué : {e}")
            
    def verify_id_in_activite_annexe(self, id):
        try:
            query = text("SELECT idE FROM EVENEMENT WHERE idE = :id and idE in (SELECT idE FROM ACTIVITE_ANNEXE)")
            result = self.connexion.get_connexion().execute(query, {"id": id})
            for idE in result:
                return True
            return False
        except SQLAlchemyError as e:
            print(f"La requête a échoué : {e}")