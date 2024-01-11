from BD import Instrument
from ConnexionBD import ConnexionBD
from sqlalchemy.sql.expression import text
from sqlalchemy.exc import SQLAlchemyError

class InstrumentBD:
    def __init__(self, conx: ConnexionBD):
        self.connexion = conx
        
    def get_all_instruments(self):
        try:
            query = text("SELECT idI, nomI FROM instrument")
            result = self.connexion.get_connexion().execute(query)
            instruments = []
            for idI, nomI in result:
                instruments.append(Instrument(idI, nomI))
            return instruments
        except SQLAlchemyError:
            print("Erreur lors de la récupération des instruments")

    def get_id_instrument_by_name(self, nom):
        try:
            query = text("SELECT idI FROM instrument WHERE nomI = :nom")
            result = self.connexion.get_connexion().execute(query, {"nom": nom})
            for idI in result:
                return idI[0]
        except SQLAlchemyError:
            print("Erreur lors de la récupération de l'id de l'instrument")
            
    
    def get_instrument_by_id(self, idI):
        try:
            query = text("SELECT idI, nomI FROM instrument WHERE idI = :idI")
            result = self.connexion.get_connexion().execute(query, {"idI": idI})
            for idI, nomI in result:
                return Instrument(idI, nomI)
        except SQLAlchemyError:
            print("Erreur lors de la récupération de l'instrument")
            
    def insert_instrument(self, instrument):
        try:
            query = text("INSERT INTO instrument (nomI) VALUES (:nom)")
            self.connexion.get_connexion().execute(query, {"nom": instrument.get_nomI()})
            print(f"L'instrument {instrument.get_nomI()} a été ajouté")
        except SQLAlchemyError:
            print("Erreur lors de l'insertion de l'instrument")
            
    def update_instrument(self, instrument):
        try:
            query = text("UPDATE instrument SET nomI = :nom WHERE idI = :idI")
            self.connexion.get_connexion().execute(query, {"idI": instrument.get_idI(), "nom": instrument.get_nomI()})
            print(f"L'instrument {instrument.get_idI()} a été modifié")
        except SQLAlchemyError:
            print("Erreur lors de la modification de l'instrument")
