import struct

def ieee754_to_float(b):
    return struct.unpack('!f', b)[0]


#print(ieee754_to_float(b'\xc3\xf5H@'))


#print(ieee754_to_float(b'C\x7f\xcc\xc2'))