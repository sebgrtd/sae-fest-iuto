from BD import Spectateur
from ConnexionBD import ConnexionBD
from sqlalchemy.sql.expression import text
from sqlalchemy.exc import SQLAlchemyError

class SpectateurBD:
    def __init__(self, conx: ConnexionBD):
        self.connexion = conx
        
    def get_all_spectateurs(self):
        try:
            query = text("SELECT idS, nomS, prenomS, adresseS, emailS, mdpS FROM SPECTATEUR")
            result = self.connexion.get_connexion().execute(query)
            spectateurs = []
            for idS, nomS, prenomS, adresseS, emailS, mdpS in result:
                spectateurs.append(Spectateur(idS, nomS, prenomS, adresseS, emailS, mdpS))
            return spectateurs
        except SQLAlchemyError as e:
            print(f"La requête a échoué : {e}")
    
    def get_spectateur_by_id(self, id):
        try:
            query = text("SELECT idS, nomS, prenomS, adresseS, emailS, mdpS FROM SPECTATEUR WHERE idS = :id")
            result = self.connexion.get_connexion().execute(query, {"id": id})
            for idS, nomS, prenomS, adresseS, emailS, mdpS in result:
                return Spectateur(idS, nomS, prenomS, adresseS, emailS, mdpS)
        except SQLAlchemyError as e:
            print(f"La requête a échoué : {e}")
            
    def get_spectateur_by_email(self, email):
        try:
            query = text("SELECT idS, nomS, prenomS, adresseS, emailS, mdpS FROM SPECTATEUR WHERE emailS = :email")
            result = self.connexion.get_connexion().execute(query, {"email": email})
            for idS, nomS, prenomS, adresseS, emailS, mdpS in result:
                return Spectateur(idS, nomS, prenomS, adresseS, emailS, mdpS)
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
            query = text("INSERT INTO SPECTATEUR (nomS, prenomS, adresseS, emailS, mdpS) VALUES (:nomS, :prenomS, :adresseS, :emailS, :mdpS)")
            result = self.connexion.get_connexion().execute(query, {"nomS": spectateur.get_nomS(), "prenomS": spectateur.get_prenomS(), "adresseS": spectateur.get_adresseS(), "emailS": spectateur.get_emailS(), "mdpS": spectateur.get_mdpS()})
            spectateur_id = result.lastrowid
            self.connexion.get_connexion().commit()
            print(f"Le spectateur {spectateur.get_nomS()} a été ajouté avec l'id {spectateur_id}")
        except SQLAlchemyError as e:
            print(f"La requête a échoué : {e}")
            
    def delete_spectateur_by_email(self, spectateur):
        try:
            query = text("DELETE FROM SPECTATEUR WHERE emailS = :emailS")
            self.connexion.get_connexion().execute(query, {"emailS": spectateur.get_emailS()})
            print(f"Le spectateur {spectateur.get_emailS()} a été supprimé")
            self.connexion.get_connexion().commit()
        except SQLAlchemyError as e:
            print(f"La requête a échoué : {e}")