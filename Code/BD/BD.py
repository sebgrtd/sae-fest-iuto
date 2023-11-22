from datetime import datetime, date, time

class Festival:
    def __init__(self, idF: int, nomF: str, villeF: str, dateDebutF: str, dateFinF: str):
        self._idF = idF
        self._nomF = nomF
        self._villeF = villeF
        self._dateDebutF = dateDebutF if isinstance(dateDebutF, date) else datetime.strptime(dateDebutF, '%Y-%m-%d').date()
        self._dateFinF = dateFinF if isinstance(dateFinF, date) else datetime.strptime(dateFinF, '%Y-%m-%d').date()
        
    def get_idF(self):
        return self._idF

    def get_nomF(self):
        return self._nomF
    
    def get_villeF(self):
        return self._villeF
    
    def get_dateDebutF(self):
        return self._dateDebutF
    
    def get_dateFinF(self):
        return self._dateFinF
    
    def __repr__(self):
        return f"({self._idF}, {self._nomF}, {self._villeF}, {self._dateDebutF}, {self._dateFinF})"

    
class Type_Billet:
    def __init__(self, idType: int, duree: int):
        self._idType = idType
        self._duree = duree
    
    def get_idType(self):
        return self._idType
    
    def get_duree(self):
        return self._duree
    

class Spectateur:
    def __init__(self, idS: int, nomS: str, prenomS: str, adresseS: str, emailS: str, mdpS: str):
        self._idS = idS
        self._nomS = nomS
        self._prenomS = prenomS
        self._adresseS = adresseS
        self._emailS = emailS
        self._mdpS = mdpS
    
    def get_idS(self):
        return self._idS
    
    def get_nomS(self):
        return self._nomS
    
    def get_prenomS(self):
        return self._prenomS
    
    def get_adresseS(self):
        return self._adresseS
    
    def get_emailS(self):
        return self._emailS
    
    def get_mdpS(self):
        return self._mdpS
    

class Billet:
    def __init__(self, idB: int, idF: int, idType: int, idS: int, prix: int, dateAchat: str):
        self._idB = idB
        self._idF = idF
        self._idType = idType
        self._idS = idS
        self._prix = prix
        self._dateAchat = dateAchat if isinstance(dateAchat, date) else datetime.strptime(dateAchat, '%Y-%m-%d').date()
        
    def get_idB(self):
        return self._idB
    
    def get_idFestival(self):
        return self._idF
    
    def get_idType(self):
        return self._idType
    
    def get_idSpectateur(self):
        return self._idS
    
    def get_prix(self):
        return self._prix
    
    def get_dateAchat(self):
        return self._dateAchat
    
    
class Lieu:
    def __init__(self, idL: int, idF: int, nomL: str, adresseL: str, jaugeL: int):
        self._idL = idL
        self._idF = idF
        self._nomL = nomL
        self._adresseL = adresseL
        self._jaugeL = jaugeL
        
    def get_idL(self):
        return self._idL
    
    def get_idFestival(self):
        return self._idF
    
    def get_nomL(self):
        return self._nomL
    
    def get_adresseL(self):
        return self._adresseL
    
    def get_jaugeL(self):
        return self._jaugeL
    

class Hebergement:
    def __init__(self, idH: int, nomH: str, limitePlacesH: int, adresseH: int):
        self._idH = idH
        self._nomH = nomH
        self._limitePlacesH = limitePlacesH
        self._adresseH = adresseH
        
    def get_idH(self):
        return self._idH
    
    def get_nomH(self):
        return self._nomH
    
    def get_limitePlacesH(self):
        return self._limitePlacesH
    
    def get_adresseH(self):
        return self._adresseH
    
    
class Programmer:
    def __init__(self, idF: int, idL: int, idH: int, dateArrivee: str, heureArrivee: str, dateDepart: str, heureDepart: str):
        self._idF = idF
        self._idL = idL
        self._idH = idH
        self._dateArrivee = dateArrivee if isinstance(dateArrivee, date) else datetime.strptime(dateArrivee, '%Y-%m-%d').date()
        self._heureArrivee = heureArrivee if isinstance(heureArrivee, time) else datetime.strptime(heureArrivee, '%H:%M').time()
        self._dateDepart = dateDepart if isinstance(dateDepart, date) else datetime.strptime(dateDepart, '%Y-%m-%d').date()
        self._heureDepart = heureDepart if isinstance(heureDepart, time) else datetime.strptime(heureDepart, '%H:%M').time()
        
    def get_idFestival(self):
        return self._idF
    
    def get_idLieu(self):
        return self._idL
    
    def get_idHebergement(self):
        return self._idH
    
    def get_dateArrivee(self):
        return self._dateArrivee
    
    def get_heureArrivee(self):
        return self._heureArrivee
    
    def get_dateDepart(self):
        return self._dateDepart
    
    def get_heureDepart(self):
        return self._heureDepart
    

class Groupe:
    def __init__(self, idG: int, idH: int, nomG: str, descriptionG: str):
        self._idG = idG
        self._idH = idH
        self._nomG = nomG
        self._descriptionG = descriptionG
        
    def get_idG(self):
        return self._idG
    
    def get_idHebergement(self):
        return self._idH
    
    def get_nomG(self):
        return self._nomG
    
    def get_descriptionG(self):
        return self._descriptionG
    

class Membre_Groupe:
    def __init__(self, idMG: int, idG, nomMG: str, prenomMG: str):
        self._idMG = idMG
        self._idG = idG
        self._nomMG = nomMG
        self._prenomMG = prenomMG
        
    def get_idMG(self):
        return self._idMG
    
    def get_idGroupe(self):
        return self._idG
    
    def get_nomMG(self):
        return self._nomMG
    
    def get_prenomMG(self):
        return self._prenomMG
    
    def __repr__(self):
        return f"({self._idMG}, {self._idG}, {self._nomMG}, {self._prenomMG})"
    
    def to_dict(self):
        return {
            "idMG": self._idMG,
            "idG": self._idG,
            "nomMG": self._nomMG,
            "prenomMG": self._prenomMG
        }
    
class Instrument:
    def __init__(self, idI: int, idMG: int, nomI: str):
        self._idI = idI
        self._idMG = idMG
        self._nomI = nomI
        
    def get_idI(self):
        return self._idI
    
    def get_idMembreGroupe(self):
        return self._idMG
    
    def get_nomI(self):
        return self._nomI
    
    
class Style_Musical:
    def __init__(self, idSt: int, nomSt: str):
        self._idSt = idSt
        self._nomSt = nomSt
        
    def get_idSt(self):
        return self._idSt
    
    def get_nomSt(self):
        return self._nomSt
    
class Lien_Video:
    def __init__(self, idLV: int, idG: int, video: str):
        self._idLV = idLV
        self._idG = idG
        self._video = video
        
    def get_idLV(self):
        return self._idLV
    
    def get_idGroupe(self):
        return self._idG
    
    def get_video(self):
        return self._video
    
class Lien_Reseaux_Sociaux:
    def __init__(self, idLRS: int, idG: int, reseau: str):
        self._idLRS = idLRS
        self._idG = idG
        self._reseau = reseau
        
    def get_idLRS(self):
        return self._idLRS
    
    def get_idGroupe(self):
        return self._idG
    
    def get_reseau(self):
        return self._reseau
    
class Photo:
    def __init__(self, idP: int, idG: int, photo: str):
        self._idP = idP
        self._idG = idG
        self._photo = photo
        
    def get_idP(self):
        return self._idP
    
    def get_idGroupe(self):
        return self._idG
    
    def get_photo(self):
        return self._photo
    
class Evenement:
    def __init__(self, idE: int, nomE: str, heureDebutE: str, heureFinE: str):
        self._idE = idE
        self._nomE = nomE
        self._heureDebutE = heureDebutE if isinstance(heureDebutE, time) else datetime.strptime(heureDebutE, '%H:%M').time()
        self._heureFinE = heureFinE if isinstance(heureFinE, time) else datetime.strptime(heureFinE, '%H:%M').time()
        
    def get_idE(self):
        return self._idE
    
    def get_nomE(self):
        return self._nomE
    
    def get_heureDebutE(self):
        return self._heureDebutE
    
    def get_heureFinE(self):
        return self._heureFinE
    
class Activites_Annexes:
    def __init__(self, idE: int, typeA: str, ouvertAuPublic: bool):
        self._idE = idE
        self._typeA = typeA
        self._ouvertAuPublic = ouvertAuPublic
        
    def get_idEvenement(self):
        return self._idE
    
    def get_typeA(self):
        return self._typeA
    
    def get_ouvertAuPublic(self):
        return self._ouvertAuPublic
    
class Concert:
    def __init__(self, idE: int, tempsMontage: str, tempsDemontage: str):
        self._idE = idE
        self._tempsMontage = tempsMontage if isinstance(tempsMontage, time) else datetime.strptime(tempsMontage, '%H:%M').time()
        self._tempsDemontage = tempsDemontage if isinstance(tempsDemontage, time) else datetime.strptime(tempsDemontage, '%H:%M').time()
    
    def get_idEvenement(self):
        return self._idE
    
    def get_tempsMontage(self):
        return self._tempsMontage
    
    def get_tempsDemontage(self):
        return self._tempsDemontage
