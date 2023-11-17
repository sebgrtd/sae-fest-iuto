import sqlalchemy
from BD import Festival
from ConnexionBD import ConnexionBD
from sqlalchemy.sql.expression import text
from sqlalchemy.exc import SQLAlchemyError

class FestivalBD:
    def __init__(self, conx: ConnexionBD):
        self.connexion = conx
        
    def get_all_festivals(self):
        try:
            query = text("SELECT idF, nomF, villeF, dateDebutF, dateFinF FROM FESTIVAL")
            result = self.connexion.get_connexion().execute(query)
            festivals = []
            for idF, nomF, villeF, dateDebutF, dateFinF in result:
                festivals.append(Festival(idF, nomF, villeF, dateDebutF, dateFinF))
            return festivals
        except SQLAlchemyError as e:
            print(f"La requête a échoué : {e}")

    def get_festival_by_id(self, idFestival):
        try:
            query = text("SELECT idF, nomF, villeF, dateDebutF, dateFinF FROM FESTIVAL WHERE idF = :idFestival")
            result = self.connexion.get_connexion().execute(query, {"idFestival": idFestival})
            for idF, nomF, villeF, dateDebutF, dateFinF in result:
                return Festival(idF, nomF, villeF, dateDebutF, dateFinF)
        except SQLAlchemyError as e:
            print(f"La requête a échoué : {e}")
            
    def get_festival_by_nom(self, nomFestival):
        try:
            query = text("SELECT idF, nomF, villeF, dateDebutF, dateFinF FROM FESTIVAL WHERE nomF = :nomFestival")
            result = self.connexion.get_connexion().execute(query, {"nomFestival": nomFestival})
            for idF, nomF, villeF, dateDebutF, dateFinF in result:
                return Festival(idF, nomF, villeF, dateDebutF, dateFinF)
        except SQLAlchemyError as e:
            print(f"La requête a échoué : {e}")
            
    def get_festival_by_ville(self, villeFestival):
        try:
            query = text("SELECT idF, nomF, villeF, dateDebutF, dateFinF FROM FESTIVAL WHERE villeF = :villeFestival")
            result = self.connexion.get_connexion().execute(query, {"villeFestival": villeFestival})
            for idF, nomF, villeF, dateDebutF, dateFinF in result:
                return Festival(idF, nomF, villeF, dateDebutF, dateFinF)
        except SQLAlchemyError as e:
            print(f"La requête a échoué : {e}")
            
    def insert_festival(self, festival):
        try:
            query = text("INSERT INTO festival (nomF, villeF, dateDebutF, dateFinF) VALUES (:nomF, :villeF, :dateDebutF, :dateFinF)")
            result = self.connexion.get_connexion().execute(query, {"nomF": festival.get_nomF(), "villeF": festival.get_villeF(), "dateDebutF": festival.get_dateDebutF(), "dateFinF": festival.get_dateFinF()})
            festival_id = result.lastrowid
            print(f"Le festival {festival.get_nomF()} a été ajouté avec l'id {festival_id}")
            self.connexion.get_connexion().commit()
        except SQLAlchemyError as e:
            print(f"La requête a échoué : {e}")

    def delete_festival_by_name(self, festival):
        try:
            query = text("DELETE FROM festival WHERE nomF = :nomF")
            self.connexion.get_connexion().execute(query, {"nomF": festival.get_nomF()})
            print(f"Le festival {festival.get_nomF()} a été supprimé")
            self.connexion.get_connexion().commit()
        except SQLAlchemyError as e:
            print(f"La requête a échoué : {e}")