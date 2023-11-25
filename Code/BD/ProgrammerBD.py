from BD import Programmer
from ConnexionBD import ConnexionBD
from sqlalchemy.sql.expression import text
from sqlalchemy.exc import SQLAlchemyError

class ProgrammerBD:
    def __init__(self, conx: ConnexionBD):
        self.connexion = conx
        
    def get_all_programmations(self, idFestival):
        try:
            query = text("SELECT idF, idL, idH, dateArrivee, heureArrivee, dateDepart, heureDepart FROM PROGRAMMER WHERE idF = :idFestival")
            programmations = []
            result = self.connexion.get_connexion().execute(query, {"idFestival": idFestival})
            for idF, idL, idH, dateArrivee, heureArrivee, dateDepart, heureDepart in result:
                programmations.append(Programmer(idF, idL, idH, dateArrivee, heureArrivee, dateDepart, heureDepart))
            return programmations
        except SQLAlchemyError as e:
            print(f"La requête a échoué : {e}")
            
    def get_programmation_by_date(self, idFestival, date):
        try:
            query = text("SELECT idF, idL, idH, dateArrivee, heureArrivee, dateDepart, heureDepart FROM PROGRAMMER WHERE idF = :idFestival AND dateArrivee = :date")
            result = self.connexion.get_connexion().execute(query, {"idFestival": idFestival}, {"date": date})
            programmations = []
            for idF, idL, idH, dateArrivee, heureArrivee, dateDepart, heureDepart in result:
                programmations.append(Programmer(idF, idL, idH, dateArrivee, heureArrivee, dateDepart, heureDepart))
            return programmations
        except SQLAlchemyError as e:
            print(f"La requête a échoué : {e}")
            
    def insert_programmation(self, programmer):
        try:
            query = text("INSERT INTO programmer (idF, idL, idH, dateArrivee, heureArrivee, dateDepart, heureDepart) VALUES (:idF, :idL, :idH, :dateArrivee, :heureArrivee, :dateDepart, :heureDepart)")
            result = self.connexion.get_connexion().execute(query, {"idF": programmer.get_idFestival(), "idL": programmer.get_idLieu(), "idH": programmer.get_idHebergement(), "dateArrivee": programmer.get_dateArrivee(), "heureArrivee": programmer.get_heureArrivee(), "dateDepart": programmer.get_dateDepart(), "heureDepart": programmer.get_heureDepart()})
            programmer_id = result.lastrowid
            print(f"Le programmer {programmer_id} a été ajouté")
            self.connexion.get_connexion().commit()
        except SQLAlchemyError as e:
            print(f"La requête a échoué : {e}")
            
    def delete_programmation_by_date(self, programmer, date):
        try:
            query = text("DELETE FROM programmer WHERE idF = :idF AND idL = :idL AND idH = :idH AND dateArrivee = :date")
            self.connexion.get_connexion().execute(query, {"idF": programmer.get_idFestival(), "idL": programmer.get_idLieu(), "idH": programmer.get_idHebergement(), "date": date})
            print(f"Le programmer {programmer.get_idFestival()} a été supprimé")
            self.connexion.get_connexion().commit()
        except SQLAlchemyError as e:
            print(f"La requête a échoué : {e}")