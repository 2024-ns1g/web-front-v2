import { FC, useMemo, useEffect } from "react";
import { Radio, RadioGroup } from "@nextui-org/react";
import { VoteChoice } from "@/types/session/vote-choice";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";

interface VoteDrawerBodyProps {
 voteId: string
 voteTitle: string
 voteQuestion: string
 choices: VoteChoice[]
 stats: { choiceId: string; count: number }[]
 selectedChoice: string | null
 onChoiceChange: (choiceId: string) => void
 votedHandler: (voteId: string, choiceId: string) => void
}

// シンプルなランダムカラー生成（必要に応じて調整）
const generateRandomColorPair = () => {
  const randomColor = () =>
    "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0")
  return {
    background: randomColor(),
    border: randomColor()
  }
}

export const VoteDrawerBody: FC<VoteDrawerBodyProps> = ({
 voteId,
 voteTitle,
 voteQuestion,
 choices,
 stats,
 selectedChoice,
 onChoiceChange,
 votedHandler
}) => {
  // 背景色や枠線色が設定されていない場合、ランダムカラーを付与する
  const processedChoices = useMemo(() => {
    return choices.map(c => {
      if (!c.backgroundColor || !c.borderColor) {
        const { background, border } = generateRandomColorPair()
        return { ...c, backgroundColor: background, borderColor: border }
      }
      return c
    })
  }, [choices])

  // Doughnut チャート用のデータを生成
  const chartData = useMemo(() => ({
    labels: processedChoices.map(c => c.title),
    datasets: [{
      data: stats.map(s => s.count),
      backgroundColor: processedChoices.map(c => c.backgroundColor!),
      borderColor: processedChoices.map(c => c.borderColor!),
      borderWidth: 1
    }]
  }), [processedChoices, stats])

  // 選択が変わった際に votedHandler を実際に呼び出す
  useEffect(() => {
    if (selectedChoice) {
      votedHandler(voteId, selectedChoice)
    }
  }, [selectedChoice, voteId, votedHandler])

  return (
    <div>
      <h3>{voteTitle}</h3>
      <p>{voteQuestion}</p>
      <RadioGroup
        name="vote"
        value={selectedChoice ?? ""}
        onValueChange={onChoiceChange}
      >
        {processedChoices.map(c => (
          <Radio key={c.choiceId} value={c.choiceId}>
            {c.title}
          </Radio>
        ))}
      </RadioGroup>
      <Doughnut data={chartData} />
    </div>
  )
}
