type CommentProps = {
  comment: string;
};
export default function CommentComponent({ comment }: CommentProps) {
  debugger;
  return (
    <div className="p-4 mb-4 border-solid border-2 rounded-xl block max-w-4xl">
      {comment}
    </div>
  );
}
