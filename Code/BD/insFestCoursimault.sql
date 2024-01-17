-- Table USER

INSERT INTO FAQ (question, reponse) VALUES
    ('Quand aura lieu le festival ?', "Le festival aura lieu du 21 au 23 juin 2024."),
    ('Où aura lieu le festival ?', "Le festival aura lieu à Orléans."),
    ('Quelles sont les horaires de chaque jour du festival ?', "Le festival aura lieu de 18h à 23h chaque jour."),
    ('Y a-t-il un camping sur place ?', "Oui, un camping sera disponible à proximité du site du festival pour offrir aux festivaliers une expérience pratique et agréable."),
    ('Les enfants sont-ils admis ?', "Bien sûr ! Le festival est ouvert à tous les âges."),
    ('Peut-on acheter des billets sur place ?', "Il est fortement recommandé d'acheter vos billets à l'avance. Cependant, selon la disponibilité, des billets pourraient être vendus à l'entrée du festival."),
    ('Y aura-t-il une restauration sur place ?', "Oui, il y aura une variété de stands de restauration offrant une large sélection de plats pour satisfaire tous les goûts et régimes alimentaires."),
    ('Les animaux de compagnie sont-ils autorisés ?', "Malheureusement, les animaux de compagnie ne seront pas autorisés à l'intérieur du festival pour des raisons de sécurité et de confort de tous les participants."),
    ("Est-il possible d'y accéder en transports en commun ?", "Oui, le site du festival est facilement accessible en transport en commun. Des navettes spéciales pourront également être mises en place pour faciliter les déplacements."),
    ('Est-il possible de sortir et de revenir une fois entré dans le festival ?', "Oui, les festivaliers pourront sortir et entrer à nouveau dans le festival en présentant leur bracelet d'entrée valide."),
    ('Quels sont les moyens de paiement acceptés ?', "Les paiements en espèces et par carte bancaire seront acceptés sur le site du festival."),
    ('Est-il possible de payer avec des espèces sur place ?', "Oui, des points de vente acceptant les espèces seront disponibles sur le site du festival. Cependant, nous encourageons également l'utilisation de cartes de débit ou de crédit pour plus de commodité."),
    ('Comment puis-je me porter volontaire pour travailler au festival ?', "Nous sommes toujours à la recherche de bénévoles enthousiastes pour rejoindre notre équipe. Veuillez consulter la section 'Bénévolat' sur notre site web pour plus d'informations sur la manière de postuler."),
    ('Y a-t-il des parkings disponibles près du site du festival ?', "Oui, plusieurs parkings seront disponibles aux alentours du parc des expositions de la Beaujoire pour les véhicules des festivaliers."),
    ("Les billets sont-ils remboursables en cas d'annulation ?", "Non, les billets ne sont pas rembourçables. Vous pouvez tout de même nous contacter s'il y a besoin d'apporter des modificatios à vos billets."),
    ('Proposez-vous des activités pour les personnes à mobilité réduite ?', "Oui, nous nous efforçons de rendre le festival accessible à tous. Des installations spéciales seront mises en place pour garantir une expérience agréable aux personnes à mobilité réduite.");

INSERT INTO USER (pseudoUser, mdpUser, emailUser, statutUser) VALUES
    ('admin', 'admin', '', 'admin'),
    ('irvyncsm', 'abc', 'irvyncsm@gmail.com', 'user');

-- Insérer des données dans la table FESTIVAL
INSERT INTO FESTIVAL (nomF, villeF, dateDebutF, dateFinF) VALUES
    ("FestIUT'O", 'Orléans', '2024-06-21', '2024-06-23');

-- Insérer des données dans la table LIEU
INSERT INTO LIEU (nomL, adresseL, jaugeL) VALUES
    ('Cathédrale Sainte-Croix', '26 rue Saint-Etienne, 45000 Orléans', 1000),
    ('Place du Martroi', '28 place du Martroi, 45000 Orléans', 1000),
    ('Place de Loire', 'Rue de la Poterne, 45000 Orléans', 1000);

-- Insérer des données dans la table TYPE_BILLET
INSERT INTO TYPE_BILLET(duree) VALUES
    (1),
    (2),
    (3);

-- Insérer des données dans la table HEBERGEMENT
INSERT INTO HEBERGEMENT (nomH, limitePlacesH, adresseH) VALUES
    ("Comfort Hotel Orléans Sud Co'met", 30, "20 rue du Pont Bordeau, 45000 Orléans"),
    ("Hôtel Saint-Aignan", 30, "3 place Gambetta, 45000 Orléans"),
    ("Hôtel de l'Abeille", 50, "64 rue Alsace Lorraine, 45000 Orléans"),
    ("Hôtel Marguerite", 10, "14 rue Marguerite, 45000 Orléans");

-- Insérer des données dans la table GROUPE
INSERT INTO GROUPE (idH, nomG, descriptionG) VALUES
    (1, 'Saturn Citizen', 'Saturn Citizen est un groupe de rap français originaire de La Réunion et basé à Lyon, composé de Bushi et Mussy.
    Créé durant les années de collège de ces deux derniers, le groupe a fait partie intégrante du collectif Lyonzon de 2018 à 2023. 
    Il a également intégré le troisième membre Azur de 2018 à 2020 qui avait déjà collaboré avec Bushi en 2016 sous le nom Cool Kids pour un projet éponyme.'),

    (1, 'Opium', "Opium est un label américain et une agence de création fondée par le rappeur et chanteur américain Playboi Carti. Le label compte actuellement parmi ses membres Carti, les rappeurs américains Ken Carson et Destroy Lonely, ainsi que le duo de hip-hop Homixide Gang.
    Musicalement, le collectif Opium partageait un son similaire, avec des synthés sombres, grinçants et avant-gardistes mélangés à un beat rageur rappelant l'ère du punk rock des années 70 et 80. 
    Ce son expérimental s'éloignait du genre hip-hop trap actuel et s'était attiré les faveurs d'un groupe culte."),

    (1, 'New Wave', 'La Fève, Khali, J9ueve, Sonbest, 99 ou encore DMS : tous composent cette scène avant-gardiste du rap français souvent surnommée « nouvelle vague ». Mais ici, pas question de faire du cinéma : avec une spontanéité criante, ces jeunes rappeurs construisent une musique propre à leur inspirations personnelles, 
    et bâtissent ensemble une dynamique artistique pleine d’expérimentations précieuses pour le rap français.'),

    (1, 'IAM', "IAM est un groupe de hip-hop français, originaire de Marseille, dans les Bouches-du-Rhône. Formé en 1989, il se compose d'Akhenaton (Philippe Fragione), Shurik'n (Geoffroy Mussard), Khéops (Éric Mazel), Imhotep (Pascal Perez), Kephren (François Mendy) et Freeman (Malek Brahimi)."),

    (1, "L'impératrice", "L'Impératrice est un groupe de musique français originaire de Paris. Il est composé de Charles de Boisseguin, Hagni Gwon, Achille Trocellier, David Gaugué, Tom Daveau, Flore Benguigui et Marion Brunetto. Le groupe est formé en 2012 et sort son premier album Matahari en 2018."),

    (2, "Luther", "Luther est un rappeur français originaire de Paris. Il est membre du groupe de hip-hop marseillais IAM, qu'il a fondé en 1989 avec Akhenaton, Shurik'n, Kheops, Imhotep et Kephren. Il est également le fondateur du label indépendant Côté Obscur, créé en 1994, et du label indépendant 361 Records, créé en 2004."),

    (2, "Booba", "Booba, de son vrai nom Élie Yaffa, né le 9 décembre 1976 à Boulogne-Billancourt, dans les Hauts-de-Seine, est un rappeur, producteur, entrepreneur et ancien boxeur français. Il est le fondateur du label indépendant 92i, sous-label de Tallac Records, et cofondateur du site web OKLM. Il est également le fondateur de la marque de vêtements et de lignes de parfums Ünkut."),

    (2, "Damso", "Damso, de son vrai nom William Kalubi, né le 10 mai 1992 à Kinshasa, au Zaïre, est un rappeur et auteur-compositeur belge. Il est membre du 92i, un collectif de rap français dont il est considéré comme le pilier. Il commence sa carrière en tant que membre du groupe OPG en 2006, et se fait connaître en 2015 avec sa mixtape Salle d'attente."),

    (2, "Vladimir Cauchemar", "Vladimir Cauchemar, de son vrai nom Charles de Boisseguin, né le 20 mai 1989 à Paris, est un musicien, producteur et réalisateur français."),

    (2, "4am-Liam", "4am-Liam, de son vrai nom Liam Sottier, est un jeune informaticien et artiste indépendant qui a publié en fin 2023 son EP Aujourd'hui."),

    (3, "Daft Punk", "Daft Punk est un groupe de musique électronique français, originaire de Paris. Composé de Thomas Bangalter et Guy-Manuel de Homem-Christo, le groupe est actif depuis 1993, et participe à la création et à la démocratisation du mouvement de musique électronique baptisé french touch. Il est considéré comme l'un des groupes de musique électronique les plus influents de l'histoire."),

    (3, "Louise attaque", "Louise Attaque est un groupe de rock français, originaire de Paris. Il est formé en 1994 par Gaëtan Roussel, Arnaud Samuel et Robin Feix, rejoints par Alexandre Margraff en 1995. Le groupe se sépare en 2001, puis se reforme en 2005."),

    (3, "Phoenix", "Phoenix est un groupe de rock français, originaire de Versailles, dans les Yvelines. Il est formé en 1999 par Thomas Mars, Deck d'Arcy, Christian Mazzalai et Laurent Brancowitz. Le groupe est nommé aux Grammy Awards en 2010 et 2014."),

    (3, "Gojira", "Gojira est un groupe français de heavy metal, originaire d'Ondres, dans les Landes. Il est initialement formé en 1996 sous le nom de Godzilla, puis adopte le nom de Gojira en 2001. Le groupe est composé de quatre membres : Joseph Duplantier (chant et guitare), Mario Duplantier (batterie), frère du premier, Christian Andreu (guitare) et Jean-Michel Labadie (basse). Depuis sa formation, Gojira compte un total de sept albums studio et trois DVD live. Associé au death metal technique ainsi qu'au metal progressif, Gojira se distingue dans la scène metal par la sensibilité écologiste et spirituelle de leurs chansons."),

    (3, "Modern Talking", "Modern Talking est un groupe new wave/synthpop allemand. Constitué de Dieter Bohlen et Thommas Anders. Le duo compte plus de 120 millions de disques vendus à travers le monde4, notamment grâce à leurs tubes You're My Heart, You're My Soul (1984), Cheri, Cheri Lady (1985), Brother Louie (1986) et Atlantis Is Calling (S.O.S. for Love) (1986)."),

    (3, "Suprême NTM", "Suprême NTM est un groupe de hip-hop français, originaire de Seine-Saint-Denis. Il est formé en 1988 par deux amis d'enfance, Kool Shen et JoeyStarr, qui sont rapidement rejoints par DJ Clyde puis DJ S. Le groupe se sépare en 1998, puis se reforme en 2008. Il fait cette année son retour au festival d'Orléans"),

    (3, "Red Hot Chili Peppers", "Red Hot Chili Peppers est un groupe de rock américain, originaire de Los Angeles, en Californie. Il est formé en 1983 par Anthony Kiedis et Michael Balzary (surnommé « Flea », basse), auxquels se joignent Hillel Slovak et Jack Irons (guitares). Le groupe a connu de nombreux changements de musiciens au cours de son existence avec Kiedis et Flea comme seuls membres stables. Il est actuellement composé de Flea, Anthony Kiedis, Chad Smith et John Frusciante."),

    (4, "Lana Del Rey", "Elizabeth Woolridge Grant, dite Lana Del Rey, né le 21 juin 1985 à New York, est une auteure-compositrice-interprète américaine."),

    (4, "Coldplay", "Coldplay est un groupe pop rock britannique originaire de Londres en Angleterre, formé en 1996."),

    (4, "ABBA", "ABBA est un groupe suédois de pop, originaire de Stockholm. Formé le 1er novembre 1971, le groupe est originellement composé d'Agnetha Fältskog, Benny Andersson, Björn Ulvaeus et Anni-Frid « Frida » Lyngstad. Lors de leur formation, ils sont deux couples mariés : Agnetha et Björn, Frida et Benny. Le nom du groupe est à la fois un acronyme et un palindrome, composé des initiales des prénoms des membres. Ce n'est qu'à partir de 1976 que l'ambigramme — AᗺBA, avec un B inversé — est utilisé comme logo.");

-- Insérer des données dans la table MEMBRE_GROUPE
INSERT INTO MEMBRE_GROUPE (idG, nomMG, prenomMG, nomDeSceneMG, descriptionA) VALUES
    (1, 'Bushi', 'Bushi', 'Bushi', 'BUSHI, jeune rappeur de Lyon, fait énormément parler de lui ces derniers temps par rapport à ses diverses apparitions aux quatre coins du monde ainsi que sa productivité et 
    sa communication qui font tourner beaucoup de mystère autour de ce personnage. L’artiste peut paraître des plus underground. Egotrip monstre, placements particuliers, ces éléments font sa force. Il se démarque par sa prestance, 
    sa nonchalance et ses placements sortis de nulle part. Un vrai rappeur US en somme.'),

    (1, 'Mussy', 'Mussy', 'Mussy', "Mussy est un rappeur français d'origine Tutsi (Rwanda) ayant grandi à La Réunion. Il est membre du groupe Saturn Citizen et du collectif Lyonzon. Le rappeur crée Saturn Citizen avec son ami Bushi durant ses années de collège et rejoint Lyonzon en 2017. Cependant, il reste très discret et c'est réellement lors du “Freestyle Arah #3” que Mussy officialise son appartenance et signe son grand retour au sein des deux groupes, 
    avant de s'envoler à Lyon (69). L'artiste dévoile en 2020 son premier projet en solo, intitulé Jig."),

    (2, 'Playboi', 'Jordan', 'Playboi Carti', "Jordan Terrell Carter, plus connu sous le nom de Playboi Carti, est un rappeur, chanteur et compositeur américain. Il est né le 13 septembre 1996 à Atlanta, en Géorgie. 
    Reconnu pour son style musical expérimental, passant volontiers de sonorités douces et vaporeuses à des ambiances trash et gothiques, il se démarque aussi par la rareté de ses apparitions médiatiques."),

    (2, 'Ken', 'Ken', 'Ken Carson', 'Kenyatta Lee Frazier Jr. (né le 11 avril 2000), connu professionnellement sous le nom de Ken Carson est un rappeur, auteur-compositeur et producteur de disques américain. Il est connu pour son album studio X qui a culminé au numéro 115 du Billboard 2003.
    Son style de musique est appelée de la Rage Music ou Opium Music en réference avec le label du meme nom dans lequel il est signé. Son style est comparable a des artistes tel que Destroy Lonely, Yeat, Playboi Carti, le groupe Homixide Gang , ou encore Lancey Foux.'),
        
    (2, 'Destroy', 'Destroy', 'Destroy Lonely', "Bobby Wardell Sandimanie, connu professionnellement sous le nom de Destroy Lonely, est un rappeur et auteur-compositeur-interprète américain. Son premier album studio, If Looks Could Kill (2023), a débuté à la 18e place du Billboard 200 américain. Auparavant, sa cinquième mixtape, 
        No Stylist (2022), a marqué sa première entrée dans le classement en se classant à la 91e place."),

    (2, 'Homixide', 'Homixide', 'Homixide Gang', "Tous deux âgés de 22 ans, Homixide Meechie et Homixide Beno forme le duo Homixide Gang. Avec leur premier EP Snotty World, les deux rappeurs originaires d’Atlanta se font rapidement remarquer en 2021 avec le titre SSN. Un succès qui leur permet de passer à la vitesse supérieure en signant avec Opium, le label de Playboi Carti. S’en suit un premier album Homixide Lifestyle, puis SNOT OR NOT, leur deuxième opus fraichement dévoilé en avril dernier. Directement classé dans le top 10 des nouveaux albums sur Spotify après la sortie, 
    Homixide Beno et Homixide Meechie continuent leur ascension, prouvant qu’avec de la persévérance, rien n’est impossible !"),

    (3, 'La Fève', 'La Fève', 'La Fève', "La Fève, de son vrai nom Louis Ambroise Germain1, est un rappeur et producteur français.
Il est un membre du mouvement musical new wave du hip-hop français. Sa musique est jugée innovante, utilisant une sélection éclectique de flows, productions et refrains."),

    (3, 'Khali', 'Khali', 'Khali', "Khali, né à Lyon le 20 novembre 1999 et de son vrai nom Khalil Lakbir, est un rappeur, producteur et chanteur franco-marocain. Il fait partie du mouvement musical new wave du hip-hop français."),

    (3, 'J9ueve', 'J9ueve', 'J9ueve', "J9ueve, de son vrai nom Jules Vincent est un rappeur et producteur français. Il est un membre clé du mouvement New Wave au sein du rap français.
     l'instar de nombreux rappeurs du mouvement New Wave, J9ueve se fait connaître via la plateforme Soundcloud, dès 2019. Il est réputé pour son style mélancolique, ses ambiances romantiques, sa voix atypique et sa musicalité novatrice. Il est signé chez le label ALSO/A+LSO3"),

    (3, 'DMS', 'DMS', 'DMS', "DMS est un rappeur français originaire des Hauts-de-Seine (92). Affilié au studio 99 à ses débuts, il créé en 2021 le label Ciel.
De 2019 à 2021, il travaille sur son premier projet Rideaux bleus, qu'il sort en décembre de cette dernière année. Sept mois plus tard, il dévoile l'EP YEYEYE, comprenant des collaborations avec EDGE et Malo.
En mars 2023, il dévoile son deuxième projet, VAGALAME, où J9ueve, Khali et Rounhaa y sont présents."),

    (4, "Fragione", "Philippe", "Akhenaton", "Akhenaton, de son vrai nom Philippe Fragione, né le 17 septembre 1968 à Marseille, est un rappeur, producteur, réalisateur, écrivain et acteur français. Il est membre du groupe de hip-hop marseillais IAM, qu'il a fondé en 1989 avec Shurik'n, Kheops, Imhotep, Kephren et Freeman. Il est également le fondateur du label indépendant Côté Obscur, créé en 1994, et du label indépendant 361 Records, créé en 2004. Il est le frère du rappeur Faf Larage."),

    (4, "Mussard", "Geoffroy", "Shurik'n", "Geoffroy Mussard, dit Shurik'n, né le 9 mars 1966 à Marseille, est un rappeur français. Il est membre du groupe de hip-hop marseillais IAM, qu'il a fondé en 1989 avec Akhenaton, Kheops, Imhotep, Kephren et Freeman. Il est également le fondateur du label indépendant Côté Obscur, créé en 1994, et du label indépendant 361 Records, créé en 2004."),

    (4, "Mazel", "Éric", "Khéops", "Éric Mazel, dit Khéops, né le 18 octobre 1966 à Marseille, est un DJ et producteur français. Il est membre du groupe de hip-hop marseillais IAM, qu'il a fondé en 1989 avec Akhenaton, Shurik'n, Imhotep, Kephren et Freeman. Il est également le fondateur du label indépendant Côté Obscur, créé en 1994, et du label indépendant 361 Records, créé en 2004."),

    (4, "Perez", "Pascal", "Imhotep", "Pascal Perez, dit Imhotep, né le 19 mars 1960 à Marseille, est un DJ et producteur français. Il est membre du groupe de hip-hop marseillais IAM, qu'il a fondé en 1989 avec Akhenaton, Shurik'n, Kheops, Kephren et Freeman. Il est également le fondateur du label indépendant Côté Obscur, créé en 1994, et du label indépendant 361 Records, créé en 2004."),

    (4, "Mendy", "François", "Kephren", "François Mendy, dit Kephren, né le 18 octobre 1966 à Marseille, est un DJ et producteur français. Il est membre du groupe de hip-hop marseillais IAM, qu'il a fondé en 1989 avec Akhenaton, Shurik'n, Kheops, Imhotep et Freeman. Il est également le fondateur du label indépendant Côté Obscur, créé en 1994, et du label indépendant 361 Records, créé en 2004."),

    (4, "Brahimi", "Malek", "Freeman", "Malek Brahimi, dit Freeman, né le 13 avril 1968 à Marseille, est un rappeur français. Il est membre du groupe de hip-hop marseillais IAM, qu'il a fondé en 1989 avec Akhenaton, Shurik'n, Kheops, Imhotep et Kephren. Il est également le fondateur du label indépendant Côté Obscur, créé en 1994, et du label indépendant 361 Records, créé en 2004."),
    
    (5, "de Boisseguin", "Charles", "Charles de Boisseguin", "né le 20 mai 1989 à Paris, est un musicien, producteur et réalisateur français. Il est le fondateur du groupe de musique L'Impératrice, dont il est le chanteur et le claviériste. Il est également le fondateur du label indépendant Microqlima, créé en 2015, et du label indépendant Cracki Records, créé en 2011."),

    (5, "Gwon", "Hagni", "Hagni Gwon", "né le 20 mai 1989 à Paris, est un musicien, producteur et réalisateur français. Il est le fondateur du groupe de musique L'Impératrice, dont il est le chanteur et le claviériste. Il est également le fondateur du label indépendant Microqlima, créé en 2015, et du label indépendant Cracki Records, créé en 2011."),

    (5, "Trocellier", "Achille", "Achille Trocellier", "né le 20 mai 1989 à Paris, est un musicien, producteur et réalisateur français. Il est le fondateur du groupe de musique L'Impératrice, dont il est le chanteur et le claviériste. Il est également le fondateur du label indépendant Microqlima, créé en 2015, et du label indépendant Cracki Records, créé en 2011."),

    (5, "Gaugué", "David", "David Gaugué", "né le 20 mai 1989 à Paris, est un musicien, producteur et réalisateur français. Il est le fondateur du groupe de musique L'Impératrice, dont il est le chanteur et le claviériste. Il est également le fondateur du label indépendant Microqlima, créé en 2015, et du label indépendant Cracki Records, créé en 2011."),

    (5, "Daveau", "Tom", "Tom Daveau", "né le 20 mai 1989 à Paris, est un musicien, producteur et réalisateur français. Il est le fondateur du groupe de musique L'Impératrice, dont il est le chanteur et le claviériste. Il est également le fondateur du label indépendant Microqlima, créé en 2015, et du label indépendant Cracki Records, créé en 2011."),

    (5, "Benguigui", "Flore", "Flore Benguigui", "née le 20 mai 1989 à Paris, est un musicien, producteur et réalisateur français. Il est le fondateur du groupe de musique L'Impératrice, dont il est le chanteur et le claviériste. Il est également le fondateur du label indépendant Microqlima, créé en 2015, et du label indépendant Cracki Records, créé en 2011."),

    (5, "Brunetto", "Marion", "Marion Brunetto", "née le 20 mai 1989 à Paris, est un musicien, producteur et réalisateur français. Il est le fondateur du groupe de musique L'Impératrice, dont il est le chanteur et le claviériste. Il est également le fondateur du label indépendant Microqlima, créé en 2015, et du label indépendant Cracki Records, créé en 2011."),

    (6, "Luther", "Luther", "Luther", "Luther est un rappeur français originaire de Paris. Il est membre du groupe de hip-hop marseillais IAM, qu'il a fondé en 1989 avec Akhenaton, Shurik'n, Kheops, Imhotep et Kephren. Il est également le fondateur du label indépendant Côté Obscur, créé en 1994, et du label indépendant 361 Records, créé en 2004."),

    (7, "Yaffa", "Élie", "Booba", "Élie Yaffa, né le 9 décembre 1976 à Boulogne-Billancourt, dans les Hauts-de-Seine, est un rappeur, producteur, entrepreneur et ancien boxeur français. Il est le fondateur du label indépendant 92i, sous-label de Tallac Records, et cofondateur du site web OKLM. Il est également le fondateur de la marque de vêtements et de lignes de parfums Ünkut."),

    (8, "Kalubi", "William", "Damso", "William Kalubi, né le 10 mai 1992 à Kinshasa, au Zaïre, est un rappeur et auteur-compositeur belge. Il est membre du 92i, un collectif de rap français dont il est considéré comme le pilier. Il commence sa carrière en tant que membre du groupe OPG en 2006, et se fait connaître en 2015 avec sa mixtape Salle d'attente."),

    (9, "de Boisseguin", "Charles", "Vladimir Cauchemar", "Vladimir Cauchemar, de son vrai nom Charles de Boisseguin, né le 20 mai 1989 à Paris, est un musicien, producteur et réalisateur français."),

    (10, "Sottier", "Liam", "4am-Liam", "Liam Sottier, est un jeune informaticien et artiste indépendant qui a publié en fin 2023 son EP Aujourd'hui."),

    (11, "Bangalter", "Thomas", "Daft Punk", "Thomas Bangalter, né le 3 janvier 1975 à Paris, est un musicien, compositeur, producteur, réalisateur et scénariste français. Il est membre du duo Daft Punk, formé avec Guy-Manuel de Homem-Christo en 1993. Il est également le fondateur du label indépendant Roulé, créé en 1995, et du label indépendant Crydamoure, créé en 1997."),

    (11, "de Homem-Christo", "Guy-Manuel", "Daft Punk", "Guy-Manuel de Homem-Christo, né le 8 février 1974 à Neuilly-sur-Seine, est un musicien, compositeur, producteur, réalisateur et scénariste français. Il est membre du duo Daft Punk, formé avec Thomas Bangalter en 1993. Il est également le fondateur du label indépendant Roulé, créé en 1995, et du label indépendant Crydamoure, créé en 1997."),

    (12, "Rousset", "Gaëtan", "Louise attaque", "Gaëtan Roussel, né le 13 octobre 1972 à Rodez, est un auteur-compositeur-interprète, guitariste et producteur français. Il est le chanteur du groupe de rock Louise Attaque, qu'il a fondé en 1994 avec Arnaud Samuel et Robin Feix. Il est également le fondateur du label indépendant Tôt ou tard, créé en 1996."),

    (12, "Samuel", "Arnaud", "Louise attaque", "Arnaud Samuel, né le 13 octobre 1972 à Rodez, est un auteur-compositeur-interprète, guitariste et producteur français. Il est le chanteur du groupe de rock Louise Attaque, qu'il a fondé en 1994 avec Gaëtan Roussel et Robin Feix. Il est également le fondateur du label indépendant Tôt ou tard, créé en 1996."),

    (12, "Feix", "Robin", "Louise attaque", "Robin Feix, né le 13 octobre 1972 à Rodez, est un auteur-compositeur-interprète, guitariste et producteur français. Il est le chanteur du groupe de rock Louise Attaque, qu'il a fondé en 1994 avec Gaëtan Roussel et Arnaud Samuel. Il est également le fondateur du label indépendant Tôt ou tard, créé en 1996."),

    (13, "Mazzalai", "Christian", "Phoenix", "Christian Mazzalai, né le 19 février 1976 à Versailles, est un musicien, compositeur, producteur et réalisateur français. Il est le guitariste du groupe de rock Phoenix, qu'il a fondé en 1999 avec Thomas Mars, Deck d'Arcy et Laurent Brancowitz. Il est également le fondateur du label indépendant Ghettoblaster, créé en 2000."),

    (13, "Brancowitz", "Laurent", "Phoenix", "Laurent Brancowitz, né le 19 février 1976 à Versailles, est un musicien, compositeur, producteur et réalisateur français. Il est le guitariste du groupe de rock Phoenix, qu'il a fondé en 1999 avec Thomas Mars, Deck d'Arcy et Christian Mazzalai. Il est également le fondateur du label indépendant Ghettoblaster, créé en 2000."),

    (13, "Mars", "Thomas", "Phoenix", "Thomas Mars, né le 19 février 1976 à Versailles, est un musicien, compositeur, producteur et réalisateur français. Il est le chanteur du groupe de rock Phoenix, qu'il a fondé en 1999 avec Deck d'Arcy, Christian Mazzalai et Laurent Brancowitz. Il est également le fondateur du label indépendant Ghettoblaster, créé en 2000."),

    (14, "Duplantier", "Joseph", "Gojira", "Joseph Duplantier, né le 19 octobre 1976 à Bayonne, est un musicien, compositeur, producteur et réalisateur français. Il est le chanteur et guitariste du groupe de heavy metal Gojira, qu'il a fondé en 1996 avec son frère Mario Duplantier, Christian Andreu et Jean-Michel Labadie. Il est également le fondateur du label indépendant Silver Cord Studio, créé en 2014."),

    (14, "Duplantier", "Mario", "Gojira", "Mario Duplantier, né le 19 octobre 1976 à Bayonne, est un musicien, compositeur, producteur et réalisateur français. Il est le batteur du groupe de heavy metal Gojira, qu'il a fondé en 1996 avec son frère Joseph Duplantier, Christian Andreu et Jean-Michel Labadie. Il est également le fondateur du label indépendant Silver Cord Studio, créé en 2014."),

    (14, "Andreu", "Christian", "Gojira", "Christian Andreu, né le 19 octobre 1976 à Bayonne, est un musicien, compositeur, producteur et réalisateur français. Il est le guitariste du groupe de heavy metal Gojira, qu'il a fondé en 1996 avec Joseph Duplantier, Mario Duplantier et Jean-Michel Labadie. Il est également le fondateur du label indépendant Silver Cord Studio, créé en 2014."),

    (14, "Labadie", "Jean-Michel", "Gojira", "Jean-Michel Labadie, né le 19 octobre 1976 à Bayonne, est un musicien, compositeur, producteur et réalisateur français. Il est le bassiste du groupe de heavy metal Gojira, qu'il a fondé en 1996 avec Joseph Duplantier, Mario Duplantier et Christian Andreu. Il est également le fondateur du label indépendant Silver Cord Studio, créé en 2014."),

    (15, "Anders", "Thomas", "Modern Talking", "Thomas Anders, né le 1er mars 1963 à Münstermaifeld, est un chanteur, compositeur, producteur et réalisateur allemand. Il est le chanteur du groupe de new wave/synthpop Modern Talking, qu'il a fondé en 1984 avec Dieter Bohlen. Il est également le fondateur du label indépendant Hansa Records, créé en 1978."),

    (15, "Bohlen", "Dieter", "Modern Talking", "Dieter Bohlen, né le 7 février 1954 à Berne, est un chanteur, compositeur, producteur et réalisateur allemand. Il est le chanteur du groupe de new wave/synthpop Modern Talking, qu'il a fondé en 1984 avec Thomas Anders. Il est également le fondateur du label indépendant Hansa Records, créé en 1978."),

    (16, "Lopes", "Bruno", "Kool Shen", "Bruno Lopes, dit Kool Shen, né le 9 février 1966 à Saint-Denis, est un rappeur, producteur, entrepreneur et ancien joueur de poker français. Il est membre du groupe de hip-hop Suprême NTM, qu'il a fondé en 1989 avec JoeyStarr. Il est également le fondateur du label indépendant IV My People, créé en 1998."),

    (16, "Morville", "Didier", "JoeyStarr", "Didier Morville, dit JoeyStarr, né le 27 octobre 1967 à Saint-Denis, est un rappeur, producteur, entrepreneur et acteur français. Il est membre du groupe de hip-hop Suprême NTM, qu'il a fondé en 1989 avec Kool Shen. Il est également le fondateur du label indépendant IV My People, créé en 1998."),

    (17, "Kiedis", "Anthony", "Anthony Keidis", "Anthony Kiedis est un chanteur, acteur et producteur américain né le 1er novembre 1962, à Grand Rapids, dans le Michigan. Il est chanteur principal du groupe de rock Red Hot Chili Peppers, qu'il a fondé en 1983 avec le bassiste Michael Balzary dit « Flea »."),

    (17, "Balzary", "Michael", "Flea", "Michael Peter Balzary, dit Flea (« puce » en anglais), est un bassiste, pianiste, trompettiste et acteur australo-américain, né le 16 octobre 1962 à Melbourne, en Australie. Il est l'un des membres fondateurs du groupe de rock Red Hot Chili Peppers, avec le chanteur Anthony Kiedis. Son surnom vient à la fois de sa petite taille et de sa façon assez sautillante d'occuper l'espace d'une scène."),

    (17, "Gaylord", "Chadwick", "Chad Smith", "Chadwick Gaylord Smith, dit Chad Smith, né le 25 octobre 1961 à Saint Paul dans le Minnesota, est un batteur américain, membre des Red Hot Chili Peppers depuis 1988."),

    (17, "Frusciante", "John", "John Fruisciante", "John Anthony Frusciante, né le 5 mars 1970 à Astoria (New York), est un auteur-compositeur-interprète, multi-instrumentiste, et producteur américain. Depuis 2019, il est le guitariste du groupe de rock américain Red Hot Chili Peppers, poste qu'il occupe déjà entre 1988 et 1992 puis entre 1998 et 2009. Entamant une carrière solo en 1994, il enregistre quinze albums et onze EP, certains étant publiés sous son pseudonyme Trickfinger."),

    (18, "Grant", "Elizabeth", "Lana Del Rey", "Elizabeth Woolridge Grant, dite Lana Del Rey, né le 21 juin 1985 à New York, est une auteure-compositrice-interprète américaine."),

    (19, "Martin", "Chris", "Coldpay", "Chris Martin est un auteur-compositeur-interprète et producteur anglais, né le 2 mars 1977 à Exeter dans le Devon. Il est leader du groupe Coldplay, qu'il forme à Londres, en 1996, avec Jon Buckland (guitare), Guy Berryman (basse) et Will Champion (batterie)"),

    (19, "Buckland", "Jonathan", "Coldplay", "Jonathan Mark Buckland, né le 11 septembre 1977, dans le quartier londonien d'Islington est un guitariste anglais, membre du groupe Coldplay."),

    (19, "Berryman", "Guy", "Coldplay", "Guy Berryman est né à Kirkcaldy dans la région du Fife en Écosse d'où il déménage à 12 ans pour aller s'installer dans le Kent, en Angleterre."),

    (20, "Fältskog", "Agnetha", "ABBA", "Agnetha Åse Fältskog, dite Agnetha Fältskog, née le 5 avril 1950 à Jönköping, est une chanteuse, autrice-compositrice-interprète, pianiste et productrice suédoise, et membre du groupe pop suédois ABBA."),

    (20, "Anderson", "Benny", "ABBA", "Benny Bror Göran Andersson, né le 16 décembre 1946 à Stockholm, est un musicien et compositeur suédois. Il est connu pour être un membre du groupe ABBA."),

    (20, "Ulvaues", "Björn", "ABBA", "Björn Kristian Ulvaeus, parfois orthographié Ulvæus, né le 25 avril 1945 à Göteborg, est un guitariste, chanteur, compositeur de chansons, parolier et producteur suédois. Président de la CISAC depuis 2020, il est connu pour avoir été un membre des groupes suédois Hootenanny Singers et surtout ABBA."),

    (20, "Lyngstad", "Anni-Frid", "ABBA", "Anni-Frid Lyngstad, surnommée 'Frida', princesse Reuss et comtesse de Plauen par son troisième mariage, née le 15 novembre 1945 à Bjørkåsen près de Narvik en Norvège, est une chanteuse suédoise. Elle est membre du groupe pop suédois ABBA.");

-- Insérer des données dans la table INSTRUMENT
INSERT INTO INSTRUMENT (nomI) VALUES
    ('Micro'),
    ("Platine"),
    ("Clavier"),
    ("Roland"),
    ("Guitare"),
    ("Batterie"),
    ("Basse"),
    ("Piano"),
    ("Trompette");


INSERT INTO JOUER_INSTRUMENT (idMG, idI) VALUES 
    (1, 1),
    (2, 1),
    (3, 1),
    (4, 1),
    (5, 1),
    (6, 1),
    (7, 1),
    (8, 1),
    (9, 1),
    (10, 1),
    (11, 1),
    (12, 1),
    (13, 2),
    (14, 2),
    (15, 2),
    (16, 1),
    (17, 3),
    (18, 3),
    (19, 3),
    (20, 3),
    (21, 3),
    (22, 1),
    (23, 3),
    (24, 1),
    (25, 1),
    (26, 1),
    (27, 2),
    (27, 3),
    (28, 1),
    (29, 4),
    (30, 4),
    (31, 1),
    (32, 5),
    (33, 5),
    (33, 6),
    (34, 1),
    (35, 5),
    (36, 6),
    (37, 1),
    (37, 5),
    (38, 6),
    (39, 5),
    (40, 6),
    (41, 1),
    (42, 1),
    (43, 1),
    (44, 1),
    (45, 1),
    (46, 7),
    (46, 8),
    (46, 9),
    (47, 6),
    (48, 5),
    (49, 1),
    (50, 1),
    (51, 5),
    (52, 7),
    (53, 1),
    (54, 3),
    (55, 1),
    (56, 1);


-- Insérer des données dans la table LIEN_RESEAUX_SOCIAUX
INSERT INTO LIEN_RESEAUX_SOCIAUX (idG, reseau) VALUES
    (1, 'https://www.youtube.com/channel/UCQxeWQ_K8aQ0KOXMDi03H5Q'),
    (1, 'https://www.instagram.com/saturnciti/'),
    (1, 'https://open.spotify.com/intl-fr/artist/7siKy5Wrq7TwvyJ21KushJ'),
    (2, "https://www.youtube.com/@playboicarti"),
    (2, "https://www.instagram.com/playboicarti/"),
    (2, "https://open.spotify.com/intl-fr/artist/699OTQXzgjhIYAHMy9RyPD"),
    (3, "https://www.youtube.com/@Blackmen3781"),
    (3, "https://www.instagram.com/lafeve7/"),
    (3, "https://open.spotify.com/intl-fr/artist/2sBKOwN0fSjx39VtL2WpjJ"),
    (4, "https://www.youtube.com/channel/UCucyYBZK92N79N1xT1hlEXQ"),
    (4, "https://www.instagram.com/iam.officiel/?hl=fr"),
    (4, "https://open.spotify.com/intl-fr/artist/56Q6weEROZ1RsVrTak8Bm7"),
    (5, "https://www.youtube.com/@limperatrice_"),
    (5, "https://www.instagram.com/l.imperatrice/"),
    (5, "https://open.spotify.com/intl-fr/artist/4PwlsrN0t5mLN0C827cbEU"),
    (6, "https://www.youtube.com/@luther3971"),
    (6, "https://www.instagram.com/lutherantz/"),
    (6, "https://open.spotify.com/intl-fr/artist/712cOCN3mpraX2UOgUvdHW"),
    (7, "https://www.youtube.com/@B2ObaOfficiel"),
    (7, "https://www.instagram.com/boobalapiraterieofficial/?hl=fr"),
    (7, "https://open.spotify.com/intl-fr/artist/58wXmynHaAWI5hwlPZP3qL"),
    (8, "https://www.youtube.com/channel/UCxsYR3_7CKZeRfdJpqGxmdw"),
    (8, "https://www.instagram.com/thevie/"),
    (8, "https://open.spotify.com/intl-fr/artist/2UwqpfQtNuhBwviIC0f2ie"),
    (9, "https://www.youtube.com/@vladimircauchemar8737"),
    (9, "https://www.instagram.com/vladimircauchemar/"),
    (9, "https://open.spotify.com/intl-fr/artist/2V5xArcB3BGAHmwsK46tyU"),
    (10, "https://www.youtube.com/@4am_music"),
    (10, "https://www.instagram.com/4am_liam/"),
    (10, "https://open.spotify.com/intl-fr/artist/4faOOLWKfYRDZxun5sqEGo"),
    (11, "https://www.youtube.com/@daftpunk"),
    (11, "https://www.instagram.com/daftpunk/"),
    (11, "https://open.spotify.com/intl-fr/artist/4tZwfgrHOc3mvqYlEYSvVi"),
    (12, "https://www.youtube.com/channel/UCirb9Nrr54mVqVcd-P2A2ig"),
    (12, "https://www.instagram.com/louiseattaqueofficiel/"),
    (12, "https://open.spotify.com/intl-fr/artist/4CAsSAU842glNKJX71ndA9"),
    (13, "https://www.youtube.com/channel/UCNDAbwbXmmgosddFdUyRWwg"),
    (13, "https://www.instagram.com/wearephoenix/"),
    (13, "https://open.spotify.com/intl-fr/artist/1xU878Z1QtBldR7ru9owdU"),
    (14, "https://www.youtube.com/@gojira"),
    (14, "https://www.instagram.com/gojiraofficial/"),
    (14, "https://open.spotify.com/intl-fr/artist/0GDGKpJFhVpcjIGF8N6Ewt"),
    (15, "https://www.youtube.com/channel/UCmvtGezn6LpfUN1QW0aEaTg"),
    (15, "https://www.instagram.com/moderntalking.official/"),
    (15, "https://open.spotify.com/intl-fr/artist/79bxUQsBIXO8nVLB9fYKf7"),
    (16, "https://www.youtube.com/channel/UCFPlqTVnbYhXpW1rBLTwQ5g"),
    (16, "https://www.instagram.com/suprementm_officiel/"),
    (16, "https://open.spotify.com/intl-fr/artist/4ko6Ysxtvx9EY9GEFslrIz"),
    (17, "https://www.youtube.com/@RedHotChiliPeppers"),
    (17, "https://www.instagram.com/chilipeppers/"),
    (17, "https://open.spotify.com/intl-fr/artist/0L8ExT028jH3ddEcZwqJJ5"),
    (18, "https://www.youtube.com/channel/UCqk3CdGN_j8IR9z4uBbVPSg"),
    (18, "https://www.instagram.com/honeymoon/"),
    (18, "https://open.spotify.com/intl-fr/artist/00FQb4jTyendYWaN8pK0wa"),
    (19, "https://www.youtube.com/channel/UCDPM_n1atn2ijUwHd0NNRQw"),
    (19, "https://www.instagram.com/coldplay/"),
    (19, "https://open.spotify.com/intl-fr/artist/4gzpq5DPGxSnKTe4SA8HAU"),
    (20, "https://www.youtube.com/channel/UCYPs4y5esNqx6ax1CxZws6Q"),
    (20, "https://www.instagram.com/abba/"),
    (20, "https://open.spotify.com/intl-fr/artist/0LcJLqbBmaGUft1e9Mm8HV");





-- Insérer des données dans la table STYLE_MUSICAL
INSERT INTO STYLE_MUSICAL (nomSt) VALUES
    ("Rap"),
    ("Pop"),
    ("Disco"),
    ("Electro"),
    ("Musique électronique"),
    ("House"),
    ("Rock"),
    ("Métal");

INSERT INTO GROUPE_STYLE (idG, idSt) VALUES

    (1, 1),
    (2, 1),
    (3, 1),
    (4, 1),
    (6, 1),
    (7, 1),
    (8, 1),
    (10, 1),
    (16, 1),
    (5, 2),
    (5, 3),
    (5, 4),
    (9, 5),
    (11, 3),
    (11, 5),
    (11, 6),
    (12, 7),
    (13, 7),
    (14, 8),
    (15, 2),
    (17, 7),
    (18, 2),
    (18, 7),
    (19, 2),
    (19, 7),
    (20, 2);


-- Insérer des données dans la table EVENEMENT
INSERT INTO EVENEMENT (idG, idL, nomE, heureDebutE, heureFinE, dateDebutE, dateFinE) VALUES
    -- Jour 1
    (1, 1, 'Concert de Saturn Citizen', '18:10:00', '19:10:00', '2024-06-21', '2024-06-21'),
    (10, 1, "Concert de 4am-Liam", "20:00:00", "20:50:00", '2024-06-21', '2024-06-21'),
    (2, 1, "Activité Annexe d'Opium'", "21:30:00", "22:00:00", '2024-06-21', '2024-06-21'),

    (17, 2, 'Concert de Red Hot Chili Peppers', '18:10:00', '19:30:00', '2024-06-21', '2024-06-21'),
    (10, 2, "Activité annexe de 4am-Liam", "21:00:00", "21:30:00", '2024-06-21', '2024-06-21'),
    (2, 2, "Concert d'Opium'", "22:00:00", "23:00:00", '2024-06-21', '2024-06-21'),
    
    (6, 3, "Concert de Luther", "18:30:00", "19:30:00", '2024-06-21', '2024-06-21'),
    (18, 3, 'Activité Annexe de Lana Del Rey', '20:05:00', '20:50:00', '2024-06-21', '2024-06-21'),
    (18, 3, "Concert de Lana Del Rey", "21:30:00", "22:45:00", '2024-06-21', '2024-06-21'),

    -- Jour 2

    (11, 1, "Concert des Daft Punk", "18:00:00", "19:30:00", '2024-06-22', '2024-06-22'),
    (9, 1, "Concert de Vladimir Cauchemar", "20:00:00", "21:30:00", '2024-06-22', '2024-06-22'),
    (9, 1, "Activité annexe de Vladimir Cauchemar", "22:00:00", "22:30:00", '2024-06-22', '2024-06-22'),

    (3, 2, "Concert de New Wave", "18:00:00", "19:00:00", '2024-06-22', '2024-06-22'),
    (7, 2, "Concert de Booba", "19:20:00", "20:20:00", '2024-06-22', '2024-06-22'),
    (7, 2, "Activité annexe de Booba", "20:45:00", "21:30:00", '2024-06-22', '2024-06-22'),
    (16, 2, "Concert de Suprême NTM", "21:45:00", "23:00:00", '2024-06-22', '2024-06-22'),

    (5, 3, "Concert de L'impératrice", "18:00:00", "20:00:00", '2024-06-22', '2024-06-22'),
    (5, 3, "Activité Annexe de L'impératrice", "20:30:00", "21:00:00", '2024-06-22', '2024-06-22'),
    (13, 3, "Concert de Phoenix", "21:30:00", "23:00:00", '2024-06-22', '2024-06-22'),

    -- Jour 3

    (12, 1, "Concert de Louise Attaque", "18:00:00", "19:30:00", '2024-06-23', '2024-06-23'),
    (12, 1, "Activité Annexe de Louise Attaque", "20:00:00", "20:30:00", '2024-06-23', '2024-06-23'),
    (14, 1, "Concert de Gojira", "21:00:00", "22:30:00", '2024-06-23', '2024-06-23'),

    (15, 2, "Concert de Modern Talking", "18:00:00", "19:30:00", '2024-06-23', '2024-06-23'),
    (15, 2, "Activité Annexe de Modern Talking", "20:00:00", "20:30:00", '2024-06-23', '2024-06-23'),
    (19, 2, "Concert de Coldplay", "21:00:00", "22:30:00", '2024-06-23', '2024-06-23'),

    (20, 3, "Concert d'ABBA", "18:00:00", "19:30:00", '2024-06-23', '2024-06-23'),
    (8, 3, "Concert de Damso", "20:00:00", "20:30:00", '2024-06-23', '2024-06-23'),
    (4, 3, "Concert d'IAM", "21:00:00", "22:45:00", '2024-06-23', '2024-06-23');


-- Insérer des données dans la table CONCERT
INSERT INTO CONCERT (idE, tempsMontage, tempsDemontage) VALUES
    -- Jour 1 
    (1,"00:10:00", "00:10:00"),
    (2,"00:10:00", "00:10:00"),
    (4,"00:30:00", "00:10:00"),
    (6,"00:10:00", "00:10:00"),
    (7,"00:10:00", "00:10:00"),
    (9,"00:10:00", "00:10:00"),

    -- Jour 2
    (10,"00:10:00", "00:10:00"),
    (11,"00:10:00","00:10:00"),
    (13,"00:10:00","00:10:00"),
    (14,"00:10:00","00:10:00"),
    (16,"00:10:00","00:10:00"),
    (17,"00:10:00","00:10:00"),
    (19,"00:10:00","00:10:00"),

    -- Jour 3
    (20,"00:10:00","00:10:00"),
    (22,"00:10:00","00:10:00"),
    (23,"00:10:00","00:10:00"),
    (25,"00:10:00","00:10:00"),
    (26,"00:10:00","00:10:00"),
    (27,"00:10:00","00:10:00"),
    (28,"00:10:00","00:10:00");
    

-- Insérer des données dans la table ACTIVITE_ANNEXE
INSERT INTO ACTIVITE_ANNEXE (idE, typeA, ouvertAuPublic) VALUES
    -- Jour 1
    (3, 'Interview', false),
    (5, 'Interview', false),
    (8, 'Séance de dédicaces', true),
    

    -- Jour 2
    (12, 'Backstage', true),
    (15, 'Séance de dédicace', true),
    (18, 'Activité composition', true),

    -- Jour 3
    (21, 'Session photographies', true),
    (24, 'Backstage', true);



