import {
  Calendar,
  DollarSign,
  Users,
  TrendingUp,
  Clock,
  MapPin,
  Trophy,
  AlertCircle,
} from "lucide-react";

export default function Dashboard() {
  // Mock data for demonstration
  const todayStats = {
    bookings: 24,
    revenue: 18500,
    weeklyRevenue: 125000,
    utilization: 78,
    activeUsers: 156,
  };

  const todayBookings = [
    {
      time: "09:00",
      court: "Teren A1",
      player: "Marko Janković",
      type: "match",
      status: "confirmed",
    },
    {
      time: "10:30",
      court: "Teren B2",
      player: "Ana Petrović",
      type: "training",
      status: "confirmed",
    },
    {
      time: "14:00",
      court: "Teren A2",
      player: "Stefan Mitrović",
      type: "match",
      status: "pending",
    },
    {
      time: "16:30",
      court: "Teren C1",
      player: "Jelena Nikolić",
      type: "lesson",
      status: "confirmed",
    },
    {
      time: "18:00",
      court: "Teren A1",
      player: "Nikola Stojanović",
      type: "match",
      status: "confirmed",
    },
  ];

  const popularCourts = [
    { name: "Teren A1", bookings: 42, percentage: 88 },
    { name: "Teren B2", bookings: 38, percentage: 79 },
    { name: "Teren A2", bookings: 35, percentage: 73 },
    { name: "Teren C1", bookings: 31, percentage: 65 },
  ];

  const weeklyRevenue = [
    { day: "Pon", amount: 15000 },
    { day: "Uto", amount: 22000 },
    { day: "Sri", amount: 19000 },
    { day: "Čet", amount: 25000 },
    { day: "Pet", amount: 28000 },
    { day: "Sub", amount: 31000 },
    { day: "Ned", amount: 18000 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "match":
        return "⚔️";
      case "training":
        return "🏃";
      case "lesson":
        return "👨‍🏫";
      default:
        return "🎾";
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Pregled Kluba</h1>
        <p className="text-gray-600">
          Danas,{" "}
          {new Date().toLocaleDateString("sr-RS", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Today's Bookings */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Današnje Rezervacije
              </p>
              <p className="text-3xl font-bold text-gray-900">
                {todayStats.bookings}
              </p>
              <p className="text-xs text-green-600 font-medium">+3 od jučer</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Today's Revenue */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Današnji Prihod
              </p>
              <p className="text-3xl font-bold text-gray-900">
                {todayStats.revenue.toLocaleString()} RSD
              </p>
              <p className="text-xs text-green-600 font-medium">
                +12% od jučer
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        {/* Court Utilization */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Iskorišćenost Terena
              </p>
              <p className="text-3xl font-bold text-gray-900">
                {todayStats.utilization}%
              </p>
              <p className="text-xs text-green-600 font-medium">Odličan dan</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>

        {/* Active Users */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Aktivni Korisnici
              </p>
              <p className="text-3xl font-bold text-gray-900">
                {todayStats.activeUsers}
              </p>
              <p className="text-xs text-blue-600 font-medium">+8 novih</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Bookings */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">
                Današnje Rezervacije
              </h2>
              <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                {todayBookings.length} rezervacija
              </span>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {todayBookings.map((booking, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                      <span className="text-lg">
                        {getTypeIcon(booking.type)}
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold text-gray-900">
                          {booking.time}
                        </span>
                        <span className="text-gray-500">•</span>
                        <span className="text-gray-700">{booking.court}</span>
                      </div>
                      <p className="text-sm text-gray-600">{booking.player}</p>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      booking.status
                    )}`}
                  >
                    {booking.status === "confirmed"
                      ? "Potvrđeno"
                      : booking.status === "pending"
                      ? "Na čekanju"
                      : "Otkazano"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Popular Courts & Weekly Revenue */}
        <div className="space-y-6">
          {/* Popular Courts */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                Najpopularniji Tereni
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {popularCourts.map((court, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                        <MapPin className="w-4 h-4 text-red-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {court.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {court.bookings} rezervacija
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-red-600 h-2 rounded-full"
                          style={{ width: `${court.percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-700">
                        {court.percentage}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Weekly Revenue Chart */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                Nedeljni Prihod
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                {weeklyRevenue.map((day, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <span className="text-sm font-medium text-gray-700">
                      {day.day}
                    </span>
                    <div className="flex items-center space-x-3">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-600 h-2 rounded-full"
                          style={{ width: `${(day.amount / 31000) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-semibold text-gray-900">
                        {(day.amount / 1000).toFixed(0)}k
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600">
                    Ukupno ove nedelje
                  </span>
                  <span className="text-lg font-bold text-green-600">
                    {weeklyRevenue
                      .reduce((sum, day) => sum + day.amount, 0)
                      .toLocaleString()}{" "}
                    RSD
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Brze Akcije
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button className="flex items-center justify-center p-4 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors">
            <Calendar className="w-5 h-5 mr-2" />
            Nova Rezervacija
          </button>
          <button className="flex items-center justify-center p-4 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
            <Users className="w-5 h-5 mr-2" />
            Dodaj Korisnika
          </button>
          <button className="flex items-center justify-center p-4 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors">
            <DollarSign className="w-5 h-5 mr-2" />
            Naplate Danas
          </button>
          <button className="flex items-center justify-center p-4 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors">
            <Trophy className="w-5 h-5 mr-2" />
            Novi Turnir
          </button>
        </div>
      </div>
    </div>
  );
}
