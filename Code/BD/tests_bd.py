from BD import *
from FestivalBD import *
from Type_BilletBD import *
from SpectateurBD import *
from BilletBD import *
from LieuBD import *
from HebergementBD import *

# classe Festival

festival1 = Festival(1, "Festival de musique", "Amilly", "2021-06-01", "2021-06-30")
festival2 = Festival(2, "Festival de danse", "Paris", "2021-07-01", "2021-07-31")

def test_get_idF():
    assert festival1.get_idF() == 1
    
def test_get_nomF():
    assert festival1.get_nomF() == "Festival de musique"
    
def test_get_villeF():
    assert festival1.get_villeF() == "Amilly"
    
def test_get_dateDebutF():
    assert festival1.get_dateDebutF() == datetime.strptime('2021-06-01', '%Y-%m-%d').date()
    
def test_get_dateFinF():
    assert festival1.get_dateFinF() == datetime.strptime('2021-06-30', '%Y-%m-%d').date()
    
def test_idF2():
    assert festival2.get_idF() == 2
    
def test_nomF2():
    assert festival2.get_nomF() == "Festival de danse"
    
def test_villeF2():
    assert festival2.get_villeF() == "Paris"
    
def test_dateDebutF2():
    assert festival2.get_dateDebutF() == datetime.strptime("2021-07-01", '%Y-%m-%d').date()
    
def test_dateFinF2():
    assert festival2.get_dateFinF() == datetime.strptime("2021-07-31", '%Y-%m-%d').date()
    
def test_dateDebutF_avant_dateFinF():
    assert festival1.get_dateDebutF() < festival1.get_dateFinF()
    
def test_dateDebutF2_avant_dateFinF2():
    assert not festival2.get_dateDebutF() > festival2.get_dateFinF()
    
def test_type_idF():
    assert isinstance(festival1.get_idF(), int)
    
def test_type_nomF():
    assert isinstance(festival1.get_nomF(), str)
    
def test_type_villeF():
    assert isinstance(festival1.get_villeF(), str)
    
def test_type_dateDebutF():
    assert isinstance(festival1.get_dateDebutF(), date)
    
def test_type_dateFinF():
    assert isinstance(festival1.get_dateFinF(), date)
    
def test_type_idF2():
    assert isinstance(festival2.get_idF(), int)
    
def test_type_nomF2():
    assert isinstance(festival2.get_nomF(), str)
    
def test_type_villeF2():
    assert isinstance(festival2.get_villeF(), str)
    
def test_type_dateDebutF2():
    assert isinstance(festival2.get_dateDebutF(), date)
    
def test_type_dateFinF2():
    assert isinstance(festival2.get_dateFinF(), date)

# classe Type_Billet

type_billet1 = Type_Billet(1, 1)
type_billet2 = Type_Billet(2, 2)

def test_get_idType():
    assert type_billet1.get_idType() == 1
    
def test_get_duree():
    assert type_billet1.get_duree() == 1
    
def test_idType2():
    assert type_billet2.get_idType() == 2
    
def test_duree2():
    assert type_billet2.get_duree() == 2
    
def test_duree_sup_0():
    assert type_billet1.get_duree() > 0
    
def test_duree2_sup_0():
    assert type_billet2.get_duree() > 0
    
def test_type_idType():
    assert isinstance(type_billet1.get_idType(), int)
    
def test_type_duree():
    assert isinstance(type_billet1.get_duree(), int)
    
def test_type_idType2():
    assert isinstance(type_billet2.get_idType(), int)
    
def test_type_duree2():
    assert isinstance(type_billet2.get_duree(), int)
    
# classe Spectateur

spectateur1 = Spectateur(1, "Dupont", "Jean", "1 rue de la Paix, Olivet 45160", "jeandupont@gmail.com", "1234")
spectateur2 = Spectateur(2, "Martin", "Pierre", "2 rue de la Joie, Orléans 45000", "pierre.martin@gmail.com", "5678")

def test_get_idS():
    assert spectateur1.get_idS() == 1

def test_get_nomS():
    assert spectateur1.get_nomS() == "Dupont"
    
def test_get_prenomS():
    assert spectateur1.get_prenomS() == "Jean"
    
def test_get_adresseS():
    assert spectateur1.get_adresseS() == "1 rue de la Paix, Olivet 45160"
    
def test_get_emailS():
    assert spectateur1.get_emailS() == "jeandupont@gmail.com"
    
def test_get_mdpS():
    assert spectateur1.get_mdpS() == "1234"
    
def test_idS2():
    assert spectateur2.get_idS() == 2
    
def test_nomS2():
    assert spectateur2.get_nomS() == "Martin"
    
def test_prenomS2():
    assert spectateur2.get_prenomS() == "Pierre"
    
def test_adresseS2():
    assert spectateur2.get_adresseS() == "2 rue de la Joie, Orléans 45000"
    
def test_emailS2():
    assert spectateur2.get_emailS() == "pierre.martin@gmail.com"
    
def test_mdpS2():
    assert spectateur2.get_mdpS() == "5678"
    
def test_type_idS():
    assert isinstance(spectateur1.get_idS(), int)
    
def test_type_nomS():
    assert isinstance(spectateur1.get_nomS(), str)
    
def test_type_prenomS():
    assert isinstance(spectateur1.get_prenomS(), str)
    
def test_type_adresseS():
    assert isinstance(spectateur1.get_adresseS(), str)
    
def test_type_emailS():
    assert isinstance(spectateur1.get_emailS(), str)
    
def test_type_mdpS():
    assert isinstance(spectateur1.get_mdpS(), str)
    
def test_type_idS2():
    assert isinstance(spectateur2.get_idS(), int)
    
def test_type_nomS2():
    assert isinstance(spectateur2.get_nomS(), str)
    
def test_type_prenomS2():
    assert isinstance(spectateur2.get_prenomS(), str)
    
def test_type_adresseS2():
    assert isinstance(spectateur2.get_adresseS(), str)
    
def test_type_emailS2():
    assert isinstance(spectateur2.get_emailS(), str)
    
def test_type_mdpS2():
    assert isinstance(spectateur2.get_mdpS(), str)
    
    
# classe Billet

billet1 = Billet(1, festival1, type_billet1, spectateur1, 10, "2021-05-01")
billet2 = Billet(2, festival2, type_billet2, spectateur2, 20, "2021-05-02")

def test_get_idB():
    assert billet1.get_idB() == 1
    
def test_get_idFestival():
    assert billet1.get_idFestival() == festival1.get_idF()
    
def test_get_idType():
    assert billet1.get_idType() == type_billet1.get_idType()
    
def test_get_idSpectateur():
    assert billet1.get_idSpectateur() == spectateur1.get_idS()
    
def test_get_prix():
    assert billet1.get_prix() == 10
    
def test_get_dateAchat():
    assert billet1.get_dateAchat() == datetime.strptime("2021-05-01", '%Y-%m-%d').date()
    
def test_idB2():
    assert billet2.get_idB() == 2
    
def test_idFestival2():
    assert billet2.get_idFestival() == festival2.get_idF()
    
def test_idType2():
    assert billet2.get_idType() == type_billet2.get_idType()
    
def test_idSpectateur2():
    assert billet2.get_idSpectateur() == spectateur2.get_idS()
    
def test_prix2():
    assert billet2.get_prix() == 20
    
def test_dateAchat2():
    assert billet2.get_dateAchat() == datetime.strptime("2021-05-02", '%Y-%m-%d').date()
    
def test_prix_sup_0():
    assert billet1.get_prix() > 0
    
def test_prix2_sup_0():
    assert billet2.get_prix() > 0
    
def test_dateAchat_avant_dateFinF():
    assert billet1.get_dateAchat() < festival1.get_dateFinF()
    
def test_dateAchat2_avant_dateFinF2():
    assert billet2.get_dateAchat() < festival2.get_dateFinF()
    
def test_type_idB():
    assert isinstance(billet1.get_idB(), int)
    
def test_type_idFestival():
    assert isinstance(billet1.get_idFestival(), int)
    
def test_type_idType():
    assert isinstance(billet1.get_idType(), int)
    
def test_type_idSpectateur():
    assert isinstance(billet1.get_idSpectateur(), int)
    
def test_type_prix():
    assert isinstance(billet1.get_prix(), int)
    
def test_type_dateAchat():
    assert isinstance(billet1.get_dateAchat(), date)
    
def test_type_idB2():
    assert isinstance(billet2.get_idB(), int)
    
def test_type_idFestival2():
    assert isinstance(billet2.get_idFestival(), int)
    
def test_type_idType2():
    assert isinstance(billet2.get_idType(), int)
    
def test_type_idSpectateur2():
    assert isinstance(billet2.get_idSpectateur(), int)
    
def test_type_prix2():
    assert isinstance(billet2.get_prix(), int)
    
def test_type_dateAchat2():
    assert isinstance(billet2.get_dateAchat(), date)
    
# classe Lieu

lieu1 = Lieu(1, festival1, "lieu1", "adresse1", 1000)
lieu2 = Lieu(2, festival2, "lieu2", "adresse2", 2000)

def test_get_idL():
    assert lieu1.get_idL() == 1

def test_get_idFestival():
    assert lieu1.get_idFestival() == festival1.get_idF()
    
def test_get_nomL():
    assert lieu1.get_nomL() == "lieu1"
    
def test_get_adresseL():
    assert lieu1.get_adresseL() == "adresse1"
    
def test_get_jaugeL():
    assert lieu1.get_jaugeL() == 1000
    
def test_idL2():
    assert lieu2.get_idL() == 2
    
def test_idFestival2():
    assert lieu2.get_idFestival() == festival2.get_idF()
    
def test_nomL2():
    assert lieu2.get_nomL() == "lieu2"
    
def test_adresseL2():
    assert lieu2.get_adresseL() == "adresse2"
    
def test_jaugeL2():
    assert lieu2.get_jaugeL() == 2000
    
def test_jaugeL_sup_0():
    assert lieu1.get_jaugeL() > 0
    
def test_jaugeL2_sup_0():
    assert lieu2.get_jaugeL() > 0
    
def test_type_idL():
    assert isinstance(lieu1.get_idL(), int)
    
def test_type_idFestival():
    assert isinstance(lieu1.get_idFestival(), int)
    
def test_type_nomL():
    assert isinstance(lieu1.get_nomL(), str)
    
def test_type_adresseL():
    assert isinstance(lieu1.get_adresseL(), str)
    
def test_type_jaugeL():
    assert isinstance(lieu1.get_jaugeL(), int)
    
def test_type_idL2():
    assert isinstance(lieu2.get_idL(), int)
    
def test_type_idFestival2():
    assert isinstance(lieu2.get_idFestival(), int)
    
def test_type_nomL2():
    assert isinstance(lieu2.get_nomL(), str)
    
def test_type_adresseL2():
    assert isinstance(lieu2.get_adresseL(), str)
    
def test_type_jaugeL2():
    assert isinstance(lieu2.get_jaugeL(), int)
    
# classe Hebergement

hebergement1 = Hebergement(1, "hebergement1", 100, "adresse1")
hebergement2 = Hebergement(2, "hebergement2", 200, "adresse2")

def test_get_idH():
    assert hebergement1.get_idH() == 1
    
def test_get_nomH():
    assert hebergement1.get_nomH() == "hebergement1"
    
def test_get_limitePlacesH():
    assert hebergement1.get_limitePlacesH() == 100
    
def test_get_adresseH():
    assert hebergement1.get_adresseH() == "adresse1"
    
def test_idH2():
    assert hebergement2.get_idH() == 2
    
def test_nomH2():
    assert hebergement2.get_nomH() == "hebergement2"
    
def test_limitePlacesH2():
    assert hebergement2.get_limitePlacesH() == 200
    
def test_adresseH2():
    assert hebergement2.get_adresseH() == "adresse2"
    
def test_limitePlacesH_sup_0():
    assert hebergement1.get_limitePlacesH() > 0
    
def test_limitePlacesH2_sup_0():
    assert hebergement2.get_limitePlacesH() > 0
    
def test_type_idH():
    assert isinstance(hebergement1.get_idH(), int)
    
def test_type_nomH():
    assert isinstance(hebergement1.get_nomH(), str)
    
def test_type_limitePlacesH():
    assert isinstance(hebergement1.get_limitePlacesH(), int)
    
def test_type_adresseH():
    assert isinstance(hebergement1.get_adresseH(), str)
    
def test_type_idH2():
    assert isinstance(hebergement2.get_idH(), int)
    
def test_type_nomH2():
    assert isinstance(hebergement2.get_nomH(), str)
    
def test_type_limitePlacesH2():
    assert isinstance(hebergement2.get_limitePlacesH(), int)
    
def test_type_adresseH2():
    assert isinstance(hebergement2.get_adresseH(), str)
    
# classe Programmer

programmer1 = Programmer(festival1, lieu1, hebergement1, "2021-05-01", "10:00", "2021-05-02", "10:00")
programmer2 = Programmer(festival2, lieu2, hebergement2, "2021-05-02", "10:00", "2021-05-03", "10:00")

def test_get_idFestival():
    assert programmer1.get_idFestival() == festival1.get_idF()
    
def test_get_idLieu():
    assert programmer1.get_idLieu() == lieu1.get_idL()
    
def test_get_idHebergement():
    assert programmer1.get_idHebergement() == hebergement1.get_idH()
    
def test_get_dateArrivee():
    assert programmer1.get_dateArrivee() == datetime.strptime("2021-05-01", '%Y-%m-%d').date()
    
def test_get_heureArrivee():
    assert programmer1.get_heureArrivee() == datetime.strptime("10:00", '%H:%M').time()
    
def test_get_dateDepart():
    assert programmer1.get_dateDepart() == datetime.strptime("2021-05-02", '%Y-%m-%d').date() 
    
def test_get_heureDepart():
    assert programmer1.get_heureDepart() == datetime.strptime("10:00", '%H:%M').time()
    
def test_idFestival2():
    assert programmer2.get_idFestival() == festival2.get_idF()
    
def test_idLieu2():
    assert programmer2.get_idLieu() == lieu2.get_idL()
    
def test_idHebergement2():
    assert programmer2.get_idHebergement() == hebergement2.get_idH()
    
def test_dateArrivee2():
    assert programmer2.get_dateArrivee() == datetime.strptime("2021-05-02", '%Y-%m-%d').date()
    
def test_heureArrivee2():
    assert programmer2.get_heureArrivee() == datetime.strptime("10:00", '%H:%M').time()
    
def test_dateDepart2():
    assert programmer2.get_dateDepart() == datetime.strptime("2021-05-03", '%Y-%m-%d').date()
    
def test_heureDepart2():
    assert programmer2.get_heureDepart() == datetime.strptime("10:00", '%H:%M').time()
    
def test_dateArrivee_avant_dateDepart():
    assert programmer1.get_dateArrivee() < programmer1.get_dateDepart()
    
def test_dateArrivee2_avant_dateDepart2():
    assert programmer2.get_dateArrivee() < programmer2.get_dateDepart()
    
def test_type_idFestival():
    assert isinstance(programmer1.get_idFestival(), int)
    
def test_type_idLieu():
    assert isinstance(programmer1.get_idLieu(), int)
    
def test_type_idHebergement():
    assert isinstance(programmer1.get_idHebergement(), int)
    
def test_type_dateArrivee():
    assert isinstance(programmer1.get_dateArrivee(), date)
    
def test_type_heureArrivee():
    assert isinstance(programmer1.get_heureArrivee(), time)
    
def test_type_dateDepart():
    assert isinstance(programmer1.get_dateDepart(), date)
    
def test_type_heureDepart():
    assert isinstance(programmer1.get_heureDepart(), time)
    
def test_type_idFestival2():
    assert isinstance(programmer2.get_idFestival(), int)
    
def test_type_idLieu2():
    assert isinstance(programmer2.get_idLieu(), int)
    
def test_type_idHebergement2():
    assert isinstance(programmer2.get_idHebergement(), int)
    
def test_type_dateArrivee2():
    assert isinstance(programmer2.get_dateArrivee(), date)
    
def test_type_heureArrivee2():
    assert isinstance(programmer2.get_heureArrivee(), time)
    
def test_type_dateDepart2():
    assert isinstance(programmer2.get_dateDepart(), date)
    
def test_type_heureDepart2():
    assert isinstance(programmer2.get_heureDepart(), time)
    
# classe Groupe

groupe1 = Groupe(1, hebergement1, "IAM")
groupe2 = Groupe(2, hebergement2, "NWA")

def test_get_idG():
    assert groupe1.get_idG() == 1
    
def test_get_idHebergement():
    assert groupe1.get_idHebergement() == hebergement1.get_idH()
    
def test_get_nomG():
    assert groupe1.get_nomG() == "IAM"
    
def test_idG2():
    assert groupe2.get_idG() == 2
    
def test_idHebergement2():
    assert groupe2.get_idHebergement() == hebergement2.get_idH()
    
def test_nomG2():
    assert groupe2.get_nomG() == "NWA"
    
def test_type_idG():
    assert isinstance(groupe1.get_idG(), int)
    
def test_type_idHebergement():
    assert isinstance(groupe1.get_idHebergement(), int)
    
def test_type_nomG():
    assert isinstance(groupe1.get_nomG(), str)
    
def test_type_idG2():
    assert isinstance(groupe2.get_idG(), int)
    
def test_type_idHebergement2():
    assert isinstance(groupe2.get_idHebergement(), int)
    
def test_type_nomG2():
    assert isinstance(groupe2.get_nomG(), str)
    
# classe Membre_Groupe

membre_groupe1 = Membre_Groupe(1, groupe1, "Dupont", "Jean")
membre_groupe2 = Membre_Groupe(2, groupe2, "Martin", "Pierre")

def test_get_idMG():
    assert membre_groupe1.get_idMG() == 1
    
def test_get_idGroupe():
    assert membre_groupe1.get_idGroupe() == groupe1.get_idG()
    
def test_get_nomMG():
    assert membre_groupe1.get_nomMG() == "Dupont"
    
def test_get_prenomMG():
    assert membre_groupe1.get_prenomMG() == "Jean"
    
def test_idMG2():
    assert membre_groupe2.get_idMG() == 2
    
def test_idGroupe2():
    assert membre_groupe2.get_idGroupe() == groupe2.get_idG()
    
def test_nomMG2():
    assert membre_groupe2.get_nomMG() == "Martin"
    
def test_prenomMG2():
    assert membre_groupe2.get_prenomMG() == "Pierre"
    
def test_type_idMG():
    assert isinstance(membre_groupe1.get_idMG(), int)
    
def test_type_idGroupe():
    assert isinstance(membre_groupe1.get_idGroupe(), int)
    
def test_type_nomMG():
    assert isinstance(membre_groupe1.get_nomMG(), str)
    
def test_type_prenomMG():
    assert isinstance(membre_groupe1.get_prenomMG(), str)
    
def test_type_idMG2():
    assert isinstance(membre_groupe2.get_idMG(), int)
    
def test_type_idGroupe2():
    assert isinstance(membre_groupe2.get_idGroupe(), int)
    
def test_type_nomMG2():
    assert isinstance(membre_groupe2.get_nomMG(), str)
    
def test_type_prenomMG2():
    assert isinstance(membre_groupe2.get_prenomMG(), str)
    
# classe Instrument

instrument1 = Instrument(1, membre_groupe1, "guitare")
instrument2 = Instrument(2, membre_groupe2, "batterie")

def test_get_idI():
    assert instrument1.get_idI() == 1
    
def test_get_idMembreGroupe():
    assert instrument1.get_idMembreGroupe() == membre_groupe1.get_idMG()
    
def test_get_nomI():
    assert instrument1.get_nomI() == "guitare"
    
def test_idI2():
    assert instrument2.get_idI() == 2
    
def test_idMembreGroupe2():
    assert instrument2.get_idMembreGroupe() == membre_groupe2.get_idMG()
    
def test_nomI2():
    assert instrument2.get_nomI() == "batterie"
    
def test_type_idI():
    assert isinstance(instrument1.get_idI(), int)
    
def test_type_idMembreGroupe():
    assert isinstance(instrument1.get_idMembreGroupe(), int)
    
def test_type_nomI():
    assert isinstance(instrument1.get_nomI(), str)
    
def test_type_idI2():
    assert isinstance(instrument2.get_idI(), int)
    
def test_type_idMembreGroupe2():
    assert isinstance(instrument2.get_idMembreGroupe(), int)
    
def test_type_nomI2():
    assert isinstance(instrument2.get_nomI(), str)
    
# classe Style_Musical

style_musical1 = Style_Musical(1, "rock")
style_musical2 = Style_Musical(2, "rap")

def test_get_idSt():
    assert style_musical1.get_idSt() == 1
    
def test_get_nomSt():
    assert style_musical1.get_nomSt() == "rock"
    
def test_idSt2():
    assert style_musical2.get_idSt() == 2
    
def test_nomSt2():
    assert style_musical2.get_nomSt() == "rap"

def test_type_idSt():
    assert isinstance(style_musical1.get_idSt(), int)
    
def test_type_nomSt():
    assert isinstance(style_musical1.get_nomSt(), str)
    
def test_type_idSt2():
    assert isinstance(style_musical2.get_idSt(), int)
    
def test_type_nomSt2():
    assert isinstance(style_musical2.get_nomSt(), str)
    
# classe Lien_Video

lien_video1 = Lien_Video(1, groupe1, "lien1")
lien_video2 = Lien_Video(2, groupe2, "lien2")

def test_get_idLV():
    assert lien_video1.get_idLV() == 1
    
def test_get_idGroupe():
    assert lien_video1.get_idGroupe() == groupe1.get_idG()
    
def test_get_video():
    assert lien_video1.get_video() == "lien1"
    
def test_idLV2():
    assert lien_video2.get_idLV() == 2
    
def test_idGroupe2():
    assert lien_video2.get_idGroupe() == groupe2.get_idG()
    
def test_video2():
    assert lien_video2.get_video() == "lien2"
    
def test_type_idLV():
    assert isinstance(lien_video1.get_idLV(), int)
    
def test_type_idGroupe():
    assert isinstance(lien_video1.get_idGroupe(), int)
    
def test_type_video():
    assert isinstance(lien_video1.get_video(), str)
    
def test_type_idLV2():
    assert isinstance(lien_video2.get_idLV(), int)
    
def test_type_idGroupe2():
    assert isinstance(lien_video2.get_idGroupe(), int)
    
def test_type_video2():
    assert isinstance(lien_video2.get_video(), str)
    
# classe Lien_Reseaux_Sociaux

lien_reseaux_sociaux1 = Lien_Reseaux_Sociaux(1, groupe1, "lien1")
lien_reseaux_sociaux2 = Lien_Reseaux_Sociaux(2, groupe2, "lien2")

def test_get_idLRS():
    assert lien_reseaux_sociaux1.get_idLRS() == 1
    
def test_get_idGroupe():
    assert lien_reseaux_sociaux1.get_idGroupe() == groupe1.get_idG()
    
def test_get_reseau():
    assert lien_reseaux_sociaux1.get_reseau() == "lien1"
    
def test_idLRS2():
    assert lien_reseaux_sociaux2.get_idLRS() == 2
    
def test_idGroupe2():
    assert lien_reseaux_sociaux2.get_idGroupe() == groupe2.get_idG()
    
def test_reseau2():
    assert lien_reseaux_sociaux2.get_reseau() == "lien2"
    
def test_type_idLRS():
    assert isinstance(lien_reseaux_sociaux1.get_idLRS(), int)
    
def test_type_idGroupe():
    assert isinstance(lien_reseaux_sociaux1.get_idGroupe(), int)
    
def test_type_reseau():
    assert isinstance(lien_reseaux_sociaux1.get_reseau(), str)
    
def test_type_idLRS2():
    assert isinstance(lien_reseaux_sociaux2.get_idLRS(), int)
    
def test_type_idGroupe2():
    assert isinstance(lien_reseaux_sociaux2.get_idGroupe(), int)
    
def test_type_reseau2():
    assert isinstance(lien_reseaux_sociaux2.get_reseau(), str)
    
# classe Photo

photo1 = Photo(1, groupe1, "photo1")
photo2 = Photo(2, groupe2, "photo2")

def test_get_idP():
    assert photo1.get_idP() == 1
    
def test_get_idGroupe():
    assert photo1.get_idGroupe() == groupe1.get_idG()
    
def test_get_photo():
    assert photo1.get_photo() == "photo1"
    
def test_idP2():
    assert photo2.get_idP() == 2
    
def test_idGroupe2():
    assert photo2.get_idGroupe() == groupe2.get_idG()
    
def test_photo2():
    assert photo2.get_photo() == "photo2"
    
def test_type_idP():
    assert isinstance(photo1.get_idP(), int)
    
def test_type_idGroupe():
    assert isinstance(photo1.get_idGroupe(), int)
    
def test_type_photo():
    assert isinstance(photo1.get_photo(), str)
    
def test_type_idP2():
    assert isinstance(photo2.get_idP(), int)
    
def test_type_idGroupe2():
    assert isinstance(photo2.get_idGroupe(), int)
    
def test_type_photo2():
    assert isinstance(photo2.get_photo(), str)
    
# classe Evenement

evenement1 = Evenement(1, "evenement1", "10:00", "20:00")
evenement2 = Evenement(2, "evenement2", "15:00", "23:00")

def test_get_idE():
    assert evenement1.get_idE() == 1
    
def test_get_nomE():
    assert evenement1.get_nomE() == "evenement1"
    
def test_get_heureDebutE():
    assert evenement1.get_heureDebutE() == datetime.strptime("10:00", '%H:%M').time()
    
def test_get_heureFinE():
    assert evenement1.get_heureFinE() == datetime.strptime("20:00", '%H:%M').time()
    
def test_idE2():
    assert evenement2.get_idE() == 2
    
def test_nomE2():
    assert evenement2.get_nomE() == "evenement2"
    
def test_heureDebutE2():
    assert evenement2.get_heureDebutE() == datetime.strptime("15:00", '%H:%M').time()
    
def test_heureFinE2():
    assert evenement2.get_heureFinE() == datetime.strptime("23:00", '%H:%M').time()
    
def test_heureDebutE_avant_heureFinE():
    assert evenement1.get_heureDebutE() < evenement1.get_heureFinE()
    
def test_heureDebutE2_avant_heureFinE2():
    assert evenement2.get_heureDebutE() < evenement2.get_heureFinE()
    
def test_type_idE():
    assert isinstance(evenement1.get_idE(), int)
    
def test_type_nomE():
    assert isinstance(evenement1.get_nomE(), str)
    
def test_type_heureDebutE():
    assert isinstance(evenement1.get_heureDebutE(), time)
    
def test_type_heureFinE():
    assert isinstance(evenement1.get_heureFinE(), time)
    
def test_type_idE2():
    assert isinstance(evenement2.get_idE(), int)
    
def test_type_nomE2():
    assert isinstance(evenement2.get_nomE(), str)
    
def test_type_heureDebutE2():
    assert isinstance(evenement2.get_heureDebutE(), time)
    
def test_type_heureFinE2():
    assert isinstance(evenement2.get_heureFinE(), time)
    
# classe Activites_Annexes

activites_annexes1 = Activites_Annexes(evenement1, "activites_annexes1", True)
activites_annexes2 = Activites_Annexes(evenement2, "activites_annexes2", False)

def test_get_idEvenement():
    assert activites_annexes1.get_idEvenement() == evenement1.get_idE()
    
def test_get_typeA():
    assert activites_annexes1.get_typeA() == "activites_annexes1"
    
def test_get_ouvertAuPublic():
    assert activites_annexes1.get_ouvertAuPublic() == True
    
def test_idEvenement2():
    assert activites_annexes2.get_idEvenement() == evenement2.get_idE()
    
def test_typeA2():
    assert activites_annexes2.get_typeA() == "activites_annexes2"
    
def test_ouvertAuPublic2():
    assert activites_annexes2.get_ouvertAuPublic() == False
    
def test_type_idEvenement():
    assert isinstance(activites_annexes1.get_idEvenement(), int)
    
def test_type_typeA():
    assert isinstance(activites_annexes1.get_typeA(), str)
    
def test_type_ouvertAuPublic():
    assert isinstance(activites_annexes1.get_ouvertAuPublic(), bool)
    
def test_type_idEvenement2():
    assert isinstance(activites_annexes2.get_idEvenement(), int)
    
def test_type_typeA2():
    assert isinstance(activites_annexes2.get_typeA(), str)
    
def test_type_ouvertAuPublic2():
    assert isinstance(activites_annexes2.get_ouvertAuPublic(), bool)
    
# classe Concert

concert1 = Concert(evenement1, "1:00", "2:00")
concert2 = Concert(evenement2, "2:00", "3:00")

def test_get_idEvenement():
    assert concert1.get_idEvenement() == evenement1.get_idE()
    
def test_get_tempsMontage():
    assert concert1.get_tempsMontage() == datetime.strptime("1:00", '%H:%M').time()
    
def test_get_tempsDemontage():
    assert concert1.get_tempsDemontage() == datetime.strptime("2:00", '%H:%M').time()
    
def test_idEvenement2():
    assert concert2.get_idEvenement() == evenement2.get_idE()
    
def test_tempsMontage2():
    assert concert2.get_tempsMontage() == datetime.strptime("2:00", '%H:%M').time()
    
def test_tempsDemontage2():
    assert concert2.get_tempsDemontage() == datetime.strptime("3:00", '%H:%M').time()
    
def test_tempsMontage_avant_tempsDemontage():
    assert concert1.get_tempsMontage() < concert1.get_tempsDemontage()
    
def test_tempsMontage2_avant_tempsDemontage2():
    assert concert2.get_tempsMontage() < concert2.get_tempsDemontage()
    
def test_type_idEvenement():
    assert isinstance(concert1.get_idEvenement(), int)
    
def test_type_tempsMontage():
    assert isinstance(concert1.get_tempsMontage(), time)
    
def test_type_tempsDemontage():
    assert isinstance(concert1.get_tempsDemontage(), time)
    
def test_type_idEvenement2():
    assert isinstance(concert2.get_idEvenement(), int)
    
def test_type_tempsMontage2():
    assert isinstance(concert2.get_tempsMontage(), time)
    
def test_type_tempsDemontage2():
    assert isinstance(concert2.get_tempsDemontage(), time)

# classe FestivalBD

festival_1 = Festival(1, 'Festival 1', 'Ville 1', '2023-08-01', '2023-08-05')

festival_2 = Festival(2, 'Festival 2', 'Ville 2', '2023-07-15', '2023-07-20')

festival_3 = Festival(3, 'Festival 3', 'Ville 3', '2023-08-01', '2023-08-03')

connexion_bd = ConnexionBD()
festival_bd = FestivalBD(connexion_bd)

def test_get_all_festivals():
    festivals = festival_bd.get_all_festivals()
    festivals_de_bd = [(f.get_idF(), f.get_nomF(), f.get_villeF(), f.get_dateDebutF(), f.get_dateFinF()) for f in festivals]
    festivals_python = [f for f in festivals_de_bd]
    assert festivals_de_bd == festivals_python
    
def test_get_festival_by_id():
    festival = festival_bd.get_festival_by_id(1)
    assert festival.get_idF() == festival_1.get_idF()
    assert festival.get_nomF() == festival_1.get_nomF()
    assert festival.get_villeF() == festival_1.get_villeF()
    assert festival.get_dateDebutF() == festival_1.get_dateDebutF()
    assert festival.get_dateFinF() == festival_1.get_dateFinF()
    
def test_get_festival_by_nom():
    festival = festival_bd.get_festival_by_nom('Festival 2')
    assert festival.get_idF() == festival_2.get_idF()
    assert festival.get_nomF() == festival_2.get_nomF()
    assert festival.get_villeF() == festival_2.get_villeF()
    assert festival.get_dateDebutF() == festival_2.get_dateDebutF()
    assert festival.get_dateFinF() == festival_2.get_dateFinF()
    
def test_get_festival_by_ville():
    festival = festival_bd.get_festival_by_ville('Ville 3')
    assert festival.get_idF() == festival_3.get_idF()
    assert festival.get_nomF() == festival_3.get_nomF()
    assert festival.get_villeF() == festival_3.get_villeF()
    assert festival.get_dateDebutF() == festival_3.get_dateDebutF()
    assert festival.get_dateFinF() == festival_3.get_dateFinF()
    
def test_insert_festival():
    festival = Festival(9, 'Festival 5', 'Ville 5', '2023-08-01', '2023-08-05')
    festival_bd.insert_festival(festival)
    assert festival.get_nomF() == 'Festival 5'
    assert festival.get_villeF() == 'Ville 5'
    assert festival.get_dateDebutF() == datetime.strptime('2023-08-01', '%Y-%m-%d').date()
    assert festival.get_dateFinF() == datetime.strptime('2023-08-05', '%Y-%m-%d').date()
    
def test_delete_festival():
    festival = Festival(9, 'Festival 5', 'Ville 5', '2023-08-01', '2023-08-05')
    festival_bd.insert_festival(festival)
    festival_bd.delete_festival_by_name(festival)
    assert festival not in festival_bd.get_all_festivals()

# Type_BillletBD

type_billet_bd = Type_BilletBD(connexion_bd)
type_billet_1 = Type_Billet(1, 3)

def test_get_all_types_billets():
    types_billets = type_billet_bd.get_all_types_billets()
    types_billets_de_bd = [(t.get_idType(), t.get_duree()) for t in types_billets]
    types_billets_python = [t for t in types_billets_de_bd]
    assert types_billets_de_bd == types_billets_python
    
def test_get_type_billet_by_id():
    type_billet = type_billet_bd.get_type_billet_by_id(1)
    assert type_billet.get_idType() == type_billet_1.get_idType()
    assert type_billet.get_duree() == type_billet_1.get_duree()

def test_insert_type_billet():
    type_billet = Type_Billet(9, 3)
    type_billet_bd.insert_type_billet(type_billet)
    assert type_billet.get_duree() == 3

def test_delete_type_billet():
    type_billet = Type_Billet(9, 3)
    type_billet_bd.insert_type_billet(type_billet)
    type_billet_bd.delete_type_billet_by_duree(type_billet)
    assert type_billet not in type_billet_bd.get_all_types_billets()
    
# SpectateurBD

spectateur_bd = SpectateurBD(connexion_bd)
spectateur_1 = Spectateur(1, 'Spectateur 1', 'Prénom 1', 'Adresse 1', 'email1@example.com', 'mdp1')

def test_get_all_spectateurs():
    spectateurs = spectateur_bd.get_all_spectateurs()
    spectateurs_de_bd = [(s.get_idS(), s.get_nomS(), s.get_prenomS(), s.get_adresseS(), s.get_emailS(), s.get_mdpS()) for s in spectateurs]
    spectateurs_python = [s for s in spectateurs_de_bd]
    assert spectateurs_de_bd == spectateurs_python
    
def test_get_spectateur_by_id():
    spectateur = spectateur_bd.get_spectateur_by_id(1)
    assert spectateur.get_idS() == spectateur_1.get_idS()
    assert spectateur.get_nomS() == spectateur_1.get_nomS()
    assert spectateur.get_prenomS() == spectateur_1.get_prenomS()
    assert spectateur.get_adresseS() == spectateur_1.get_adresseS()
    assert spectateur.get_emailS() == spectateur_1.get_emailS()
    assert spectateur.get_mdpS() == spectateur_1.get_mdpS()
    
def test_get_spectateur_by_email():
    spectateur = spectateur_bd.get_spectateur_by_email('email1@example.com')
    assert spectateur.get_idS() == spectateur_1.get_idS()
    assert spectateur.get_nomS() == spectateur_1.get_nomS()
    assert spectateur.get_prenomS() == spectateur_1.get_prenomS()
    assert spectateur.get_adresseS() == spectateur_1.get_adresseS()
    assert spectateur.get_emailS() == spectateur_1.get_emailS()
    assert spectateur.get_mdpS() == spectateur_1.get_mdpS()
    
def test_get_all_emails():
    emails = spectateur_bd.get_all_emails()
    emails_de_bd = [e for e in emails]
    emails_python = [e for e in emails_de_bd]
    assert emails_de_bd == emails_python
    
    
def test_insert_spectateur():
    spectateur = Spectateur(9, 'Spectateur 5', 'Prénom 5', 'Adresse 5', 'email@example.com', 'mdp5')
    spectateur_bd.insert_spectateur(spectateur)
    assert spectateur.get_nomS() == 'Spectateur 5'
    assert spectateur.get_prenomS() == 'Prénom 5'
    assert spectateur.get_adresseS() == 'Adresse 5'
    assert spectateur.get_emailS() == 'email@example.com'
    assert spectateur.get_mdpS() == 'mdp5'
    
def test_delete_spectateur():
    spectateur = Spectateur(9, 'Spectateur 5', 'Prénom 5', 'Adresse 5', 'email@example.com', 'mdp5')
    spectateur_bd.insert_spectateur(spectateur)
    spectateur_bd.delete_spectateur_by_email(spectateur)
    assert spectateur not in spectateur_bd.get_all_spectateurs()
                
# Classe BilletBD

billet_bd = BilletBD(connexion_bd)
billet_1 = Billet(1, festival_1, type_billet_1, spectateur_1, 80, '2023-08-01')

def test_get_billets_spectateur():
    billets = billet_bd.get_billets_spectateur(festival_1, type_billet_1, spectateur_1)
    billets_de_bd = [(b.get_idB(), b.get_idFestival(), b.get_idType(), b.get_idSpectateur(), b.get_prix(), b.get_dateAchat()) for b in billets]
    billets_python = [b for b in billets_de_bd]
    assert billets_de_bd == billets_python
    
def test_insert_billet():
    billet = Billet(9, festival_1, type_billet_1, spectateur_1, 50, '2023-08-01')
    billet_bd.insert_billet(billet)
    assert billet.get_idFestival() == festival_1.get_idF()
    assert billet.get_idType() == type_billet_1.get_idType()
    assert billet.get_idSpectateur() == spectateur_1.get_idS()
    assert billet.get_prix() == 50
    assert billet.get_dateAchat() == datetime.strptime('2023-08-01', '%Y-%m-%d').date()
    
def test_delete_billet():
    billet = Billet(9, festival_1, type_billet_1, spectateur_1, 50, '2023-08-01')
    billet_bd.insert_billet(billet)
    billet_bd.delete_billet_by_id_spectateur(billet, spectateur_1.get_idS())
    assert billet not in billet_bd.get_billets_spectateur(festival_1, type_billet_1, spectateur_1)
    
# LieuBD

lieu_bd = LieuBD(connexion_bd)
lieu_1 = Lieu(1, festival_1, 'Lieu 1', 'Adresse Lieu 1', 1000)
lieu_2 = Lieu(9, festival_1, 'Lieu 15', 'Adresse Lieu 15', 2000)

def test_get_all_lieux():
    lieux = lieu_bd.get_all_lieux(festival_1)
    lieux_de_bd = [(l.get_idL(), l.get_idFestival(), l.get_nomL(), l.get_adresseL(), l.get_jaugeL()) for l in lieux]
    lieux_python = [l for l in lieux_de_bd]
    assert lieux_de_bd == lieux_python
    
def test_get_lieu_by_adresse():
    lieu = lieu_bd.get_lieu_by_adresse(festival_1, 'Adresse Lieu 1')
    assert lieu.get_idL() == lieu_1.get_idL()
    assert lieu.get_idFestival() == lieu_1.get_idFestival()
    assert lieu.get_nomL() == lieu_1.get_nomL()
    assert lieu.get_adresseL() == lieu_1.get_adresseL()
    assert lieu.get_jaugeL() == lieu_1.get_jaugeL()
    
def test_insert_lieu():
    lieu = Lieu(8, festival_1, 'Lieu 5', 'Adresse Lieu 5', 1000)
    lieu_bd.insert_lieu(lieu)
    assert lieu.get_idFestival() == festival_1.get_idF()
    assert lieu.get_nomL() == 'Lieu 5'
    assert lieu.get_adresseL() == 'Adresse Lieu 5'
    assert lieu.get_jaugeL() == 1000
    
def test_delete_lieu():
    lieu = Lieu(8, festival_1, 'Lieu 5', 'Adresse Lieu 5', 1000)
    lieu_bd.insert_lieu(lieu)
    lieu_bd.delete_lieu_by_nom(lieu, 'Lieu 5')
    assert lieu not in lieu_bd.get_all_lieux(festival_1)
    
# HebergementBD

hebergement_bd = HebergementBD(connexion_bd)
hebergement_1 = Hebergement(1, 'Hébergement 1', 100, 'Adresse Hébergement 1')

def test_get_all_hebergements():
    hebergements = hebergement_bd.get_all_hebergements()
    hebergements_de_bd = [(h.get_idH(), h.get_nomH(), h.get_limitePlacesH(), h.get_adresseH()) for h in hebergements]
    hebergements_python = [h for h in hebergements_de_bd]
    assert hebergements_de_bd == hebergements_python
    
def test_get_hebergement_by_adresse():
    hebergement = hebergement_bd.get_hebergement_by_adresse('Adresse Hébergement 1')
    assert hebergement.get_idH() == hebergement_1.get_idH()
    assert hebergement.get_nomH() == hebergement_1.get_nomH()
    assert hebergement.get_limitePlacesH() == hebergement_1.get_limitePlacesH()
    assert hebergement.get_adresseH() == hebergement_1.get_adresseH()
    
def test_insert_hebergement():
    hebergement = Hebergement(8, 'Hébergement 5', 100, 'Adresse Hébergement 5')
    hebergement_bd.insert_hebergement(hebergement)
    assert hebergement.get_nomH() == 'Hébergement 5'
    assert hebergement.get_limitePlacesH() == 100
    assert hebergement.get_adresseH() == 'Adresse Hébergement 5'
    
def test_delete_hebergement():
    hebergement = Hebergement(8, 'Hébergement 5', 100, 'Adresse Hébergement 5')
    hebergement_bd.insert_hebergement(hebergement)
    hebergement_bd.delete_hebergement_by_nom(hebergement, 'Hébergement 5')
    assert hebergement not in hebergement_bd.get_all_hebergements()
    
