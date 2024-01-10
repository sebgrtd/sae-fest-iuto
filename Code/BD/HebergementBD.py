from BD import Groupe, Hebergement
from ConnexionBD import ConnexionBD
from sqlalchemy.sql.expression import text
from sqlalchemy.exc import SQLAlchemyError

class HebergementBD:
    def __init__(self, conx: ConnexionBD):
        self.connexion = conx
        
    def get_all_hebergements(self):
        try:
            query = text("SELECT idH, nomH, limitePlacesH, adresseH FROM HEBERGEMENT")
            hebergements = []
            result = self.connexion.get_connexion().execute(query)
            for idH, nomH, limitePlacesH, adresseH in result:
                hebergements.append(Hebergement(idH,nomH, limitePlacesH, adresseH))
            return hebergements
        except SQLAlchemyError as e:
            print(f"La requête a échoué : {e}")

    def get_hebergement_by_id(self, idH):
        try:
            query = text("SELECT idH, nomH, limitePlacesH, adresseH FROM HEBERGEMENT WHERE idH = :idH")
            result = self.connexion.get_connexion().execute(query, {"idH": idH})
            for idH,nomH, limitePlacesH, adresseH in result:
                return Hebergement(idH,nomH, limitePlacesH, adresseH)
        except SQLAlchemyError as e:
            print(f"La requête a échoué : {e}")

    def get_groupes_hebergement(self, idH):
        try:
            query = text("SELECT idG, idH, nomG, descriptionG FROM GROUPE WHERE idH = :idH")
            result = self.connexion.get_connexion().execute(query, {"idH": idH})
            groupes = []
            for idG, idH, nomG, descriptionG in result:
                groupes.append(Groupe(idG, idH, nomG, descriptionG))
            return groupes
        except SQLAlchemyError as e:
            print(f"La requête a échoué : {e}")
            
    def get_hebergement_by_adresse(self, adresse):
        try:
            query = text("SELECT idH, nomH, limitePlacesH, adresseH FROM HEBERGEMENT WHERE adresseH = :adresse")
            result = self.connexion.get_connexion().execute(query, {"adresse": adresse})
            for idH,nomH, limitePlacesH, adresseH in result:
                return Hebergement(idH,nomH, limitePlacesH, adresseH)
        except SQLAlchemyError as e:
            print(f"La requête a échoué : {e}")
            
    def insert_hebergement(self, hebergement):
        try:
            query = text("INSERT INTO HEBERGEMENT (nomH, limitePlacesH, adresseH) VALUES (:nomH, :limitePlacesH, :adresseH)")
            result = self.connexion.get_connexion().execute(query, {"nomH": hebergement.get_nomH(), "limitePlacesH": hebergement.get_limitePlacesH(), "adresseH": hebergement.get_adresseH()})
            hebergement_id = result.lastrowid
            print(f"L'hebergement {hebergement_id} a été ajouté")
            self.connexion.get_connexion().commit()
        except SQLAlchemyError as e:
            print(f"La requête a échoué : {e}")
            
    def delete_hebergement_by_nom(self, hebergement, nom):
        try:
            query = text("DELETE FROM HEBERGEMENT WHERE idH = :idH AND nomH = :nom")
            self.connexion.get_connexion().execute(query, {"idH": hebergement.get_idH(), "nom": nom})
            print(f"L'hebergement {hebergement.get_idH()} a été supprimé")
            self.connexion.get_connexion().commit()
        except SQLAlchemyError as e:
            print(f"La requête a échoué : {e}")

    def delete_hebergement_by_id(self, idH):
        try:
            query = text("DELETE FROM HEBERGEMENT WHERE idH = :idH")
            self.connexion.get_connexion().execute(query, {"idH": idH})
            print(f"L'hebergement {idH} a été supprimé")
            self.connexion.get_connexion().commit()
        except SQLAlchemyError as e:
            print(f"La requête a échoué : {e}")

    def update_hebergement(self, hebergement):
        try:
            query = text("UPDATE HEBERGEMENT SET nomH = :nomH, limitePlacesH = :limitePlacesH, adresseH = :adresseH WHERE idH = :idH")
            self.connexion.get_connexion().execute(query, {"idH": hebergement.get_idH(), "nomH": hebergement.get_nomH(), "limitePlacesH": hebergement.get_limitePlacesH(), "adresseH": hebergement.get_adresseH()})
            print(f"L'hebergement {hebergement.get_idH()} a été modifié")
            self.connexion.get_connexion().commit()
        except SQLAlchemyError as e:
            print(f"La requête a échoué : {e}")
            
    def get_groupes_not_in_hebergement(self, idHebergement):
        try:
            # ajouter tous les groupes meme ceux ou idH est null
            query = text("SELECT idG, idH, nomG, descriptionG FROM GROUPE WHERE idH IS NULL OR idH != :idH")
            result = self.connexion.get_connexion().execute(query, {"idH": idHebergement})
            groupes = []
            for idG, idH, nomG, descriptionG in result:
                groupes.append(Groupe(idG, idH, nomG, descriptionG))
            return groupes
        except SQLAlchemyError as e:
            print(f"La requête a échoué : {e}")
            return []