
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfgen import canvas
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.pagesizes import A4
from reportlab.platypus import Paragraph
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib.colors import HexColor
from reportlab.platypus import Table, TableStyle
from reportlab.lib.colors import Color

pdfmetrics.registerFont(TTFont('TuskerGrotesk', './gen_pdf/tusker-grotesk-font/TuskerGrotesk-3700Bold.ttf'))
pdfmetrics.registerFont(TTFont('Bold', './gen_pdf/montserrat/Montserrat-Bold.ttf'))
pdfmetrics.registerFont(TTFont('Regular', './gen_pdf/montserrat/Montserrat-Regular.ttf'))
transparent = Color(0, 0, 0, alpha=0)
color_orange = HexColor("#E45A3B")
color_orange_secondary= HexColor("#E97B62")
color_dark = HexColor("#757A80")
color_darker = HexColor("#19212C")
color_white = HexColor("#FFFFFF")
img_path = "./gen_pdf/img"
width, height = A4
styles = getSampleStyleSheet()

def get_base_pdf(titre: str, nomUser:str,prenomUser:str, nom_fic:str):
       
    logo_path = img_path + "/logo.jpg"
    
    c = canvas.Canvas(nom_fic+".pdf")
    
    # ajoute l'image tout en haut
    c.drawImage(logo_path, 59, height-100, width=167, height=74)
 
    styles = getSampleStyleSheet()
    style = styles["BodyText"]
    style.fontSize = 14
    style.textColor = color_orange
    style.alignment = 2
    
    p = Paragraph("FEST IUT’O", style=styles["BodyText"])
    p.wrapOn(c, 200, 600)
    p.drawOn(c, width-250, height-45)
    
    p = Paragraph("Olivet, 45160", style=styles["BodyText"])
    p.wrapOn(c, 200, 600)
    p.drawOn(c, width-250, height-65)
    
    p = Paragraph("21 au 23 juin 2024", style=styles["BodyText"])
    p.wrapOn(c, 200, 600)
    p.drawOn(c, width-250, height-84)
    
    
    style.alignment = 0
    style.fontName="Bold"
    
    p = Paragraph(titre, style=styles["BodyText"])
    p.wrapOn(c, 200, 600)
    p.drawOn(c, 59, height-150)
    
    style.alignment = 2
    style.textColor = color_orange_secondary
    style.fontName="Regular"
    p = Paragraph(nomUser.upper()+" "+prenomUser.upper(), style=styles["BodyText"])
    p.wrapOn(c, 200, 600)
    p.drawOn(c, width-250, height-150)
    
    return c

def get_pdf_billet(nomUser: str, prenomUser:str):
    c = get_base_pdf("Mes billets", nomUser, prenomUser,"billet")
    img_billet_path = img_path + "/billet.jpg"
    c.drawImage(img_billet_path, 59, height-413, width=484, height=167.3)
    style = styles["BodyText"]
    
    text = u"""
             1.Introduction au billet : "Félicitations ! Vous détenez maintenant votre billet pour l’édition 2024 de FEST IUT’O. Nous sommes ravis de vous accueillir à cet événement exceptionnel. Veuillez lire attentivement les informations ci-dessous pour vous assurer une expérience inoubliable."
        <br/>2.Avis de sécurité : "Votre sécurité est notre priorité. Veuillez suivre les consignes de sécurité affichées sur le site du festival. En cas de besoin, n'hésitez pas à solliciter l'aide du personnel de sécurité. Les sacs seront soumis à une inspection à l'entrée pour assurer la sécurité de tous."
        <br/>3.Conditions d'admission : "Ce billet est votre pass d'entrée au festival. Assurez-vous de l'avoir sur vous en tout temps. L'accès au site sera refusé en l'absence de ce billet. Les billets sont non remboursables, veuillez les conserver en lieu sûr."
        <br/>4.Horaires et Artistes : "Consultez l'horaire officiel du festival pour connaître les horaires de chaque artiste et les performances spéciales. Planifiez votre journée en fonction de vos artistes préférés et des événements qui vous tiennent à cœur."
        <br/>5.Instructions pour l'entrée : "Pour faciliter votre entrée, veuillez arriver tôt. Présentez ce billet à l'entrée du festival, où il sera scanné pour vérification. Assurez-vous de suivre les indications du personnel pour un processus d'entrée fluide."
        <br/>6.Objets interdits : "Certaines articles sont interdits sur le site, y compris les armes, les substances illicites, les objets tranchants, etc. Consultez notre site web pour la liste complète des articles interdits. Tout non-respect de ces règles entraînera l'expulsion du festival."
        <br/>7.Engagement envers l'environnement : "Nous sommes fiers de notre engagement envers l'environnement. Aidez-nous à maintenir la propreté du site en utilisant les poubelles et en respectant l'environnement naturel qui nous entoure."
        <br/>8.Contact d'urgence : "En cas d'urgence, veuillez contacter le personnel de sécurité ou les points d'information sur le site. 
        <br/>9.Remerciements et encouragement : "Nous vous remercions d'être des participants essentiels à cette expérience. Profitez pleinement de FEST IUT’O et créez des souvenirs mémorables. Nous sommes ravis de partager ces moments exceptionnels avec vous."
            """
    
    
    style.alignment = 4
    style.fontSize = 10
    style.textColor = color_dark
    
    p = Paragraph(text, style=style)
    p.wrapOn(c, 484, 600)
    p.drawOn(c, 59, height-800)
    
    c.save()

def get_pdf_planing(nomUser:str, prenomUser:str, data):
    print(data)
    c = get_base_pdf("Ma planification", nomUser, prenomUser,"planification")
    style = styles["BodyText"]
    
    y = height-200
    
    for liste in data:
        datePassage = liste[0]
        listePassages = liste[1]
        print(datePassage)
        print(listePassages)
        if (len(listePassages) > 0):
            tableau = [["Horaire", "Artiste", "Genre", "Scene"]]
            for passage in listePassages:
                liste_genres_musicaux = passage["genresMusicaux"]
                liste_genres_string = ""
                for i in range(len(liste_genres_musicaux)):
                    liste_genres_string += liste_genres_musicaux[i]
                    if i < len(liste_genres_musicaux) - 1:
                        liste_genres_string += ", "
                tableau.append([passage['heurePassage']+" - " + passage["heureFinPassage"], passage["nomG"], liste_genres_string, passage['scene']])

    
            t = Table(tableau)
            colWidth = (width-100)/4
            t._argW = [colWidth] * 4

            # Avant mon tableau j'ai envie d'ajouter un texte en darker qui dirait 22 JUILLET

            style.alignment = 0
            style.fontSize = 14
            style.textColor = color_darker
            style.fontName="Bold"
            dicoNumMois = {"01":"Janvier", "02":"Février", "03":"Mars", "04":"Avril", "05":"Mai", "06":"Juin", "07":"Juillet", "08":"Août", "09":"Septembre", "10":"Octobre", "11":"Novembre", "12":"Décembre"}
            mois = dicoNumMois[datePassage.split("-")[1]]
            jour = datePassage.split("-")[2]
            dateFormatee = jour + " " + mois.upper()
            p = Paragraph(dateFormatee, style=styles["BodyText"])
            p.wrapOn(c, 200, 600)
            p.drawOn(c, 59, y)
            
            y -= 10

            # Ajoutez un style au tableau
            t.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), color_darker),
            ('TEXTCOLOR', (0, 0), (-1, 0), color_white),  # Couleur du texte pour l'en-tête
            ('TEXTCOLOR', (0, 1), (-1, -1), color_darker),  # Couleur du texte pour le reste du tableau

            ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
            ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
            ('FONTSIZE', (0, 0), (-1, 0), 14),

            ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
            ('BACKGROUND', (0, 1), (-1, -1), transparent),
            ]))

            # Dessinez le tableau sur le canvas
            t.wrapOn(c, 500, 600)
            y -= 20*len(tableau)
            t.drawOn(c, 59, y)
            
            y -= 25
            
    text = u"""
    1.Introduction au document : "Bienvenue dans votre planification personnalisée pour le Festival [Nom du Festival] ! Ce document a été conçu pour vous aider à organiser votre expérience festivalière de manière optimale. Prenez le temps de personnaliser votre emploi du temps en fonction de vos artistes préférés et des événements que vous souhaitez absolument ne pas manquer."
<br/>2.Avis important : "Veuillez noter que ce document de planification personnalisée n'est pas un ticket d'admission au festival. Assurez-vous d'obtenir vos billets officiels avant l'événement pour garantir votre accès. Consultez notre site web ou contactez notre service clientèle pour plus d'informations sur l'achat de billets."
<br/>3.Flexibilité des horaires : "Gardez à l'esprit que les horaires des artistes et des événements sont sujets à des changements éventuels. Nous vous encourageons à vérifier régulièrement les mises à jour de l'horaire sur notre site web ou sur le site officiel du festival pour vous assurer d'obtenir les informations les plus récentes."
<br/>4Conseils pour une expérience optimale : "Pour maximiser votre plaisir au festival, assurez-vous de planifier des pauses pour vous détendre et explorer d'autres aspects de l'événement. N'hésitez pas à découvrir de nouveaux artistes et à participer aux activités spéciales prévues.
<br/>5.Contact et assistance : "Si vous avez des questions ou si vous avez besoin d'assistance pendant le festival, notre équipe est là pour vous aider. Recherchez les points d'information sur le site ou contactez notre service clientèle par téléphone ou par courriel. Nous sommes là pour garantir que votre expérience soit mémorable et agréable."
    """
    style.alignment = 4
    style.fontSize = 10
    style.textColor = color_dark
    
    p = Paragraph(text, style=style)
    p.wrapOn(c, 484, 600)
    p.drawOn(c, 59, y-270)
    
    c.save()