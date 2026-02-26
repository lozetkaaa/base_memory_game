'use client';

import { useState, useCallback, useEffect } from 'react';

const CARDS = [
  { id: 1, symbol: '₿', name: 'Bitcoin' },
  { id: 2, symbol: 'Ξ', name: 'Ethereum' },
  { id: 3, symbol: '🔵', name: 'Base' },
  { id: 4, symbol: '◎', name: 'Solana' },
  { id: 5, symbol: '✦', name: 'Stars' },
  { id: 6, symbol: '⬡', name: 'Hex' },
];

type Card = {
  id: number;
  symbol: string;
  name: string;
  uniqueId: number;
  isFlipped: boolean;
  isMatched: boolean;
};

function shuffle(array: Card[]) {
  return [...array].sort(() => Math.random() - 0.5);
}

function createCards(): Card[] {
  const doubled = [...CARDS, ...CARDS].map((card, index) => ({
    ...card,
    uniqueId: index,
    isFlipped: false,
    isMatched: false,
  }));
  return shuffle(doubled);
}

export default function Home() {
  const [cards, setCards] = useState<Card[]>(createCards());
  const [flipped, setFlipped] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [isChecking, setIsChecking] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [bestScore, setBestScore] = useState<number | null>(null);

  useEffect(() => {
    if (matches === CARDS.length) {
      setGameWon(true);
      if (bestScore === null || moves < bestScore) {
        setBestScore(moves);
      }
    }
  }, [matches, moves, bestScore]);

  const handleCardClick = useCallback((uniqueId: number) => {
    if (isChecking) return;
    if (flipped.length === 2) return;
    if (flipped.includes(uniqueId)) return;

    const card = cards.find(c => c.uniqueId === uniqueId);
    if (!card || card.isMatched) return;

    const newFlipped = [...flipped, uniqueId];
    setFlipped(newFlipped);
    setCards(prev => prev.map(c => c.uniqueId === uniqueId ? { ...c, isFlipped: true } : c));

    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      setIsChecking(true);

      const [firstId, secondId] = newFlipped;
      const first = cards.find(c => c.uniqueId === firstId)!;
      const second = cards.find(c => c.uniqueId === secondId)!;

      if (first.id === second.id) {
        setCards(prev => prev.map(c =>
          c.uniqueId === firstId || c.uniqueId === secondId
            ? { ...c, isMatched: true }
            : c
        ));
        setMatches(m => m + 1);
        setFlipped([]);
        setIsChecking(false);
      } else {
        setTimeout(() => {
          setCards(prev => prev.map(c =>
            c.uniqueId === firstId || c.uniqueId === secondId
              ? { ...c, isFlipped: false }
              : c
          ));
          setFlipped([]);
          setIsChecking(false);
        }, 1000);
      }
    }
  }, [cards, flipped, isChecking]);

  const resetGame = () => {
    setCards(createCards());
    setFlipped([]);
    setMoves(0);
    setMatches(0);
    setIsChecking(false);
    setGameWon(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0a0a1a] to-[#0d1f3c] flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold text-white mb-2">Crypto Memory</h1>
      <p className="text-blue-300 text-sm mb-4">Find all matching pairs!</p>

      <div className="flex gap-6 mb-6">
        <div className="text-center">
          <p className="text-gray-400 text-xs">MOVES</p>
          <p className="text-white text-2xl font-bold">{moves}</p>
        </div>
        <div className="text-center">
          <p className="text-gray-400 text-xs">PAIRS</p>
          <p className="text-white text-2xl font-bold">{matches}/{CARDS.length}</p>
        </div>
        {bestScore !== null && (
          <div className="text-center">
            <p className="text-gray-400 text-xs">BEST</p>
            <p className="text-yellow-400 text-2xl font-bold">{bestScore}</p>
          </div>
        )}
      </div>

      {gameWon && (
        <div className="bg-green-500/20 border border-green-500 rounded-xl p-4 mb-6 text-center">
          <p className="text-green-400 text-xl font-bold">🎉 You Won!</p>
          <p className="text-green-300 text-sm">Completed in {moves} moves</p>
        </div>
      )}

      <div className="grid grid-cols-4 gap-3 mb-6">
        {cards.map(card => (
          <button
            key={card.uniqueId}
            onClick={() => handleCardClick(card.uniqueId)}
            className={`w-16 h-16 rounded-xl text-2xl font-bold transition-all duration-300 
              ${card.isFlipped || card.isMatched
                ? 'bg-blue-600 border-2 border-blue-400 scale-105'
                : 'bg-[#1a2a4a] border-2 border-[#2a3a5a] hover:border-blue-500'
              }
              ${card.isMatched ? 'bg-green-600/50 border-green-400' : ''}
            `}
          >
            {card.isFlipped || card.isMatched ? card.symbol : '?'}
          </button>
        ))}
      </div>

      <button
        onClick={resetGame}
        className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-8 rounded-xl transition-all"
      >
        New Game
      </button>
    </main>
  );
}