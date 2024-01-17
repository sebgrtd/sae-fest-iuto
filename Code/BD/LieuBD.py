from BD import Lieu
from ConnexionBD import ConnexionBD
from sqlalchemy.sql.expression import text
from sqlalchemy.exc import SQLAlchemyError

class LieuBD:
    def __init__(self, conx: ConnexionBD):
        self.connexion = conx
        
    def get_all_lieux(self):
        try:
            query = text("SELECT idL, nomL, adresseL, jaugeL FROM LIEU")
            result = self.connexion.get_connexion().execute(query)
            liste_lieux = []
            for idL, nomL, adresseL, jaugeL in result:
                liste_lieux.append(Lieu(idL, nomL, adresseL, jaugeL))
            return liste_lieux
        except SQLAlchemyError as e:
            print(f"La requête a échoué : {e}")
            
    def get_lieu_by_id(self, idLieu):
        try:
            query = text("SELECT idL, nomL, adresseL, jaugeL FROM LIEU WHERE idL = :idLieu")
            result = self.connexion.get_connexion().execute(query, {"idLieu": idLieu})
            for idL, nomL, adresseL, jaugeL in result:
                return Lieu(idL, nomL, adresseL, jaugeL)
        except SQLAlchemyError as e:
            print(f"La requête a échoué : {e}")
            
    def insert_lieu(self, lieu):
        try:
            query = text("INSERT INTO lieu (nomL, adresseL, jaugeL) VALUES (:nomL, :adresseL, :jaugeL)")
            result = self.connexion.get_connexion().execute(query, {"nomL": lieu.get_nomL(), "adresseL": lieu.get_adresseL(), "jaugeL": lieu.get_jaugeL()})
            lieu_id = result.lastrowid
            print(f"Le lieu {lieu_id} a été ajouté")
            self.connexion.get_connexion().commit()
        except SQLAlchemyError as e:
            print(f"La requête a échoué : {e}")
            
    def delete_lieu_by_id(self, idLieu):
        try:
            query = text("DELETE FROM lieu WHERE idL = :idLieu")
            self.connexion.get_connexion().execute(query, {"idLieu": idLieu})
            self.connexion.get_connexion().commit()
            print(f"Le lieu {idLieu} a été supprimé")
        except SQLAlchemyError as e:
            print(f"La requête a échoué : {e}")
            
    def update_lieu(self, lieu):
        try:
            query = text("UPDATE lieu SET nomL = :nomL, adresseL = :adresseL, jaugeL = :jaugeL WHERE idL = :idL")
            self.connexion.get_connexion().execute(query, {"nomL": lieu.get_nomL(), "adresseL": lieu.get_adresseL(), "jaugeL": lieu.get_jaugeL(), "idL": lieu.get_idL()})
            print(f"Le lieu {lieu.get_idL()} a été modifié")
            self.connexion.get_connexion().commit()
        except SQLAlchemyError as e:
            print(f"La requête a échoué : {e}")
