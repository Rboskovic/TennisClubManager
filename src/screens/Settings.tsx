import { useState } from "react";
import {
  Save,
  Edit3,
  Upload,
  Bell,
  Shield,
  Globe,
  CreditCard,
  Users,
  MapPin,
  Phone,
  Mail,
  Clock,
  Wifi,
  Key,
} from "lucide-react";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("general");
  const [notifications, setNotifications] = useState({
    newBookings: true,
    cancellations: true,
    payments: true,
    dailyReports: false,
    maintenance: true,
  });

  const tabs = [
    { id: "general", label: "Opšte", icon: Edit3 },
    { id: "notifications", label: "Obaveštenja", icon: Bell },
    { id: "payments", label: "Plaćanja", icon: CreditCard },
    { id: "users", label: "Korisnici", icon: Users },
    { id: "security", label: "Bezbednost", icon: Shield },
  ];

  const [clubInfo, setClubInfo] = useState({
    name: "Tennis Klub Baseline",
    address: "Bulevar Oslobođenja 120",
    city: "Novi Sad",
    phone: "+381 21 123 456",
    email: "info@baseline-tennis.rs",
    website: "www.baseline-tennis.rs",
    description:
      "Moderni tenis klub sa zatvorenim i otvorenim terenima u srcu Novog Sada.",
    workingHours: {
      weekdays: "08:00 - 22:00",
      weekends: "09:00 - 21:00",
    },
  });

  const handleNotificationChange = (key: string) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      {/* Club Logo */}
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Logo Kluba</h3>
        <div className="flex items-center space-x-6">
          <div className="w-20 h-20 bg-red-100 rounded-lg flex items-center justify-center">
            <span className="text-3xl">🎾</span>
          </div>
          <div>
            <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2">
              <Upload className="w-4 h-4" />
              <span>Učitaj Logo</span>
            </button>
            <p className="text-sm text-gray-500 mt-2">PNG, JPG do 2MB</p>
          </div>
        </div>
      </div>

      {/* Club Information */}
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Informacije o Klubu
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Naziv Kluba
            </label>
            <input
              type="text"
              value={clubInfo.name}
              onChange={(e) =>
                setClubInfo({ ...clubInfo, name: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Telefon
            </label>
            <input
              type="text"
              value={clubInfo.phone}
              onChange={(e) =>
                setClubInfo({ ...clubInfo, phone: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={clubInfo.email}
              onChange={(e) =>
                setClubInfo({ ...clubInfo, email: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Website
            </label>
            <input
              type="text"
              value={clubInfo.website}
              onChange={(e) =>
                setClubInfo({ ...clubInfo, website: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Adresa
            </label>
            <input
              type="text"
              value={clubInfo.address}
              onChange={(e) =>
                setClubInfo({ ...clubInfo, address: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Opis Kluba
            </label>
            <textarea
              value={clubInfo.description}
              onChange={(e) =>
                setClubInfo({ ...clubInfo, description: e.target.value })
              }
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>
        </div>
      </div>

      {/* Working Hours */}
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Radno Vreme
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Radnim danima
            </label>
            <input
              type="text"
              value={clubInfo.workingHours.weekdays}
              onChange={(e) =>
                setClubInfo({
                  ...clubInfo,
                  workingHours: {
                    ...clubInfo.workingHours,
                    weekdays: e.target.value,
                  },
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Vikendom
            </label>
            <input
              type="text"
              value={clubInfo.workingHours.weekends}
              onChange={(e) =>
                setClubInfo({
                  ...clubInfo,
                  workingHours: {
                    ...clubInfo.workingHours,
                    weekends: e.target.value,
                  },
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Email Obaveštenja
        </h3>
        <div className="space-y-4">
          {[
            {
              key: "newBookings",
              label: "Nove rezervacije",
              description: "Primite email kada se napravi nova rezervacija",
            },
            {
              key: "cancellations",
              label: "Otkazivanja",
              description: "Obaveštenja o otkazanim rezervacijama",
            },
            {
              key: "payments",
              label: "Plaćanja",
              description: "Potvrde o izvršenim plaćanjima",
            },
            {
              key: "dailyReports",
              label: "Dnevni izveštaji",
              description: "Automatski dnevni izveštaj o aktivnostima",
            },
            {
              key: "maintenance",
              label: "Održavanje terena",
              description: "Podsetnici za održavanje i servisiranje",
            },
          ].map((item) => (
            <div
              key={item.key}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div>
                <h4 className="font-medium text-gray-900">{item.label}</h4>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={
                    notifications[item.key as keyof typeof notifications]
                  }
                  onChange={() => handleNotificationChange(item.key)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPaymentSettings = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Načini Plaćanja
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Kartice</h4>
                <p className="text-sm text-gray-600">
                  Visa, Mastercard, Dinars kartice
                </p>
              </div>
            </div>
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
              Aktivno
            </span>
          </div>

          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-sm font-bold">KES</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Gotovina</h4>
                <p className="text-sm text-gray-600">Plaćanje na licu mesta</p>
              </div>
            </div>
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
              Aktivno
            </span>
          </div>

          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg opacity-60">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-sm font-bold">BTC</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Crypto</h4>
                <p className="text-sm text-gray-600">
                  Bitcoin, Ethereum plaćanja
                </p>
              </div>
            </div>
            <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">
              Neaktivno
            </span>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Politike Plaćanja
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Politika otkazivanja
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500">
              <option>24 sata unapred bez naknade</option>
              <option>12 sati unapred bez naknade</option>
              <option>6 sati unapred bez naknade</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Depozit za rezervaciju
            </label>
            <div className="flex items-center space-x-3">
              <input
                type="number"
                placeholder="500"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
              <span className="text-gray-600">RSD</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderUserSettings = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Upravljanje Korisnicima
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">
                Automatska registracija
              </h4>
              <p className="text-sm text-gray-600">
                Dozvolite korisnicima da se sami registruju
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">
                Verifikacija email-a
              </h4>
              <p className="text-sm text-gray-600">
                Zahtevaj potvrdu email adrese
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">
                Gostujuće rezervacije
              </h4>
              <p className="text-sm text-gray-600">
                Omogući rezervacije bez registracije
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
            </label>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Administratori
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold">MJ</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Marko Janković</h4>
                <p className="text-sm text-gray-600">
                  marko@baseline-tennis.rs
                </p>
              </div>
            </div>
            <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
              Owner
            </span>
          </div>

          <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold">AP</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Ana Petrović</h4>
                <p className="text-sm text-gray-600">ana@baseline-tennis.rs</p>
              </div>
            </div>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              Admin
            </span>
          </div>
        </div>

        <button className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2">
          <Users className="w-4 h-4" />
          <span>Dodaj Administratora</span>
        </button>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Bezbednost</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">
                Dvofaktorska autentifikacija
              </h4>
              <p className="text-sm text-gray-600">
                Dodatni sloj bezbednosti za admin naloge
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">SSL enkripcija</h4>
              <p className="text-sm text-gray-600">
                Svi podaci se prenose sigurno
              </p>
            </div>
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
              Aktivno
            </span>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Backup & Restore
        </h3>
        <div className="space-y-4">
          <div className="p-4 border border-gray-200 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">
              Automatski backup
            </h4>
            <p className="text-sm text-gray-600 mb-3">
              Poslednji backup: Danas u 03:00
            </p>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
              Kreiraj Backup Sada
            </button>
          </div>

          <div className="p-4 border border-gray-200 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">
              Vraćanje podataka
            </h4>
            <p className="text-sm text-gray-600 mb-3">
              Vratite sistem na prethodno stanje
            </p>
            <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm">
              Prikaži Backup-ove
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Postavke</h1>
        <p className="text-gray-600">Upravljajte postavkama kluba i sistema</p>
      </div>

      <div className="flex gap-6">
        {/* Sidebar */}
        <div className="w-64 bg-white rounded-xl shadow-sm border border-gray-200 p-4 h-fit">
          <nav className="space-y-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors text-left ${
                    activeTab === tab.id
                      ? "bg-red-50 text-red-700 border border-red-200"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1">
          {activeTab === "general" && renderGeneralSettings()}
          {activeTab === "notifications" && renderNotificationSettings()}
          {activeTab === "payments" && renderPaymentSettings()}
          {activeTab === "users" && renderUserSettings()}
          {activeTab === "security" && renderSecuritySettings()}

          {/* Save Button */}
          <div className="mt-8 flex justify-end">
            <button className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2">
              <Save className="w-5 h-5" />
              <span>Sačuvaj Izmene</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
