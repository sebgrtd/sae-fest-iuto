import random
def genererCode():
    """
    Génère un code aléatoire de 6 caractères
    :return: code
    """
    code = ""
    for i in range(6):
        code += str(random.randint(0, 9))
    return code