from BD import Activite_Annexe
from ConnexionBD import ConnexionBD
from sqlalchemy.sql.expression import text
from sqlalchemy.exc import SQLAlchemyError

class Activite_AnnexeBD:
    def __init__(self, conx: ConnexionBD):
        self.connexion = conx
        
    def get_all_activites_annexes(self):
        try:
            query = text("SELECT idE, idA, nomA, descriptionA FROM ACTIVITE_ANNEXE")
            result = self.connexion.get_connexion().execute(query)
            activites_annexes = []
            for idE, idA, nomA, descriptionA in result:
                activites_annexes.append(Activite_Annexe(idE, idA, nomA, descriptionA))
            return activites_annexes
        except SQLAlchemyError as e:
            print(f"La requête a échoué : {e}")
            
    def get_activite_annexe_by_id(self, id):
        try:
            query = text("SELECT idE, typeA, ouvertAuPublic FROM ACTIVITE_ANNEXE WHERE idE = :id")
            result = self.connexion.get_connexion().execute(query, {"id": id})
            for idE, typeA, ouvertAuPublic in result:
                return Activite_Annexe(idE, typeA, ouvertAuPublic)
        except SQLAlchemyError as e:
            print(f"La requête a échoué : {e}")
            
    def insert_activite_annexe(self, activite_annexe):
        try:
            query = text("INSERT INTO ACTIVITE_ANNEXE (idE, typeA, ouvertAuPublic) VALUES (:idE, :typeA, :ouvertAuPublic)")
            result = self.connexion.get_connexion().execute(query, {"idE": activite_annexe.get_idEvenement(), "typeA": activite_annexe.get_typeA(), "ouvertAuPublic": activite_annexe.get_ouvertAuPublic()})
            activite_annexe_id = result.lastrowid
            print(f"L'activité annexe {activite_annexe_id} a été ajoutée")
            self.connexion.get_connexion().commit()
        except SQLAlchemyError as e:
            print(f"La requête a échoué : {e}")
            
    def delete_activite_annexe_by_id(self, id):
        try:
            query = text("DELETE FROM ACTIVITE_ANNEXE WHERE idE = :id")
            self.connexion.get_connexion().execute(query, {"id": id})
            print(f"L'activité annexe {id} a été supprimée")
            self.connexion.get_connexion().commit()
        except SQLAlchemyError as e:
            print(f"La requête a échoué : {e}")