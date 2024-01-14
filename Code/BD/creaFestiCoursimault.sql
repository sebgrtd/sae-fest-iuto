CREATE DATABASE IF NOT EXISTS `FESTIUTO` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE FESTIUTO;

CREATE TABLE FAQ (
    idFaq INT NOT NULL AUTO_INCREMENT,
    question VARCHAR(9999) NOT NULL,
    reponse VARCHAR(9999) NOT NULL,
    PRIMARY KEY(idFaq)
);

CREATE TABLE USER(
    idUser INT NOT NULL AUTO_INCREMENT,
    pseudoUser VARCHAR(99) NOT NULL UNIQUE,
    mdpUser VARCHAR(9999) NOT NULL,
    codeTempUser VARCHAR(6),
    emailUser VARCHAR(99) UNIQUE,
    statutUser VARCHAR(99) NOT NULL,
    PRIMARY KEY(idUser)
);

CREATE TABLE FESTIVAL (
    idF INT NOT NULL AUTO_INCREMENT,
    nomF VARCHAR(50) NOT NULL,
    villeF VARCHAR(50) NOT NULL,
    dateDebutF DATE NOT NULL,
    dateFinF DATE NOT NULL,
    PRIMARY KEY (idF)
);

CREATE TABLE BILLET (
    idB INT NOT NULL AUTO_INCREMENT,
    idF INT NOT NULL,
    idType INT NOT NULL,
    idS INT NOT NULL,
    prix INT,
    dateAchat DATE NOT NULL,
    dateDebutB DATE NOT NULL CHECK (dateDebutB <= dateFinB),
    dateFinB DATE NOT NULL CHECK (dateFinB >= dateDebutB),
    PRIMARY KEY (idB)
);

CREATE TABLE TYPE_BILLET (
    idType INT NOT NULL AUTO_INCREMENT,
    duree INT NOT NULL CHECK (duree > 0),
    PRIMARY KEY (idType)
);

CREATE TABLE SPECTATEUR (
    idS INT NOT NULL AUTO_INCREMENT,
    nomS VARCHAR(50) NOT NULL,
    prenomS VARCHAR(50) NOT NULL,
    idUser INT NOT NULL,
    PRIMARY KEY (idS)
);

CREATE TABLE LIEU (
    idL INT NOT NULL AUTO_INCREMENT,
    idF INT NOT NULL,
    nomL VARCHAR(50) NOT NULL,
    adresseL VARCHAR(50) NOT NULL,
    jaugeL INT NOT NULL CHECK (jaugeL > 0),
    PRIMARY KEY (idL)
);

CREATE TABLE PROGRAMMER (
    idF INT NOT NULL,
    idG INT NOT NULL,
    idH INT NOT NULL,
    dateArrivee DATE NOT NULL,
    heureArrivee TIME NOT NULL,
    dateDepart DATE NOT NULL,
    heureDepart TIME NOT NULL,
    PRIMARY KEY (idF, idG, idH)
);

CREATE TABLE HEBERGEMENT (
    idH INT NOT NULL AUTO_INCREMENT,
    nomH VARCHAR(50) NOT NULL,
    limitePlacesH INT NOT NULL CHECK (limitePlacesH > 0),
    adresseH VARCHAR(50) NOT NULL,
    PRIMARY KEY (idH)
);

CREATE TABLE GROUPE (
    idG INT NOT NULL AUTO_INCREMENT,
    idH INT,
    nomG VARCHAR(50) NOT NULL,
    descriptionG VARCHAR(1000) NOT NULL,
    imgG LONGBLOB,
    PRIMARY KEY (idG)
);

CREATE TABLE MEMBRE_GROUPE (
    idMG INT NOT NULL AUTO_INCREMENT,
    idG INT NOT NULL,
    nomMG VARCHAR(50) NOT NULL,
    prenomMG VARCHAR(50) NOT NULL,
    nomDeSceneMG VARCHAR(50) NOT NULL,
    descriptionA VARCHAR(1000),
    PRIMARY KEY (idMG)
);

CREATE TABLE INSTRUMENT (
    idI INT NOT NULL AUTO_INCREMENT,
    idMG INT NOT NULL,
    nomI VARCHAR(50) NOT NULL,
    PRIMARY KEY (idI)
);

CREATE TABLE STYLE_MUSICAL (
    idSt INT NOT NULL AUTO_INCREMENT,
    nomSt VARCHAR(50) NOT NULL,
    PRIMARY KEY (idSt)
);

CREATE TABLE LIEN_VIDEO (
    idLV INT NOT NULL AUTO_INCREMENT,
    idG INT NOT NULL,
    video VARCHAR(50),
    PRIMARY KEY (idLV)
);

CREATE TABLE LIEN_RESEAUX_SOCIAUX (
    idLRS INT NOT NULL AUTO_INCREMENT,
    idG INT NOT NULL,
    reseau VARCHAR(200),
    PRIMARY KEY (idLRS)
);

CREATE TABLE EVENEMENT (
    idE INT NOT NULL AUTO_INCREMENT,
    idG INT,
    idL INT,
    nomE VARCHAR(50) NOT NULL,
    heureDebutE TIME NOT NULL CHECK (heureDebutE < heureFinE),
    heureFinE TIME NOT NULL CHECK (heureFinE > heureDebutE),
    dateDebutE DATE NOT NULL CHECK (dateDebutE <= dateFinE),
    dateFinE DATE NOT NULL CHECK (dateFinE >= dateDebutE),
    PRIMARY KEY (idE)
);

CREATE TABLE ACTIVITE_ANNEXE (
    idE INT NOT NULL,
    typeA VARCHAR(50) NOT NULL,
    ouvertAuPublic BOOLEAN NOT NULL,
    PRIMARY KEY (idE)
);

CREATE TABLE CONCERT (
    idE INT NOT NULL,
    tempsMontage TIME NOT NULL,
    tempsDemontage TIME NOT NULL,
    PRIMARY KEY (idE)
);

CREATE TABLE GROUPE_STYLE (
    idG INT NOT NULL,
    idSt INT NOT NULL,
    PRIMARY KEY (idG, idSt),
    FOREIGN KEY (idG) REFERENCES GROUPE (idG),
    FOREIGN KEY (idSt) REFERENCES STYLE_MUSICAL (idSt)
);

CREATE TABLE LIEN_RESEAUX_SOCIAUX_MEMBRE (
    idLRSM INT NOT NULL AUTO_INCREMENT,
    idMG INT NOT NULL,
    reseau VARCHAR(200),
    URL VARCHAR(255),
    PRIMARY KEY (idLRSM),
    FOREIGN KEY (idMG) REFERENCES MEMBRE_GROUPE (idMG)
);


ALTER TABLE BILLET ADD FOREIGN KEY (idF) REFERENCES FESTIVAL (idF);
ALTER TABLE BILLET ADD FOREIGN KEY (idType) REFERENCES TYPE_BILLET (idType);
ALTER TABLE BILLET ADD FOREIGN KEY (idS) REFERENCES SPECTATEUR (idS);

ALTER TABLE LIEU ADD FOREIGN KEY (idF) REFERENCES FESTIVAL (idF);

ALTER TABLE PROGRAMMER ADD FOREIGN KEY (idF) REFERENCES FESTIVAL (idF);
ALTER TABLE PROGRAMMER ADD FOREIGN KEY (idG) REFERENCES GROUPE (idG);
ALTER TABLE PROGRAMMER ADD FOREIGN KEY (idH) REFERENCES HEBERGEMENT (idH);

ALTER TABLE HEBERGEMENT ADD FOREIGN KEY (idG) REFERENCES GROUPE (idG);

ALTER TABLE MEMBRE_GROUPE ADD FOREIGN KEY (idG) REFERENCES GROUPE (idG);

ALTER TABLE INSTRUMENT ADD FOREIGN KEY (idMG) REFERENCES MEMBRE_GROUPE (idMG);

ALTER TABLE LIEN_VIDEO ADD FOREIGN KEY (idG) REFERENCES GROUPE (idG);

ALTER TABLE LIEN_RESEAUX_SOCIAUX ADD FOREIGN KEY (idG) REFERENCES GROUPE (idG);

ALTER TABLE ACTIVITES_ANNEXES ADD FOREIGN KEY (idE) REFERENCES EVENEMENT (idE);

ALTER TABLE CONCERT ADD FOREIGN KEY (idE) REFERENCES EVENEMENT (idE);

ALTER TABLE EVENEMENT ADD FOREIGN KEY (idG) REFERENCES GROUPE (idG);

ALTER TABLE EVENEMENT ADD FOREIGN KEY (idL) REFERENCES LIEU (idL);

-- Les Fonctions

DELIMITER |
CREATE OR REPLACE FUNCTION getNbBilletsVendus(idFestival INT) RETURNS INT
BEGIN
    IF NOT EXISTS (SELECT * FROM FESTIVAL WHERE idF = idFestival) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = "Le festival n'existe pas";
    END IF;
    DECLARE nbBillets INT;
    SELECT COUNT(*) INTO nbBillets FROM BILLET WHERE idF = idFestival;
    RETURN nbBillets;  
END |
DELIMITER ;

DELIMITER |
CREATE OR REPLACE FUNCTION getGroupesByStyle(nomStyle VARCHAR(50)) RETURNS INT
BEGIN
    IF NOT EXISTS (SELECT * FROM STYLE_MUSICAL WHERE nomSt = nomStyle) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = "Le style musical n'existe pas";
    END IF;
    DECLARE idStyleMusical INT;
    SELECT idSt INTO idStyleMusical FROM STYLE_MUSICAL WHERE nomSt = nomStyle;
    RETURN (SELECT COUNT(*) FROM GROUPE WHERE idSt = idStyleMusical);
END |
DELIMITER ;

DELIMITER |
CREATE OR REPLACE FUNCTION getPrixTotalBilletSpec(idSpectateur INT) RETURNS INT
BEGIN
    IF NOT EXISTS (SELECT * FROM SPECTATEUR WHERE idS = idSpectateur) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = "Le spectateur n'existe pas";
    END IF;
    DECLARE totalPrix INT;
    SELECT SUM(prix) INTO totalPrix FROM BILLET WHERE idS = idSpectateur;
    RETURN totalPrix;
END |
DELIMITER ;

DELIMITER |
CREATE OR REPLACE FUNCTION majPrixBillet(idBillet INT, nouveauPrix INT)
BEGIN
    IF NOT EXISTS (SELECT * FROM BILLET WHERE idB = idBillet) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = "Le billet n'existe pas";
    END IF;
    UPDATE BILLET SET prix = nouveauPrix WHERE idB = idBillet;
END |
DELIMITER ;

-- Les procédures 

DELIMITER |
CREATE OR REPLACE PROCEDURE listeFestivals()
BEGIN
    DECLARE resultat VARCHAR (500) DEFAULT 'Liste des festivals : \n';
    DECLARE fini INT DEFAULT false ;
    DECLARE idFest INT ;
    DECLARE nomFest VARCHAR (50) ;
    DECLARE villeFest VARCHAR (50) ;
    DECLARE dateDebutFest DATE ;
    DECLARE dateFinFest DATE ;
    DECLARE nbFest INT DEFAULT 0;
    DECLARE lm CURSOR FOR
        select idF , nomF , villeF, dateDebutF, dateFinF
        from FESTIVAL;

    DECLARE continue handler for not found set fini = true ;
    open lm;
    while not fini do
        fetch lm into idFest , nomFest , villeFest, dateDebutFest, dateFinFest;
        if not fini then
            set nbFest = nbFest +1;
            set resultat = concat(resultat , 'festival id', idFest, ' : ', nomFest, ' à ', villeFest, ' du ', dateDebutFest, ' au ', dateFinFest, '\n');
        end if;
        end while;
        close lm;
        set resultat = concat(resultat, 'Il y a ', nbFest , ' festival(s) en tout \n') ;

        select resultat ;
END |
DELIMITER ;

CALL listeFestivals();

-- Les triggers

-- BILLET :
-- Trigger pour vérifier la date d'achat par rapport à la fin du festival
-- delimiter |
-- create or replace trigger billetAchetable before insert on BILLET
-- for each row
-- begin
--     declare dateFinFestival DATE;
--     select dateFinF into dateFinFestival from FESTIVAL where idF = new.idF;
--     if (new.dateAchat > dateFinFestival) then
--         SIGNAL SQLSTATE '45000' set MESSAGE_TEXT = "Impossible d'acheter un billet pour un événement qui a déjà eu lieu";
--     end if;
-- end |
-- delimiter ;

-- Trigger pour vérifier la durée du billet par rapport à la durée du festival
delimiter |
create or replace trigger dureeTypeBillet before insert on BILLET
for each row
begin
    declare dureeType INT;
    declare dateDebutFestival DATE;
    declare dateFinFestival DATE;
    select duree into dureeType from TYPE_BILLET where idType = new.idType;
    select dateDebutF into dateDebutFestival from FESTIVAL where idF = new.idF;
    select dateFinF into dateFinFestival from FESTIVAL where idF = new.idF;
    if (dureeType > (DATEDIFF(dateFinFestival, dateDebutFestival))) then
        SIGNAL SQLSTATE '45000' set MESSAGE_TEXT = "La durée du billet est trop grande par rapport à celle du festival";
    end if;
end |
delimiter ;

-- Trigger pour vérifier la date d'arrivée du groupe par rapport à la date de début du festival
delimiter |
create or replace trigger dateArriveeHebergement before insert on PROGRAMMER
for each row
begin
    declare dateDebutFestival DATE;
    declare dateFinFestival DATE;
    select dateDebutF into dateDebutFestival from FESTIVAL where idF = new.idF;
    select dateFinF into dateFinFestival from FESTIVAL where idF = new.idF;
    if (new.dateArrivee < dateDebutFestival) then
        SIGNAL SQLSTATE '45000' set MESSAGE_TEXT = "Le groupe ne peut pas arriver avant le début du festival";
    end if;
end |
delimiter ;

-- Trigger pour vérifier la date d'arrivée du groupe par rapport à la date de fin du festival
delimiter |
create or replace trigger groupeArriveTropTardHebergement before insert on PROGRAMMER
for each row
begin
    declare dateArriveeGroupe DATE;
    declare dateFinFestival DATE;
    select dateArrivee into dateArriveeGroupe from PROGRAMMER where idF = new.idF and idL = new.idL and idH = new.idH;
    select dateFinF into dateFinFestival from FESTIVAL where idF = new.idF;
    if (dateArriveeGroupe > dateFinFestival) then
        SIGNAL SQLSTATE '45000' set MESSAGE_TEXT = "Le groupe ne peut pas arriver après la fin du festival";
    end if;
end |
delimiter ;


-- Trigger pour vérifier si le lieu existe déjà pour ce festival
delimiter |
create or replace trigger memeNomLieuFestival before insert on LIEU
for each row
begin
    if exists (select 1 from LIEU where idF = new.idF and nomL = new.nomL) then
        SIGNAL SQLSTATE '45000' set MESSAGE_TEXT = "Un lieu avec le même nom existe déjà pour ce festival";
    end if;
end |
delimiter ;


-- Trigger pour vérifier si un hébergement avec la même adresse existe déjà
delimiter |
create or replace trigger memeNomAdresseHebergement before insert on HEBERGEMENT
for each row
begin
    if exists (select 1 from HEBERGEMENT where nomH = new.nomH and adresseH = new.adresseH) then
        SIGNAL SQLSTATE '45000' set MESSAGE_TEXT = "Un hébergement avec le même nom et la même adresse existe déjà";
    end if;
end |
delimiter ;


-- Trigger pour vérifier si un membre avec le même nom et prénom existe déjà dans ce groupe
delimiter |
create or replace trigger memeNomPrenomMembreGroupe before insert on MEMBRE_GROUPE
for each row
begin
    if exists (select 1 from MEMBRE_GROUPE where idG = new.idG and nomMG = new.nomMG and prenomMG = new.prenomMG and nomDeSceneMG = new.nomDeSceneMG) then
        SIGNAL SQLSTATE '45000' set MESSAGE_TEXT = "Un membre avec le même nom et prénom existe déjà dans ce groupe";
    end if;
end |
delimiter ;


-- Trigger pour vérifier si un style musical avec le même nom existe déjà
delimiter |
create or replace trigger memeNomStyleMusical before insert on STYLE_MUSICAL
for each row
begin
    if exists (select 1 from STYLE_MUSICAL where nomSt = new.nomSt) then
        SIGNAL SQLSTATE '45000' set MESSAGE_TEXT = "Un style musical avec le même nom existe déjà";
    end if;
end |
delimiter ;


-- Trigger pour vérifier si un type de billet avec la même durée existe déjà
delimiter |
create or replace trigger memeDureeTypeBillet before insert on TYPE_BILLET
for each row
begin
    if exists (select 1 from TYPE_BILLET where duree = new.duree) then
        SIGNAL SQLSTATE '45000' set MESSAGE_TEXT = "Un type de billet avec la même durée existe déjà";
    end if;
end |
delimiter ;

delimiter |
create or replace trigger emailDejaUtilise before insert on SPECTATEUR
for each row
begin
    if exists (select 1 from SPECTATEUR where emailS = new.emailS) then
        SIGNAL SQLSTATE '45000' set MESSAGE_TEXT = "Cet email est déjà associé à un compte";
    end if;
end |
delimiter ;

delimiter |

CREATE TRIGGER lieuDejaUtiliseDurantHoraire BEFORE INSERT ON EVENEMENT
FOR EACH ROW
BEGIN
    DECLARE conflitTrouve INT DEFAULT 0;
    DECLARE tempsDemontageConcert TIME;
    DECLARE finEvenement TIME;
    SELECT IFNULL(MAX(c.tempsDemontage), '00:00:00') INTO tempsDemontageConcert
    FROM CONCERT c
    JOIN EVENEMENT e ON c.idE = e.idE
    WHERE e.idL = NEW.idL
    AND e.dateDebutE <= NEW.dateDebutE
    AND e.dateFinE >= NEW.dateDebutE
    AND ADDTIME(e.heureFinE, c.tempsDemontage) > NEW.heureDebutE;
    SELECT COUNT(*) INTO conflitTrouve
    FROM EVENEMENT e
    WHERE e.idL = NEW.idL
    AND e.dateDebutE = NEW.dateDebutE
    AND (
        (e.heureDebutE < NEW.heureFinE AND e.heureFinE > NEW.heureDebutE) OR
        (ADDTIME(e.heureFinE, tempsDemontageConcert) > NEW.heureDebutE)
    );
    IF conflitTrouve > 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = "Un événement ou concert est déjà prévu à ce lieu et cet horaire.";
    END IF;
END |

delimiter ;

DELIMITER |

CREATE TRIGGER verifDisponibiliteGroupe BEFORE INSERT ON EVENEMENT
FOR EACH ROW
BEGIN
    DECLARE conflitExistant INT DEFAULT 0;
    DECLARE tempsMontageConcert TIME;
    IF NEW.idE IN (SELECT idE FROM CONCERT) THEN
        SET tempsMontageConcert := (SELECT tempsMontage FROM CONCERT WHERE idE = NEW.idE);
    ELSE
        SET tempsMontageConcert := '00:00:00';
    END IF;
    SELECT COUNT(*) INTO conflitExistant
    FROM EVENEMENT e
    LEFT JOIN CONCERT c ON e.idE = c.idE
    WHERE e.idG = NEW.idG
    AND e.dateDebutE = NEW.dateDebutE
    AND (
        (NEW.heureDebutE < ADDTIME(e.heureFinE, IFNULL(c.tempsDemontage, '00:00:00'))) OR
        (ADDTIME(NEW.heureDebutE, tempsMontageConcert) > e.heureDebutE AND ADDTIME(NEW.heureDebutE, tempsMontageConcert) < e.heureFinE)
    );
    IF conflitExistant > 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = "Le groupe a déjà un événement prévu qui entre en conflit avec le nouvel horaire.";
    END IF;
END |

DELIMITER ;