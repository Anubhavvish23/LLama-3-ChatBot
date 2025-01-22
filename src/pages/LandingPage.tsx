import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bot, MessageSquare, Zap, Shield } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Credit Text at Top */}
      <div className="container mx-auto px-6 pt-4 text-center text-gray-400">
        <p className="text-sm animate-fadeIn">
          Designed and developed by Anubhav 🚀
        </p>
      </div>

      {/* Animated Navigation */}
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2 hover:scale-105 transform transition-transform duration-200">
          <Bot className="w-8 h-8 animate-bounce" />
          <span className="text-xl font-bold"></span>
        </div>
        <button
          onClick={() => navigate('/chat')}
          className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 active:scale-95"
        >
          Try Demo
        </button>
      </nav>

      {/* Main Content with Staggered Animations */}
      <main className="container mx-auto px-6 py-16">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-5xl font-bold mb-6 animate-slideDown">
            Experience the Power of Advanced AI Conversations
          </h1>
          <p className="text-xl text-gray-300 mb-12 animate-slideUp">
            Unlock intelligent conversations powered by AI. Experience natural language processing at its finest.
          </p>
          <button
            onClick={() => navigate('/chat')}
            className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-xl font-medium text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 active:scale-95"
          >
            Start Chatting Now
          </button>
        </div>

        {/* Feature Cards with Hover Effects */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          {[
            {
              Icon: MessageSquare,
              title: "Natural Conversations",
              description: "Engage in fluid, context-aware conversations that feel natural and intuitive."
            },
            {
              Icon: Zap,
              title: "Lightning Fast",
              description: "Get instant responses powered by state-of-the-art AI technology."
            },
            {
              Icon: Shield,
              title: "Secure & Private",
              description: "Your conversations are protected with enterprise-grade security."
            }
          ].map(({ Icon, title, description }, index) => (
            <div
              key={index}
              className="bg-gray-800/50 p-6 rounded-xl transform transition-all duration-300 hover:scale-105 hover:bg-gray-800/70 hover:shadow-xl group animate-fadeIn"
            >
              <Icon className="w-12 h-12 text-blue-500 mb-4 transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" />
              <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-400 transition-colors duration-300">
                {title}
              </h3>
              <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                {description}
              </p>
            </div>
          ))}
        </div>
      </main>

      {/* Add global styles for animations */}
      <style>{`
        @keyframes slideDown {
          from {
            transform: translateY(-20px);
          }
          to {
            transform: translateY(0);
          }
        }

        @keyframes slideUp {
          from {
            transform: translateY(20px);
          }
          to {
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slideDown {
          animation: slideDown 0.6s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.6s ease-out;
        }

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }

        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(0px);
          }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default LandingPage;