import React, { useState } from "react";
import { Formik } from "formik";
import { createRoomFormSchema } from "@/types/validate/createRoomFormSchema";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/modal";
import { z } from "zod";
import { useApis } from "@/hooks/use-api";
import { toFormikValidationSchema } from 'zod-formik-adapter';

interface CreateRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  completedCallback: () => void;
}

type CreateRoomFormType = z.infer<typeof createRoomFormSchema>;

const CreateRoomModal: React.FC<CreateRoomModalProps> = ({ isOpen, onClose, completedCallback }) => {
  const api = useApis();

  const [message, setMessage] = useState<{ message: string; isError: boolean }>({
    message: "",
    isError: false,
  });

  const handle = async (values: CreateRoomFormType) => {
    try {
      await api.room.createRoom({ displayName: values.displayName }).then(() => {
        completedCallback();
        onClose();
      });
    } catch (err: any) {
      setMessage({ message: err.message || "Create failed", isError: true });
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
      closeButton
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">新しいルームを作成</ModalHeader>
        <ModalBody>
          {/* エラーメッセージの表示 */}
          {message.message && (
            <div
              className={`text-center py-2 text-sm ${message.isError ? "text-red-500" : "text-green-500"
                }`}
            >
              {message.message}
            </div>
          )}

          {/* フォーム */}
          <Formik
            initialValues={{ displayName: "新しいルーム" }}
            validationSchema={toFormikValidationSchema(createRoomFormSchema)}
            onSubmit={handle}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleSubmit,
            }) => (
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col w-full gap-4 mb-4">
                  <Input
                    variant="bordered"
                    label="ルーム名"
                    type="text"
                    name="displayName"
                    value={values.displayName}
                    isInvalid={!!errors.displayName && !!touched.displayName}
                    onChange={handleChange}
                  />
                </div>

                <div className="flex gap-4 justify-end pb-2">
                  <Button type="submit" variant="flat" color="primary">
                    作成
                  </Button>
                  <Button onPress={onClose} color="danger" variant="light">
                    閉じる
                  </Button>
                </div>
              </form>
            )}
          </Formik>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CreateRoomModal;
