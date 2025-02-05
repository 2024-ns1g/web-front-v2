import { FC } from "react";
import { Card, CardBody, Switch } from "@nextui-org/react";
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
          <div className="flex flex-col gap-4">
            {availableVotes.map((vote) => {
              const isActive = activeVoteIds.includes(vote.voteId);
              return (
                <Card key={vote.voteId} className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold">{vote.title}</h3>
                      <p className="text-gray-600">{vote.question}</p>
                    </div>
                    <Switch
                      isSelected={isActive}
                      onValueChange={(newValue: boolean) => {
                        if (newValue) {
                          onActivateVote(vote.voteId);
                        } else {
                          onDeactivateVote(vote.voteId);
                        }
                      }}
                    />
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
