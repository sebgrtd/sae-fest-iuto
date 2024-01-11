from BD import Billet
from ConnexionBD import ConnexionBD
from sqlalchemy.sql.expression import text
from sqlalchemy.exc import SQLAlchemyError

class BilletBD:
    def __init__(self, conx: ConnexionBD):
        self.connexion = conx
        
    def get_all_billets(self):
        try:
            query = text("SELECT idB, idF, idType, idS, prix, dateAchat, dateDebutB, dateFinB FROM BILLET")
            result = self.connexion.get_connexion().execute(query)
            liste_billets = []
            for idB, idF, idType, idS, prix, dateAchat, dateDebutB, dateFinB in result:
                liste_billets.append(Billet(idB, idF, idType, idS, prix, dateAchat, dateDebutB, dateFinB))
            return liste_billets
        except SQLAlchemyError as e:
            print(f"La requête a échoué : {e}")
        
    def get_billets_spectateur(self, idFestival, idType, idSpectateur):
        try:
            query = text("SELECT idB, idF, idType, idS, prix, dateAchat, dateDebutB, dateFinB FROM BILLET WHERE idF = :idFestival AND idType = :idType AND idS = :idSpectateur")
            billets = []
            result = self.connexion.get_connexion().execute(query, {"idFestival": idFestival, "idType": idType, "idSpectateur": idSpectateur})
            for idB, idF, idType, idS, prix, dateAchat, dateDebutB, dateFinB in result:
                billets.append(Billet(idB, idF, idType, idS, prix, dateAchat, dateDebutB, dateFinB))
            return billets
        except SQLAlchemyError as e:
            print(f"La requête a échoué : {e}")
            
    def insert_billet(self, billet):
        try:
            query = text("INSERT INTO billet (idF, idType, idS, prix, dateAchat, dateDebutB, dateFinB) VALUES (:idF, :idType, :idS, :prix, :dateAchat, :dateDebutB, :dateFinB)")
            result = self.connexion.get_connexion().execute(query, {"idF": billet.get_idFestival(), "idType": billet.get_idType(), "idS": billet.get_idSpectateur(), "prix": billet.get_prix(), "dateAchat": billet.get_dateAchat(), "dateDebutB": billet.get_dateDebutB(), "dateFinB": billet.get_dateFinB()})
            billet_id = result.lastrowid
            print(f"Le billet {billet_id} a été ajouté")
            self.connexion.get_connexion().commit()
        except SQLAlchemyError as e:
            print(f"La requête a échoué : {e}")
            
    def delete_billet_by_id_spectateur(self, billet, id_spectateur):
        try:
            query = text("DELETE FROM billet WHERE idB = :idB AND idS = :idS")
            self.connexion.get_connexion().execute(query, {"idB": billet.get_idB(), "idS": id_spectateur})
            print(f"Le billet {billet.get_idB()} a été supprimé")
            self.connexion.get_connexion().commit()
        except SQLAlchemyError as e:
            print(f"La requête a échoué : {e}")
        