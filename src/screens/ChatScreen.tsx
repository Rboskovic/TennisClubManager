import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Send,
  Users,
  Bell,
  Wifi,
  WifiOff,
  MessageSquare,
  Megaphone,
  Pin,
  Trash2,
  UserX,
  Calendar,
  CheckCircle,
  AlertTriangle,
  MoreVertical,
  Shield,
} from "lucide-react";
import {
  chatAPI,
  useChatRealtimeUpdates,
  type Conversation,
  type Message,
} from "../services/chatApi";

export default function ChatScreen() {
  const navigate = useNavigate();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] =
    useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [isHighlighted, setIsHighlighted] = useState(false);
  const [hoveredMessageId, setHoveredMessageId] = useState<string | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");

  // Club moderator user - in production this would come from auth
  const currentUser = {
    id: "moderator-123",
    name: "Baseline Tennis",
    role: "moderator",
    clubId: "baseline-tennis",
    clubName: "BASELINE",
  };

  const chatRealtimeUpdates = useChatRealtimeUpdates();

  useEffect(() => {
    loadClubConversation();

    const unsubscribeMessage = chatRealtimeUpdates.onMessageReceived(
      (data: { message: Message }) => {
        if (
          selectedConversation &&
          data.message.conversationId === selectedConversation.id
        ) {
          setMessages((prev) => [...prev, data.message]);
          scrollToBottom();
        }
      }
    );

    return () => {
      unsubscribeMessage();
    };
  }, [selectedConversation]);

  const loadClubConversation = async () => {
    try {
      const data = await chatAPI.getConversations(currentUser.id);
      const clubConversations = data.filter(
        (conv) => conv.type === "group" && conv.clubId === currentUser.clubId
      );
      setConversations(clubConversations);
      
      if (clubConversations.length > 0) {
        const clubConv = clubConversations[0];
        setSelectedConversation(clubConv);
        loadMessages(clubConv.id);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error loading conversations:", error);
      setLoading(false);
    }
  };

  const loadMessages = async (conversationId: string) => {
    try {
      const data = await chatAPI.getMessages(conversationId, currentUser.id);
      setMessages(data);
      scrollToBottom();
    } catch (error) {
      console.error("Error loading messages:", error);
    }
  };

  const sendAdminMessage = async () => {
    if (!newMessage.trim() || !selectedConversation) return;

    try {
      let messageContent = newMessage.trim();
      let messageType = "text";

      // Check for @rezervacije command
      if (messageContent.startsWith("@rezervacije")) {
        const dateMatch = messageContent.match(/@rezervacije\s+(\d{4}-\d{2}-\d{2})/);
        if (dateMatch) {
          const targetDate = dateMatch[1];
          messageContent = `[REZERVACIJE:${targetDate}] ${messageContent.replace(/@rezervacije\s+\d{4}-\d{2}-\d{2}/, "").trim()}`;
          messageType = "match-request";
        }
      }

      const messagePrefix = isHighlighted ? "[URGENT]" : "[ADMIN]";
      const message = await chatAPI.sendMessage({
        conversationId: selectedConversation.id,
        senderId: currentUser.id,
        senderName: `${currentUser.clubName} TENNIS`,
        content: `${messagePrefix} ${messageContent}`,
        type: messageType,
      });

      setMessages((prev) => [...prev, message]);
      setNewMessage("");
      setIsHighlighted(false);
      scrollToBottom();
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const pinMessage = async (messageId: string) => {
    try {
      // Add [PINNED] prefix to message
      setMessages((prev) => 
        prev.map(msg => 
          msg.id === messageId 
            ? { ...msg, content: `[PINNED] ${msg.content}` }
            : msg
        )
      );
      setHoveredMessageId(null);
      console.log(`Pinned message ${messageId}`);
    } catch (error) {
      console.error("Error pinning message:", error);
    }
  };

  const deleteMessage = async (messageId: string) => {
    try {
      setMessages((prev) => prev.filter(msg => msg.id !== messageId));
      setHoveredMessageId(null);
      console.log(`Deleted message ${messageId}`);
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  const banUser = async (userId: string, duration: string) => {
    try {
      console.log(`Banning user ${userId} for ${duration}`);
      setHoveredMessageId(null);
    } catch (error) {
      console.error("Error banning user:", error);
    }
  };

  const sendReservationNotification = () => {
    if (!selectedDate) return;
    setNewMessage(`@rezervacije ${selectedDate} `);
    setShowDatePicker(false);
  };

  const formatMessageContent = (content: string) => {
    // Handle @rezervacije mentions in club app - same formatting as consumer
    const rezervacijeRegex = /@rezervacije\s+(\d{4}-\d{2}-\d{2})/g;
    const parts = content.split(rezervacijeRegex);
    
    if (parts.length > 1) {
      return (
        <span>
          {parts.map((part, index) => {
            if (index % 2 === 1) {
              // This is a date part - make it visible for club managers
              return (
                <span key={index} className="inline-flex items-center bg-blue-200 text-blue-800 px-2 py-1 rounded-md text-xs font-bold mx-1">
                  @rezervacije <span className="ml-1 font-black">{part}</span>
                </span>
              );
            }
            return part;
          })}
        </span>
      );
    }
    
    return content;
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("sr-RS", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="h-screen bg-gray-50 flex items-center justify-center pb-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (!selectedConversation) {
    return (
      <div className="h-screen bg-gray-50 flex items-center justify-center pb-20">
        <div className="text-center">
          <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Nema aktivnog chata</h2>
          <p className="text-gray-600">Klub chat trenutno nije dostupan</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gray-50 flex flex-col pb-20">
      {/* Admin Header */}
      <div className="bg-red-600 text-white px-4 py-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button onClick={() => navigate("/")} className="mr-3">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <span className="text-lg">🎾</span>
              </div>
              <div>
                <h1 className="text-lg font-semibold">Admin Chat</h1>
                <div className="flex items-center space-x-2 text-xs text-red-100">
                  <span>{selectedConversation.name}</span>
                  <span>•</span>
                  {chatRealtimeUpdates.isConnected ? (
                    <div className="flex items-center">
                      <Wifi className="w-3 h-3 mr-1" />
                      <span>Uživo</span>
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <WifiOff className="w-3 h-3 mr-1" />
                      <span>Offline</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Users className="w-6 h-6" />
            <span className="text-sm">{selectedConversation.participants.length}</span>
          </div>
        </div>

        {/* Admin Powers Notice */}
        <div className="mt-3 bg-red-500/50 rounded-lg p-3">
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-4 h-4" />
            <span className="text-sm font-medium">
              Admin kontrole: Hover poruku za Pin/Delete • @rezervacije + datum za obaveštenja
            </span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto bg-gray-50 px-4 py-4 space-y-4">
        {messages.map((message, index) => {
          const isUrgentMessage = message.content.startsWith("[URGENT]");
          const isAdminMessage = message.content.startsWith("[ADMIN]") || message.content.startsWith("[URGENT]") || message.content.startsWith("[BASELINE]") || message.content.startsWith("[MODERATOR]");
          const isReservationMessage = message.content.includes("[REZERVACIJE:");
          const isPinnedMessage = message.content.startsWith("[PINNED]");
          const isOwnMessage = message.senderId === currentUser.id;
          const isSystem = message.type === "system";

          return (
            <div
              key={message.id}
              className={`flex ${
                isOwnMessage ? "justify-end" : "justify-start"
              } group`}
              onMouseEnter={() => setHoveredMessageId(message.id)}
              onMouseLeave={() => setHoveredMessageId(null)}
            >
              {isSystem ? (
                <div className="max-w-xs mx-auto">
                  <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg text-center">
                    <Bell className="w-4 h-4 inline-block mr-1" />
                    <span className="text-sm">{message.content}</span>
                  </div>
                  <p className="text-xs text-gray-500 text-center mt-1">
                    {formatTime(message.createdAt)}
                  </p>
                </div>
              ) : (
                <div className="max-w-md relative">
                  {/* Pin indicator for pinned messages */}
                  {isPinnedMessage && (
                    <div className="flex items-center justify-center space-x-1 mb-2">
                      <Pin className="w-3 h-3 text-gray-500" />
                      <span className="text-xs text-gray-500">Zakačena poruka</span>
                    </div>
                  )}

                  {/* Admin Controls - Show on hover */}
                  {hoveredMessageId === message.id && (
                    <div className="absolute -right-16 top-0 flex flex-col space-y-1 z-10">
                      <button
                        onClick={() => pinMessage(message.id)}
                        className="p-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-yellow-50 hover:border-yellow-300 transition-colors"
                        title="Zakači poruku"
                      >
                        <Pin className="w-4 h-4 text-yellow-600" />
                      </button>
                      <button
                        onClick={() => deleteMessage(message.id)}
                        className="p-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-red-50 hover:border-red-300 transition-colors"
                        title="Obriši poruku"
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                      {!isOwnMessage && (
                        <button
                          onClick={() => banUser(message.senderId, "1h")}
                          className="p-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-orange-50 hover:border-orange-300 transition-colors"
                          title="Baniraj korisnika"
                        >
                          <UserX className="w-4 h-4 text-orange-600" />
                        </button>
                      )}
                    </div>
                  )}

                  <div className="flex items-start space-x-2">
                    <div className="flex-shrink-0">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                          isAdminMessage
                            ? isUrgentMessage
                              ? "bg-red-600 text-white border-2 border-red-700"
                              : "bg-emerald-600 text-white border-2 border-emerald-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {isAdminMessage ? "🎾" : "🎾"}
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-xs font-medium text-gray-700">
                          {isAdminMessage ? `${currentUser.clubName} TENNIS` : message.senderName}
                        </span>
                        {isAdminMessage && (
                          <div className="flex items-center space-x-1">
                            <Shield className={`w-3 h-3 ${
                              isUrgentMessage ? "text-red-600" : "text-emerald-600"
                            }`} />
                            <span className={`text-xs font-bold ${
                              isUrgentMessage ? "text-red-600" : "text-emerald-600"
                            }`}>
                              ADMIN
                            </span>
                          </div>
                        )}
                        {isReservationMessage && (
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-3 h-3 text-blue-600" />
                            <span className="text-xs font-bold text-blue-600">REZERVACIJE</span>
                          </div>
                        )}
                        <span className="text-xs text-gray-500">
                          {formatTime(message.createdAt)}
                        </span>
                      </div>
                      
                      <div
                        className={`px-4 py-3 rounded-lg shadow-sm ${
                          isAdminMessage
                            ? isUrgentMessage
                              ? "bg-red-600 text-white border-2 border-red-700 shadow-lg"
                              : "bg-emerald-600 text-white border-2 border-emerald-700"
                            : isReservationMessage
                            ? "bg-blue-600 text-white border-2 border-blue-700"
                            : isOwnMessage
                            ? "bg-red-600 text-white"
                            : "bg-white border border-gray-200 text-gray-800"
                        }`}
                      >
                        <div className={`text-sm ${isAdminMessage || isReservationMessage ? "font-medium" : ""}`}>
                          {formatMessageContent(
                            isAdminMessage || isReservationMessage || isPinnedMessage
                              ? message.content.replace(/^\[.*?\]\s*/, "")
                              : message.content
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Admin Message Input */}
      <div className="bg-white border-t border-gray-200 px-4 py-3">
        {/* Controls Row */}
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 text-sm">
              <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                isHighlighted ? "bg-red-600" : "bg-emerald-600"
              }`}>
                <span className="text-white text-xs">🎾</span>
              </div>
              <span className={`font-medium ${isHighlighted ? "text-red-600" : "text-emerald-600"}`}>
                ADMIN poruka {isHighlighted ? "(HITNA)" : ""}
              </span>
            </div>
            
            <button
              onClick={() => setIsHighlighted(!isHighlighted)}
              className={`flex items-center space-x-1 px-2 py-1 rounded-md text-xs font-medium transition-all ${
                isHighlighted
                  ? "bg-red-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {isHighlighted ? <Megaphone className="w-3 h-3" /> : <MessageSquare className="w-3 h-3" />}
              <span>{isHighlighted ? "HITNO" : "Istakni"}</span>
            </button>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowDatePicker(!showDatePicker)}
              className="flex items-center space-x-1 px-3 py-1 bg-blue-600 text-white rounded-md text-xs font-medium hover:bg-blue-700"
            >
              <Calendar className="w-3 h-3" />
              <span>@rezervacije</span>
            </button>
          </div>
        </div>

        {/* Date Picker for Reservations */}
        {showDatePicker && (
          <div className="mb-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center space-x-3">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={sendReservationNotification}
                disabled={!selectedDate}
                className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 disabled:bg-gray-300"
              >
                Pošalji svima sa rezervacijom
              </button>
              <button
                onClick={() => setShowDatePicker(false)}
                className="px-3 py-2 text-gray-600 hover:text-gray-800"
              >
                Otkaži
              </button>
            </div>
            <p className="text-xs text-blue-600 mt-2">
              Poruka će biti poslata svim igračima koji imaju rezervaciju za izabrani datum
            </p>
          </div>
        )}
        
        <div className="flex items-end space-x-3">
          <div className="flex-1">
            <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    sendAdminMessage();
                  }
                }}
                placeholder={
                  isHighlighted 
                    ? "Ukucajte hitnu poruku..."
                    : newMessage.startsWith("@rezervacije")
                    ? "Dodajte poruku za igrače sa rezervacijom..."
                    : "Ukucajte admin poruku..."
                }
                className="flex-1 bg-transparent focus:outline-none text-gray-900 placeholder-gray-500"
              />
            </div>
          </div>
          
          <button
            onClick={sendAdminMessage}
            disabled={!newMessage.trim()}
            className={`p-3 rounded-full transition-all ${
              newMessage.trim()
                ? isHighlighted
                  ? "bg-red-600 text-white hover:bg-red-700 shadow-lg"
                  : "bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
