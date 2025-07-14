import { useState } from "react";
import {
  Plus,
  Edit3,
  Save,
  X,
  Clock,
  Calendar,
  DollarSign,
  Users,
  Crown,
} from "lucide-react";

export default function Pricing() {
  const [editingPrice, setEditingPrice] = useState<string | null>(null);
  const [showAddPrice, setShowAddPrice] = useState(false);

  const [priceRules, setPriceRules] = useState([
    {
      id: "1",
      name: "Jutarnja Cena",
      description: "Radnim danima do 14h",
      courtType: "indoor",
      timeSlots: "08:00-14:00",
      days: "Pon-Pet",
      price: 2000,
      isActive: true,
    },
    {
      id: "2",
      name: "Popodnevna Cena",
      description: "Radnim danima posle 14h",
      courtType: "indoor",
      timeSlots: "14:00-22:00",
      days: "Pon-Pet",
      price: 2500,
      isActive: true,
    },
    {
      id: "3",
      name: "Vikend Cena",
      description: "Vikendom ceo dan",
      courtType: "indoor",
      timeSlots: "08:00-22:00",
      days: "Sub-Ned",
      price: 2800,
      isActive: true,
    },
    {
      id: "4",
      name: "Spoljašnji Tereni",
      description: "Cena za šljaka terene",
      courtType: "outdoor",
      timeSlots: "08:00-22:00",
      days: "Svi dani",
      price: 2000,
      isActive: true,
    },
    {
      id: "5",
      name: "Premium Vreme",
      description: "Najtraženiji termini",
      courtType: "indoor",
      timeSlots: "18:00-21:00",
      days: "Pon-Pet",
      price: 3000,
      isActive: true,
    },
  ]);

  const membershipPlans = [
    {
      id: "1",
      name: "Osnovni",
      description: "Za rekreativne igrače",
      monthlyFee: 5000,
      discountPercentage: 10,
      benefits: [
        "10% popust na rezervacije",
        "Prioritet za turnire",
        "Besplatno čuvanje opreme",
      ],
      isPopular: false,
    },
    {
      id: "2",
      name: "Premium",
      description: "Za redovne igrače",
      monthlyFee: 8000,
      discountPercentage: 20,
      benefits: [
        "20% popust na rezervacije",
        "Besplatni časovi sa trenerom (2h mesečno)",
        "VIP sala za odmor",
        "Prioritet rezervacija",
      ],
      isPopular: true,
    },
    {
      id: "3",
      name: "VIP",
      description: "Unlimited pristup",
      monthlyFee: 15000,
      discountPercentage: 30,
      benefits: [
        "30% popust na rezervacije",
        "Neograničeni besplatni časovi",
        "Privatni parking",
        "Concierge servis",
        "Ekskluzivni turniri",
      ],
      isPopular: false,
    },
  ];

  const lessonPrices = [
    { type: "Individualni čas (60min)", price: 3500 },
    { type: "Grupni čas 2-3 osobe (60min)", price: 2500 },
    { type: "Grupni čas 4+ osoba (60min)", price: 2000 },
    { type: "Privatni trening sa pro trenerom", price: 5000 },
    { type: "Koriscenje loptica", price: 500 },
  ];

  const getCourtTypeLabel = (type: string) => {
    return type === "indoor" ? "Zatvoreni" : "Otvoreni";
  };

  const getCourtTypeColor = (type: string) => {
    return type === "indoor"
      ? "bg-blue-100 text-blue-800"
      : "bg-green-100 text-green-800";
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Upravljanje Cenama
        </h1>
        <p className="text-gray-600">
          Postavite cene za terene, časove i članarine
        </p>
      </div>

      <div className="space-y-8">
        {/* Court Pricing Rules */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Cenovnik Terena
                </h2>
                <p className="text-gray-600 text-sm mt-1">
                  Definirajte cene po vremenskim okvirima
                </p>
              </div>
              <button
                onClick={() => setShowAddPrice(true)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Dodaj Pravilo</span>
              </button>
            </div>
          </div>

          <div className="p-6">
            <div className="space-y-4">
              {priceRules.map((rule) => (
                <div
                  key={rule.id}
                  className="border border-gray-200 rounded-lg p-4 hover:border-red-200 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {rule.name}
                        </h3>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getCourtTypeColor(
                            rule.courtType
                          )}`}
                        >
                          {getCourtTypeLabel(rule.courtType)}
                        </span>
                        {!rule.isActive && (
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            Neaktivno
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 text-sm mb-3">
                        {rule.description}
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600">Vreme:</span>
                          <span className="font-medium">{rule.timeSlots}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600">Dani:</span>
                          <span className="font-medium">{rule.days}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <DollarSign className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600">Cena:</span>
                          <span className="font-bold text-lg text-red-600">
                            {rule.price} RSD
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setEditingPrice(rule.id)}
                        className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-red-400 hover:text-red-600 rounded-lg hover:bg-red-50">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Membership Plans */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Članarine
                </h2>
                <p className="text-gray-600 text-sm mt-1">
                  Paketi za redovne članove kluba
                </p>
              </div>
              <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>Novi Paket</span>
              </button>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {membershipPlans.map((plan) => (
                <div
                  key={plan.id}
                  className={`relative border rounded-xl p-6 transition-all hover:shadow-md ${
                    plan.isPopular
                      ? "border-red-300 bg-red-50"
                      : "border-gray-200 hover:border-red-200"
                  }`}
                >
                  {plan.isPopular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <div className="bg-red-600 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                        <Crown className="w-4 h-4" />
                        <span>Najpopularniji</span>
                      </div>
                    </div>
                  )}

                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {plan.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {plan.description}
                    </p>
                    <div className="text-3xl font-bold text-red-600 mb-1">
                      {plan.monthlyFee.toLocaleString()} RSD
                    </div>
                    <div className="text-sm text-gray-600">mesečno</div>
                    <div className="inline-flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium mt-2">
                      {plan.discountPercentage}% popust na rezervacije
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    {plan.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                        </div>
                        <span className="text-sm text-gray-700">{benefit}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    className={`w-full py-3 rounded-lg font-medium transition-colors ${
                      plan.isPopular
                        ? "bg-red-600 text-white hover:bg-red-700"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Uredi Paket
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Lesson Pricing */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Cene Časova
                </h2>
                <p className="text-gray-600 text-sm mt-1">
                  Treniranje i privatni časovi
                </p>
              </div>
              <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2">
                <Edit3 className="w-4 h-4" />
                <span>Uredi Cene</span>
              </button>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {lessonPrices.map((lesson, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-red-200 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Users className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {lesson.type}
                      </h4>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-red-600">
                      {lesson.price.toLocaleString()} RSD
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">2.350</div>
                <div className="text-sm text-gray-600">Prosečna cena</div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">43</div>
                <div className="text-sm text-gray-600">Aktivni članovi</div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <Crown className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">85%</div>
                <div className="text-sm text-gray-600">Premium članovi</div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">156</div>
                <div className="text-sm text-gray-600">Časova ovaj mesec</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
