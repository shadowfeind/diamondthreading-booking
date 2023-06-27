import { Badge } from "flowbite-react";

type errorProp = {
  errorMsg: string;
};

export default function ErrorComponent({ errorMsg }: errorProp) {
  return (
    <Badge color="failure" className="b-2 mb-4">
      {errorMsg}
    </Badge>
  );
}
