from BD import Instrument
from ConnexionBD import ConnexionBD
from sqlalchemy.sql.expression import text
from sqlalchemy.exc import SQLAlchemyError

class InstrumentBD:
    def __init__(self, conx: ConnexionBD):
        self.connexion = conx
        
    def get_all_instruments(self):
        try:
            query = text("SELECT idI, nomI FROM INSTRUMENT")
            result = self.connexion.get_connexion().execute(query)
            instruments = []
            for idI, nomI in result:
                instruments.append(Instrument(idI, nomI))
            return instruments
        except SQLAlchemyError:
            print("Erreur lors de la récupération des instruments")

    def get_id_instrument_by_name(self, nom):
        try:
            query = text("SELECT idI FROM INSTRUMENT WHERE nomI = :nom")
            result = self.connexion.get_connexion().execute(query, {"nom": nom})
            for idI in result:
                return idI[0]
        except SQLAlchemyError:
            print("Erreur lors de la récupération de l'id de l'instrument")
            
    
    def get_instrument_by_id(self, idI):
        try:
            query = text("SELECT idI, nomI FROM INSTRUMENT WHERE idI = :idI")
            result = self.connexion.get_connexion().execute(query, {"idI": idI})
            for idI, nomI in result:
                return Instrument(idI, nomI)
        except SQLAlchemyError:
            print("Erreur lors de la récupération de l'instrument")
            
    def insert_instrument(self, instrument):
        try:
            query = text("INSERT INTO INSTRUMENT (nomI) VALUES (:nom)")
            self.connexion.get_connexion().execute(query, {"nom": instrument.get_nomI()})
            print(f"L'instrument {instrument.get_nomI()} a été ajouté")
            self.connexion.get_connexion().commit()
        except SQLAlchemyError:
            print("Erreur lors de l'insertion de l'instrument")
            
    def update_instrument(self, instrument):
        try:
            query = text("UPDATE INSTRUMENT SET nomI = :nom WHERE idI = :id")
            self.connexion.get_connexion().execute(query, {"idI": instrument.get_idI(), "nom": instrument.get_nomI()})
            print(f"L'instrument {instrument.get_idI()} a été modifié")
        except SQLAlchemyError:
            print("Erreur lors de la modification de l'instrument")
            
    def delete_instrument_by_id(self, id):
        try:
            query = text("DELETE FROM INSTRUMENT WHERE idI = :id")
            self.connexion.get_connexion().execute(query, {"idI": id})
            print(f"L'instrument {id} a été supprimé")
        except SQLAlchemyError:
            print("Erreur lors de la suppression de l'instrument")
