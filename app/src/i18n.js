import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Greetings
      "good_morning": "Good Morning",
      "good_afternoon": "Good Afternoon", 
      "good_evening": "Good Evening",
      
      // Header
      "my_profile": "My Profile",
      "logout": "Logout",
      
      // Dashboard Cards
      "farm_overview": "📊 Farm Overview",
      "active_crops": "Active Crops",
      "acres": "Acres",
      "harvest_ready": "Harvest Ready",
      
      "todays_weather": "🌤️ Today's Weather",
      "partly_cloudy": "Partly Cloudy",
      "humidity": "Humidity",
      "good_farming_day": "Good day for farming!",
      
      "quick_actions": "🚀 Quick Actions",
      "plant_crops": "🌱 Plant Crops",
      "harvest": "🌾 Harvest",
      "irrigation": "💧 Irrigation",
      "market_prices": "🏪 Market Prices",
      
      "recent_activity": "📋 Recent Activity",
      "planted_tomatoes": "Planted tomatoes in Field A",
      "watered_wheat": "Watered wheat crops",
      "harvested_corn": "Harvested corn - 500kg",
      "hours_ago": "2 hours ago",
      "yesterday": "Yesterday",
      "days_ago": "3 days ago",
      
      "notifications": "🔔 Notifications",
      "pest_alert": "⚠️ Pest alert in Field B",
      "take_action": "Take action soon",
      "rain_expected": "🌧️ Rain expected tomorrow",
      "plan_accordingly": "Plan accordingly",
      "fertilizer_delivery": "✅ Fertilizer delivery complete",
      "ready_to_use": "Ready to use",
      
      "faas_services": "🔧 FaaS Services",
      "ai_crop_analysis": "AI Crop Analysis",
      "mobile_monitoring": "Mobile Monitoring", 
      "precision_farming": "Precision Farming",
      "yield_optimization": "Yield Optimization"
    }
  },
  hi: {
    translation: {
      // Greetings
      "good_morning": "सुप्रभात",
      "good_afternoon": "नमस्कार",
      "good_evening": "शुभ संध्या",
      
      // Header
      "my_profile": "मेरी प्रोफ़ाइल",
      "logout": "लॉगआउट",
      
      // Dashboard Cards
      "farm_overview": "📊 खेत का विवरण",
      "active_crops": "सक्रिय फसलें",
      "acres": "एकड़",
      "harvest_ready": "कटाई तैयार",
      
      "todays_weather": "🌤️ आज का मौसम",
      "partly_cloudy": "आंशिक बादल",
      "humidity": "नमी",
      "good_farming_day": "खेती के लिए अच्छा दिन!",
      
      "quick_actions": "🚀 त्वरित कार्य",
      "plant_crops": "🌱 फसल बोना",
      "harvest": "🌾 कटाई",
      "irrigation": "💧 सिंचाई",
      "market_prices": "🏪 बाजार भाव",
      
      "recent_activity": "📋 हाल की गतिविधि",
      "planted_tomatoes": "खेत A में टमाटर बोया",
      "watered_wheat": "गेहूं की फसल में पानी दिया",
      "harvested_corn": "मक्का की कटाई - 500 किलो",
      "hours_ago": "2 घंटे पहले",
      "yesterday": "कल",
      "days_ago": "3 दिन पहले",
      
      "notifications": "🔔 सूचनाएं",
      "pest_alert": "⚠️ खेत B में कीट चेतावनी",
      "take_action": "जल्दी कार्रवाई करें",
      "rain_expected": "🌧️ कल बारिश की संभावना",
      "plan_accordingly": "तदनुसार योजना बनाएं",
      "fertilizer_delivery": "✅ उर्वरक डिलीवरी पूर्ण",
      "ready_to_use": "उपयोग के लिए तैयार",
      
      "faas_services": "🔧 FaaS सेवाएं",
      "ai_crop_analysis": "AI फसल विश्लेषण",
      "mobile_monitoring": "मोबाइल निगरानी",
      "precision_farming": "सटीक खेती",
      "yield_optimization": "उत्पादन अनुकूलन"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;