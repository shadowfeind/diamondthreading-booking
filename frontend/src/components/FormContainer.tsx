export type formProps = {
  children: React.ReactNode;
};

export default function FormContainer({ children }: formProps) {
  return <div className="max-w-3xl mx-auto p-4">{children}</div>;
}
