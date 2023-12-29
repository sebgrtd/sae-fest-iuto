from datetime import datetime, date, time, timedelta

class Faq:
    def __init__(self, idFaq: int, question: str, reponse: str):
        self._idFaq = idFaq
        self._question = question
        self._reponse = reponse
    
    def get_idFaq(self):
        return self._idFaq
    
    def get_question(self):
        return self._question
    
    def get_reponse(self):
        return self._reponse
    
    def to_dict(self):
        return {
            "idFaq": self._idFaq,
            "question": self._question,
            "reponse": self._reponse
        }

class User:         
    def __init__(self, idUser: int, pseudoUser: str, mdpUser: str, emailUser: str):
        self.__idUser = idUser
        self.__pseudoUser = pseudoUser
        self.__mdpUser = mdpUser
        self.__emailUser = emailUser

    def to_dict(self):
        return {
            "idUser": self.__idUser,
            "pseudoUser": self.__pseudoUser,
            "emailUser": self.__emailUser
        }

class Festival:
    def __init__(self, idF: int, nomF: str, villeF: str, dateDebutF: str, dateFinF: str):
        self.__idF = idF
        self.__nomF = nomF
        self.__villeF = villeF
        self.__dateDebutF = dateDebutF if isinstance(dateDebutF, date) else datetime.strptime(dateDebutF, '%Y-%m-%d').date()
        self.__dateFinF = dateFinF if isinstance(dateFinF, date) else datetime.strptime(dateFinF, '%Y-%m-%d').date()
        
    def get_idF(self):
        return self.__idF

    def get_nomF(self):
        return self.__nomF
    
    def get_villeF(self):
        return self.__villeF
    
    def get_dateDebutF(self):
        return self.__dateDebutF
    
    def get_dateFinF(self):
        return self.__dateFinF
    
    def __repr__(self):
        return f"({self.__idF}, {self.__nomF}, {self.__villeF}, {self.__dateDebutF}, {self.__dateFinF})"

    
class Type_Billet:
    def __init__(self, idType: int, duree: int):
        self.__idType = idType
        self.__duree = duree
    
    def get_idType(self):
        return self.__idType
    
    def get_duree(self):
        return self.__duree
    

class Spectateur:
    def __init__(self, idS: int, nomS: str, prenomS: str, adresseS: str, emailS: str, mdpS: str):
        self.__idS = idS
        self.__nomS = nomS
        self.__prenomS = prenomS
        self.__adresseS = adresseS
        self.__emailS = emailS
        self.__mdpS = mdpS
    
    def get_idS(self):
        return self.__idS
    
    def get_nomS(self):
        return self.__nomS
    
    def get_prenomS(self):
        return self.__prenomS
    
    def get_adresseS(self):
        return self.__adresseS
    
    def get_emailS(self):
        return self.__emailS
    
    def get_mdpS(self):
        return self.__mdpS
    

class Billet:
    def __init__(self, idB: int, idF: int, idType: int, idS: int, prix: int, dateAchat: str):
        self.__idB = idB
        self.__idF = idF
        self.__idType = idType
        self.__idS = idS
        self.__prix = prix
        self.__dateAchat = dateAchat if isinstance(dateAchat, date) else datetime.strptime(dateAchat, '%Y-%m-%d').date()
        
    def get_idB(self):
        return self.__idB
    
    def get_idFestival(self):
        return self.__idF
    
    def get_idType(self):
        return self.__idType
    
    def get_idSpectateur(self):
        return self.__idS
    
    def get_prix(self):
        return self.__prix
    
    def get_dateAchat(self):
        return self.__dateAchat
    
    
class Lieu:
    def __init__(self, idL: int, idF: int, nomL: str, adresseL: str, jaugeL: int):
        self.__idL = idL
        self.__idF = idF
        self.__nomL = nomL
        self.__adresseL = adresseL
        self.__jaugeL = jaugeL
        
    def get_idL(self):
        return self.__idL
    
    def get_idFestival(self):
        return self.__idF
    
    def get_nomL(self):
        return self.__nomL
    
    def get_adresseL(self):
        return self.__adresseL
    
    def get_jaugeL(self):
        return self.__jaugeL
    

class Hebergement:
    def __init__(self, idH: int, nomH: str, limitePlacesH: int, adresseH: int):
        self.__idH = idH
        self.__nomH = nomH
        self.__limitePlacesH = limitePlacesH
        self.__adresseH = adresseH
        
    def get_idH(self):
        return self.__idH
    
    def get_nomH(self):
        return self.__nomH
    
    def get_limitePlacesH(self):
        return self.__limitePlacesH
    
    def get_adresseH(self):
        return self.__adresseH
    
    
class Programmer:
    def __init__(self, idF: int, idL: int, idH: int, dateArrivee: str, heureArrivee: str, dateDepart: str, heureDepart: str):
        self.__idF = idF
        self.__idL = idL
        self.__idH = idH
        self.__dateArrivee = dateArrivee if isinstance(dateArrivee, date) else datetime.strptime(dateArrivee, '%Y-%m-%d').date()
        self.__heureArrivee = heureArrivee if isinstance(heureArrivee, time) else datetime.strptime(heureArrivee, '%H:%M').time()
        self.__dateDepart = dateDepart if isinstance(dateDepart, date) else datetime.strptime(dateDepart, '%Y-%m-%d').date()
        self.__heureDepart = heureDepart if isinstance(heureDepart, time) else datetime.strptime(heureDepart, '%H:%M').time()
        
    def get_idFestival(self):
        return self.__idF
    
    def get_idLieu(self):
        return self.__idL
    
    def get_idHebergement(self):
        return self.__idH
    
    def get_dateArrivee(self):
        return self.__dateArrivee
    
    def get_heureArrivee(self):
        return self.__heureArrivee
    
    def get_dateDepart(self):
        return self.__dateDepart
    
    def get_heureDepart(self):
        return self.__heureDepart
    

class Groupe:
    def __init__(self, idG: int, idH: int, nomG: str, descriptionG: str):
        self.__idG = idG
        self.__idH = idH
        self.__nomG = nomG
        self.__descriptionG = descriptionG
        
    def get_idG(self):
        return self.__idG
    
    def get_idHebergement(self):
        return self.__idH
    
    def get_nomG(self):
        return self.__nomG
    
    def get_descriptionG(self):
        return self.__descriptionG
    
    def to_dict(self):
        return {
            "idG": self.__idG,
            "idH": self.__idH,
            "nomG": self.__nomG,
            "descriptionG": self.__descriptionG
        }
    

class Membre_Groupe:
    def __init__(self, idMG: int, idG, nomMG: str, prenomMG: str, nomDeSceneMG: str):
        self.__idMG = idMG
        self.__idG = idG
        self.__nomMG = nomMG
        self.__prenomMG = prenomMG
        self.__nomDeSceneMG = nomDeSceneMG
        
    def get_idMG(self):
        return self.__idMG
    
    def get_idGroupe(self):
        return self.__idG
    
    def get_nomMG(self):
        return self.__nomMG
    
    def get_prenomMG(self):
        return self.__prenomMG
    
    def get_nomDeSceneMG(self):
        return self.__nomDeSceneMG
    
    def __repr__(self):
        return f"({self.__idMG}, {self.__idG}, {self.__nomMG}, {self.__prenomMG}, {self.__nomDeSceneMG})"
    
    def to_dict(self):
        return {
            "idMG": self.__idMG,
            "idG": self.__idG,
            "nomMG": self.__nomMG,
            "prenomMG": self.__prenomMG,
            "nomDeSceneMG": self.__nomDeSceneMG
        }
    
class Instrument:
    def __init__(self, idI: int, idMG: int, nomI: str):
        self.__idI = idI
        self.__idMG = idMG
        self.__nomI = nomI
        
    def get_idI(self):
        return self.__idI
    
    def get_idMembreGroupe(self):
        return self.__idMG
    
    def get_nomI(self):
        return self.__nomI
    
    
class Style_Musical:
    def __init__(self, idSt: int, nomSt: str):
        self.__idSt = idSt
        self.__nomSt = nomSt
        
    def get_idSt(self):
        return self.__idSt
    
    def get_nomSt(self):
        return self.__nomSt
    
class Lien_Video:
    def __init__(self, idLV: int, idG: int, video: str):
        self.__idLV = idLV
        self.__idG = idG
        self.__video = video
        
    def get_idLV(self):
        return self.__idLV
    
    def get_idGroupe(self):
        return self.__idG
    
    def get_video(self):
        return self.__video
    
class Lien_Reseaux_Sociaux:
    def __init__(self, idLRS: int, idG: int, reseau: str):
        self.__idLRS = idLRS
        self.__idG = idG
        self.__reseau = reseau
        
    def get_idLRS(self):
        return self.__idLRS
    
    def get_idGroupe(self):
        return self.__idG
    
    def get_reseau(self):
        return self.__reseau
    
    def to_dict(self):
        return {
            "idLRS": self.__idLRS,
            "idG": self.__idG,
            "reseau": self.__reseau
        }
    
class Photo:
    def __init__(self, idP: int, idG: int, photo: str):
        self.__idP = idP
        self.__idG = idG
        self.__photo = photo
        
    def get_idP(self):
        return self.__idP
    
    def get_idGroupe(self):
        return self.__idG
    
    def get_photo(self):
        return self.__photo
    
class Evenement:
    def __init__(self, idE: int, idG: int, nomE: str, heureDebutE: timedelta, heureFinE: timedelta, dateDebutE: str, dateFinE: str):
        self.__idE = idE
        self.__idG = idG
        self.__nomE = nomE
        self.__heureDebutE = self.timedelta_to_time(heureDebutE) if isinstance(heureDebutE, timedelta) else heureDebutE
        self.__heureFinE = self.timedelta_to_time(heureFinE) if isinstance(heureFinE, timedelta) else heureFinE
        self.__dateDebutE = dateDebutE if isinstance(dateDebutE, date) else datetime.strptime(dateDebutE, "%Y-%m-%d").date()
        self.__dateFinE = dateFinE if isinstance(dateFinE, date) else datetime.strptime(dateFinE, "%Y-%m-%d").date()

    @staticmethod
    def timedelta_to_time(td):
        return (datetime.min + td).time()
        
    def get_idE(self):
        return self.__idE
    
    def get_idG(self):
        return self.__idG
    
    def get_nomE(self):
        return self.__nomE
    
    def get_heureDebutE(self):
        return self.__heureDebutE
    
    def get_heureFinE(self):
        return self.__heureFinE
    
    def get_dateDebutE(self):
        return self.__dateDebutE
    
    def get_dateFinE(self):
        return self.__dateFinE
    
    def to_dict(self):
        return {
            "idE": self.__idE,
            "idG": self.__idG,
            "nomE": self.__nomE,
            "heureDebutE": self.__heureDebutE.strftime("%H:%M:%S") if self.__heureDebutE else None,
            "heureFinE": self.__heureFinE.strftime("%H:%M:%S") if self.__heureFinE else None,
            "dateDebutE": self.__dateDebutE.isoformat() if self.__dateDebutE else None,
            "dateFinE": self.__dateFinE.isoformat() if self.__dateFinE else None
        }
    
class Activites_Annexes:
    def __init__(self, idE: int, typeA: str, ouvertAuPublic: bool):
        self.__idE = idE
        self.__typeA = typeA
        self.__ouvertAuPublic = ouvertAuPublic
        
    def get_idEvenement(self):
        return self.__idE
    
    def get_typeA(self):
        return self.__typeA
    
    def get_ouvertAuPublic(self):
        return self.__ouvertAuPublic
    
class Concert:
    def __init__(self, idE: int, tempsMontage: str, tempsDemontage: str):
        self.__idE = idE
        self.__tempsMontage = tempsMontage if isinstance(tempsMontage, time) else datetime.strptime(tempsMontage, '%H:%M').time()
        self.__tempsDemontage = tempsDemontage if isinstance(tempsDemontage, time) else datetime.strptime(tempsDemontage, '%H:%M').time()
    
    def get_idEvenement(self):
        return self.__idE
    
    def get_tempsMontage(self):
        return self.__tempsMontage
    
    def get_tempsDemontage(self):
        return self.__tempsDemontage
