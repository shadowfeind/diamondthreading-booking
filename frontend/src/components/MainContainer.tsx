type MainCoProps = {
  children: React.ReactNode;
};

export default function MainContainer({ children }: MainCoProps) {
  return <div className="container mx-auto">{children}</div>;
}
