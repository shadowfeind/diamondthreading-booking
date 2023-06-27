import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Label, Modal, TextInput } from "flowbite-react";
import { useRef, useState } from "react";
import { createComment } from "../api/commentApi";
import ErrorComponent from "./ErrorComponent";

type ModelProps = {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
};
export default function ModalComponent({
  openModal,
  setOpenModal,
  id,
}: ModelProps) {
  const commentRef = useRef("");
  const [errors, setError] = useState(false);

  const queryClient = useQueryClient();

  const { mutateAsync, error, isError, isLoading }: any = useMutation(
    createComment,
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["comment", { id }], {
          exact: true,
        });
        setOpenModal(false);
      },
    }
  );

  const handleSubmit = async () => {
    if (commentRef.current.trim().length < 1) {
      setError(true);
    } else {
      setError(false);
      await mutateAsync({ comment: commentRef.current, customerId: id });
    }
  };

  return (
    <>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Add comment</Modal.Header>
        <Modal.Body>
          {isError && (
            <ErrorComponent errorMsg={error?.response?.data?.message} />
          )}
          <div className="space-y-6">
            <div className=" block">
              <Label
                color={errors ? "failure" : "gray"}
                htmlFor="comment"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                value="Add Comment"
              />
            </div>
            <TextInput
              color={errors ? "failure" : "gray"}
              type="text"
              id="comment"
              placeholder="Add a comment"
              onChange={(e) => (commentRef.current = e.target.value)}
              helperText={errors && "This field is required"}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button color="gray" onClick={() => setOpenModal(false)}>
            Cancel
          </Button>
          <button
            onClick={handleSubmit}
            type="button"
            className="text-white bg-diamond-purple  focus:ring-4 focus:ring-diamond-gold font-medium rounded-lg text-sm px-5 py-2.5 mr-2  dark:bg-blue-600  focus:outline-none dark:focus:ring-blue-800"
            disabled={isLoading}
          >
            {isLoading ? "Submitting" : "Submit"}
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
