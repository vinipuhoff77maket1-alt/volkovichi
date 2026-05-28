/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sun, 
  Train, 
  ShoppingBag, 
  Megaphone, 
  Calendar, 
  MapPin, 
  Phone, 
  Clock, 
  ArrowUpRight, 
  Menu, 
  X, 
  ChevronRight, 
  Info, 
  Search, 
  Plus, 
  Heart, 
  Send,
  Check,
  Sparkles,
  Shield,
  MessageSquare,
  ExternalLink,
  Users,
  Feather
} from 'lucide-react';

import { NEWS_DATA, EVENTS_DATA, SHOP_ITEMS, INITIAL_ANNOUNCEMENTS, DIRECTORY_DATA } from './data';
import { Announcement, ShopItem } from './types';

export default function App() {
  // Navigation active tab tracking
  const [activeTab, setActiveTab] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Modal controls
  const [isOpenSuburban, setIsOpenSuburban] = useState(false);
  const [isOpenShop, setIsOpenShop] = useState(false);
  const [isOpenAddNotice, setIsOpenAddNotice] = useState(false);
  
  // Notice board state
  const [notices, setNotices] = useState<Announcement[]>(INITIAL_ANNOUNCEMENTS);
  const [searchNotice, setSearchNotice] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'Все' | 'Услуги' | 'Продажа' | 'Обмен' | 'Разное'>('Все');

  // New notice form state
  const [newNoticeTitle, setNewNoticeTitle] = useState('');
  const [newNoticeCategory, setNewNoticeCategory] = useState<'Услуги' | 'Продажа' | 'Обмен' | 'Разное'>('Услуги');
  const [newNoticeAuthor, setNewNoticeAuthor] = useState('');
  const [newNoticePhone, setNewNoticePhone] = useState('');
  const [newNoticeContent, setNewNoticeContent] = useState('');

  // Shop item search state
  const [shopSearch, setShopSearch] = useState('');
  const [shopCategory, setShopCategory] = useState<'Все' | 'Продукты' | 'Фрукты/Овощи' | 'Выпечка' | 'Белорусские товары'>('Все');

  // Contact form state
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactCategory, setContactCategory] = useState('Общий вопрос');

  // Nice notification toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Interactive like counters for news articles to encourage click activities
  const [newsLikes, setNewsLikes] = useState<{ [key: number]: number }>({ 1: 14, 2: 28, 3: 9 });
  const [likedArticles, setLikedArticles] = useState<{ [key: number]: boolean }>({});

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleLikeNews = (id: number) => {
    if (likedArticles[id]) {
      setNewsLikes(prev => ({ ...prev, [id]: prev[id] - 1 }));
      setLikedArticles(prev => ({ ...prev, [id]: false }));
    } else {
      setNewsLikes(prev => ({ ...prev, [id]: prev[id] + 1 }));
      setLikedArticles(prev => ({ ...prev, [id]: true }));
      showToast('Спасибо за вашу оценку новости!');
    }
  };

  // Safe submission of new classified ads
  const handleAddNoticeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoticeTitle || !newNoticeAuthor || !newNoticePhone || !newNoticeContent) {
      showToast('⚠️ Пожалуйста, заполните все поля формы');
      return;
    }

    const createdNotice: Announcement = {
      id: Date.now(),
      title: newNoticeTitle,
      category: newNoticeCategory,
      author: newNoticeAuthor,
      phone: newNoticePhone,
      date: 'Сегодня',
      content: newNoticeContent
    };

    setNotices([createdNotice, ...notices]);
    setIsOpenAddNotice(false);
    
    // Clear form
    setNewNoticeTitle('');
    setNewNoticeAuthor('');
    setNewNoticePhone('');
    setNewNoticeContent('');
    
    showToast('✨ Ваши объявление успешно добавлено на доску!');
  };

  // Safe submission of contact form
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactPhone || !contactMessage) {
      showToast('⚠️ Пожалуйста, введите имя, телефон и текст обращения');
      return;
    }
    
    showToast('📨 Обращение отправлено старосте деревне. Спасибо за активную позицию!');
    setContactName('');
    setContactPhone('');
    setContactMessage('');
  };

  // Filter notices
  const filteredNotices = notices.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchNotice.toLowerCase()) || 
                          item.content.toLowerCase().includes(searchNotice.toLowerCase()) ||
                          item.author.toLowerCase().includes(searchNotice.toLowerCase());
    const matchesCategory = selectedCategory === 'Все' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Filter food products in village shop
  const filteredShopItems = SHOP_ITEMS.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(shopSearch.toLowerCase());
    const matchesCategory = shopCategory === 'Все' || item.category === shopCategory;
    return matchesSearch && matchesCategory;
  });

  // Smooth scroll handler
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveTab(id);
    }
    setMobileMenuOpen(false);
  };

  return (
    <div id="root" className="min-h-screen bg-background text-text font-sans antialiased selection:bg-primary/20 selection:text-primary relative overflow-x-hidden">
      
      {/* Visual glowing orbs for ambient modern Apple design and glassmorphism feeling */}
      <div className="absolute top-20 left-[-10%] w-[45vw] h-[45vw] rounded-full bg-gradient-to-tr from-primary/5 to-white/10 blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-[40vh] right-[-20%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-bl from-primary/5 to-white/5 blur-[160px] pointer-events-none -z-10" />
      <div className="absolute bottom-[20vh] left-[-30%] w-[55vw] h-[55vw] rounded-full bg-gradient-to-r from-primary/5 to-white/15 blur-[130px] pointer-events-none -z-10" />

      {/* Floating Interactive Toast */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50 glass py-4 px-6 rounded-2xl shadow-xl border border-white/40 flex items-center space-x-3 text-sm font-medium text-text"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HEADER BAR */}
      <header className="sticky top-0 z-40 w-full px-4 py-3 md:px-8">
        <div className="max-w-7xl mx-auto glass rounded-[28px] px-6 py-3 md:px-8 flex items-center justify-between soft-shadow transition-all duration-300">
          
          {/* Logo with wolf link to Wikipedia */}
          <a 
            href="https://ru.wikipedia.org/wiki/%D0%92%D0%BE%D0%BB%D0%BA%D0%BE%D0%B2%D0%B8%D1%87%D0%B8_(%D0%94%D0%B7%D0%B5%D1%80%D0%B6%D0%B8%D0%BD%D1%81%D0%BA%D0%B8%D0%B9_%D1%80%D0%B0%D0%B9%D0%BE%D0%BD)"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-3.5 group cursor-pointer"
          >
            <div className="w-11 h-11 md:w-12 md:h-12 rounded-full overflow-hidden flex items-center justify-center p-1 bg-white/60 border border-white/60 neu-press group-hover:scale-105 transition-all duration-300">
              <img 
                src="/assets/image1.png" 
                alt="Воўкавічы Лого" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain filter hover:brightness-110"
              />
            </div>
            <div>
              <div className="flex items-center space-x-1">
                <span className="font-display font-bold text-xl md:text-2xl text-gradient tracking-tight leading-none">
                  Воўкавічы
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 text-text-light group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>
              <p className="text-[10px] uppercase tracking-widest text-[#6E6A64] mt-1 font-semibold leading-none">
                «Наша деревня — наша семья»
              </p>
            </div>
          </a>

          {/* Desktop Nav menu */}
          <nav className="hidden lg:flex items-center space-x-1.5 p-1 bg-[#2B2B2B]/5 rounded-full">
            {[
              { id: 'home', label: 'Главная' },
              { id: 'news', label: 'Новости' },
              { id: 'events', label: 'События' },
              { id: 'announcements', label: 'Объявления' },
              { id: 'directory', label: 'Справочник' },
              { id: 'contacts', label: 'Контакты' }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`px-4.5 py-1.5 text-xs md:text-sm font-semibold rounded-full cursor-pointer transition-all duration-300 ${
                  activeTab === item.id 
                    ? 'glass text-primary font-bold shadow-md' 
                    : 'text-text-secondary hover:text-text hover:bg-white/40'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Apple Burger Icon Menu */}
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => setIsOpenAddNotice(true)}
              className="px-4 py-2 text-xs font-bold rounded-full bg-primary hover:bg-primary-hover text-white shadow-sm hover:scale-[1.02] hover:shadow-md transition-all duration-200 flex items-center space-x-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Подать весть</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-full glass hover:bg-white/80 text-[#1d1d1f] transition-all shadow-sm"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile drawer overlay in Apple style */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden fixed top-20 right-4 left-4 z-30 overflow-hidden"
          >
            <div className="bg-white/95 backdrop-blur-3xl border border-white/80 rounded-[28px] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.08)]">
              <nav className="flex flex-col space-y-3.5">
                {[
                  { id: 'home', label: 'Главная' },
                  { id: 'news', label: 'Новости' },
                  { id: 'events', label: 'События' },
                  { id: 'announcements', label: 'Объявления' },
                  { id: 'directory', label: 'Справочник' },
                  { id: 'contacts', label: 'Контакты' }
                ].map((item, idx) => (
                  <motion.button
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`w-full text-left py-3 px-5 rounded-2xl text-sm font-bold transition-all ${
                      activeTab === item.id 
                        ? 'bg-primary/10 text-primary' 
                        : 'text-text-secondary hover:bg-white/60 hover:text-text'
                    }`}
                  >
                    {item.label}
                  </motion.button>
                ))}
              </nav>
              <div className="mt-6 pt-5 border-t border-border flex items-center justify-between text-xs text-text-light font-medium">
                <span>Волковичи — С любовью к Родине</span>
                <span>2026г.</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <section id="home" className="max-w-7xl mx-auto px-4 py-4 md:py-8">
        <div className="w-full rounded-[32px] overflow-hidden relative soft-shadow border border-white/50 bg-[#d2d2d7]">
          
          {/* Cinema background image with soft edge blurs */}
          <div className="absolute inset-0 z-0">
            <img 
              src="/assets/image2.png" 
              alt="Волковичи панорама" 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover brightness-[0.80]"
            />
            {/* Soft gradient covers to guarantee readable text overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent max-lg:bg-gradient-to-b max-lg:from-black/75 max-lg:via-black/50 max-lg:to-black/25" />
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#f2f2f7] to-transparent" />
          </div>

          <div className="relative z-10 px-6 py-12 md:px-12 lg:px-20 lg:py-24 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left side texts with animations */}
            <div className="lg:col-span-7 flex flex-col space-y-6">
              
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/20 border border-white/30 text-white max-w-fit">
                <Sparkles className="w-4 h-4 text-green-300" />
                <span className="text-xs font-bold uppercase tracking-wider">Беларускае Сяло</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-white leading-tight">
                Добро пожаловать<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sage to-primary">
                  в нашу деревню!
                </span>
              </h1>

              <p className="text-base md:text-lg text-white/95 leading-relaxed font-semibold max-w-xl">
                В Волковичах живут трудолюбивые и добрые люди. Здесь каждый знает, что взаимопомощь и поддержка — наша главная сила.
              </p>

              {/* Map Button with 3D map icon */}
              <div className="pt-2">
                <a 
                  href="https://maps.app.goo.gl/moiDicR3kzYWK49F9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-3.5 px-6 py-4 rounded-2xl glass hover:bg-white/80 text-text border border-white/60 shadow-lg hover:scale-[1.02] transition-all duration-300 font-bold text-sm group"
                >
                  <img 
                    src="/assets/image3.png" 
                    alt="Map" 
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 object-contain group-hover:rotate-6 transition-transform duration-300"
                  />
                  <div className="text-left">
                    <p className="leading-none text-[10px] text-text-light font-bold mb-0.5">Открыть навигатор</p>
                    <p className="leading-tight text-sm font-black text-text mt-0.5">Смотреть карту</p>
                  </div>
                </a>
              </div>

            </div>

            {/* Right side floating glass-card with family icon */}
            <div className="lg:col-span-12 xl:col-span-5 flex justify-center xl:justify-end">
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                className="glass p-6 rounded-[32px] w-full max-w-sm shadow-2xl border border-white/60 relative"
              >
                {/* 3D family representation */}
                <div className="w-full aspect-[4/3] rounded-2xl bg-white/50 overflow-hidden flex items-center justify-center mb-5 p-2 border border-white/60">
                  <img 
                    src="/assets/image4.png" 
                    alt="Семья Волковичи" 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain filter drop-shadow-[0_10px_15px_rgba(0,0,0,0.06)] hover:scale-105 transition-all duration-300"
                  />
                </div>
                <div>
                  <div className="flex items-center space-x-2.5 mb-2.5">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                      <Users className="w-4 h-4" />
                    </div>
                    <h3 className="text-sm font-bold text-text">Жители Волковичей</h3>
                  </div>
                  <p className="text-xs text-text-secondary leading-relaxed font-semibold">
                    Дружное сообщество, объединенное общими ценностями и заботой о родном крае.
                  </p>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* QUICK SERVICES WIDGETS GRID */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h2 className="text-xl font-display font-bold text-text flex items-center space-x-2.5">
            <span className="w-1.5 h-6 bg-primary rounded-full" />
            <span>Сервисы и виджеты</span>
          </h2>
          <p className="text-xs text-text-secondary mt-1 font-semibold">Все бытовые функции деревни в одно касание</p>
        </div>

        {/* 5 columns responsive layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">

          {/* CARD 1: WEATHER */}
          <div className="bg-[#FFF7E8]/85 backdrop-blur-md border border-[#E6E2DA]/50 p-5 rounded-[32px] soft-shadow flex flex-col justify-between apple-btn duration-300 group">
            <div>
              <div className="h-16 flex items-center justify-start mb-4">
                <img 
                  src="/assets/image5.png" 
                  alt="Погода" 
                  referrerPolicy="no-referrer"
                  className="h-16 w-16 object-contain filter drop-shadow-[0_5px_8px_rgba(232,180,80,0.1)] group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300"
                />
              </div>
              <p className="text-xs font-bold text-text-light uppercase tracking-wider mb-1">Погода</p>
              <h3 className="text-3xl font-display font-semibold text-text mt-1 leading-none">+18°C</h3>
              <p className="text-xs text-text-secondary font-bold mt-1.5">Рассеянная облачность</p>
            </div>
            <div className="mt-5 pt-3 border-t border-white/40">
              <a 
                href="https://www.gismeteo.by/weather-volkovichi-119015/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-3 rounded-full bg-white/75 hover:bg-[#7BA36A]/20 hover:scale-[1.02] text-text text-xxs font-bold flex items-center justify-between transition-all border border-white/45 shadow-sm"
              >
                <span>Прогноз на 3 дня</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-text-secondary" />
              </a>
            </div>
          </div>

          {/* CARD 2: SUBURBAN SCHEDULE (MODAL CALL) */}
          <div className="bg-[#EAF2FF]/85 backdrop-blur-md border border-[#E6E2DA]/50 p-5 rounded-[32px] soft-shadow flex flex-col justify-between apple-btn duration-300 group cursor-pointer" onClick={() => setIsOpenSuburban(true)}>
            <div>
              <div className="h-16 flex items-center justify-start mb-4">
                <img 
                  src="/assets/image6.png" 
                  alt="Электричка" 
                  referrerPolicy="no-referrer"
                  className="h-16 w-16 object-contain filter drop-shadow-[0_5px_8px_rgba(52,152,219,0.1)] group-hover:scale-115 transition-transform duration-300"
                />
              </div>
              <p className="text-xs font-bold text-text-light uppercase tracking-wider mb-1">Транспорт</p>
              <h3 className="text-lg font-display font-bold text-text mt-1.5 leading-tight">Расписание электричек</h3>
              <p className="text-xs text-text-secondary font-bold mt-1">Ост. пункт «Волковичи»</p>
            </div>
            <div className="mt-5 pt-3 border-t border-white/40">
              <button 
                className="w-full py-2.5 px-3 rounded-full bg-white/75 hover:bg-[#7BA36A]/20 hover:scale-[1.02] text-text text-xxs font-bold flex items-center justify-between transition-all cursor-pointer border border-white/45 shadow-sm"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpenSuburban(true);
                }}
              >
                <span>Полное расписание</span>
                <ChevronRight className="w-3.5 h-3.5 text-text-secondary" />
              </button>
            </div>
          </div>

          {/* CARD 3: VILLAGE SHOP (MODAL ASSORTMENT) */}
          <div className="bg-[#EEF8E8]/85 backdrop-blur-md border border-[#E6E2DA]/50 p-5 rounded-[32px] soft-shadow flex flex-col justify-between apple-btn duration-300 group cursor-pointer" onClick={() => setIsOpenShop(true)}>
            <div>
              <div className="h-16 flex items-center justify-start mb-4">
                <img 
                  src="/assets/image7.png" 
                  alt="Магазин" 
                  referrerPolicy="no-referrer"
                  className="h-16 w-16 object-contain filter drop-shadow-[0_5px_8px_rgba(76,175,80,0.1)] group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <p className="text-xs font-bold text-text-light uppercase tracking-wider mb-1">Розничные лавки</p>
              <h3 className="text-lg font-display font-bold text-text mt-1.5 leading-tight">Магазин «У запруды»</h3>
              <p className="text-xs text-text-secondary font-bold mt-1">Ежедневно: 9:00 - 21:00</p>
            </div>
            <div className="mt-5 pt-3 border-t border-white/40">
              <button 
                className="w-full py-2.5 px-3 rounded-full bg-white/75 hover:bg-[#7BA36A]/20 hover:scale-[1.02] text-text text-xxs font-bold flex items-center justify-between transition-all cursor-pointer border border-white/45 shadow-sm"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpenShop(true);
                }}
              >
                <span>Смотреть ассортимент</span>
                <ChevronRight className="w-3.5 h-3.5 text-primary" />
              </button>
            </div>
          </div>

          {/* CARD 4: CLASSIFIED ADS (SCROLL DIRECTLY) */}
          <div className="bg-[#F3F0FF]/85 backdrop-blur-md border border-[#E6E2DA]/50 p-5 rounded-[32px] soft-shadow flex flex-col justify-between apple-btn duration-300 group cursor-pointer" onClick={() => scrollToSection('announcements')}>
            <div>
              <div className="h-16 flex items-center justify-start mb-4">
                <img 
                  src="/assets/image8.png" 
                  alt="Объявления" 
                  referrerPolicy="no-referrer"
                  className="h-16 w-16 object-contain filter drop-shadow-[0_5px_8px_rgba(155,89,182,0.1)] group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300"
                />
              </div>
              <p className="text-xs font-bold text-text-light uppercase tracking-wider mb-1">Глас народа</p>
              <h3 className="text-lg font-display font-bold text-text mt-1.5 leading-tight">Доска объявлений</h3>
              <p className="text-xs text-text-secondary font-bold mt-1">Услуги жителей</p>
            </div>
            <div className="mt-5 pt-3 border-t border-white/40">
              <button 
                className="w-full py-2.5 px-3 rounded-full bg-white/75 hover:bg-[#7BA36A]/20 hover:scale-[1.02] text-text text-xxs font-bold flex items-center justify-between transition-all cursor-pointer border border-white/45 shadow-sm"
                onClick={(e) => {
                  e.stopPropagation();
                  scrollToSection('announcements');
                }}
              >
                <span>Перейти</span>
                <ChevronRight className="w-3.5 h-3.5 text-text-secondary" />
              </button>
            </div>
          </div>

          {/* CARD 5: CALENDAR HOLIDAYS */}
          <div className="bg-[#FFF1E8]/85 backdrop-blur-md border border-[#E6E2DA]/50 p-5 rounded-[32px] soft-shadow flex flex-col justify-between apple-btn duration-300 group">
            <div>
              <div className="h-16 flex items-center justify-start mb-4">
                <img 
                  src="/assets/image9.png" 
                  alt="События" 
                  referrerPolicy="no-referrer"
                  className="h-16 w-16 object-contain filter drop-shadow-[0_5px_8px_rgba(230,126,34,0.1)] group-hover:scale-111 transition-transform duration-300"
                />
              </div>
              <p className="text-xs font-bold text-text-light uppercase tracking-wider mb-1">Культура</p>
              <h3 className="text-lg font-display font-bold text-text mt-1.5 leading-tight">Календарь событий</h3>
              <p className="text-xs text-text-secondary font-bold mt-1">Гулянья, встречи</p>
            </div>
            <div className="mt-5 pt-3 border-t border-white/40">
              <a 
                href="https://webplus.info/index.php?page=358&calendar=fun-holidays"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-3 rounded-full bg-white/75 hover:bg-[#7BA36A]/20 hover:scale-[1.02] text-text text-xxs font-bold flex items-center justify-between transition-all border border-white/45 shadow-sm"
              >
                <span>Все события</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-text-secondary" />
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* DETAILED VILLAGE NEWS SECTION */}
      <section id="news" className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-display font-bold text-text flex items-center space-x-2.5">
              <span className="w-1.5 h-6 bg-primary rounded-full" />
              <span>Главные вести Волковичей</span>
            </h2>
            <p className="text-xs text-text-secondary mt-1 font-semibold">События, важные заявления и этапы развития деревни</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {NEWS_DATA.map((article) => (
            <div 
              key={article.id} 
              className="glass rounded-[28px] p-6 soft-shadow hover:scale-[1.02] duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-bold mb-4">
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                    {article.category}
                  </span>
                  <span className="text-[#86868b]">{article.date}</span>
                </div>
                <h3 className="text-lg font-display font-bold text-text mb-2.5 hover:text-primary transition-colors leading-tight">
                  {article.title}
                </h3>
                <p className="text-xs text-text-secondary leading-relaxed mb-4 font-semibold">
                  {article.excerpt}
                </p>
                <div className="bg-white/30 p-4.5 rounded-2xl border border-white/40 mb-4">
                  <p className="text-xxs uppercase font-bold text-[#86868b] tracking-wider mb-2">Полный текст вести</p>
                  <p className="text-xs text-slate-700 leading-relaxed italic">{article.content}</p>
                </div>
              </div>
              
              <div className="pt-3 border-t border-white/45 flex items-center justify-between">
                <button 
                  onClick={() => handleLikeNews(article.id)}
                  className={`flex items-center space-x-2 text-xs font-bold px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                    likedArticles[article.id] 
                      ? 'bg-red-50 text-red-500 border border-red-100' 
                      : 'bg-white/60 text-text hover:bg-white/95 border border-white/45'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${likedArticles[article.id] ? 'fill-current' : ''}`} />
                  <span>{newsLikes[article.id]}</span>
                </button>
                <span className="text-xxs font-bold text-[#86868b]">Прочитано</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BRIGHT EVENTS LIST PANEL */}
      <section id="events" className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Rounded Glassmorphism Block as requested */}
        <div className="glass-panel rounded-[32px] p-6 md:p-10 border border-white/60 relative overflow-hidden">
          
          <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-[80px] -z-10 pointer-events-none" />

          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 pb-5 border-b border-white/50">
            <div>
              <p className="text-xs font-bold text-primary uppercase tracking-wider mb-1">События и Афиша</p>
              <h2 className="text-2xl font-display font-extrabold text-text tracking-tight animate-fade-in">
                Ближайшие события в Волковичах
              </h2>
            </div>
            <div className="mt-4 md:mt-0">
              <a 
                href="https://webplus.info/index.php?page=358&calendar=fun-holidays"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1.5 bg-white/60 hover:bg-white/90 text-text px-4 py-2.5 rounded-2xl border border-white/60 shadow-sm text-xs font-bold transition-all"
              >
                <span>Все события региона</span>
                <ExternalLink className="w-3.5 h-3.5 text-text-secondary" />
              </a>
            </div>
          </div>

          {/* Horizontal Events List */}
          <div className="flex flex-col space-y-5">
            {EVENTS_DATA.map((event) => (
              <div 
                key={event.id}
                className="glass rounded-2xl p-5 md:p-6 border border-white/50 soft-shadow hover:scale-[1.01] transition-all duration-300 flex flex-col md:flex-row items-start md:items-center justify-between gap-5"
              >
                <div className="flex items-center space-x-5">
                  
                  {/* Big Date Badge (Apple style) */}
                  <div className="w-16 h-16 md:w-18 md:h-18 rounded-2xl bg-white/50 border border-white/65 flex flex-col items-center justify-center text-center p-2 shrink-0 shadow-sm">
                    <span className="text-xl md:text-2xl font-display font-black text-text leading-none">
                      {event.day}
                    </span>
                    <span className="text-[10px] uppercase font-bold text-primary tracking-wider mt-1">
                      {event.month}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-display font-bold text-text text-base md:text-lg mb-1 leading-tight">
                      {event.title}
                    </h3>
                    <p className="text-xs text-text-secondary leading-relaxed font-semibold max-w-2xl">
                      {event.description}
                    </p>
                  </div>

                </div>

                <div className="flex flex-col xs:flex-row md:flex-col items-start md:items-end justify-between gap-3 min-w-[150px] pt-3 md:pt-0 border-t md:border-t-0 border-white/40 max-md:w-full">
                  <div className="flex items-center space-x-4 text-xs font-bold text-text-secondary">
                    <span className="flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5 text-primary" />
                      <span>{event.time}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <MapPin className="w-3.5 h-3.5 text-primary" />
                      <span>{event.location}</span>
                    </span>
                  </div>
                  
                  <button 
                    onClick={() => showToast(`📅 Вы выразили желание пойти на "${event.title}"`)}
                    className="px-4 py-1.5 rounded-full bg-primary hover:bg-primary-hover text-white font-bold text-xxs transition-all cursor-pointer hover:scale-105 active:scale-95"
                  >
                    Я пойду
                  </button>
                </div>

              </div>
            ))}
          </div>

        </div>

      </section>

      {/* CLASSIFIED BULLETIN BOARD SECTION */}
      <section id="announcements" className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-display font-bold text-text flex items-center space-x-2.5">
              <span className="w-1.5 h-6 bg-primary rounded-full" />
              <span>Доска объявлений жителей</span>
            </h2>
            <p className="text-xs text-text-secondary mt-1 font-semibold">Частные объявления, предложения услуг на территории Волковичей</p>
          </div>
          
          {/* Quick notice submit action trigger button */}
          <button 
            onClick={() => setIsOpenAddNotice(true)}
            className="px-5 py-3 rounded-full bg-primary hover:bg-primary-hover text-white hover:scale-[1.02] transition-all font-bold text-xs flex items-center justify-center space-x-2 self-start md:self-auto cursor-pointer shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>Разместить объявление</span>
          </button>
        </div>

        {/* Filter Toolbar widget with apple feel */}
        <div className="glass rounded-3xl border border-white/50 p-4 mb-6 flex flex-col md:flex-row items-center justify-between gap-4 soft-shadow">
          
          {/* Search bar input with icon */}
          <div className="w-full md:max-w-xs relative">
            <Search className="w-4 h-4 text-text-light absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Поиск объявлений..."
              value={searchNotice}
              onChange={(e) => setSearchNotice(e.target.value)}
              className="w-full pl-9.5 pr-4 py-2.5 rounded-2xl bg-white/70 border border-white/60 text-xs text-text font-semibold focus:outline-none focus:border-primary transition-all"
            />
          </div>

          {/* Category selection pill sliders */}
          <div className="flex flex-wrap items-center gap-1.5">
            {['Все', 'Услуги', 'Продажа', 'Обмен', 'Разное'].map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat as any)}
                className={`px-4 py-2 text-xxs md:text-xs font-bold rounded-full cursor-pointer transition-all ${
                  selectedCategory === cat 
                    ? 'bg-primary text-white shadow-sm' 
                    : 'bg-white/50 text-text-secondary hover:text-text hover:bg-white/80 border border-white/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

        </div>

        {/* Grid or Empty warnings */}
        {filteredNotices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredNotices.map((ad) => (
              <div 
                key={ad.id}
                className="glass rounded-[32px] border border-white/50 p-5 soft-shadow hover:scale-[1.02] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3 text-xxs font-bold">
                    <span className={`px-2.5 py-1 rounded-full border ${
                      ad.category === 'Услуги' ? 'bg-indigo-50 text-indigo-600 border-indigo-100' :
                      ad.category === 'Продажа' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                      ad.category === 'Обмен' ? 'bg-cyan-50 text-cyan-600 border-cyan-100' :
                      'bg-gray-100 text-gray-600 border-gray-200'
                    }`}>
                      {ad.category}
                    </span>
                    <span className="text-text-light">{ad.date}</span>
                  </div>

                  <h3 className="font-display font-bold text-sm text-text mb-2 truncate">
                    {ad.title}
                  </h3>
                  
                  <p className="text-xs text-text-secondary leading-relaxed mb-4 line-clamp-4 font-semibold">
                    {ad.content}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/40 mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xxs text-text-light font-bold">Автор</span>
                    <span className="text-xxs text-text font-black">{ad.author}</span>
                  </div>
                  <a 
                    href={`tel:${ad.phone}`}
                    className="w-full py-2 px-3 rounded-full bg-white/50 hover:bg-primary-bg hover:text-primary hover:border-primary/30 border border-white/60 flex items-center justify-center space-x-1.5 transition-all text-xxs font-bold text-text cursor-pointer hover:scale-[1.02]"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Позвонить</span>
                  </a>
                </div>

              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white/40 rounded-[32px] border border-dashed border-gray-300">
            <p className="text-text-secondary text-sm font-semibold">Объявлений в данной категории пока нет</p>
            <button 
              onClick={() => { setSelectedCategory('Все'); setSearchNotice(''); }}
              className="mt-2.5 text-xs text-primary hover:underline font-bold"
            >
              Сбросить фильтры
            </button>
          </div>
        )}

      </section>

      {/* VILLAGE PHONEDOOK DIRECTORY */}
      <section id="directory" className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-display font-bold text-text flex items-center space-x-2.5">
            <span className="w-1.5 h-6 bg-primary rounded-full" />
            <span>Информационный справочник</span>
          </h2>
          <p className="text-xs text-text-secondary mt-1 font-semibold">Телефоны экстренных служб, органов управления и хозяйственников</p>
        </div>

        <div className="glass rounded-[32px] border border-white/50 p-5 md:p-8 soft-shadow">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {DIRECTORY_DATA.map((item) => (
              <div 
                key={item.id}
                className="p-4.5 rounded-[24px] bg-white/40 border border-white/60 hover:border-primary/30 hover:bg-white/60 transition-all duration-300 soft-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 mr-3 border border-primary/20">
                    <Shield className="w-4 h-4" />
                  </div>
                  <div className="w-full">
                    <h3 className="text-xs font-bold text-text leading-snug mb-1">
                      {item.title}
                    </h3>
                    {item.person && (
                      <p className="text-[10px] text-text-light italic mb-2 leading-tight font-semibold">
                        {item.person}
                      </p>
                    )}
                    <a 
                      href={`tel:${item.phone}`} 
                      className="text-xs font-display font-bold text-primary hover:text-primary-hover flex items-center space-x-1"
                    >
                      <span>{item.phone}</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 pt-5 border-t border-white/30 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-text-secondary font-semibold">
            <div className="flex items-center space-x-2">
              <Info className="w-4 h-4 text-primary" />
              <span>Деревня относится к Фанипольскому сельскому совету Дзержинского района Минской области</span>
            </div>
            <p className="italic">Обновлено: Май 2026г.</p>
          </div>
        </div>
      </section>

      {/* CONTACT FEEDBACK FORM */}
      <section id="contacts" className="max-w-7xl mx-auto px-4 py-8 mb-12">
        <div className="glass-panel rounded-[32px] p-6 md:p-10 border border-white/60 grid grid-cols-1 lg:grid-cols-12 gap-10 soft-shadow">
          
          {/* Slogan details on left */}
          <div className="lg:col-span-12 xl:col-span-5 flex flex-col justify-between">
            <div className="mb-6 xl:mb-0">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-primary/15 text-primary text-xxs font-bold uppercase tracking-wider mb-5 border border-primary/25">
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Обратная связь</span>
              </div>
              <h2 className="text-3xl font-display font-extrabold text-text tracking-tight leading-tight mb-4 animate-fade-in">
                Напишите старосте деревни
              </h2>
              <p className="text-sm text-text-secondary leading-relaxed mb-6 font-semibold">
                Есть идеи по развитию Волковичей? Заметили неполадку с общественным светом, качелями на площадке или дорогами? Опишите проблему напрямую руководителю общины. Нам важно мнение каждого!
              </p>
            </div>

            <div className="bg-white/40 border border-white/50 rounded-2xl p-5 space-y-3 shadow-inner">
              <div className="flex items-center space-x-3 text-xs text-text-secondary font-bold">
                <Clock className="w-4 h-4 text-primary" />
                <span>Рассмотрение заявок в течение 48 часов</span>
              </div>
              <div className="flex items-center space-x-3 text-xs text-text-secondary font-bold">
                <Shield className="w-4 h-4 text-primary" />
                <span>Все обращения тщательно фиксируются и ставятся на контроль в сельсовете</span>
              </div>
            </div>
          </div>

          {/* Direct message inputs */}
          <div className="lg:col-span-12 xl:col-span-7">
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                <div>
                  <label className="block text-xxs font-bold uppercase text-text-light tracking-wider mb-2">Ваше имя</label>
                  <input 
                    type="text" 
                    placeholder="Александр Иванов"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-2xl bg-white/70 border border-white/60 text-xs text-text font-semibold focus:outline-none focus:border-primary transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xxs font-bold uppercase text-text-light tracking-wider mb-2">Телефон для обратной связи</label>
                  <input 
                    type="text" 
                    placeholder="+375 ( ) "
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-2xl bg-white/70 border border-white/60 text-xs text-text font-semibold focus:outline-none focus:border-primary transition-all"
                  />
                </div>

              </div>

              <div>
                <label className="block text-xxs font-bold uppercase text-text-light tracking-wider mb-2">Категория вопроса</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {['Общий вопрос', 'Дороги', 'Свет / Газ', 'Инициатива'].map(cat => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setContactCategory(cat)}
                      className={`py-2 rounded-full text-xxs font-bold border transition-all cursor-pointer ${
                        contactCategory === cat 
                          ? 'bg-primary text-white border-primary shadow-sm' 
                          : 'bg-white/50 text-text-secondary border-white/60 hover:bg-white'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xxs font-bold uppercase text-text-light tracking-wider mb-2">Текст сообщения</label>
                <textarea 
                  rows={4}
                  placeholder="Опишите ваше предложение или жалобу..."
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-2xl bg-white/70 border border-white/60 text-xs text-text font-semibold focus:outline-none focus:border-primary transition-all resize-none"
                />
              </div>

              <div className="pt-2">
                <button 
                  type="submit"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-primary hover:bg-primary-hover text-white font-bold text-xs flex items-center justify-center space-x-2 transition-transform hover:scale-[1.01] cursor-pointer shadow-md"
                >
                  <Send className="w-4 h-4" />
                  <span>Отправить весточку старосте</span>
                </button>
              </div>

            </form>
          </div>

        </div>
      </section>


      {/* STUNNING INTERACTIVE MODALS */}

      {/* 1. TRAIN SCHEDULE (IFRAME) MODAL */}
      <AnimatePresence>
        {isOpenSuburban && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            
            {/* Backdrop blur overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpenSuburban(false)}
              className="absolute inset-0 bg-black/20 backdrop-blur-md"
            />

            {/* Modal Body */}
            <motion.div 
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              className="glass p-6 rounded-[32px] w-full max-w-lg shadow-2xl border border-white/60 relative z-10 text-text"
            >
              
              <div className="flex items-center justify-between pb-4 border-b border-white/40 mb-5">
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-full bg-blue-500/10 text-blue-600 flex items-center justify-center border border-blue-500/20">
                    <Train className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-text text-sm">Расписание электричек</h3>
                    <p className="text-[10px] text-text-light font-bold">Станция Волковичи • Направление Минск</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsOpenSuburban(false)}
                  className="p-1.5 rounded-full hover:bg-white/60 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              </div>

              {/* Yandex suburban timetable iframe representation */}
              <div className="w-full rounded-2xl overflow-hidden border border-white/60 shadow-inner bg-white/40 relative">
                <div className="absolute top-2 right-2 z-10">
                  <span className="px-2 py-0.5 bg-yellow-400 text-[9px] font-bold rounded text-gray-900 shadow-sm leading-none flex items-center space-x-1">
                    <span className="w-1 h-1 rounded-full bg-red-600 animate-ping" />
                    <span>Онлайн-табло</span>
                  </span>
                </div>
                <iframe 
                  frameBorder="0"
                  style={{ overflow: 'hidden', border: 0, width: '100%', height: '302px' }}
                  src="https://rasp.yandex.by/informers/station/9614408/?type=suburban"
                  title="Yandex suburban train timetable Volkovichi"
                />
              </div>

              <div className="pt-4 mt-4 border-t border-white/40 flex items-center justify-between text-xxs text-text-light font-bold">
                <span>Информер предоставлен Яндекс Расписаниями</span>
                <span className="text-primary italic">Прибытие вовремя</span>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 2. VILLAGE CONVENIENCE STORE (SHOP) MODAL */}
      <AnimatePresence>
        {isOpenShop && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpenShop(false)}
              className="absolute inset-0 bg-black/20 backdrop-blur-md"
            />

            <motion.div 
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              className="glass p-6 rounded-[32px] w-full max-w-2xl shadow-2xl border border-white/60 relative z-10 max-h-[90vh] overflow-hidden flex flex-col justify-between"
            >
              
              <div className="flex items-center justify-between pb-4 border-b border-white/40 mb-4 shrink-0">
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center border border-primary/20">
                    <ShoppingBag className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-text text-sm">Ассортимент лавки Волковичей</h3>
                    <p className="text-[10px] text-text-light font-bold">Свежий завоз продуктов по вторникам и пятницам</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsOpenShop(false)}
                  className="p-1.5 rounded-full hover:bg-white/60 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              </div>

              {/* Shop search and category tabs inside modal */}
              <div className="space-y-3 mb-4 shrink-0">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-text-light absolute left-3 top-1/2 -translate-y-1/2" />
                  <input 
                    type="text" 
                    placeholder="Найти продукт..."
                    value={shopSearch}
                    onChange={(e) => setShopSearch(e.target.value)}
                    className="w-full pl-8.5 pr-4 py-2.5 rounded-xl bg-white/70 border border-white/60 text-xxs text-text font-semibold focus:outline-none focus:border-primary transition-all"
                  />
                </div>
                <div className="flex flex-wrap gap-1">
                  {['Все', 'Продукты', 'Фрукты/Овощи', 'Выпечка', 'Белорусские товары'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setShopCategory(cat as any)}
                      className={`px-3.5 py-1.5 text-[10px] rounded-full font-bold cursor-pointer transition-all ${
                        shopCategory === cat 
                          ? 'bg-primary text-white shadow-sm' 
                          : 'bg-white/50 text-text-secondary hover:text-text hover:bg-white/80 border border-white/50'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Scrollable products list */}
              <div className="overflow-y-auto space-y-2 pr-1 max-h-[40vh] py-1">
                {filteredShopItems.length > 0 ? (
                  filteredShopItems.map((item) => (
                    <div 
                      key={item.id}
                      className="flex items-center justify-between p-3 rounded-xl bg-white/40 hover:bg-white/75 border border-white/40 hover:border-white/60 transition-all soft-shadow"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                        <div>
                          <p className="text-xs font-bold text-text leading-snug">{item.name}</p>
                          <span className="text-[9px] uppercase font-bold text-text-light">{item.category}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-display font-bold text-primary">{item.price}</p>
                        <span className="text-[9px] text-primary font-black">В наличии</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-10">
                    <p className="text-xs text-text-light font-bold">Продукты не найдены</p>
                  </div>
                )}
              </div>

              {/* Friendly message */}
              <div className="bg-primary/10 rounded-2xl p-4 mt-5 shrink-0 border border-primary/20 text-[11px] text-text-secondary leading-relaxed font-semibold">
                📢 <strong>Внимание:</strong> Если нужного товара нет на прилавке, вы можете сделать персональный заказ продавцу Галине по телефону, и товар привезут следующим рейсом автолавки сельпо!
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 3. ADD CLASSIFIED NOTICE BOARD NOTICE FORM */}
      <AnimatePresence>
        {isOpenAddNotice && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpenAddNotice(false)}
              className="absolute inset-0 bg-black/20 backdrop-blur-md"
            />

            <motion.div 
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              className="glass p-6 rounded-[32px] w-full max-w-lg shadow-2xl border border-white/60 relative z-10 max-h-[90vh] overflow-y-auto"
            >
              
              <div className="flex items-center justify-between pb-4 border-b border-white/40 mb-5">
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center border border-primary/20">
                    <Feather className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-text text-sm">Новая весть на доску</h3>
                    <p className="text-[10px] text-text-light font-bold">Разместить информацию для всех гостей и жителей</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsOpenAddNotice(false)}
                  className="p-1.5 rounded-full hover:bg-white/60 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              </div>

              {/* Add form */}
              <form onSubmit={handleAddNoticeSubmit} className="space-y-4">
                
                <div>
                  <label className="block text-xxs font-bold uppercase text-text-light tracking-wider mb-1.5">Заголовок</label>
                  <input 
                    type="text" 
                    placeholder="Например: Продаю березовый сок"
                    value={newNoticeTitle}
                    onChange={(e) => setNewNoticeTitle(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-white/70 border border-white/60 text-xs text-text font-semibold focus:outline-none focus:border-primary transition-all"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  
                  <div>
                    <label className="block text-xxs font-bold uppercase text-text-light tracking-wider mb-1.5">Категория</label>
                    <select 
                      value={newNoticeCategory}
                      onChange={(e) => setNewNoticeCategory(e.target.value as any)}
                      className="w-full px-3 py-3 rounded-2xl bg-white/70 border border-white/60 text-xs text-text font-bold focus:outline-none focus:border-primary transition-all cursor-pointer"
                    >
                      <option value="Услуги">Услуги</option>
                      <option value="Продажа">Продажа</option>
                      <option value="Обмен">Обмен</option>
                      <option value="Разное">Разное</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xxs font-bold uppercase text-text-light tracking-wider mb-1.5">Имя автора</label>
                    <input 
                      type="text" 
                      placeholder="Сергей"
                      value={newNoticeAuthor}
                      onChange={(e) => setNewNoticeAuthor(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl bg-white/70 border border-white/60 text-xs text-text font-semibold focus:outline-none focus:border-primary transition-all"
                    />
                  </div>

                </div>

                <div>
                  <label className="block text-xxs font-bold uppercase text-text-light tracking-wider mb-1.5">Номер телефона</label>
                  <input 
                    type="text" 
                    placeholder="+375 (33) 123-45-67"
                    value={newNoticePhone}
                    onChange={(e) => setNewNoticePhone(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-white/70 border border-white/60 text-xs text-text font-semibold focus:outline-none focus:border-primary transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xxs font-bold uppercase text-text-light tracking-wider mb-1.5">Содержание</label>
                  <textarea 
                    rows={4}
                    placeholder="Подробно опишите ваше предложение, цену, возможности или условия..."
                    value={newNoticeContent}
                    onChange={(e) => setNewNoticeContent(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-white/70 border border-white/60 text-xs text-text font-semibold focus:outline-none focus:border-primary transition-all resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button 
                    type="submit"
                    className="w-full py-3.5 rounded-full bg-primary hover:bg-primary-hover text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                  >
                    Опубликовать на доске
                  </button>
                </div>

              </form>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* FOOTER AREA */}
      <footer className="w-full bg-[#1c1c1e] text-[#eaeae6] mt-20 pt-16 pb-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
          
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center p-1">
                <img 
                  src="/assets/image1.png" 
                  alt="Волковичи" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="font-display font-extrabold text-2xl tracking-tight text-white">
                Воўкавічы
              </span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed max-w-sm">
              Информационный портал одной из самых колоритных деревень Дзержинского района. Наша сила — в единстве, доброте и заботе друг о друге.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#f5f4f0]/60 mb-4">Навигация</h3>
            <ul className="space-y-2.5 text-xs text-gray-300">
              <li><button onClick={() => scrollToSection('home')} className="hover:text-white transition-colors cursor-pointer">Главная</button></li>
              <li><button onClick={() => scrollToSection('news')} className="hover:text-white transition-colors cursor-pointer">Новости</button></li>
              <li><button onClick={() => scrollToSection('events')} className="hover:text-white transition-colors cursor-pointer">Ближайшие события</button></li>
              <li><button onClick={() => scrollToSection('announcements')} className="hover:text-white transition-colors cursor-pointer">Классифайды</button></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#f5f4f0]/60 mb-4">Контакты Совета</h3>
            <ul className="space-y-2.5 text-xs text-gray-300">
              <li className="flex items-center space-x-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>+375 (17) 162-42-00 (Сельсовет)</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>+375 (29) 123-45-67 (Староста)</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>д. Волковичи, Минская область, РБ</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#f5f4f0]/60 mb-4">Партнеры и полезное</h3>
            <ul className="space-y-2.5 text-xs text-gray-300">
              <li>
                <a 
                  href="https://ru.wikipedia.org/wiki/%D0%92%D0%BE%D0%BB%D0%BA%D0%BE%D0%B2%D0%B8%D1%87%D0%B8_(%D0%94%D0%B7%D0%B5%D1%80%D0%B6%D0%B8%D0%BD%D1%81%D0%BA%D0%B8%D0%B9_%D1%80%D0%B0%D0%B9%D0%BE%D0%BD)"
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-white flex items-center space-x-1"
                >
                  <span>Википедия • Волковичи</span>
                  <ExternalLink className="w-3 h-3 text-gray-500" />
                </a>
              </li>
              <li>
                <a 
                  href="https://maps.app.goo.gl/moiDicR3kzYWK49F9"
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-white flex items-center space-x-1"
                >
                  <span>Google Карты • Волковичи</span>
                  <ExternalLink className="w-3 h-3 text-gray-500" />
                </a>
              </li>
              <li>
                <a 
                  href="https://webplus.info/index.php?page=358&calendar=fun-holidays"
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-white flex items-center space-x-1"
                >
                  <span>Праздники Беларуси</span>
                  <ExternalLink className="w-3 h-3 text-gray-500" />
                </a>
              </li>
            </ul>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>© 2026 Воўкавічы. Все права защищены. Разработано в премиум-стиле Apple.</p>
          <div className="flex items-center space-x-2.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Сервис активен</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
