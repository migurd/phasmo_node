export default interface IAlert {
  title: string;
  message: string;
  depth: number;
  isVisible: boolean;
  isReload?: boolean;
  element?: JSX.Element;
  height?: number;
  width?: number;
  onClick: () => void;
}