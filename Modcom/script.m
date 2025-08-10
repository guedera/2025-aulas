s = tf('s');
fn1 = 1/(s+0.5);
fn2 = 0.7/(s^2+1.7*s+0.3);
fn3 = 0.1/(s+0.1);

laco_aberto = fn1 * fn2 * fn3;

valoresk = [0.2, 0.5, 2.0];

for i = 1:length(valoresk)
    k = valoresk(i);
    laco_fechado = feedback(k*laco_aberto, 1);
    polos = pole(laco_fechado);
    
    partreal_max = max(real(polos));
    if partreal_max < 0
        estabilidade = 'Estavel';
        info_degrau = stepinfo(laco_fechado);
        sobressinal = info_degrau.Overshoot;
        fprintf('Para k = %.1f:\n', k);
        fprintf('  Sistema e %s\n', estabilidade);
        fprintf('  Sobressinal percentual: %.2f%%\n\n', sobressinal);
    elseif partreal_max > 0
        estabilidade = 'Instavel';
        fprintf('Para k = %.1f:\n', k);
        fprintf('  Sistema e %s\n\n', estabilidade);
    else
        estabilidade = 'Marginalmente Estavel';
        fprintf('Para k = %.1f:\n', k);
        fprintf('  Sistema e %s\n\n', estabilidade);
    end
end