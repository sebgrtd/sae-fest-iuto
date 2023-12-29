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
            query = text("SELECT idE, nomE, dateE, heureE, descriptionE, idG FROM evenement")
            evenements = []
            result = self.connexion.get_connexion().execute(query)
            for idE, nomE, dateE, heureE, descriptionE, idG in result:
                evenements.append(Evenement(idE, nomE, dateE, heureE, descriptionE, idG))
            return evenements
        except SQLAlchemyError as e:
            print(f"La requête a échoué : {e}")
    
    def insert_evenement(self, evenement):
        try:
            query = text("INSERT INTO evenement (nomE, dateE, heureE, descriptionE, idG) VALUES (:nomE, :dateE, :heureE, :descriptionE, :idG)")
            result = self.connexion.get_connexion().execute(query, {"nomE": evenement.get_nomE(), "dateE": evenement.get_dateE(), "heureE": evenement.get_heureE(), "descriptionE": evenement.get_descriptionE(), "idG": evenement.get_idG()})
            evenement_id = result.lastrowid
            print(f"L'événement {evenement_id} a été ajouté")
            self.connexion.get_connexion().commit()
        except SQLAlchemyError as e:
            print(f"La requête a échoué : {e}")
            
    def delete_evenement_by_name(self, evenement, nom):
        try:
            query = text("DELETE FROM evenement WHERE idE = :idE AND nomE = :nom")
            self.connexion.get_connexion().execute(query, {"idE": evenement.get_idE(), "nom": nom})
            print(f"L'événement {evenement.get_idE()} a été supprimé")
            self.connexion.get_connexion().commit()
        except SQLAlchemyError as e:
            print(f"La requête a échoué : {e}")
            
    def get_all_groupes_from_21_juillet(self):
        try:
            query = text("select idG, idH, nomG, descriptionG, idE, nomE, heureDebutE, heureFinE, dateDebutE, dateFinE from EVENEMENT natural join GROUPE where dateDebutE='2023-07-21'")
            groupes = []
            result = self.connexion.get_connexion().execute(query)
            for idG, idH, nomG, descriptionG, idE, nomE, heureDebutE, heureFinE, dateDebutE, dateFinE in result:
                groupes.append((Groupe(idG, idH, nomG, descriptionG), Evenement(idE, idG, nomE, heureDebutE, heureFinE, dateDebutE, dateFinE)))
            return groupes
        except SQLAlchemyError as e:
            print(f"La requête a échoué : {e}")
    
    def get_all_groupes_from_22_juillet(self):
        try:
            query = text("select idG, idH, nomG, descriptionG, idE, nomE, heureDebutE, heureFinE, dateDebutE, dateFinE from EVENEMENT natural join GROUPE where dateDebutE='2023-07-22'")
            groupes = []
            result = self.connexion.get_connexion().execute(query)
            for idG, idH, nomG, descriptionG, idE, nomE, heureDebutE, heureFinE, dateDebutE, dateFinE in result:
                groupes.append((Groupe(idG, idH, nomG, descriptionG), Evenement(idE, idG, nomE, heureDebutE, heureFinE, dateDebutE, dateFinE)))
            return groupes
        except SQLAlchemyError as e:
            print(f"La requête a échoué : {e}")
            
    def get_all_groupes_from_23_juillet(self):
        try:
            query = text("select idG, idH, nomG, descriptionG, idE, nomE, heureDebutE, heureFinE, dateDebutE, dateFinE from EVENEMENT natural join GROUPE where dateDebutE='2023-07-23'")
            groupes = []
            result = self.connexion.get_connexion().execute(query)
            for idG, idH, nomG, descriptionG, idE, nomE, heureDebutE, heureFinE, dateDebutE, dateFinE in result:
                groupes.append((Groupe(idG, idH, nomG, descriptionG), Evenement(idE, idG, nomE, heureDebutE, heureFinE, dateDebutE, dateFinE)))
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
