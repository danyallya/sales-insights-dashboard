import { Component, type ErrorInfo, type ReactNode } from 'react';

type Props = { children: ReactNode };
type State = { failed: boolean };

export default class ChartErrorBoundary extends Component<Props, State> {
  state: State = { failed: false };

  static getDerivedStateFromError(): State {
    return { failed: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Revenue chart failed to render.', error, info.componentStack);
  }

  render() {
    if (this.state.failed) {
      return (
        <div className="chart-state" role="alert">
          <strong>Revenue trend is unavailable</strong>
          <span>The rest of the dashboard is still available.</span>
          <button type="button" onClick={() => this.setState({ failed: false })}>Try chart again</button>
        </div>
      );
    }

    return this.props.children;
  }
}
