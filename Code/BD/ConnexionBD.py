import sqlalchemy

class ConnexionBD:
    """
    Classe ConnexionBD

    Attributes :
        __connexion (sqlalchemy.engine.base.Connection) :  connexion à la base de données
        __user (str) : le login MySQL de l'utilsateur
        __passwd (str) : le mot de passe MySQL de l'utilisateur
        __host (str) : le nom ou l'adresse IP de la machine hébergeant le serveur MySQL
        __database (str) : le nom de la base de données à utiliser
    """

    def __init__(self):
        self.__connexion = None
        # self.__user = "coursimault"
        # self.__passwd = "coursimault"
        # self.__host = "servinfo-mariadb"
        # self.__database = "DBcoursimault"
        self.__user = "root"
        self.__passwd = "root"
        self.__host = "localhost"
        self.__database = "festiuto"
        self.ouvrir_connexion()

    def ouvrir_connexion(self, con: bool = True):
        """
        Ouverture d'une connexion MySQL
        paramètres :
            con (bool) : True si on veut utiliser la base de données locale, False sinon
        résultat : l'objet qui gère le connection MySQL si tout s'est bien passé
        """
        try:
            
            if con:
                # creation de l'objet gérant les interactions avec le serveur de BD
                engine = sqlalchemy.create_engine("mysql+mysqlconnector://" +
                                                  self.__user + ":" +
                                                  self.__passwd + "@" +
                                                  self.__host + "/" +
                                                  self.__database)
            # creation de la connexion
            cnx = engine.connect()
            print("connexion réussie")
            self.__connexion = cnx
        except Exception as err:
            print(err)
            raise err

    def get_connexion(self):
        return self.__connexion

    def fermer_connexion(self):
        self.__connexion.close()
        print("connexion fermée")