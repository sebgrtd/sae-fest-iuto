from BD import User
from ConnexionBD import ConnexionBD
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.sql.expression import text
import json

class UserBD:
    def __init__(self, conx: ConnexionBD):
        self.connexion = conx

    def email_exists(self, email):
        try:
            query = text("SELECT count(*) FROM USER WHERE emailUser = :email")
            result = self.connexion.get_connexion().execute(query, {"email": email})
            return result.fetchone()[0] == 1
        except SQLAlchemyError as e:
            print(f"La requête a échoué : {e}")

    def exist_user(self, email, password):
        try:
            query = text("SELECT count(*) FROM USER WHERE emailUser = :email AND mdpUser = :password")
            result = self.connexion.get_connexion().execute(query, {"email": email, "password": password})
            return result.fetchone()[0] == 1
        except SQLAlchemyError as e:
            print(f"La requête a échoué : {e}")

    def exist_user_with_id(self, idUser, password):
        try:
            query = text("SELECT count(*) FROM USER WHERE idUser = :idUser AND mdpUser = :password")
            result = self.connexion.get_connexion().execute(query, {"idUser": idUser, "password": password})
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
            query = text("INSERT INTO USER (pseudoUser, emailUser, mdpUser, statutUser) VALUES (:pseudo, :email, :password, 'user')")
            print("INSERT INTO USER : " + "\n"
                  + "pseudoUser = " + pseudo + "\n"
                  + "emailUser = " + email + "\n"
                  + "mdpUser = " + password + "\n")
            self.connexion.get_connexion().execute(query, {"pseudo": pseudo, "email": email, "password": password})
            self.connexion.get_connexion().commit()
            return True
        except SQLAlchemyError as e:
            if ("emailUser" in str(e) and "Duplicate entry" in str(e)):
                return "emailErr"
            print(f"La requête a échoué : {e}")
            return False
        
    def update_user(self, idUser, email, pseudo, password):
        try:
            query = text("UPDATE USER SET pseudoUser = :pseudo, emailUser = :email, mdpUser = :password WHERE idUser = :idUser")
            print("UPDATE USER : " + "\n"
                + "idUser = " + str(idUser) + "\n"
                + "pseudoUser = " + pseudo + "\n"
                + "emailUser = " + email + "\n"
                + "mdpUser = " + password + "\n")
            self.connexion.get_connexion().execute(query, {"idUser": idUser, "pseudo": pseudo, "email": email, "password": password})
            self.connexion.get_connexion().commit()
            return True
        except SQLAlchemyError as e:
            if ("emailUser" in str(e) and "Duplicate entry" in str(e)):
                return "emailErr"
            print(f"La requête a échoué : {e}")
            return False
    
    def ajouterCodeVerification(self, emailUser, code):
        try:
            query = text("UPDATE USER SET codeTempUser = :code WHERE emailUser = :email")
            self.connexion.get_connexion().execute(query, {"code": code, "email": emailUser})
            self.connexion.get_connexion().commit()
            return True
        except SQLAlchemyError as e:
            print(f"La requête a échoué : {e}")
            return False
        
    def tester_code_verification(self, emailUser, code):
        try:
            query = text("SELECT count(*) FROM USER WHERE emailUser = :email AND codeTempUser = :code")
            # si la requete retourne 1 alors le code est bon
            result = self.connexion.get_connexion().execute(query, {"email": emailUser, "code": code})
            return result.fetchone()[0] == 1
        except SQLAlchemyError as e:
            print(f"La requête a échoué : {e}")
            return False
        
    def update_password(self,emailUser, newPassword):
        try:
            query = text("UPDATE USER SET mdpUser= :mdp, codeTempUser = null WHERE emailUser = :email")
            self.connexion.get_connexion().execute(query, {"mdp": newPassword, "email": emailUser})
            self.connexion.get_connexion().commit()
            return True
        except SQLAlchemyError as e:
            print(f"La requête a échoué : {e}")
            return False

    def user_to_json(self, user):
        return json.dumps(user.to_dict(), ensure_ascii=False)