from enlace import *
import time
import numpy as np

serialName = "/dev/ttyACM0"           # Ubuntu (variacao de)

def main():
    try:
        print("Iniciou o main")
        com1 = enlace(serialName)
        
        com1.enable()
        print("Abriu a comunicação")
        
        imageR = "/home/guedera/Documents/Aulas/Camadas/projeto1CamadaFisica/HandOut/imgs/image.png"
        imageW = "/home/guedera/Documents/Aulas/Camadas/projeto1CamadaFisica/HandOut/imgs/copia.png"

        txBuffer = open(imageR, 'rb').read()
        
        print("Meu array de bytes tem tamanho {}" .format(len(txBuffer)))
        
        print("Transmissão iniciada!")
        com1.sendData(np.asarray(txBuffer))  #as array apenas como boa pratica para casos de ter uma outra forma de dados
        
        txSize = com1.tx.getStatus()
        print('enviou = {} bytes' .format(txSize))
        
        print("\n")
        print("Recepção iniciada!")
        print("\n")

        txLen = len(txBuffer)
        rxBuffer, nRx = com1.getData(txLen)
        print("recebeu {} bytes" .format(len(rxBuffer)))
        print("\n")
        
        f = open(imageW, 'wb')
        f.write(rxBuffer)

        f.close()

        print("-------------------------")
        print("Comunicação encerrada")
        print("-------------------------")
        com1.disable()
        
    except Exception as erro:
        print("ops! :-\\")
        print(erro)
        com1.disable()
        
if __name__ == "__main__":
    main()
