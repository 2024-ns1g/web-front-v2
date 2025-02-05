import { FC } from "react";
import { Card, CardBody, Button } from "@nextui-org/react";
import { AvailableVote } from "@/types/session/session-info";

type PresenterBlockVoteControlProps = {
  availableVotes: AvailableVote[];
  activeVoteIds: string[];
  onActivateVote: (voteId: string) => void;
  onDeactivateVote: (voteId: string) => void;
};

export const PresenterBlockVoteControl: FC<PresenterBlockVoteControlProps> = ({
  availableVotes,
  activeVoteIds,
  onActivateVote,
  onDeactivateVote,
}) => {
  return (
    <Card className="w-full">
      <CardBody>
        {availableVotes.length === 0 ? (
          <p className="text-center text-gray-500">投票はありません。</p>
        ) : (
          <div className="flex flex-col space-y-4">
            {availableVotes.map((vote) => {
              const isActive = activeVoteIds.includes(vote.voteId);

              return (
                <Card key={vote.voteId} className="p-4">
                  <div className="flex flex-col">
                    <h3 className="text-xl font-bold">{vote.title}</h3>
                    <p className="text-gray-600">{vote.question}</p>
                    <div className="mt-2">
                      {isActive ? (
                        <Button
                          color="danger"
                          onPress={() => onDeactivateVote(vote.voteId)}
                        >
                          Deactivate
                        </Button>
                      ) : (
                        <Button
                          color="primary"
                          onPress={() => onActivateVote(vote.voteId)}
                        >
                          Activate
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </CardBody>
    </Card>
  );
};
