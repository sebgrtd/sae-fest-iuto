import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

class EmailSender:
    def __init__(self, email, password):
        self.email = email
        self.server = smtplib.SMTP('smtp.gmail.com', 587)
        self.server.starttls()
        self.server.login(email, password)
    
    def sendCodeVerification(self,emailUser, code):
        msg = MIMEMultipart()
        msg['From'] = self.email
        msg['To'] = emailUser
        msg['Subject'] = "Code de vérification Festi'Uto"
        
        message = "Votre code de vérification est : " + code
        msg.attach(MIMEText(message, 'plain'))
        
        self.server.sendmail(self.email, emailUser, msg.as_string())