import CreateRoomModal from "@/components/modal/create-room-modal";
import { useApis } from "@/hooks/use-api";
import { Room } from "@/types/object/room";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { Tooltip } from "@nextui-org/tooltip";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ChooseRoom = () => {
  const api = useApis();

  const [rooms, setRooms] = useState<Room[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const updateRooms = () => {
    api.room.getJoinedRoomList(null).then((res) => {
      setRooms(res!.rooms);
    });
  }

  const selectHandler = (room: Room) => {
    // TODO: Impl
  }

  const onClose = () => {
    setIsOpen(false);
  }

  const roomCreateCompleted = () => {
    toast.success("ルームを作成しました");
    updateRooms();
  }

  // When the component is mounted
  useEffect(() => {
    updateRooms();
  }, []);

  return (
    <>
      <header className="flex justify-between items-center p-4 bg-white shadow z-50 sticky top-0 h-16">
        <h1 className="text-2xl font-bold">ルームを選択</h1>
        <Button color="primary" variant="shadow" onPress={() => setIsOpen(true)}>
          新規作成
        </Button>
      </header>

      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
        <div
          className={`flex flex-wrap gap-6 justify-center items-center ${rooms.length < 3 ? "h-full" : ""}`}
        >
          {rooms.map((room) => (
            <Card
              key={room.roomId}
              className="max-w-sm w-full transform transition duration-300 hover:scale-105 hover:shadow-lg border border-gray-300"
              isPressable
              onPress={() => selectHandler(room)}
            >
              <CardHeader>
                <div className="flex flex-col items-start">
                  <Tooltip content={room.displayName} placement="top">
                    <h3 className="text-lg font-semibold overflow-hidden text-ellipsis whitespace-nowrap max-w-full" title={room.displayName}>
                      {room.displayName}
                    </h3>
                  </Tooltip>
                  <br />
                  <p className="text-sm text-gray-500 mt-1">
                    所有者: {room.owner.displayName}
                  </p>
                </div>
              </CardHeader>
              <Divider />
              <CardBody>
                <p className="text-gray-700">
                  作成日時: {new Date(room.createdAt).toLocaleString()}
                </p>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
      <CreateRoomModal isOpen={isOpen} onClose={onClose} completedCallback={roomCreateCompleted} />
    </>
  );
}

export default ChooseRoom;
