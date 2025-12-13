"use client";

import { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onReset?: () => void;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Error Boundary capturou um erro:", error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });

    // Aqui pode integrar com um serviço de logging como Sentry
    // if (process.env.NODE_ENV === 'production') {
    //   Sentry.captureException(error, { extra: errorInfo });
    //
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });

    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  private handleReload = () => {
    window.location.reload();
  };

  private handleGoHome = () => {
    window.location.href = "/";
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-background flex items-center justify-center p-6">
          <div className="max-w-md w-full text-center">
            <div className="mx-auto w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mb-6">
              <AlertTriangle className="w-8 h-8 text-destructive" />
            </div>

            <h1 className="text-2xl font-bold text-foreground mb-3">
              Algo deu errado
            </h1>

            <p className="text-muted-foreground mb-6">
              Desculpe pelo inconveniente. Encontramos um erro inesperado.
            </p>

            {/* Detalhes apenas em desenvolvimento */}
            {process.env.NODE_ENV === "development" && this.state.error && (
              <details className="mb-6 text-left">
                <summary className="cursor-pointer text-sm text-muted-foreground mb-2">
                  Detalhes do erro (Desenvolvimento)
                </summary>
                <pre className="bg-muted p-3 rounded-lg text-xs overflow-auto max-h-40">
                  {this.state.error.toString()}
                  {"\n\n"}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </details>
            )}

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                onClick={this.handleReset}
                variant="outline"
                className="flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Tentar Novamente
              </Button>

              <Button
                onClick={this.handleReload}
                variant="default"
                className="flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Recarregar Página
              </Button>

              <Button
                onClick={this.handleGoHome}
                variant="ghost"
                className="flex items-center gap-2"
              >
                <Home className="w-4 h-4" />
                Página Inicial
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
