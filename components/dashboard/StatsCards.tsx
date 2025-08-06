import { FileText, Users, Star, TrendingUp } from "lucide-react";

function StatCard({ icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm flex items-center gap-3">
      <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">{icon}</div>
      <div>
        <p className="text-gray-500 text-sm">{label}</p>
        <p className="text-xl font-semibold">{value}</p>
      </div>
    </div>
  );
}

export default function StatsCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      <StatCard icon={<FileText size={20} />} label="My Publications" value="32" />
      <StatCard icon={<Users size={20} />} label="Collaborations" value="14" />
      <StatCard icon={<Star size={20} />} label="Citations" value="286" />
      <StatCard icon={<TrendingUp size={20} />} label="Profile Views" value="1.2K" />
    </div>
  );
}
