import { useState } from "react";
import {
  Calendar,
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  Clock,
  BarChart3,
  PieChart,
  Filter,
} from "lucide-react";

export default function Analytics() {
  const [selectedPeriod, setSelectedPeriod] = useState("7days");
  const [selectedMetric, setSelectedMetric] = useState("revenue");

  const periodOptions = [
    { value: "7days", label: "Poslednih 7 dana" },
    { value: "30days", label: "Poslednih 30 dana" },
    { value: "3months", label: "Poslednja 3 meseca" },
    { value: "year", label: "Ova godina" },
  ];

  const metricOptions = [
    { value: "revenue", label: "Prihod", icon: DollarSign },
    { value: "bookings", label: "Rezervacije", icon: Calendar },
    { value: "users", label: "Korisnici", icon: Users },
    { value: "utilization", label: "Iskorišćenost", icon: BarChart3 },
  ];

  // Mock analytics data
  const summaryStats = {
    totalRevenue: 245000,
    revenueChange: 12.5,
    totalBookings: 156,
    bookingsChange: 8.3,
    newUsers: 23,
    usersChange: -3.2,
    avgUtilization: 76,
    utilizationChange: 5.1,
  };

  const dailyData = [
    { date: "14.07", revenue: 18500, bookings: 12, users: 8 },
    { date: "13.07", revenue: 22000, bookings: 15, users: 11 },
    { date: "12.07", revenue: 19000, bookings: 13, users: 9 },
    { date: "11.07", revenue: 25000, bookings: 18, users: 14 },
    { date: "10.07", revenue: 28000, bookings: 20, users: 16 },
    { date: "09.07", revenue: 31000, bookings: 22, users: 18 },
    { date: "08.07", revenue: 21000, bookings: 14, users: 10 },
  ];

  const courtUtilization = [
    { court: "Teren A1", utilization: 88, bookings: 42, revenue: 105000 },
    { court: "Teren A2", utilization: 79, bookings: 38, revenue: 95000 },
    { court: "Teren B1", utilization: 73, bookings: 35, revenue: 70000 },
    { court: "Teren B2", utilization: 45, bookings: 15, revenue: 30000 },
    { court: "Teren C1", utilization: 82, bookings: 39, revenue: 109000 },
  ];

  const timeSlotAnalysis = [
    { time: "08:00-10:00", bookings: 45, revenue: 112500, percentage: 78 },
    { time: "10:00-12:00", bookings: 52, revenue: 130000, percentage: 87 },
    { time: "12:00-14:00", bookings: 38, revenue: 95000, percentage: 63 },
    { time: "14:00-16:00", bookings: 48, revenue: 120000, percentage: 80 },
    { time: "16:00-18:00", bookings: 58, revenue: 145000, percentage: 97 },
    { time: "18:00-20:00", bookings: 62, revenue: 186000, percentage: 100 },
    { time: "20:00-22:00", bookings: 41, revenue: 123000, percentage: 68 },
  ];

  const userTypes = [
    { type: "Članovi Premium", count: 43, percentage: 35, revenue: 156000 },
    { type: "Članovi Osnovni", count: 28, percentage: 23, revenue: 84000 },
    { type: "Povremeni igrači", count: 52, percentage: 42, revenue: 78000 },
  ];

  const getChangeColor = (change: number) => {
    if (change > 0) return "text-green-600";
    if (change < 0) return "text-red-600";
    return "text-gray-600";
  };

  const getChangeIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="w-4 h-4" />;
    if (change < 0) return <TrendingDown className="w-4 h-4" />;
    return null;
  };

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString() + " RSD";
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Analitika</h1>
        <p className="text-gray-600">Pratite performanse kluba i trendove</p>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <span className="text-sm font-medium text-gray-700">Period:</span>
          </div>
          <div className="flex space-x-2">
            {periodOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setSelectedPeriod(option.value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedPeriod === option.value
                    ? "bg-red-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <div
              className={`flex items-center space-x-1 ${getChangeColor(
                summaryStats.revenueChange
              )}`}
            >
              {getChangeIcon(summaryStats.revenueChange)}
              <span className="text-sm font-medium">
                {summaryStats.revenueChange > 0 ? "+" : ""}
                {summaryStats.revenueChange}%
              </span>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Ukupan Prihod</p>
            <p className="text-2xl font-bold text-gray-900">
              {formatCurrency(summaryStats.totalRevenue)}
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <div
              className={`flex items-center space-x-1 ${getChangeColor(
                summaryStats.bookingsChange
              )}`}
            >
              {getChangeIcon(summaryStats.bookingsChange)}
              <span className="text-sm font-medium">
                {summaryStats.bookingsChange > 0 ? "+" : ""}
                {summaryStats.bookingsChange}%
              </span>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Ukupne Rezervacije</p>
            <p className="text-2xl font-bold text-gray-900">
              {summaryStats.totalBookings}
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <div
              className={`flex items-center space-x-1 ${getChangeColor(
                summaryStats.usersChange
              )}`}
            >
              {getChangeIcon(summaryStats.usersChange)}
              <span className="text-sm font-medium">
                {summaryStats.usersChange > 0 ? "+" : ""}
                {summaryStats.usersChange}%
              </span>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Novi Korisnici</p>
            <p className="text-2xl font-bold text-gray-900">
              {summaryStats.newUsers}
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-red-600" />
            </div>
            <div
              className={`flex items-center space-x-1 ${getChangeColor(
                summaryStats.utilizationChange
              )}`}
            >
              {getChangeIcon(summaryStats.utilizationChange)}
              <span className="text-sm font-medium">
                {summaryStats.utilizationChange > 0 ? "+" : ""}
                {summaryStats.utilizationChange}%
              </span>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Prosečna Iskorišćenost</p>
            <p className="text-2xl font-bold text-gray-900">
              {summaryStats.avgUtilization}%
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Daily Revenue Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              Dnevni Prihod - Poslednih 7 dana
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {dailyData.map((day, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 w-16">
                    {day.date}
                  </span>
                  <div className="flex-1 mx-4">
                    <div className="bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-red-600 h-3 rounded-full"
                        style={{ width: `${(day.revenue / 31000) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="text-right w-24">
                    <div className="text-sm font-semibold text-gray-900">
                      {formatCurrency(day.revenue)}
                    </div>
                    <div className="text-xs text-gray-500">
                      {day.bookings} rezervacija
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* User Types Distribution */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Tipovi Korisnika
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {userTypes.map((user, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">
                      {user.type}
                    </span>
                    <span className="text-sm font-semibold text-gray-900">
                      {user.count}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-red-600 h-2 rounded-full"
                        style={{ width: `${user.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-500 w-8">
                      {user.percentage}%
                    </span>
                  </div>
                  <div className="text-xs text-gray-500">
                    Prihod: {formatCurrency(user.revenue)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Court Utilization */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Iskorišćenost Terena
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {courtUtilization.map((court, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex-1">
                    <div className="font-medium text-gray-900 mb-1">
                      {court.court}
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>{court.bookings} rezervacija</span>
                      <span>{formatCurrency(court.revenue)}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-red-600 h-2 rounded-full"
                        style={{ width: `${court.utilization}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-bold text-gray-900 w-8">
                      {court.utilization}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Time Slot Analysis */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Analiza Po Vremenskim Okvirima
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              {timeSlotAnalysis.map((slot, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <div className="flex-1">
                    <div className="font-medium text-gray-900 mb-1">
                      {slot.time}
                    </div>
                    <div className="text-sm text-gray-600">
                      {slot.bookings} rezervacija
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="text-right">
                      <div className="text-sm font-semibold text-gray-900">
                        {formatCurrency(slot.revenue)}
                      </div>
                      <div className="text-xs text-gray-500">
                        {slot.percentage}% popunjenost
                      </div>
                    </div>
                    <div className="w-12 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-red-600 h-2 rounded-full"
                        style={{ width: `${slot.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
