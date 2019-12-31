export interface MockBuildBaseSelector {
  _setSelector: (selector: string) => void;
  default: (componentName: string, prefix?: string) => string;
}
