function ActivityRow({ activity, date }: { activity: string; date: string }) {
  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="py-2">{activity}</td>
      <td className="py-2 text-gray-500">{date}</td>
    </tr>
  );
}

export default function LiveFeed({ className }: { className?: string }) {
  return (
    <div className={`${className} bg-white rounded-xl shadow-sm p-4`}>
      <h3 className="font-semibold mb-3">Recent Activity</h3>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-gray-500 border-b">
            <th className="py-2">Activity</th>
            <th className="py-2">Date</th>
          </tr>
        </thead>
        <tbody>
          <ActivityRow activity="Published new paper on AI in Healthcare" date="Aug 4, 2025" />
          <ActivityRow activity="Joined collaboration on Quantum Computing" date="Aug 3, 2025" />
          <ActivityRow activity="Uploaded new dataset for Climate Studies" date="Aug 2, 2025" />
        </tbody>
      </table>
    </div>
  );
}
