from BD import Spectateur
from ConnexionBD import ConnexionBD
from sqlalchemy.sql.expression import text
from sqlalchemy.exc import SQLAlchemyError

class SpectateurBD:
    def __init__(self, conx: ConnexionBD):
        self.connexion = conx
        
    def get_all_spectateurs(self):
        try:
            query = text("SELECT idS, idUser, nomS, prenomS FROM SPECTATEUR")
            result = self.connexion.get_connexion().execute(query)
            spectateurs = []
            for idS, idUser, nomS, prenomS in result:
                spectateurs.append(Spectateur(idS, idUser, nomS, prenomS))
            return spectateurs
        except SQLAlchemyError as e:
            print(f"La requête a échoué : {e}")
    
    def get_spectateur_by_id(self, id):
        try:
            query = text("SELECT idS, idUser, nomS, prenomS FROM SPECTATEUR WHERE idS = :id")
            result = self.connexion.get_connexion().execute(query, {"id": id})
            for idS, idUser, nomS, prenomS in result:
                return Spectateur(idS, idUser, nomS, prenomS)
        except SQLAlchemyError as e:
            print(f"La requête a échoué : {e}")
            
    def get_spectateur_by_email(self, email):
        try:
            query = text("SELECT idS, idUser, nomS, prenomS FROM SPECTATEUR WHERE emailS = :email")
            result = self.connexion.get_connexion().execute(query, {"email": email})
            for idS, idUser, nomS, prenomS in result:
                return Spectateur(idS, idUser, nomS, prenomS)
        except SQLAlchemyError as e:
            print(f"La requête a échoué : {e}")
            
    def get_all_emails(self):
        try:
            query = text("SELECT emailS FROM SPECTATEUR")
            result = self.connexion.get_connexion().execute(query)
            emails = []
            for emailS in result:
                emails.append(emailS[0])
            return emails
        except SQLAlchemyError as e:
            print(f"La requête a échoué : {e}")
            
    def insert_spectateur(self, spectateur):
        try:
            query = text("INSERT INTO SPECTATEUR (nomS, prenomS, idUser) VALUES (:nomS, :prenomS, :idUser)")
            result = self.connexion.get_connexion().execute(query, {"nomS": spectateur.get_nomS(), "prenomS": spectateur.get_prenomS(), "idUser": spectateur.get_idUser()})
            spectateur_id = result.lastrowid
            self.connexion.get_connexion().commit()
            print(f"Le spectateur {spectateur.get_nomS()} a été ajouté avec l'id {spectateur_id}")
        except SQLAlchemyError as e:
            print(f"La requête a échoué : {e}")
            
    def delete_spectateur_by_id(self, id):
        try:
            query = text("DELETE FROM SPECTATEUR WHERE idS = :id")
            result = self.connexion.get_connexion().execute(query, {"id": id})
            self.connexion.get_connexion().commit()
            print(f"Le spectateur avec l'id {id} a été supprimé")
        except SQLAlchemyError as e:
            print(f"La requête a échoué : {e}")
            
    def update_spectateur(self, spectateur):
        try:
            query = text("UPDATE SPECTATEUR SET nomS = :nomS, prenomS = :prenomS, idUser = :idUser WHERE idS = :idS")
            result = self.connexion.get_connexion().execute(query, {"nomS": spectateur.get_nomS(), "prenomS": spectateur.get_prenomS(), "idUser": spectateur.get_idUser(), "idS": spectateur.get_idS()})
            self.connexion.get_connexion().commit()
            print(f"Le spectateur avec l'id {spectateur.get_idS()} a été modifié")
        except SQLAlchemyError as e:
            print(f"La requête a échoué : {e}")