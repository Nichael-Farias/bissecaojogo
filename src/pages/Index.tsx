
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="max-w-xl w-full">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-3xl">Jogo da Bisseção</CardTitle>
            <CardDescription>
              Aprenda o método da bisseção para encontrar raízes de funções de forma interativa
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p>O método da bisseção é uma técnica fundamental em cálculo numérico para encontrar raízes de funções.</p>
              <p>Neste jogo interativo, você vai aprender a aplicar o método da bisseção para encontrar as raízes de diferentes funções.</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link to="/jogo-bissecao">Começar o Jogo</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Index;
