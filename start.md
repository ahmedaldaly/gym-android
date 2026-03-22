waydroid session start
waydroid show-full-ui
waydroid show-ui

npm start
npx react-native run-android
adb devices
بص علشان تفتح devtool اضفك علي ctrl +m  open dev menu منجوا الفون الايمليتور
npm install react-native-linear-gradient  لعمل شكل التاب الي في التصميم
npm install react-native-svg دي الي بتعمل بيها تاثير النوتش القص يعني 

========================
تغير الاسم والايقون
========================
npm install react-native-rename -g 
npx react-native-rename "FG Fitness" الاسم
npx react-native-rename "FG Fitness" -b com.fgfitness.app  تغير الباندل اي دي 

npm install -g react-native-make
react-native set-icon --path ./icon.png
npx --package react-native-make react-native-make set-icon --path ./logo.png
 npx react-native-make set-icon --path ./logo.png
========================
🔥 CORE (أساسي لأي مشروع)
========================

@react-navigation/native
تنقل بين الشاشات (Stack / Tabs / Drawer) – زي React Router

@tanstack/react-query
إدارة بيانات السيرفر + caching + loading + retry + pagination

zustand
Global state خفيف وسريع (بديل Redux Toolkit)

axios
HTTP requests + interceptors للـ tokens

react-hook-form
إدارة الفورمز بأداء عالي

zod
Validation + schema قوي للفورمز والـ API

@react-native-async-storage/async-storage
تخزين بيانات محلي بسيط (token / settings)

react-native-mmkv
تخزين محلي أسرع بكتير من AsyncStorage (Production أفضل)

react-native-reanimated
Animations احترافية 60fps على الـ native thread

react-native-gesture-handler
Gestures (swipe / drag / bottom sheet)

react-native-safe-area-context
التعامل مع النوتش و safe areas

react-native-screens
يحسن الأداء والتنقل بين الشاشات


========================
🎨 UI / DESIGN (اختار واحدة فقط)
========================

nativewind
Tailwind CSS لـ React Native (الأسرع في التطوير) ⭐ المفضل

react-native-paper
Material Design components جاهزة

react-native-elements
UI جاهز وبسيط وسريع

tamagui / ui-kitten
Design system احترافي ومتقدم


========================
📱 DEVICE FEATURES (حسب الحاجة)
========================

react-native-svg
رسم SVG / charts / custom icons

react-native-vector-icons
مكتبات أيقونات جاهزة

react-native-fast-image
تحميل صور سريع + caching (مهم للـ feeds)

react-native-image-picker
فتح الكاميرا أو الجاليري لاختيار الصور

react-native-permissions
طلب صلاحيات (كاميرا / موقع / ملفات)

react-native-share
مشاركة لينكات أو صور مع التطبيقات التانية

react-native-maps
خرائط + GPS + markers

react-native-video
تشغيل فيديو داخل التطبيق

react-native-track-player
تشغيل صوت/موسيقى في الخلفية

react-native-webview
عرض صفحات ويب داخل التطبيق


========================
🔐 AUTH / SECURITY
========================

react-native-keychain
تخزين التوكنات بشكل مشفر وآمن (Secure Storage)


========================
🔔 NOTIFICATIONS / BACKEND
========================

@react-native-firebase/app
Firebase core

@react-native-firebase/messaging
Push Notifications (FCM)

@react-native-firebase/analytics
Analytics

@react-native-firebase/crashlytics
تتبع الكراشات


========================
🧪 DEBUG / DEV TOOLS
========================

reactotron-react-native
Debug requests + state

flipper
Debug رسمي من فيسبوك


========================
🔥 الباقة اللي أنصح بيها لأي مشروع Production
========================

Navigation
TanStack Query
Zustand
Axios
React Hook Form + Zod
MMKV
NativeWind
Reanimated + Gesture Handler
Fast Image
Firebase Messaging
Keychain
Permissions

