export default interface IAlert {
  title: string;
  message: string;
  depth: number;
  isVisible: boolean;
  onClick: () => void;
}