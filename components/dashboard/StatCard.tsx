export default function StatCard({ icon, label, value }: { icon: any; label: string; value: string }) {
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
