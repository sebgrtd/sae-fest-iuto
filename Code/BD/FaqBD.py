from BD import Faq
from ConnexionBD import ConnexionBD
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.sql.expression import text
import json

class FaqBD:
    def __init__(self, conx: ConnexionBD):
        self.connexion = conx

    def get_faqs(self):
        try:
            query = text("SELECT * FROM FAQ")
            result = self.connexion.get_connexion().execute(query)
            faqs = []
            for idFaq, question, reponse in result:
                faqs.append(Faq(idFaq, question, reponse))
            return faqs
        except SQLAlchemyError as e:
            print(f"La requête a échoué : {e}")
            return None
        
    def get_faqs_json(self):
        faqs = self.get_faqs()
        faqs_json = []
        for faq in faqs:
            faqs_json.append(faq.to_dict())
        return json.dumps(faqs_json, ensure_ascii=False)

    def faq_to_json(self, faq):
        return json.dumps(faq.to_dict(), ensure_ascii=False)