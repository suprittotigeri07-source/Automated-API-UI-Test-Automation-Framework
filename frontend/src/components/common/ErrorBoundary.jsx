import React from 'react';
import { ShieldAlert, RotateCw, Home } from 'lucide-react';
import { Button } from './Button';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('TestPilot Uncaught Error Boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#F8F9FC] flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-white rounded-2xl border border-[#ADBBDA]/60 p-8 shadow-lg text-center space-y-4">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-[#D64545]/10 text-[#D64545] flex items-center justify-center">
              <ShieldAlert className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-[#172033]">Workspace Notice</h2>
            <p className="text-xs text-[#5F6B85] leading-relaxed">
              An unexpected interface error occurred during view rendering.
            </p>
            {this.state.error && (
              <div className="p-3 bg-[#172033] text-[#EDE8F5] rounded-xl text-left font-mono text-[11px] overflow-x-auto max-h-32">
                {this.state.error.message || String(this.state.error)}
              </div>
            )}
            <div className="pt-2 flex items-center justify-center gap-3">
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  this.setState({ hasError: false, error: null });
                  window.location.reload();
                }}
                className="gap-2"
              >
                <RotateCw className="w-3.5 h-3.5" />
                <span>Reload Page</span>
              </Button>
              <a href="/">
                <Button variant="outline" size="sm" className="gap-2">
                  <Home className="w-3.5 h-3.5" />
                  <span>Return Home</span>
                </Button>
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
