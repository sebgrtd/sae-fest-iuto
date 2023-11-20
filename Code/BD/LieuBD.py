from BD import Lieu
from ConnexionBD import ConnexionBD
from sqlalchemy.sql.expression import text
from sqlalchemy.exc import SQLAlchemyError

class LieuBD:
    def __init__(self, conx: ConnexionBD):
        self.connexion = conx
        
    def get_all_lieux(self, festival):
        try:
            query = text("SELECT idL, idF, nomL, adresseL, jaugeL FROM LIEU WHERE idF = :idFestival")
            lieux = []
            result = self.connexion.get_connexion().execute(query, {"idFestival": festival.get_idF()})
            for idL, idF, nomL, adresseL, jaugeL in result:
                lieux.append(Lieu(idL, festival, nomL, adresseL, jaugeL))
            return lieux
        except SQLAlchemyError as e:
            print(f"La requête a échoué : {e}")
            
    def get_lieu_by_adresse(self, festival, adresse):
        try:
            query = text("SELECT idL, idF, nomL, adresseL, jaugeL FROM LIEU WHERE idF = :idFestival AND adresseL = :adresse")
            result = self.connexion.get_connexion().execute(query, {"idFestival": festival.get_idF(), "adresse": adresse})
            for idL, idF, nomL, adresseL, jaugeL in result:
                return Lieu(idL, festival, nomL, adresseL, jaugeL)
        except SQLAlchemyError as e:
            print(f"La requête a échoué : {e}")
            
    def insert_lieu(self, lieu):
        try:
            query = text("INSERT INTO lieu (idF, nomL, adresseL, jaugeL) VALUES (:idF, :nomL, :adresseL, :jaugeL)")
            result = self.connexion.get_connexion().execute(query, {"idF": lieu.get_idFestival(), "nomL": lieu.get_nomL(), "adresseL": lieu.get_adresseL(), "jaugeL": lieu.get_jaugeL()})
            lieu_id = result.lastrowid
            print(f"Le lieu {lieu_id} a été ajouté")
            self.connexion.get_connexion().commit()
        except SQLAlchemyError as e:
            print(f"La requête a échoué : {e}")
            
    def delete_lieu_by_nom(self, lieu, nom):
        try:
            query = text("DELETE FROM lieu WHERE idL = :idL AND nomL = :nom")
            self.connexion.get_connexion().execute(query, {"idL": lieu.get_idL(), "nom": nom})
            print(f"Le lieu {lieu.get_idL()} a été supprimé")
            self.connexion.get_connexion().commit()
        except SQLAlchemyError as e:
            print(f"La requête a échoué : {e}")