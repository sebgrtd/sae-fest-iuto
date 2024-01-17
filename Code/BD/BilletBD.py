from datetime import datetime
from BD import Billet
from ConnexionBD import ConnexionBD
from sqlalchemy.sql.expression import text
from sqlalchemy.exc import SQLAlchemyError

class BilletBD:
    def __init__(self, conx: ConnexionBD):
        self.connexion = conx
        
    def get_nb_reservations(self):
        # SELECT count(*) FROM festiuto.billet;
        try:
            query = text("SELECT count(*) FROM billet")
            result = self.connexion.get_connexion().execute(query)
            return result.fetchone()[0]
        except SQLAlchemyError as e:
            print(f"La requête a échoué : {e}")
            return -1
        
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
            query = text("INSERT INTO billet (idF, idType, idS, prix, dateAchat, dateDebutB, dateFinB) VALUES (1, :idType, :idS, :prix, :dateAchat, :dateDebutB, :dateFinB)")
            result = self.connexion.get_connexion().execute(query, {"idType": billet.get_idType(), "idS": billet.get_idSpectateur(), "prix": billet.get_prix(), "dateAchat": billet.get_dateAchat(), "dateDebutB": billet.get_dateDebutB(), "dateFinB": billet.get_dateFinB()})
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
            
    def delete_billet_by_id(self, id_billet):
        try:
            query = text("DELETE FROM billet WHERE idB = :idB")
            self.connexion.get_connexion().execute(query, {"idB": id_billet})
            self.connexion.get_connexion().commit()
            print(f"Le billet {id_billet} a été supprimé")
            return True
        except SQLAlchemyError as e:
            print(f"La requête a échoué : {e}")
            return False
        
    def update_billet(self, billet):
        try:
            query = text("UPDATE billet SET idType = :idType, idS = :idS, prix = :prix, dateAchat = :dateAchat, dateDebutB = :dateDebutB, dateFinB = :dateFinB WHERE idB = :idB")
            self.connexion.get_connexion().execute(query, {"idType": billet.get_idType(), "idS": billet.get_idSpectateur(), "prix": billet.get_prix(), "dateAchat": billet.get_dateAchat(), "dateDebutB": billet.get_dateDebutB(), "dateFinB": billet.get_dateFinB(), "idB": billet.get_idB()})
            self.connexion.get_connexion().commit()
            print(f"Le billet {billet.get_idB()} a été modifié")
        except SQLAlchemyError as e:
            print(f"La requête a échoué : {e}")
            
    def get_billet_by_id(self, id_billet):
        try:
            query = text("SELECT idB, idF, idType, idS, prix, dateAchat, dateDebutB, dateFinB FROM billet WHERE idB = :idB")
            result = self.connexion.get_connexion().execute(query, {"idB": id_billet})
            for idB, idF, idType, idS, prix, dateAchat, dateDebutB, dateFinB in result:
                return Billet(idB, idF, idType, idS, prix, dateAchat, dateDebutB, dateFinB)
        except SQLAlchemyError as e:
            print(f"La requête a échoué : {e}")
            
    def billet_id_dispo(self):
        try:
            query = text("SELECT MAX(idB) FROM BILLET")
            result = self.connexion.get_connexion().execute(query)
            max_id = result.fetchone()[0]
            if max_id is None:
                return 1
            return max_id + 1
        except SQLAlchemyError as e:
            print(f"La requête a échoué : {e}")
            return None
    
    def reserver_billets(self, data, idUser):
            idType = None
            for billet_json in data:
                if billet_json['selectedDaysSortedString']:
                   date_debut_b = datetime.strptime('2024 ' + billet_json['selectedDaysSortedString'].split('-')[0].replace('Jui', 'Jul'), '%Y %d %b').date()
                   date_fin_b = datetime.strptime('2024 ' + billet_json['selectedDaysSortedString'].split('-')[1].replace('Jui', 'Jul'), '%Y %d %b').date()
                   idType =2
                else:
                    date_debut_b = date_fin_b = None
                id_festival = 4
                if not date_debut_b or not date_fin_b:
                    date = None
                    if billet_json['title'] == "Accès Samedi 20 Juillet":
                        date = datetime.strptime('2024/07/20', '%Y/%m/%d').date()
                        idType =1
                        date_debut_b, date_fin_b = date, date
                    elif billet_json['title'] == "Accès Dimanche 21 Juillet":
                        date = datetime.strptime('2024/07/21', '%Y/%m/%d').date()
                        idType =1
                        date_debut_b, date_fin_b = date, date
                    elif billet_json['title'] == "Accès Lundi 22 Juillet":
                        date = datetime.strptime('2024/07/22', '%Y/%m/%d').date()
                        date_debut_b, date_fin_b = date, date
                        idType =1
                    elif billet_json['title'] == "Forfait 3 jours":
                        idType = 3
                        date_debut_b = datetime.strptime('2024/07/20', '%Y/%m/%d').date()
                        date_fin_b = datetime.strptime('2024/07/20', '%Y/%m/%d').date()                    
                for i in range(billet_json['quantity']):
                    idBilletDisponible = self.billet_id_dispo()
                    query = text("""INSERT INTO billet (idB, idF, idType, idS, prix, dateAchat, dateDebutB, dateFinB)
                                    VALUES (:idB, :idF, :idType, :idS, :prix, :dateAchat, :dateDebutB, :dateFinB)""")
                    self.connexion.get_connexion().execute(query, {
                        "idB": idBilletDisponible,
                        "idF": id_festival,
                        "idType":idType,
                        "idS": idUser,
                        "prix": billet_json['price'],
                        "dateAchat": datetime.now().date(),
                        "dateDebutB": date_debut_b,
                        "dateFinB": date_fin_b
                    })
            self.connexion.get_connexion().commit()
