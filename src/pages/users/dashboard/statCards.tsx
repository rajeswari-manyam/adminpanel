import { CardStat } from "./types";

const StatCards = ({ cards }: { cards: CardStat[] }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
    {cards.map((card, i) => (
      <div key={i} className={`${card.color} rounded-xl p-6 text-white shadow-lg`}>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm opacity-90">{card.title}</p>
            <p className="text-4xl font-bold">{card.value}</p>
          </div>
          <div className={`${card.lightColor} p-4 rounded-lg`}>
            <card.icon size={32} />
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default StatCards;
