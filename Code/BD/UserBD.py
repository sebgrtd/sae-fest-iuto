from BD import User
from ConnexionBD import ConnexionBD
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.sql.expression import text
import json

class UserBD:
    def __init__(self, conx: ConnexionBD):
        self.connexion = conx

    def exist_user(self, email, password):
        try:
            query = text("SELECT count(*) FROM USER WHERE emailUser = :email AND mdpUser = :password")
            result = self.connexion.get_connexion().execute(query, {"email": email, "password": password})
            return result.fetchone()[0] == 1
        except SQLAlchemyError as e:
            print(f"La requête a échoué : {e}")

    def get_user_by_email(self, email):
        try:
            query = text("SELECT idUser, pseudoUser, mdpUser, emailUser FROM USER WHERE emailUser = :email")
            result = self.connexion.get_connexion().execute(query, {"email": email})
            idUser, pseudoUser, mdpUser, emailUser = result.fetchone()
            return User(idUser, pseudoUser, mdpUser, emailUser)
        except SQLAlchemyError as e:
            print(f"La requête a échoué : {e}")

    def add_user(self, pseudo, email, password):
        try:
            query = text("INSERT INTO USER (pseudoUser, emailUser, mdpUser) VALUES (:pseudo, :email, :password)")
            print("INSERT INTO USER : " + "\n"
                  + "pseudoUser = " + pseudo + "\n"
                  + "emailUser = " + email + "\n"
                  + "mdpUser = " + password + "\n")
            self.connexion.get_connexion().execute(query, {"pseudo": pseudo, "email": email, "password": password})
            self.connexion.get_connexion().commit()
            return True
        except SQLAlchemyError as e:
            print(f"La requête a échoué : {e}")
            return False

    def user_to_json(self, user):
        return json.dumps(user.to_dict(), ensure_ascii=False)