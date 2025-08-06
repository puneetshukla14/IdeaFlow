import { ArrowUpRight } from "lucide-react";

export default function WelcomeBanner() {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-xl shadow-md flex items-center justify-between">
      <div>
        <h2 className="text-2xl font-bold">Welcome back, Researcher!</h2>
        <p className="text-sm text-blue-100 mt-1">
          Here’s what’s happening in the global research community today.
        </p>
      </div>
      <button className="bg-white text-blue-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 flex items-center">
        View Global Trends <ArrowUpRight size={16} className="ml-1" />
      </button>
    </div>
  );
}
