# projeto1 - Camada Fisica

Nesse projeto foi explorado a transmissão de uma imagem por meio de um arduíno. Nele, foi possível explorar a conexão UART, que é um protocolo de comunicação serial, ou seja, mensagens são enviadas de maneira sequencial. Além disso, é um modo de transmissão assíncrono, ou seja, não tem um clock que determina quando as informações forem transmitidas. Nesse caso, cada caractér é enviado separadamente, com bits de início e parada.

De modo a conseguir o conceito `B`, vamos explorar os métodos do arquivo [enlanceRX.py](HandOut\enlaceRx.py).Dessa form, seguindo a ordem proposta: 

Esse arquivo é uma classe que modela a recepção de dadosm por isso o R, de receiver. Então com isso em mente:

- getBufferLen: Retorna o tamanho do buffer, que basicamente é uma região da memória que usada para armazenar os dados temporariamente enquanto eles estão sendo transmitidos. O método retorna o tamanho do buffer para que possamos medir se a transmissão de dados está da maneira esperada, em relação ao tempo e se todas as informações foram passadas, nenhuma foi perdida. Pontualmente, o que o método faz é retornar o tamanho do nosso buffer.

- getAllBuffer: Thread é uma sequencia de comandos dentro de um programa que pode ser executado independente das outras partes do código. Essa thread é especialmente útil, pois outras partes do codigo podem continuar funcionando mesmo que a leitura de dados não esteja feita ou tenha algum problema no tempo do processamento desses dados e ou na sua transmissão. No método thread, enquanto a variavel que permite ela rodar estiver setada como true, então efetivamente ela irá continuar lendo os dados e armazenando-os no buffer. Por isso, chegamos a esse método, que pega todo o tamamnho do buffer logo antes dessa thread parar de ser executada.Esse método pega o conteúdo do buffer, salva em uma variavel, limpa o buffer, deixando ele vazio e por meio da flag threadstop, ele para a thread, para que os dados não continuem sendo enviados ao ser lido o buffer.
 
- getBuffer: Basicamente são selecionados os dados do buffer que foram armazenados no atributo buffer, de modo de apenas pegar os novos dados, por isso o atributo buffer foi fatiado, para que apenas os novos dados fossem passados como retorno da chamada do método.

- getNData: Ao passar a quantidade de dados que queremos saber, o método vai nos retornar os dados recebidos no buffer após passar essa quantidade de interesse de dados, vamos dizer que seja x. Se passou x dados enviados, então a função irá nos retornar todos os x dados recebidos após executar ela. O time sleep funciona para não sobrecarregar a CPU e dar mais tempo para mais dados serem recebidos no buffer, para que sejam passados efetivamente os 100 dados. 

-sendBuffer: Envia efetivamente os dados por meio de uma interface fisica, que no caso é o nosso arduíno. Nele o detalhe de maior relevância é a pausa da contagem da quantidade de dados que foram transmitidos, reiniciando-o e então salva os dados que desejam ser enviados, cujo foram recebidos como parâmetro do método e os salva no buffer, para que, então sejam enviados.




###### `B+`: 
1. `Transmissão assíncrona`: É um tipo de transmissão que não possui um tempo como parâmetro para o envio de informações, ou seja, o que determina para o sistema que as mensagens devem ser enviadas e devem parar de enviar, são os bits de entrada e saída. 

2. `Start Bit`: É o bit de controle para que a transmissão assíncrona funcione, o que quero dizer, por meio dele, o sistema entende que os bytes serão enviados, no caso, cada byte tem dois bits extras para controle, uma vez que não possuem o clock de sincronia. Um ponto importante é que o tempo para o envio de cada bit deve ser pré acordado entre os elementos, para que haja o pleno funcionamento do sistema.

3. `Stop Bit`: O Stop bit é o outro bit que é adicionado em um byte na transmissão para que o sistema saiba que está no momento de parar a transmissão. 

4. `TX,RX,GND`: O TX e o RX são os meios onde as informações transitam. Por meio deles, as informações serão enviadas(Trasmiter) e recebidas(Receiver). Para que haja o pleno funcionamento desse sistema, é necessário que cada tx e rx esteja conectado no dispositivo do outro, de forma que as informações sejam trocadas entre os dispositivos. O receptor recebe as mensagens em bits, por meio de um quadro, uma estrutra padronizada de transmissão. O GND(ground), é fundamental para fechar o circuíto e fazer com que as tensões sejam enviadas de maneira satisfátoria, passando as informações desejadas por meio dos bits, que são representados por tensões de alta ou de baixa com o intuíto de minimizar má interpretações do circuíto, por ter uma referência fixa, que é o GND.

5. `Baud Rate`: É o número de bits que pode ser enviado por segundo. O baud rate foi determinado a partir do tempo pré determinado entre os elementos do sistema e por meio dele é metrificado se o número de bits enviado está de acordo com esse tempo antes estabelecido.

6. `Bit Rate`: O Bit Rate se refere à quantidade de bits transmitidos por segundo em um canal de comunicação. Em sistemas UART, ele normalmente coincide com o baud rate, visto que a transmissão é feita de forma assíncrona e sem codificação adicional por símbolo. No entanto, em sistemas onde mais de um bit pode ser representado por um único sinal, o bit rate pode ser maior que o baud rate. O cálculo do bit rate pode ser feito a partir da fórmula:

 Bit Rate = Baud Rate * Bits por Símbolo

 Isso significa que, para uma comunicação eficiente, os dispositivos envolvidos na transmissão precisam estar configurados com a mesma taxa de bits, garantindo que os dados sejam corretamente interpretados e não haja perda de informações.

7. `Buffer`: O buffer é uma estrutura de armazenamento temporário utilizada para garantir que os dados recebidos ou enviados não sejam perdidos durante a transmissão. Em uma comunicação UART, tanto o transmissor quanto o receptor podem utilizar buffers para armazenar os dados temporariamente antes de serem processados. Isso permite lidar com diferenças entre as velocidades de processamento dos dispositivos e reduzir o risco de perda de pacotes. O tamanho do buffer pode variar de acordo com o hardware utilizado, sendo comum o uso de buffers de hardware em microcontroladores para armazenar alguns bytes antes que o processador os leia. No caso de software, as threads podem ser utilizadas para gerenciar a leitura do buffer e evitar que ele transborde.

8. `Frame`: O frame na comunicação UART é a estrutura básica dos dados transmitidos. Ele é composto por um conjunto de bits que inclui:

1. **Start Bit:** Indica o início da transmissão, sinalizando ao receptor que um novo byte está chegando.
2. **Data Bits:** Contêm a informação sendo transmitida, podendo variar de 5 a 9 bits, sendo 8 bits o mais comum.
3. **Bit de Paridade (Opcional):** Um bit de controle que pode ser usado para verificar erros na transmissão.
4. **Stop Bit:** Indica o fim da transmissão do frame e permite que o receptor se prepare para um novo byte.

 Essa estrutura padronizada facilita a sincronização e interpretação dos dados entre diferentes dispositivos, garantindo a confiabilidade da comunicação.

9. `Bit de Paridade`: O bit de paridade é um mecanismo de detecção de erros simples usado na comunicação UART. Ele pode ser configurado como paridade par (even parity) ou ímpar (odd parity). O objetivo do bit de paridade é garantir que o número total de bits “1” no frame seja sempre par ou ímpar, dependendo da configuração.

- **Paridade Par (Even Parity):** O bit de paridade é ajustado para garantir que o número total de bits “1” seja par.
- **Paridade Ímpar (Odd Parity):** O bit de paridade é ajustado para garantir que o número total de bits “1” seja ímpar.
- **Sem Paridade (No Parity):** Nenhum bit de paridade é adicionado ao frame, o que reduz o overhead, mas pode aumentar o risco de erro sem detecção.

 Esse mecanismo permite detectar erros simples, como a inversão de um único bit, mas não corrige erros, necessitando de retransmissão dos dados em caso de falha.

10. `CRC` (Cyclic Redundancy Check):O CRC (Cyclic Redundancy Check) é um método mais robusto de detecção de erros usado em comunicações seriais, incluindo UART. Ele envolve o uso de um algoritmo matemático que calcula um valor de verificação (checksum) baseado nos dados transmitidos. O transmissor envia os dados juntamente com o valor CRC, e o receptor recalcula o CRC a partir dos dados recebidos. Se o CRC calculado pelo receptor for diferente do enviado pelo transmissor, significa que houve erro na transmissão.

 Embora a comunicação UART tradicionalmente use apenas paridade simples para detecção de erros, o CRC pode ser implementado em software para aumentar a confiabilidade da comunicação, principalmente em sistemas críticos onde a integridade dos dados é fundamental.

Guilherme GG
Enzo SC

