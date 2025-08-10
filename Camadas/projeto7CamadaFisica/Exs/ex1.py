import numpy as np
import matplotlib.pyplot as plt
from scipy import signal
import sounddevice as sd
from scipy.io import wavfile

# Parâmetros de amostragem
fs = 44100  # Frequência de amostragem em Hz
duration = 3  # Duração do sinal em segundos
t = np.linspace(0, duration, int(fs * duration), endpoint=False)  # Vetor de tempo

# Criação de um sinal com componentes acima de 500Hz
# Combinando senoides com diferentes frequências
signal_200hz = np.sin(2 * np.pi * 200 * t)        # 200Hz (abaixo de 500Hz)
signal_400hz = 0.5 * np.sin(2 * np.pi * 400 * t)  # 400Hz (abaixo de 500Hz)
signal_800hz = 0.3 * np.sin(2 * np.pi * 800 * t)  # 800Hz (acima de 500Hz)
signal_1500hz = 0.2 * np.sin(2 * np.pi * 1500 * t) # 1500Hz (acima de 500Hz)

# Sinal combinado
signal_original = signal_200hz + signal_400hz + signal_800hz + signal_1500hz

# Normalização do sinal
signal_original = signal_original / np.max(np.abs(signal_original))

# Cálculo da FFT do sinal original
N = len(signal_original)
yf_original = np.fft.rfft(signal_original)
xf = np.fft.rfftfreq(N, 1/fs)  # Frequências correspondentes

# Design do filtro passa-baixas (Butterworth)
cutoff_freq = 500.0  # Frequência de corte em Hz
nyquist_freq = fs / 2.0
order = 6  # Ordem do filtro

# Cálculo dos coeficientes do filtro
b, a = signal.butter(order, cutoff_freq/nyquist_freq, btype='low')

# Aplicação do filtro ao sinal original
signal_filtered = signal.filtfilt(b, a, signal_original)

# Cálculo da FFT do sinal filtrado
yf_filtered = np.fft.rfft(signal_filtered)

# Visualização dos sinais e suas FFTs
plt.figure(figsize=(12, 10))

# Sinal original no domínio do tempo
plt.subplot(2, 2, 1)
plt.plot(t, signal_original)
plt.title('Sinal Original (Domínio do Tempo)')
plt.xlabel('Tempo (s)')
plt.ylabel('Amplitude')

# Sinal filtrado no domínio do tempo
plt.subplot(2, 2, 2)
plt.plot(t, signal_filtered)
plt.title('Sinal Filtrado (Domínio do Tempo)')
plt.xlabel('Tempo (s)')
plt.ylabel('Amplitude')

# FFT do sinal original
plt.subplot(2, 2, 3)
plt.plot(xf, np.abs(yf_original))
plt.title('FFT do Sinal Original')
plt.xlabel('Frequência (Hz)')
plt.ylabel('Magnitude')
plt.axvline(x=500, color='r', linestyle='--', label='Corte (500 Hz)')
plt.xlim([0, 2000])  # Limitando visualização até 2kHz
plt.legend()

# FFT do sinal filtrado
plt.subplot(2, 2, 4)
plt.plot(xf, np.abs(yf_filtered))
plt.title('FFT do Sinal Filtrado')
plt.xlabel('Frequência (Hz)')
plt.ylabel('Magnitude')
plt.axvline(x=500, color='r', linestyle='--', label='Corte (500 Hz)')
plt.xlim([0, 2000])  # Limitando visualização até 2kHz
plt.legend()

plt.tight_layout()
plt.savefig('filtro_passa_baixas.png')
plt.show()

# Reprodução dos sinais
print("\nReproduzindo o sinal original...")
sd.play(signal_original, fs)
sd.wait()  # Aguarda a reprodução terminar

print("Reproduzindo o sinal filtrado...")
sd.play(signal_filtered, fs)
sd.wait()  # Aguarda a reprodução terminar

# Salvar os sinais como arquivos de áudio WAV
wavfile.write('sinal_original.wav', fs, signal_original)
wavfile.write('sinal_filtrado.wav', fs, signal_filtered)

print("\nOs sinais foram salvos como 'sinal_original.wav' e 'sinal_filtrado.wav'")
print("\nObservações:")
print("1. No sinal original, você deve ouvir componentes de alta frequência que dão um som mais 'brilhante'.")
print("2. No sinal filtrado, as frequências acima de 500Hz foram atenuadas, tornando o som mais 'abafado'.")
print("3. A diferença é perceptível porque nosso sistema auditivo é sensível a frequências até aproximadamente 20kHz.")
print("\nQuestões para reflexão:")
print("- Qual diferença você percebeu entre os dois áudios?")
print("- O filtro atenuou completamente todas as frequências acima de 500Hz?")
print("- Qual o efeito da ordem do filtro na atenuação das frequências?")
