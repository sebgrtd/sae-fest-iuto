from flask import session
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
    
    def get_user_id_by_email(self, email):
        try:
            query = text("SELECT idUser FROM USER WHERE emailUser = :email")
            result = self.connexion.get_connexion().execute(query, {"email": email})
            user_id = result.fetchone()
            if user_id is None:
                return None
            return user_id[0]
        except SQLAlchemyError as e:
            print(f"La requête a échoué : {e}")
            return None
        
    def exist_user_with_id(self, idUser, password):
        try:
            query = text("SELECT count(*) FROM USER WHERE idUser = :idUser AND mdpUser = :password")
            result = self.connexion.get_connexion().execute(query, {"idUser": idUser, "password": password})
            return result.fetchone()[0] == 1
        except SQLAlchemyError as e:
            print(f"La requête a échoué : {e}")

    def get_user_by_email(self, email):
        try:
            query = text("SELECT idUser, pseudoUser, mdpUser, emailUser, statutUser FROM USER WHERE emailUser = :email")
            result = self.connexion.get_connexion().execute(query, {"email": email})
            idUser, pseudoUser, mdpUser, emailUser, statutUser = result.fetchone()
            return User(idUser, pseudoUser, mdpUser, emailUser, statutUser)
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
    
    def get_all_users(self):
        try:
            query = text("select idUser, pseudoUser, mdpUser, emailUser, statutUser from USER")
            result = self.connexion.get_connexion().execute(query)
            users = []
            for idUser, pseudoUser, mdpUser, emailUser, statutUser in result:
                users.append(User(idUser, pseudoUser, mdpUser, emailUser, statutUser))
            return users
        except SQLAlchemyError as e:
            print(f"La requête a échoué : {e}")
            return False
        
    def insert_user_admin(self, user):
        try:
            query = text("INSERT INTO USER (pseudoUser, mdpUser, emailUser, statutUser) VALUES (:pseudo, :password, :email, :statut)")
            result = self.connexion.get_connexion().execute(query, {"pseudo": user.get_pseudoUser(), "password": user.get_mdpUser(), "email": user.get_emailUser(), "statut": user.get_statutUser()})
            id_user = result.lastrowid
            print(f"L'utilisateur {id_user} a été ajouté")
            self.connexion.get_connexion().commit()
            return True
        except SQLAlchemyError as e:
            if ("emailUser" in str(e) and "Duplicate entry" in str(e)):
                return "emailErr"
            print(f"La requête a échoué : {e}")
            return False
        
    def delete_user_by_id(self, idUser):
        try:
            query = text("DELETE FROM USER WHERE idUser = :idUser")
            self.connexion.get_connexion().execute(query, {"idUser": idUser})
            self.connexion.get_connexion().commit()
            return True
        except SQLAlchemyError as e:
            print(f"La requête a échoué : {e}")
            return False
        
    def update_user_admin(self, user):
        try:
            query = text("UPDATE USER SET pseudoUser = :pseudo, mdpUser = :password, emailUser = :email WHERE idUser = :idUser")
            self.connexion.get_connexion().execute(query, {"pseudo": user.get_pseudoUser(), "password": user.get_mdpUser(), "email": user.get_emailUser(), "idUser": user.get_idUser()})
            print(f"L'utilisateur {user.get_idUser()} a été modifié")
            self.connexion.get_connexion().commit()
            return True
        except SQLAlchemyError as e:
            if ("emailUser" in str(e) and "Duplicate entry" in str(e)):
                return "emailErr"
            print(f"La requête a échoué : {e}")
            return False
        
    def get_user_by_id(self, idUser):
        try:
            query = text("SELECT idUser, pseudoUser, mdpUser, emailUser, statutUser FROM USER WHERE idUser = :idUser")
            result = self.connexion.get_connexion().execute(query, {"idUser": idUser})
            idUser, pseudoUser, mdpUser, emailUser, statutUser = result.fetchone()
            return User(idUser, pseudoUser, mdpUser, emailUser, statutUser)
        except SQLAlchemyError as e:
            print(f"La requête a échoué : {e}")
            return False
        
    def est_sauvegarde(self, id_artiste, id_user):
        try:
            query = text("SELECT count(*) FROM SAUVEGARDER_GROUPE WHERE idUser = :idUser AND idG = :idG")
            result = self.connexion.get_connexion().execute(query, {"idUser": id_user, "idG": id_artiste})
            return result.fetchone()[0] == 1
        except SQLAlchemyError as e:
            print(f"La requête a échoué : {e}")
            return False
    
    def save_artiste(self, id_artiste,id_user):
        try:
            """
            la table c'est ça:
            CREATE TABLE SAUVEGARDER_GROUPE(
	idUser INT,
    idG INT,
    FOREIGN KEY (idUser) REFERENCES user (idUser)
);
    
            """
            if (self.est_sauvegarde(id_artiste, id_user)):
                # on supprime
                query = text("DELETE FROM SAUVEGARDER_GROUPE WHERE idUser = :idUser AND idG = :idG")
                self.connexion.get_connexion().execute(query, {"idUser": id_user, "idG": id_artiste})
                self.connexion.get_connexion().commit()
                return False
            else:
                query = text("INSERT INTO SAUVEGARDER_GROUPE (idUser, idG) VALUES (:idUser, :idG)")
                result = self.connexion.get_connexion().execute(query, {"idUser": id_user, "idG": id_artiste})
                id_user = result.lastrowid
                self.connexion.get_connexion().commit()
                return True
        except SQLAlchemyError as e:
            print(f"La requête a échoué : {e}")
            return False
        