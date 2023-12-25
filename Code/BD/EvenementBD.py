from BD import Evenement
from ConnexionBD import ConnexionBD
from sqlalchemy.sql.expression import text
from sqlalchemy.exc import SQLAlchemyError

class EvenementBD:
    def __init__(self, conx: Connexion):
        self.connexion = conx