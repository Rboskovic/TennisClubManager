import { useState } from "react";
import {
  Plus,
  Edit3,
  Trash2,
  Clock,
  MapPin,
  Settings,
  Users,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";

export default function CourtManagement() {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [selectedCourt, setSelectedCourt] = useState("A1");
  const [viewMode, setViewMode] = useState<"schedule" | "courts">("schedule");

  const courts = [
    {
      id: "A1",
      name: "Teren A1",
      type: "indoor",
      surface: "hard",
      status: "active",
      hourlyRate: 2500,
      bookingsToday: 8,
    },
    {
      id: "A2",
      name: "Teren A2",
      type: "indoor",
      surface: "hard",
      status: "active",
      hourlyRate: 2500,
      bookingsToday: 6,
    },
    {
      id: "B1",
      name: "Teren B1",
      type: "outdoor",
      surface: "clay",
      status: "active",
      hourlyRate: 2000,
      bookingsToday: 5,
    },
    {
      id: "B2",
      name: "Teren B2",
      type: "outdoor",
      surface: "clay",
      status: "maintenance",
      hourlyRate: 2000,
      bookingsToday: 0,
    },
    {
      id: "C1",
      name: "Teren C1",
      type: "indoor",
      surface: "hard",
      status: "active",
      hourlyRate: 2800,
      bookingsToday: 7,
    },
  ];

  const timeSlots = [
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
  ];

  // Mock booking data
  const bookings = {
    A1: {
      "09:00": {
        player: "Marko Janković",
        type: "match",
        status: "confirmed",
        price: 2500,
      },
      "11:00": {
        player: "Ana Petrović",
        type: "training",
        status: "confirmed",
        price: 2500,
      },
      "14:00": {
        player: "Stefan Mitrović",
        type: "lesson",
        status: "pending",
        price: 2500,
      },
      "16:00": {
        player: "Jelena Nikolić",
        type: "match",
        status: "confirmed",
        price: 2500,
      },
      "18:00": {
        player: "Nikola Stojanović",
        type: "training",
        status: "confirmed",
        price: 2500,
      },
    },
    A2: {
      "10:00": {
        player: "Milica Jovanović",
        type: "match",
        status: "confirmed",
        price: 2500,
      },
      "15:00": {
        player: "Petar Marković",
        type: "lesson",
        status: "confirmed",
        price: 2500,
      },
      "17:00": {
        player: "Tamara Ilić",
        type: "training",
        status: "pending",
        price: 2500,
      },
    },
  };

  const getSlotStatus = (court: string, time: string) => {
    const booking = bookings[court as keyof typeof bookings]?.[time];
    if (!booking) return "available";
    return booking.status;
  };

  const getSlotInfo = (court: string, time: string) => {
    return bookings[court as keyof typeof bookings]?.[time];
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-50 border-green-200 text-green-700 hover:bg-green-100";
      case "confirmed":
        return "bg-blue-50 border-blue-200 text-blue-700";
      case "pending":
        return "bg-yellow-50 border-yellow-200 text-yellow-700";
      case "cancelled":
        return "bg-red-50 border-red-200 text-red-700";
      default:
        return "bg-gray-50 border-gray-200 text-gray-700";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "available":
        return <Plus className="w-4 h-4" />;
      case "confirmed":
        return <CheckCircle className="w-4 h-4" />;
      case "pending":
        return <AlertCircle className="w-4 h-4" />;
      case "cancelled":
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getCourtTypeIcon = (type: string) => {
    return type === "indoor" ? "🏠" : "🌅";
  };

  const getSurfaceColor = (surface: string) => {
    switch (surface) {
      case "hard":
        return "bg-blue-100 text-blue-800";
      case "clay":
        return "bg-orange-100 text-orange-800";
      case "grass":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getCourtStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "maintenance":
        return "bg-yellow-100 text-yellow-800";
      case "closed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Upravljanje Terenima
        </h1>
        <p className="text-gray-600">
          Postavite dostupnost, pratite rezervacije i upravljajte terenima
        </p>
      </div>

      {/* View Toggle */}
      <div className="mb-6">
        <div className="flex bg-white border border-gray-200 rounded-lg p-1 w-fit">
          <button
            onClick={() => setViewMode("schedule")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              viewMode === "schedule"
                ? "bg-red-600 text-white"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <Clock className="w-4 h-4 inline mr-2" />
            Raspored Rezervacija
          </button>
          <button
            onClick={() => setViewMode("courts")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              viewMode === "courts"
                ? "bg-red-600 text-white"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <MapPin className="w-4 h-4 inline mr-2" />
            Upravljanje Terenima
          </button>
        </div>
      </div>

      {viewMode === "schedule" ? (
        <>
          {/* Controls */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-6">
            <div className="flex flex-wrap gap-4 items-end">
              <div className="flex-1 min-w-48">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Datum
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
              </div>
              <div className="flex-1 min-w-48">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Teren
                </label>
                <select
                  value={selectedCourt}
                  onChange={(e) => setSelectedCourt(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                >
                  {courts
                    .filter((c) => c.status === "active")
                    .map((court) => (
                      <option key={court.id} value={court.id}>
                        {court.name}
                      </option>
                    ))}
                </select>
              </div>
              <div className="flex items-end space-x-2">
                <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2">
                  <Plus className="w-4 h-4" />
                  <span>Nova Rezervacija</span>
                </button>
                <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-2">
                  <Settings className="w-4 h-4" />
                  <span>Postavke</span>
                </button>
              </div>
            </div>
          </div>

          {/* Time Slots Grid */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                  Raspored za {courts.find((c) => c.id === selectedCourt)?.name}{" "}
                  - {new Date(selectedDate).toLocaleDateString("sr-RS")}
                </h2>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-200 rounded-full"></div>
                    <span className="text-gray-600">Dostupno</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-blue-200 rounded-full"></div>
                    <span className="text-gray-600">Rezervisano</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-yellow-200 rounded-full"></div>
                    <span className="text-gray-600">Na čekanju</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {timeSlots.map((time, index) => {
                  const endTime = timeSlots[index + 1] || "22:00";
                  const status = getSlotStatus(selectedCourt, time);
                  const bookingInfo = getSlotInfo(selectedCourt, time);

                  return (
                    <div
                      key={time}
                      className={`border rounded-lg p-4 transition-all cursor-pointer ${getStatusColor(
                        status
                      )}`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(status)}
                          <span className="font-semibold">
                            {time} - {endTime}
                          </span>
                        </div>
                        {status !== "available" && (
                          <button className="text-gray-400 hover:text-gray-600">
                            <Edit3 className="w-4 h-4" />
                          </button>
                        )}
                      </div>

                      {status === "available" ? (
                        <div className="text-sm">
                          <p className="text-gray-600">Slobodan termin</p>
                          <p className="font-medium">
                            {
                              courts.find((c) => c.id === selectedCourt)
                                ?.hourlyRate
                            }{" "}
                            RSD
                          </p>
                        </div>
                      ) : (
                        bookingInfo && (
                          <div className="text-sm">
                            <p className="font-medium">{bookingInfo.player}</p>
                            <p className="text-gray-600 capitalize">
                              {bookingInfo.type}
                            </p>
                            <p className="font-medium">
                              {bookingInfo.price} RSD
                            </p>
                          </div>
                        )
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      ) : (
        /* Courts Management View */
        <div className="space-y-6">
          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="text-2xl font-bold text-gray-900">
                {courts.length}
              </div>
              <div className="text-sm text-gray-600">Ukupno Terena</div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="text-2xl font-bold text-green-600">
                {courts.filter((c) => c.status === "active").length}
              </div>
              <div className="text-sm text-gray-600">Aktivni</div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="text-2xl font-bold text-yellow-600">
                {courts.filter((c) => c.status === "maintenance").length}
              </div>
              <div className="text-sm text-gray-600">U Servisu</div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="text-2xl font-bold text-blue-600">
                {courts.reduce((sum, c) => sum + c.bookingsToday, 0)}
              </div>
              <div className="text-sm text-gray-600">Rezervacije Danas</div>
            </div>
          </div>

          {/* Courts List */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                  Svi Tereni
                </h2>
                <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2">
                  <Plus className="w-4 h-4" />
                  <span>Dodaj Teren</span>
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {courts.map((court) => (
                  <div
                    key={court.id}
                    className="border border-gray-200 rounded-lg p-6 hover:border-red-200 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                          <span className="text-2xl">
                            {getCourtTypeIcon(court.type)}
                          </span>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {court.name}
                          </h3>
                          <div className="flex items-center space-x-2 mt-1">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${getSurfaceColor(
                                court.surface
                              )}`}
                            >
                              {court.surface === "hard"
                                ? "Tvrdi"
                                : court.surface === "clay"
                                ? "Šljaka"
                                : "Trava"}
                            </span>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${getCourtStatusColor(
                                court.status
                              )}`}
                            >
                              {court.status === "active"
                                ? "Aktivan"
                                : court.status === "maintenance"
                                ? "Servis"
                                : "Zatvoren"}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-red-400 hover:text-red-600 rounded-lg hover:bg-red-50">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Tip:</span>
                        <span className="ml-2 font-medium">
                          {court.type === "indoor" ? "Zatvoreni" : "Otvoreni"}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">Cena po satu:</span>
                        <span className="ml-2 font-medium">
                          {court.hourlyRate} RSD
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">Danas:</span>
                        <span className="ml-2 font-medium">
                          {court.bookingsToday} rezervacija
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">Status:</span>
                        <span className="ml-2 font-medium">
                          {court.status === "active"
                            ? "Radi"
                            : court.status === "maintenance"
                            ? "Servis"
                            : "Zatvoren"}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
