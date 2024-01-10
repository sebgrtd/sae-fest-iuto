from BD import Concert
from ConnexionBD import ConnexionBD
from sqlalchemy.sql.expression import text
from sqlalchemy.exc import SQLAlchemyError

class ConcertBD:
    def __init__(self, conx: ConnexionBD):
        self.connexion = conx
        
    def get_all_concerts(self):
        try:
            query = text("SELECT idE, tempsMontage, tempsDemontage FROM CONCERT")
            result = self.connexion.get_connexion().execute(query)
            concerts = []
            for idE, tempsMontage, tempsDemontage in result:
                concerts.append(Concert(idE, tempsMontage, tempsDemontage))
            return concerts
        except SQLAlchemyError as e:
            print(f"La requête a échoué : {e}")
            
    def get_concert_by_id(self, idConcert):
        try:
            query = text("SELECT idE, tempsMontage, tempsDemontage FROM CONCERT WHERE idE = :idConcert")
            result = self.connexion.get_connexion().execute(query, {"idConcert": idConcert})
            for idE, tempsMontage, tempsDemontage in result:
                return Concert(idE, tempsMontage, tempsDemontage)
        except SQLAlchemyError as e:
            print(f"La requête a échoué : {e}")
            
    def insert_concert(self, concert):
        try:
            query = text("INSERT INTO CONCERT (idE, tempsMontage, tempsDemontage) VALUES (:idE, :tempsMontage, :tempsDemontage)")
            result = self.connexion.get_connexion().execute(query, {"idE": concert.get_idEvenement(), "tempsMontage": concert.get_tempsMontage(), "tempsDemontage": concert.get_tempsDemontage()})
            concert_id = result.lastrowid
            print(f"Le concert {concert_id} a été ajouté")
            self.connexion.get_connexion().commit()
        except SQLAlchemyError as e:
            print(f"La requête a échoué : {e}")
            
    def delete_concert_by_id(self, idConcert):
        try:
            query = text("DELETE FROM CONCERT WHERE idE = :idConcert")
            self.connexion.get_connexion().execute(query, {"idConcert": idConcert})
            print(f"Le concert {idConcert} a été supprimé")
            self.connexion.get_connexion().commit()
        except SQLAlchemyError as e:
            print(f"La requête a échoué : {e}")

    def update_concert(self, concert):
        try:
            query = text("UPDATE CONCERT SET tempsMontage = :tempsMontage, tempsDemontage = :tempsDemontage WHERE idE = :idE")
            self.connexion.get_connexion().execute(query, {"idE": concert.get_idEvenement(), "tempsMontage": concert.get_tempsMontage(), "tempsDemontage": concert.get_tempsDemontage()})
            print(f"Le concert {concert.get_idEvenement()} a été modifié")
            self.connexion.get_connexion().commit()
        except SQLAlchemyError as e:
            print(f"La requête a échoué : {e}")