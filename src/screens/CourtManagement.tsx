import { useState, useEffect } from "react";
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
  Wifi,
  WifiOff,
  Save,
  X,
  Menu,
} from "lucide-react";
import { tennisAPI, TimeSlot, Court, Booking, useRealtimeUpdates } from "../services/api";

export default function CourtManagement() {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [selectedCourt, setSelectedCourt] = useState("A1");
  const [viewMode, setViewMode] = useState<"schedule" | "courts">("schedule");
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Data state
  const [courts, setCourts] = useState<Court[]>([]);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Edit state
  const [editingSlot, setEditingSlot] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState<{ available: boolean; price: number }>({
    available: false,
    price: 0
  });

  // Mock club ID - in real app, get from auth context
  const clubId = "baseline-tennis";
  
  // Real-time updates
  const realtimeUpdates = useRealtimeUpdates();

  // Time slots for schedule view
  const timeSlotTimes = [
    "08:00", "09:00", "10:00", "11:00", "12:00", "13:00",
    "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00"
  ];

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Fetch initial data
  useEffect(() => {
    fetchCourts();
    fetchTimeSlots();
    fetchBookings();
  }, [selectedDate, selectedCourt]);

  // Setup real-time updates
  useEffect(() => {
    const handleSlotUpdate = (data: { slot: TimeSlot; courtId: string; date: string }) => {
      if (data.date === selectedDate) {
        setTimeSlots(prevSlots => 
          prevSlots.map(slot => 
            slot.id === data.slot.id ? data.slot : slot
          )
        );
      }
    };

    const handleBookingCreated = (data: { booking: Booking; slot: TimeSlot }) => {
      if (data.booking.date === selectedDate) {
        setBookings(prevBookings => [...prevBookings, data.booking]);
        setTimeSlots(prevSlots => 
          prevSlots.map(slot => 
            slot.id === data.slot.id ? { ...data.slot, available: false } : slot
          )
        );
      }
    };

    const handleBookingCancelled = (data: { bookingId: string; slot: TimeSlot }) => {
      if (data.slot.date === selectedDate) {
        setBookings(prevBookings => 
          prevBookings.filter(booking => booking.id !== data.bookingId)
        );
        setTimeSlots(prevSlots => 
          prevSlots.map(slot => 
            slot.id === data.slot.id ? { ...data.slot, available: true } : slot
          )
        );
      }
    };

    realtimeUpdates.onSlotUpdated(handleSlotUpdate);
    realtimeUpdates.onBookingCreated(handleBookingCreated);
    realtimeUpdates.onBookingCancelled(handleBookingCancelled);

    return () => {};
  }, [selectedDate, realtimeUpdates]);

  // Real API calls
  const fetchCourts = async () => {
    try {
      const courtsData = await tennisAPI.getCourts();
      const clubCourts = courtsData.filter(court => court.clubId === clubId);
      setCourts(clubCourts);
      
      if (clubCourts.length > 0 && !selectedCourt) {
        setSelectedCourt(clubCourts[0].id);
      }
    } catch (error) {
      console.error('Error fetching courts:', error);
      setError('Greška pri učitavanju terena');
    }
  };

  const fetchTimeSlots = async () => {
    if (!selectedCourt || !selectedDate) return;
    
    setLoading(true);
    try {
      const slots = await tennisAPI.getTimeSlots(selectedCourt, selectedDate);
      setTimeSlots(slots);
    } catch (error) {
      console.error('Error fetching time slots:', error);
      setError('Greška pri učitavanju raspoređa');
    } finally {
      setLoading(false);
    }
  };

  const fetchBookings = async () => {
    try {
      const bookingsData = await tennisAPI.getClubBookings(clubId, selectedDate);
      setBookings(bookingsData);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      setError('Greška pri učitavanju rezervacija');
    }
  };

  // Handle slot availability toggle
  const handleSlotToggle = async (slotId: string) => {
    const slot = timeSlots.find(s => s.id === slotId);
    if (!slot || editingSlot === slotId) return;

    try {
      await tennisAPI.updateTimeSlot(slotId, { available: !slot.available });
    } catch (error) {
      console.error('Error updating slot:', error);
      setError('Greška pri ažuriranju termina');
    }
  };

  // Handle price edit
  const startEditing = (slot: TimeSlot) => {
    setEditingSlot(slot.id);
    setEditFormData({
      available: slot.available,
      price: slot.price
    });
  };

  const saveEdit = async () => {
    if (!editingSlot) return;

    try {
      await tennisAPI.updateTimeSlot(editingSlot, editFormData);
      setEditingSlot(null);
    } catch (error) {
      console.error('Error updating slot:', error);
      setError('Greška pri čuvanju izmena');
    }
  };

  const cancelEdit = () => {
    setEditingSlot(null);
    setEditFormData({ available: false, price: 0 });
  };

  // Get slot for specific time
  const getSlotForTime = (time: string) => {
    return timeSlots.find(slot => slot.startTime === time);
  };

  // Get booking for specific time
  const getBookingForTime = (time: string) => {
    const slot = getSlotForTime(time);
    if (!slot) return null;
    return bookings.find(booking => 
      booking.courtId === selectedCourt && 
      booking.startTime === time &&
      booking.date === selectedDate
    );
  };

  const getSlotStatus = (time: string) => {
    const slot = getSlotForTime(time);
    const booking = getBookingForTime(time);
    
    if (!slot) return "unavailable";
    if (booking) return booking.status;
    return slot.available ? "available" : "blocked";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-50 border-green-200 text-green-700 hover:bg-green-100";
      case "confirmed":
        return "bg-blue-50 border-blue-200 text-blue-700";
      case "pending":
        return "bg-yellow-50 border-yellow-200 text-yellow-700";
      case "blocked":
        return "bg-red-50 border-red-200 text-red-700";
      case "unavailable":
        return "bg-gray-50 border-gray-200 text-gray-500";
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
      case "blocked":
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
    <div className={`min-h-screen bg-gray-50 ${isMobile ? 'p-2' : 'p-6'}`}>
      {/* Mobile Header */}
      {isMobile && (
        <div className="bg-white rounded-lg p-4 mb-4 shadow-sm">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-lg font-bold text-gray-900">Club Manager</h1>
            <div className="flex items-center">
              {realtimeUpdates.isConnected ? (
                <Wifi className="w-5 h-5 text-emerald-600" />
              ) : (
                <WifiOff className="w-5 h-5 text-red-500" />
              )}
            </div>
          </div>
        </div>
      )}

      {/* Desktop Header */}
      {!isMobile && (
        <div className="mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Upravljanje Terenima
              </h1>
              <p className="text-gray-600">
                Postavite dostupnost, pratite rezervacije i upravljajte terenima
              </p>
            </div>
            <div className="flex items-center space-x-2">
              {realtimeUpdates.isConnected ? (
                <div className="flex items-center text-emerald-600">
                  <Wifi className="w-5 h-5 mr-1" />
                  <span className="text-sm font-medium">Uživo</span>
                </div>
              ) : (
                <div className="flex items-center text-red-500">
                  <WifiOff className="w-5 h-5 mr-1" />
                  <span className="text-sm font-medium">Offline</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700">{error}</p>
          <button 
            onClick={() => {
              setError(null);
              fetchTimeSlots();
              fetchBookings();
            }}
            className="text-red-600 font-medium mt-2 hover:underline"
          >
            Pokušaj ponovo
          </button>
        </div>
      )}

      {/* View Toggle */}
      <div className="mb-6">
        <div className="flex bg-white border border-gray-200 rounded-lg p-1 w-fit">
          <button
            onClick={() => setViewMode("schedule")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              viewMode === "schedule"
                ? "bg-red-600 text-white"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            {isMobile ? "Raspored" : "Raspored Termina"}
          </button>
          <button
            onClick={() => setViewMode("courts")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              viewMode === "courts"
                ? "bg-red-600 text-white"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            {isMobile ? "Tereni" : "Upravljanje Terenima"}
          </button>
        </div>
      </div>

      {viewMode === "schedule" ? (
        <>
          {/* Date and Court Selection */}
          <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'} gap-4 mb-6`}>
            <div>
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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Teren
              </label>
              <select
                value={selectedCourt}
                onChange={(e) => setSelectedCourt(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              >
                {courts.map((court) => (
                  <option key={court.id} value={court.id}>
                    {court.name} ({court.type}, {court.surface})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Schedule Grid */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <h3 className={`${isMobile ? 'text-base' : 'text-lg'} font-semibold text-gray-900`}>
                Raspored za {selectedDate}
              </h3>
              <p className="text-sm text-gray-600">
                Kliknite na termin da promenite dostupnost
              </p>
            </div>
            <div className="p-4">
              {loading ? (
                <div className="space-y-3">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-16 bg-gray-200 rounded-lg animate-pulse" />
                  ))}
                </div>
              ) : (
                <div className={`space-y-3 ${isMobile ? 'max-h-96 overflow-y-auto' : ''}`}>
                  {timeSlotTimes.slice(0, isMobile ? 12 : timeSlotTimes.length).map((time) => {
                    const slot = getSlotForTime(time);
                    const booking = getBookingForTime(time);
                    const status = getSlotStatus(time);
                    const isEditing = editingSlot === slot?.id;

                    return (
                      <div
                        key={time}
                        className={`border-2 rounded-lg p-3 transition-all ${getStatusColor(status)} ${
                          slot && !booking ? "cursor-pointer" : ""
                        }`}
                        onClick={() => {
                          if (slot && !booking && !isEditing) {
                            if (status === "available" || status === "blocked") {
                              handleSlotToggle(slot.id);
                            }
                          }
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            {getStatusIcon(status)}
                            <div className="ml-3">
                              <div className={`font-medium ${isMobile ? 'text-sm' : ''}`}>{time}</div>
                              <div className={`${isMobile ? 'text-xs' : 'text-sm'} opacity-75`}>
                                {status === "available" && "Dostupan termin"}
                                {status === "blocked" && "Blokiran termin"}
                                {status === "confirmed" && booking && `${booking.userName} - Potvrđeno`}
                                {status === "pending" && booking && `${booking.userName} - Na čekanju`}
                                {status === "unavailable" && "Nedostupan"}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            {isEditing ? (
                              <div className="flex items-center space-x-2">
                                <input
                                  type="number"
                                  value={editFormData.price}
                                  onChange={(e) => setEditFormData(prev => ({ ...prev, price: Number(e.target.value) }))}
                                  className={`${isMobile ? 'w-16 text-xs' : 'w-20'} px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-red-500`}
                                />
                                <label className="flex items-center text-sm">
                                  <input
                                    type="checkbox"
                                    checked={editFormData.available}
                                    onChange={(e) => setEditFormData(prev => ({ ...prev, available: e.target.checked }))}
                                    className="mr-1"
                                  />
                                  {!isMobile && "Dostupan"}
                                </label>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    saveEdit();
                                  }}
                                  className="p-1 text-green-600 hover:bg-green-100 rounded"
                                >
                                  <Save className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    cancelEdit();
                                  }}
                                  className="p-1 text-gray-600 hover:bg-gray-100 rounded"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                            ) : (
                              <div className="flex items-center space-x-2">
                                <div className="text-right">
                                  <div className={`font-medium ${isMobile ? 'text-sm' : ''}`}>
                                    {slot ? `${slot.price} RSD` : "N/A"}
                                  </div>
                                </div>
                                {slot && !booking && (
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      startEditing(slot);
                                    }}
                                    className="p-1 text-gray-600 hover:bg-gray-100 rounded"
                                  >
                                    <Edit3 className="w-4 h-4" />
                                  </button>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        /* Courts Management View */
        <div className="space-y-6">
          {/* Summary Stats */}
          <div className={`grid ${isMobile ? 'grid-cols-2' : 'grid-cols-1 md:grid-cols-4'} gap-4 mb-6`}>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-gray-900`}>
                {courts.length}
              </div>
              <div className={`${isMobile ? 'text-xs' : 'text-sm'} text-gray-600`}>Ukupno Terena</div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-green-600`}>
                {courts.filter(c => c.status === "active").length}
              </div>
              <div className={`${isMobile ? 'text-xs' : 'text-sm'} text-gray-600`}>Aktivnih</div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-yellow-600`}>
                {courts.filter(c => c.status === "maintenance").length}
              </div>
              <div className={`${isMobile ? 'text-xs' : 'text-sm'} text-gray-600`}>Na Održavanju</div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-blue-600`}>
                {bookings.length}
              </div>
              <div className={`${isMobile ? 'text-xs' : 'text-sm'} text-gray-600`}>Rezervacije Danas</div>
            </div>
          </div>

          {/* Courts List */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className={`${isMobile ? 'text-base' : 'text-lg'} font-semibold text-gray-900`}>Svi Tereni</h3>
              <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center">
                <Plus className="w-4 h-4 mr-2" />
                {!isMobile && "Dodaj Teren"}
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className={`px-4 py-3 text-left ${isMobile ? 'text-xs' : 'text-sm'} font-medium text-gray-600`}>
                      Teren
                    </th>
                    {!isMobile && (
                      <>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                          Tip
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                          Podloga
                        </th>
                      </>
                    )}
                    <th className={`px-4 py-3 text-left ${isMobile ? 'text-xs' : 'text-sm'} font-medium text-gray-600`}>
                      Status
                    </th>
                    <th className={`px-4 py-3 text-left ${isMobile ? 'text-xs' : 'text-sm'} font-medium text-gray-600`}>
                      Cena/Sat
                    </th>
                    {!isMobile && (
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                        Rezervacije
                      </th>
                    )}
                    <th className={`px-4 py-3 text-left ${isMobile ? 'text-xs' : 'text-sm'} font-medium text-gray-600`}>
                      Akcije
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {courts.map((court) => {
                    const courtBookings = bookings.filter(b => b.courtId === court.id);
                    return (
                      <tr key={court.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <div className="flex items-center">
                            <span className={`${isMobile ? 'text-sm' : 'text-xl'} mr-2`}>
                              {getCourtTypeIcon(court.type)}
                            </span>
                            <div className={`font-medium text-gray-900 ${isMobile ? 'text-sm' : ''}`}>
                              {court.name}
                            </div>
                          </div>
                        </td>
                        {!isMobile && (
                          <>
                            <td className="px-4 py-3 text-sm text-gray-600 capitalize">
                              {court.type}
                            </td>
                            <td className="px-4 py-3">
                              <span
                                className={`px-2 py-1 text-xs font-medium rounded-full ${getSurfaceColor(
                                  court.surface
                                )}`}
                              >
                                {court.surface}
                              </span>
                            </td>
                          </>
                        )}
                        <td className="px-4 py-3">
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${getCourtStatusColor(
                              court.status
                            )}`}
                          >
                            {court.status}
                          </span>
                        </td>
                        <td className={`px-4 py-3 font-medium text-gray-900 ${isMobile ? 'text-sm' : ''}`}>
                          {court.hourlyRate.toLocaleString()} RSD
                        </td>
                        {!isMobile && (
                          <td className="px-4 py-3">
                            <div className="flex items-center">
                              <Users className="w-4 h-4 text-gray-400 mr-1" />
                              <span className="text-sm text-gray-900">
                                {courtBookings.length}
                              </span>
                            </div>
                          </td>
                        )}
                        <td className="px-4 py-3">
                          <div className="flex space-x-2">
                            <button className="p-1 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded">
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button className="p-1 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded">
                              <Settings className="w-4 h-4" />
                            </button>
                            {!isMobile && (
                              <button className="p-1 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
