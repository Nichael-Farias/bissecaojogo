
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const HelpSection = () => {
  return (
    <Alert className="mb-4 animate-fade-in">
      <AlertTitle>Como jogar</AlertTitle>
      <AlertDescription>
        <p className="mb-2">O método da bisseção encontra raízes de funções dividindo o intervalo ao meio repetidamente.</p>
        <ol className="list-decimal pl-5 space-y-1">
          <li>Observe o gráfico para entender o comportamento da função.</li>
          <li>Clique em "Calcular Ponto Médio" para encontrar o ponto médio.</li>
          <li>Escolha o subintervalo que contém a raiz (onde f(x) muda de sinal).</li>
          <li>Continue até encontrar a aproximação da raiz.</li>
        </ol>
      </AlertDescription>
    </Alert>
  );
};

export default HelpSection;
