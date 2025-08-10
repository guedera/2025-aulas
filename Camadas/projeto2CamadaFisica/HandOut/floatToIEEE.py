import struct

def float_to_ieee754(numbers):
    ieee_list = []
    for number in numbers:
        # Usa a biblioteca struct para empacotar o número em formato IEEE 754
        packed = struct.pack('>f', number)
        # Converte os bytes empacotados para uma lista de inteiros (bytes)
        byte_list = list(packed)
        # Adiciona cada byte à lista
        ieee_list.extend(byte_list)
    return ieee_list

# Exemplo de uso
# x = [1.12312, 1.23, 23.5443]
# ieee754_list = float_to_ieee754(x)

# # Imprime a lista de bytes
# print(ieee754_list)
# print(type(ieee754_list[0]))