function TrendingItem({ title, authors }: { title: string; authors: string }) {
  return (
    <div className="mb-3">
      <p className="font-medium">{title}</p>
      <p className="text-sm text-gray-500">{authors}</p>
    </div>
  );
}

export default function TrendingResearch() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4">
      <h3 className="font-semibold mb-3">Trending Research</h3>
      <TrendingItem title="Deep Learning for Protein Structure Prediction" authors="A. Smith, J. Lee" />
      <TrendingItem title="Quantum Algorithms in Cryptography" authors="M. Patel, R. Zhao" />
      <TrendingItem title="AI-Driven Climate Change Models" authors="K. Brown, S. Singh" />
    </div>
  );
}
