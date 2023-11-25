from BD import User
from ConnexionBD import ConnexionBD
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.sql.expression import text

class UserBD:
    def __init__(self, conx: ConnexionBD):
        self.connexion = conx

    def get_all_users(self):
        try:
            query = text("SELECT idUser, pseudoUser, mdpUser, emailUser FROM USER")
            users = []
            result = self.connexion.get_connexion().execute(query)
            # idUser | pseudoUser | mdpUser | emailUser
            for idUser, pseudoUser, mdpUser, emailUser in result:
                user = User.User(idUser, pseudoUser, mdpUser, emailUser)
                users.append(user)
            return users
        except SQLAlchemyError as e:
            print(f"La requête a échoué : {e}")

    def exist_user(self, email, password):
        try:
            result = self.connexion.get_connexion().execute("SELECT * FROM USER WHERE email = '" + email + "' AND password = '" + password + "'")
            if result.rowcount == 1:
                return True
            return False
        except SQLAlchemyError as e:
            print(f"La requête a échoué : {e}")