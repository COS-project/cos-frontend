import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';

import { Round, Session } from '@/types/global';
import { selectedRoundState, selectedSessionState } from '@/utils/recoilState';

const RoundFilter: React.FC = () => {
  const [selectedSession, setSelectedSession] = useRecoilState<Session | null>(selectedSessionState);
  const [selectedRound, setSelectedRound] = useRecoilState<Round | null>(selectedRoundState);

  // session에서 roundNumber를 추출하여 중복 제거한 배열
  const uniqueRoundNumbers = Array.from(new Set(selectedSession?.rounds.map((round) => round.roundNumber) || []));

  const handleRoundChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedRoundNumber = parseInt(event.target.value, 10);
    const selectedRound = selectedSession?.rounds.find((round) => round.roundNumber === selectedRoundNumber) || null;
    setSelectedRound(selectedRound);
  };

  return (
    <div className="mt-2">
      <select
        id="subject"
        name="subject"
        value={selectedRound?.roundNumber || ''}
        onChange={handleRoundChange}
        className="w-[100%] mx-auto mt-1 text-h4 font-bold block p-3 bg-white rounded-xl shadow-sm focus:outline-none focus:ring focus:border-blue-300 sm:text-sm">
        {uniqueRoundNumbers.map((round, index) => (
          <option key={index} value={round}>
            {round}회
          </option>
        ))}
      </select>
    </div>
  );
};

export default RoundFilter;
