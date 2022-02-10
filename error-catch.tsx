import * as React from 'react';
import Logger from '@core/logger';
const logger = Logger.factory('error/catch');

// 默认错误组件
const noop: React.FC<any> = ({ errorStack = '' }) => <div>貌似出错了!,${errorStack}</div>;

interface ErrorCatchOption {
  ErrorComponent?: React.ComponentType<{ errorStack: string | null | undefined }>;
  isReport?: boolean;
}

/**
 * 错误监听组件
 * @param { ErrorComponent }  错误自定义组件
 */
function ErrorCatch({ ErrorComponent = noop, isReport = true }: ErrorCatchOption) {
  type HocState = {
    readonly errorStack: string | null | undefined;
    readonly hasError: boolean;
  };
  //配置组装机
  return (BaseComponent: React.ComponentType) => {
    return class WithCatchComponent extends React.Component<Record<string, any>> {
      static displayName = `withCache(${BaseComponent.name})`;
      // static readonly WrappedComponent = WithCatchComponent;

      readonly state: HocState = {
        hasError: false,
        errorStack: null
      };

      componentDidCatch(err: Error | null, errorInfo: React.ErrorInfo) {
        if (err) {
          this.setState(
            {
              hasError: true,
              errorStack: err.message || errorInfo.componentStack
            },
            () => {
              // 打印错误日志
              logger.error(`${WithCatchComponent.displayName}-`, errorInfo.componentStack);
            }
          );
        }
      }

      render() {
        const { hasError, errorStack } = this.state;
        if (hasError) {
          return <ErrorComponent errorStack={errorStack} />;
        }

        return <BaseComponent {...this.props} />;
      }
    };
  };
}

export default ErrorCatch;
