import React, { useState, useEffect } from 'react';
import { 
  User, Settings, Target, BarChart3, MessageCircle, 
  CheckCircle2, Mail, Phone, ArrowRight, MousePointer2, Clock, 
  ShieldCheck, ChevronDown, Facebook, Linkedin, Instagram, BookOpen,
  Youtube, ShoppingCart, ExternalLink, MessageSquare,
  Quote, Star, Brain, RefreshCw, Activity, Zap, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, margin: "-100px" },
  transition: { staggerChildren: 0.2 }
};

const quotesList = [
  "Cho đến khi bạn biến vô thức thành ý thức, nó sẽ dẫn dắt cuộc đời bạn và bạn sẽ gọi đó là định mệnh. — Carl Jung",
  "Giữa kích thích và phản ứng có một khoảng trống. Trong khoảng trống đó là sức mạnh để ta lựa chọn. — Viktor Frankl",
  "Chúng ta không bị tổn thương bởi những sự việc xảy ra, mà bởi cách chúng ta nhìn nhận chúng. — Epictetus",
  "Bạn không thể giải quyết vấn đề với cùng một tư duy đã tạo ra nó. — Albert Einstein",
  "Hệ thống tốt sẽ tự động tạo ra kết quả tốt. — Tư duy hệ thống"
];

export default function App() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', service: 'Tham vấn tâm lý 1-1', message: '' });
  const [bookingStatus, setBookingStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [scrolled, setScrolled] = useState(false);
  const [currentQuoteIdx, setCurrentQuoteIdx] = useState(0);
  const [heroImage, setHeroImage] = useState('');
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);

  useEffect(() => {
    const fetchConfig = async () => {
      let scriptUrl = import.meta.env.VITE_GAS_URL;
      if (!scriptUrl || !scriptUrl.startsWith('http')) {
        scriptUrl = 'https://script.google.com/macros/s/AKfycbwnPF8kDdNmDN9IePTCnHGokHExDZp1RJrjwOa2lLcBK9BKS53Lt-BgrDYRuOcfB9Nkvw/exec';
      }
      
      try {
        const response = await fetch(scriptUrl, {
          method: 'GET'
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        if (result.status === 'success' && result.data && result.data.HeroImage) {
          setHeroImage(result.data.HeroImage);
        }
      } catch (error) {
        console.error('Lỗi khi tải cấu hình:', error);
      }
    };
    fetchConfig();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    
    const quoteInterval = setInterval(() => {
      setCurrentQuoteIdx((prev) => (prev + 1) % quotesList.length);
    }, 5000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(quoteInterval);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setBookingStatus('sending');
    
    let scriptUrl = import.meta.env.VITE_GAS_URL;
    if (!scriptUrl || !scriptUrl.startsWith('http')) {
      scriptUrl = 'https://script.google.com/macros/s/AKfycbwnPF8kDdNmDN9IePTCnHGokHExDZp1RJrjwOa2lLcBK9BKS53Lt-BgrDYRuOcfB9Nkvw/exec';
    }
    
    if (!scriptUrl) {
      // Simulate network request if no URL is provided
      setTimeout(() => {
        setBookingStatus('success');
        setFormData({ name: '', email: '', phone: '', service: 'Tham vấn tâm lý 1-1', message: '' });
        setTimeout(() => setBookingStatus('idle'), 5000);
      }, 1500);
      return;
    }

    try {
      // Create form data
      const data = new URLSearchParams();
      data.append('name', formData.name);
      data.append('email', formData.email);
      data.append('phone', formData.phone);
      data.append('service', formData.service);
      data.append('message', formData.message || '');

      await fetch(scriptUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: data.toString(),
      });
      
      setBookingStatus('success');
      setFormData({ name: '', email: '', phone: '', service: 'Tham vấn tâm lý 1-1', message: '' });
      setTimeout(() => setBookingStatus('idle'), 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setBookingStatus('error');
      setTimeout(() => setBookingStatus('idle'), 5000);
    }
  };

  return (
    <div className="min-h-screen font-sans selection:bg-secondary/20">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4 ${
        scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent'
      }`}>
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollToSection('hero')}>
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-display font-bold text-xl shadow-lg shadow-primary/20">
              T
            </div>
            <span className="font-display font-bold text-dark text-xl hidden sm:block tracking-tight">Trần Thiện</span>
          </div>
          
          <div className="flex items-center gap-2 md:gap-8 overflow-x-auto no-scrollbar">
            {['Về tôi', 'Lý do', 'Dịch vụ', 'Cửa hàng', 'Góc chia sẻ'].map((item, idx) => {
              const ids = ['about', 'why-me', 'services', 'tools', 'content'];
              return (
                <button 
                  key={idx}
                  onClick={() => scrollToSection(ids[idx])}
                  className="text-sm font-medium text-dark/80 hover:text-primary transition-colors whitespace-nowrap px-2 py-1"
                >
                  {item}
                </button>
              );
            })}
            <button 
              onClick={() => scrollToSection('booking')}
              className="bg-secondary text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-secondary-hover transition-all shadow-lg shadow-secondary/30 whitespace-nowrap ml-2 active:scale-95"
            >
              Đặt lịch ngay
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center pt-20 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-secondary/5 rounded-full blur-3xl -z-10"></div>

        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center w-full">
          <motion.div 
            className="space-y-8 order-2 md:order-1"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary text-xs font-bold border border-secondary/20 uppercase tracking-wider">
              <ShieldCheck size={16} /> Tâm lý học × Hệ thống
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.2] text-dark tracking-tight">
              XIN CHÀO, TÔI LÀ <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-500 whitespace-nowrap">TRẦN THIỆN</span>
            </h1>
            <p className="text-xl text-dark/70 leading-relaxed max-w-lg italic border-l-4 border-secondary pl-6 py-2">
              "Tối ưu nguồn lực, tài lực, vật lực, thời gian, tài chính và công cụ để bạn làm chủ cuộc đời mình."
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button 
                onClick={() => scrollToSection('booking')}
                className="bg-primary text-white px-8 py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 hover:bg-primary-hover hover:-translate-y-1 transition-all shadow-xl shadow-primary/20 active:scale-95"
              >
                Bắt đầu hành trình <ArrowRight size={20} />
              </button>
              <button 
                onClick={() => scrollToSection('tools')}
                className="bg-white border-2 border-primary/20 text-primary px-8 py-4 rounded-2xl font-semibold hover:border-primary hover:bg-primary/5 transition-all active:scale-95"
              >
                Khám phá công cụ
              </button>
            </div>
          </motion.div>

          <motion.div 
            className="order-1 md:order-2 relative flex justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-gradient-to-tr from-primary/10 to-secondary/10 rounded-full blur-3xl -z-10"></div>
            <div className="relative z-10 w-full max-w-[420px] aspect-[4/5] bg-dark rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white rotate-2 hover:rotate-0 transition-transform duration-500 group">
               {heroImage ? (
                 <img 
                   src={heroImage} 
                   alt="Chuyên gia Trần Thiện" 
                   className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-105"
                   referrerPolicy="no-referrer"
                 />
               ) : (
                 <div className="w-full h-full bg-dark/50 animate-pulse flex items-center justify-center">
                   <div className="w-10 h-10 border-4 border-white/20 border-t-white/80 rounded-full animate-spin"></div>
                 </div>
               )}
               <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent"></div>
               <div className="absolute bottom-8 left-8 right-8 text-white">
                 <p className="font-display font-bold text-2xl mb-1">Chuyên gia của bạn</p>
                 <p className="text-white/80 text-sm">Systemic Psychologist</p>
               </div>
            </div>
          </motion.div>
        </div>

        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 cursor-pointer"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          onClick={() => scrollToSection('about')}
        >
          <ChevronDown className="text-dark/30 hover:text-primary transition-colors" size={32} />
        </motion.div>
      </section>

      {/* Quotes Fade Section */}
      <section className="py-12 bg-dark overflow-hidden border-y border-white/10 relative flex items-center justify-center min-h-[160px]">
        <div className="max-w-4xl mx-auto px-6 text-center w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuoteIdx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="flex flex-col items-center gap-4 text-white/80"
            >
              <Quote size={28} className="text-primary opacity-50" />
              <span className="font-display text-lg md:text-xl tracking-wide leading-relaxed">
                {quotesList[currentQuoteIdx]}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div 
              className="grid grid-cols-2 gap-6"
              variants={staggerContainer}
              initial="initial"
              whileInView="whileInView"
            >
              {[
                { value: "500+", label: "Giờ tham vấn", color: "text-primary" },
                { value: "10+", label: "Công cụ đo lường", color: "text-secondary" },
                { value: "100%", label: "Bảo mật thông tin", color: "text-dark" },
                { value: "GAS", label: "Tự động hóa", color: "text-dark/40 italic" }
              ].map((stat, i) => (
                <motion.div 
                  key={i} 
                  variants={fadeIn}
                  className={`bg-light p-8 rounded-[2rem] space-y-2 shadow-sm border border-dark/5 ${i % 2 === 0 ? 'translate-y-8' : ''} hover:-translate-y-2 transition-transform duration-300`}
                >
                  <h4 className={`font-display text-4xl font-bold ${stat.color}`}>{stat.value}</h4>
                  <p className="text-sm text-dark/60 font-medium">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div className="space-y-8" variants={fadeIn} initial="initial" whileInView="whileInView">
              <div className="space-y-4">
                <h2 className="font-display text-4xl md:text-5xl font-bold text-dark tracking-tight">Tại sao chọn tôi?</h2>
                <div className="w-20 h-1.5 bg-secondary rounded-full"></div>
              </div>
              <p className="text-dark/70 text-lg leading-relaxed">
                Khác với các phương pháp tham vấn truyền thống, tôi kết hợp <strong className="text-dark">tâm lý trị liệu</strong> với <strong className="text-dark">tư duy hệ thống của một nhà quản trị</strong>. 
              </p>
              <p className="text-dark/70 text-lg leading-relaxed">
                Tôi tin rằng một tâm hồn khỏe mạnh cần một "hệ điều hành" cuộc sống tối ưu. Bạn sẽ không chỉ được lắng nghe, mà còn được trang bị những công cụ số hóa để tự theo dõi và điều chỉnh trạng thái của mình.
              </p>
              <div className="space-y-5 pt-4">
                {[
                  'Ứng dụng tâm lý học thực chứng',
                  'Đo lường bằng chỉ số (Data-driven)',
                  'Thiết kế lộ trình dựa trên nguồn lực thực tế',
                  'Tối ưu hóa thời gian và năng lượng'
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 font-medium text-dark">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <CheckCircle2 size={18} />
                    </div>
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Me Section */}
      <section id="why-me" className="py-24 bg-white border-t border-dark/5">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div 
            className="text-center mb-16 space-y-4"
            variants={fadeIn} initial="initial" whileInView="whileInView"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-bold border border-primary/20 uppercase tracking-wider mb-4">
              <Brain size={16} /> Triết lý cốt lõi
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-dark tracking-tight">Thay đổi tâm thức bằng <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-500">Hệ thống</span></h2>
            <p className="text-dark/60 max-w-2xl mx-auto text-lg">Động lực có thể cạn kiệt, nhưng một hệ thống tốt sẽ nâng đỡ bạn ngay cả trong những ngày tồi tệ nhất.</p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            variants={staggerContainer} initial="initial" whileInView="whileInView"
          >
            {[
              { title: "Không dựa vào động lực", desc: "Động lực là cảm xúc nhất thời. Chúng ta xây dựng các quy trình (workflows) và thói quen nhỏ gọn để bạn hành động ngay cả khi không có cảm hứng.", icon: <RefreshCw size={28} className="text-primary" /> },
              { title: "Đo lường được (Data-driven)", desc: "Bạn không thể cải thiện những gì bạn không thể đo lường. Mọi sự thay đổi tâm lý đều được theo dõi bằng các chỉ số cụ thể trên Dashboard.", icon: <Activity size={28} className="text-secondary" /> },
              { title: "Bền vững & Tự động", desc: "Giải phóng không gian tâm trí bằng cách đưa các quyết định lặp lại vào hệ thống tự động hóa, giúp bạn tập trung vào điều thực sự quan trọng.", icon: <Zap size={28} className="text-primary" /> }
            ].map((reason, idx) => (
              <motion.div key={idx} variants={fadeIn} className="bg-light p-10 rounded-[2.5rem] border border-dark/5 hover:bg-white hover:shadow-xl transition-all duration-300 group">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 transition-transform">
                  {reason.icon}
                </div>
                <h3 className="font-display text-2xl font-bold mb-4 text-dark">{reason.title}</h3>
                <p className="text-dark/60 leading-relaxed">{reason.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Tools Section (Store) */}
      <section id="tools" className="py-24 bg-light">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div 
            className="text-center mb-16 space-y-4"
            variants={fadeIn} initial="initial" whileInView="whileInView"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary text-xs font-bold border border-secondary/20 uppercase tracking-wider mb-4">
              <ShoppingCart size={16} /> Cửa hàng công cụ
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-dark tracking-tight">Hệ thống Đo lường & Thực hành</h2>
            <p className="text-dark/60 max-w-2xl mx-auto text-lg">Các công cụ số hóa được thiết kế sẵn giúp bạn tối ưu hóa hiệu suất và quản trị cuộc sống ngay lập tức.</p>
          </motion.div>
          
          <motion.div 
            className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto"
            variants={staggerContainer} initial="initial" whileInView="whileInView"
          >
            {[
              { title: "Resource Optimizer Template", desc: "Công cụ quản trị thời gian và năng lượng, giúp bạn thoát khỏi trạng thái quá tải.", icon: <Clock size={24} className="text-secondary" /> },
              { title: "Trắc nghiệm Sức mạnh Nội tại", desc: "Bài test khoa học giúp nhận diện nguồn lực hiện có để tối ưu hóa lộ trình phát triển.", icon: <Target size={24} className="text-primary" /> },
              { title: "Habit Tracker Pro", desc: "Bảng theo dõi thói quen dựa trên khoa học hành vi, tích hợp gamification.", icon: <CheckCircle2 size={24} className="text-primary" /> },
              { title: "Emotion Journaling Kit", desc: "Bộ template viết nhật ký cảm xúc giúp giải tỏa căng thẳng và tự nhận thức.", icon: <BookOpen size={24} className="text-secondary" /> }
            ].map((tool, idx) => (
              <motion.div key={idx} variants={fadeIn} className="bg-white p-8 rounded-[2rem] border border-dark/5 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col h-full">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${idx % 2 === 0 ? 'bg-primary/10' : 'bg-secondary/10'}`}>
                  {tool.icon}
                </div>
                <h3 className="font-display text-xl font-bold mb-3 text-dark group-hover:text-primary transition-colors">{tool.title}</h3>
                <p className="text-dark/60 text-sm leading-relaxed mb-8 flex-grow">{tool.desc}</p>
                <div className="mt-auto pt-6 border-t border-dark/5">
                  <button onClick={() => scrollToSection('booking')} className="w-full bg-dark text-white px-5 py-3 rounded-xl text-sm font-bold hover:bg-primary transition-colors flex items-center justify-center gap-2 active:scale-95">
                    Liên hệ ngay <ArrowRight size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Content Hub Section (Articles & Videos) */}
      <section id="content" className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div 
            className="text-center mb-16 space-y-4"
            variants={fadeIn} initial="initial" whileInView="whileInView"
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold text-dark tracking-tight">Góc chia sẻ chuyên sâu</h2>
            <p className="text-dark/60 max-w-2xl mx-auto text-lg">Kiến thức tâm lý học ứng dụng và tư duy hệ thống dành cho bạn.</p>
          </motion.div>

          <div className="grid lg:grid-cols-12 gap-12">
            {/* YouTube Section */}
            <motion.div 
              className="lg:col-span-5 space-y-6"
              initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-red-500/10 rounded-2xl flex items-center justify-center text-red-500">
                  <Youtube size={24} />
                </div>
                <div>
                  <h3 className="font-display text-2xl font-bold text-dark">Video mới nhất</h3>
                  <p className="text-sm text-dark/60">Từ kênh YouTube Systemic Soul</p>
                </div>
              </div>
              
              <div className="bg-dark rounded-[2rem] p-2 shadow-xl relative group overflow-hidden">
                <div className="aspect-video bg-dark/50 rounded-[1.5rem] overflow-hidden relative">
                  <img src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800" alt="YouTube Thumbnail" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-105" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-red-600/30 group-hover:scale-110 transition-transform">
                      <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[16px] border-l-white border-b-[10px] border-b-transparent ml-1"></div>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="font-bold text-white text-lg mb-2 line-clamp-2">Làm thế nào để thiết lập hệ thống quản lý thời gian không gây áp lực?</h4>
                  <p className="text-white/60 text-sm mb-4">Khám phá cách ứng dụng tư duy hệ thống vào việc sắp xếp lịch trình cá nhân...</p>
                  <a href="#" className="inline-flex items-center gap-2 text-red-400 text-sm font-bold hover:text-red-300 transition-colors">
                    Đăng ký kênh <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Articles Section */}
            <motion.div 
              className="lg:col-span-7"
              variants={staggerContainer} initial="initial" whileInView="whileInView"
            >
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-display text-2xl font-bold text-dark">Bài viết chuyên sâu</h3>
                <a href="#" className="text-sm font-bold text-primary hover:text-primary-hover flex items-center gap-1">Xem tất cả <ArrowRight size={16} /></a>
              </div>
              
              <div className="space-y-6">
                {[
                  { title: "Tâm lý học đằng sau sự trì hoãn và cách hệ thống hóa để vượt qua", category: "Tâm lý học", date: "12/04/2026", img: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&q=80&w=400" },
                  { title: "Tại sao To-do list truyền thống không hoạt động với người làm sáng tạo?", category: "Hiệu suất", date: "05/04/2026", img: "https://images.unsplash.com/photo-1512314889357-e157c22f938d?auto=format&fit=crop&q=80&w=400" },
                  { title: "Xây dựng ranh giới cá nhân: Góc nhìn từ lý thuyết hệ thống", category: "Phát triển bản thân", date: "28/03/2026", img: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&q=80&w=400" }
                ].map((article, idx) => (
                  <motion.a 
                    href="#" 
                    key={idx} 
                    variants={fadeIn}
                    className="flex flex-col sm:flex-row gap-6 p-4 rounded-[2rem] hover:bg-light transition-colors group border border-transparent hover:border-dark/5"
                  >
                    <div className="w-full sm:w-40 aspect-[4/3] rounded-2xl overflow-hidden shrink-0">
                      <img src={article.img} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                    </div>
                    <div className="flex flex-col justify-center">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs font-bold text-secondary uppercase tracking-wider">{article.category}</span>
                        <span className="text-xs text-dark/40">{article.date}</span>
                      </div>
                      <h4 className="font-display font-bold text-lg text-dark group-hover:text-primary transition-colors mb-2 line-clamp-2">{article.title}</h4>
                      <p className="text-sm text-dark/60 flex items-center gap-1 font-medium">Đọc tiếp trên Medium <ExternalLink size={14} /></p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 bg-light">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div 
            className="text-center mb-16 space-y-4"
            variants={fadeIn} initial="initial" whileInView="whileInView"
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold text-dark tracking-tight">Câu chuyện chuyển đổi</h2>
            <p className="text-dark/60 max-w-2xl mx-auto text-lg">Những người đã kiến tạo lại hệ điều hành cuộc sống của riêng họ.</p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            variants={staggerContainer} initial="initial" whileInView="whileInView"
          >
            {[
              { name: "Minh Anh", role: "Content Creator", content: "Trước đây mình luôn bị ngợp bởi deadline và ý tưởng. Từ khi áp dụng Life OS, mình không chỉ làm việc hiệu quả hơn mà còn có thời gian để 'thở' và chăm sóc sức khỏe tinh thần." },
              { name: "Hoàng Nam", role: "Product Manager", content: "Cách tiếp cận của anh Thiện rất thực tế. Không sáo rỗng, không hô hào động lực. Mọi thứ đều được quy đổi thành các bước nhỏ, có thể đo lường và theo dõi mỗi ngày." },
              { name: "Thu Trang", role: "Freelancer", content: "Mental Performance Dashboard đã cứu rỗi những ngày mình bị burnout. Nhìn vào dữ liệu, mình biết chính xác khi nào cần dừng lại nghỉ ngơi thay vì cố gắng gượng ép bản thân." }
            ].map((testimonial, idx) => (
              <motion.div key={idx} variants={fadeIn} className="bg-white p-10 rounded-[2.5rem] border border-dark/5 shadow-sm relative">
                <Quote size={40} className="text-primary/10 absolute top-8 right-8" />
                <div className="flex gap-1 mb-6">
                  {[1,2,3,4,5].map(star => <Star key={star} size={16} className="text-secondary fill-secondary" />)}
                </div>
                <p className="text-dark/70 text-lg leading-relaxed mb-8 italic">"{testimonial.content}"</p>
                <div className="flex items-center gap-4 mt-auto">
                  <div className="w-12 h-12 bg-dark/5 rounded-full flex items-center justify-center font-bold text-dark">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-dark">{testimonial.name}</h4>
                    <p className="text-sm text-dark/50">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-dark text-white overflow-hidden relative">
        {/* Background elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 blur-[100px] -z-10"></div>
        
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <motion.div 
            className="mb-16 space-y-4"
            variants={fadeIn} initial="initial" whileInView="whileInView"
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight">Dịch vụ Đồng hành</h2>
            <p className="text-white/60 max-w-md text-lg">Chọn lộ trình phù hợp để bắt đầu quá trình tối ưu hóa cuộc sống của bạn.</p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 gap-8"
            variants={staggerContainer} initial="initial" whileInView="whileInView"
          >
            {/* Service 1 */}
            <motion.div variants={fadeIn} className="bg-white/5 backdrop-blur-md p-10 md:p-12 rounded-[3rem] border border-white/10 relative hover:bg-white/10 transition-colors">
              <div className="absolute top-8 right-8 bg-primary text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg shadow-primary/20">Phổ biến nhất</div>
              <MessageCircle className="text-primary mb-8" size={48} />
              <h3 className="font-display text-3xl font-bold mb-4 text-white">Tham vấn 1-1</h3>
              <p className="text-white/60 mb-10 leading-relaxed text-lg">Sự đồng hành sâu sát nhất. Chúng ta sẽ làm việc cùng nhau để tháo gỡ vấn đề tâm lý và xây dựng hệ thống cá nhân của riêng bạn.</p>
              <ul className="space-y-5 mb-12">
                {['60 phút mỗi phiên', 'Báo cáo đo lường sau phiên', 'Hỗ trợ công cụ thực hành số', 'Lộ trình 8-12 tuần'].map((li, i) => (
                  <li key={i} className="flex items-center gap-4 text-white/80 font-medium">
                    <CheckCircle2 size={20} className="text-primary shrink-0" /> {li}
                  </li>
                ))}
              </ul>
              <button onClick={() => scrollToSection('booking')} className="w-full py-4 bg-white text-dark rounded-2xl font-bold hover:bg-primary hover:text-white transition-all active:scale-95">
                Đăng ký ngay
              </button>
            </motion.div>

            {/* Service 2 */}
            <motion.div variants={fadeIn} className="bg-white/5 backdrop-blur-md p-10 md:p-12 rounded-[3rem] border border-white/10 hover:bg-white/10 transition-colors">
              <Settings className="text-secondary mb-8" size={48} />
              <h3 className="font-display text-3xl font-bold mb-4 text-white">Thiết kế công cụ hỗ trợ tâm lý</h3>
              <p className="text-white/60 mb-10 leading-relaxed text-lg">Xây dựng hệ thống theo dõi và quản trị tâm lý (Notion, Sheets) giúp bạn nhận thức cảm xúc, duy trì thói quen lành mạnh và tự chữa lành.</p>
              <ul className="space-y-5 mb-12">
                {['Phân tích mô thức hành vi & cảm xúc', 'Thiết kế Dashboard sức khỏe tinh thần', 'Hệ thống hóa bài tập tâm lý & thói quen', 'Đồng hành ứng dụng vào thực tế'].map((li, i) => (
                  <li key={i} className="flex items-center gap-4 text-white/80 font-medium">
                    <CheckCircle2 size={20} className="text-secondary shrink-0" /> {li}
                  </li>
                ))}
              </ul>
              <button onClick={() => scrollToSection('booking')} className="w-full py-4 border-2 border-white/20 rounded-2xl font-bold hover:border-white hover:bg-white/5 transition-all active:scale-95">
                Nhận tư vấn thiết kế
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Booking Section */}
      <section id="booking" className="py-24 bg-light relative">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-dark -z-10"></div>
        
        <div className="max-w-5xl mx-auto px-6">
          <motion.div 
            className="bg-white rounded-[3rem] shadow-2xl shadow-dark/10 overflow-hidden flex flex-col md:flex-row border border-dark/5"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Left Info */}
            <div className="bg-primary text-white p-12 md:w-2/5 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              
              <div className="space-y-8 relative z-10">
                <h2 className="font-display text-4xl font-bold leading-tight">Sẵn sàng để tối ưu cuộc đời?</h2>
                <p className="text-white/80 text-lg leading-relaxed">Để lại thông tin, tôi sẽ liên hệ lại với bạn trong vòng 24h làm việc để sắp xếp buổi gặp gỡ đầu tiên.</p>
                
                <div className="space-y-6 pt-8">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center shrink-0">
                      <Mail size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-white/60 uppercase tracking-wider font-bold mb-1">Email</p>
                      <p className="font-medium">contact@systemicsoul.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center shrink-0">
                      <Phone size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-white/60 uppercase tracking-wider font-bold mb-1">Hotline</p>
                      <p className="font-medium">035 877 2702</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-12 relative z-10">
                <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-secondary hover:text-white transition-colors"><Facebook size={18}/></a>
                <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-secondary hover:text-white transition-colors"><Linkedin size={18}/></a>
                <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-secondary hover:text-white transition-colors"><Instagram size={18}/></a>
              </div>
            </div>
            
            {/* Right Form */}
            <div className="p-12 md:w-3/5 bg-white">
              <form onSubmit={handleBooking} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-dark/60 uppercase tracking-widest">Họ và tên *</label>
                    <input 
                      required
                      type="text" 
                      className="w-full px-5 py-4 bg-light border border-dark/5 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                      placeholder="Nguyễn Văn A"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-dark/60 uppercase tracking-widest">Số điện thoại *</label>
                    <input 
                      required
                      type="tel" 
                      className="w-full px-5 py-4 bg-light border border-dark/5 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                      placeholder="090..."
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-dark/60 uppercase tracking-widest">Email liên hệ *</label>
                  <input 
                    required
                    type="email" 
                    className="w-full px-5 py-4 bg-light border border-dark/5 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-dark/60 uppercase tracking-widest">Dịch vụ quan tâm</label>
                  <select 
                    className="w-full px-5 py-4 bg-light border border-dark/5 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-dark cursor-pointer appearance-none"
                    value={formData.service}
                    onChange={(e) => setFormData({...formData, service: e.target.value})}
                  >
                    <option value="Tham vấn tâm lý 1-1">Tham vấn tâm lý 1-1</option>
                    <option value="Thiết kế công cụ hỗ trợ tâm lý">Thiết kế công cụ hỗ trợ tâm lý</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-dark/60 uppercase tracking-widest">Lời nhắn (Tùy chọn)</label>
                  <textarea 
                    className="w-full px-5 py-4 bg-light border border-dark/5 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none h-24"
                    placeholder="Chia sẻ ngắn gọn về vấn đề của bạn..."
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  ></textarea>
                </div>
                
                <button 
                  disabled={bookingStatus === 'sending'}
                  className="w-full bg-secondary text-white py-4 rounded-2xl font-bold shadow-xl shadow-secondary/20 hover:bg-secondary-hover transition-all disabled:opacity-70 disabled:cursor-not-allowed mt-2 flex items-center justify-center gap-2 active:scale-[0.98]"
                >
                  {bookingStatus === 'sending' ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Đang xử lý...
                    </span>
                  ) : 'Gửi yêu cầu đặt lịch'}
                </button>

                {bookingStatus === 'success' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-green-50 border border-green-100 text-green-700 rounded-2xl text-center text-sm font-medium flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 size={18} />
                    Yêu cầu đã được gửi thành công!
                  </motion.div>
                )}
                
                {bookingStatus === 'error' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-red-50 border border-red-100 text-red-700 rounded-2xl text-center text-sm font-medium"
                  >
                    Có lỗi xảy ra. Vui lòng thử lại sau.
                  </motion.div>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-dark text-white py-20 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-12 gap-12">
          <div className="md:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white font-display font-bold text-2xl">T</div>
              <span className="font-display font-bold text-2xl tracking-tight">Trần Thiện</span>
            </div>
            <p className="text-white/60 text-base leading-relaxed max-w-sm">
              Kết hợp sự thấu cảm của tâm lý học và sự chính xác của hệ thống để kiến tạo một phiên bản tối ưu hơn của chính bạn.
            </p>
          </div>
          
          <div className="md:col-span-3">
            <h4 className="font-display font-bold mb-6 text-lg">Liên kết nhanh</h4>
            <ul className="space-y-4 text-white/60 text-sm font-medium">
              <li><button onClick={() => scrollToSection('about')} className="hover:text-primary transition-colors">Câu chuyện của tôi</button></li>
              <li><button onClick={() => scrollToSection('tools')} className="hover:text-primary transition-colors">Bộ công cụ đo lường</button></li>
              <li><button onClick={() => scrollToSection('services')} className="hover:text-primary transition-colors">Dịch vụ tham vấn</button></li>
              <li><button onClick={() => setShowPrivacyPolicy(true)} className="hover:text-primary transition-colors">Chính sách bảo mật</button></li>
            </ul>
          </div>
          
          <div className="md:col-span-4">
            <h4 className="font-display font-bold mb-6 text-lg">Hệ thống vận hành</h4>
            <div className="flex flex-wrap gap-2">
              {['Google Apps Script', 'Google Sheets', 'React', 'Tailwind CSS', 'Framer Motion'].map((tech, i) => (
                <span key={i} className="px-4 py-2 bg-white/5 rounded-full text-xs text-white/60 border border-white/10 hover:bg-white/10 transition-colors cursor-default">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        <div className="max-w-6xl mx-auto px-6 mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-white/40 text-sm text-center md:text-left font-medium">
          <p>© {new Date().getFullYear()} Trần Thiện | Systemic Soul. Designed for Performance & Empathy.</p>
          <p>Powered by Systemic Thinking.</p>
        </div>
      </footer>

      {/* Floating Zalo Chat */}
      <a 
        href="//zalo.me/84358772702" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-50 group"
      >
        <div className="absolute inset-0 bg-[#0068FF] rounded-full animate-ping opacity-75"></div>
        <div className="relative w-14 h-14 bg-[#0068FF] text-white rounded-full flex items-center justify-center shadow-lg shadow-[#0068FF]/30 hover:scale-110 transition-transform duration-300">
          <MessageSquare size={24} />
        </div>
        <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-dark text-white text-xs font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Chat qua Zalo
        </span>
      </a>

      {/* Privacy Policy Modal */}
      <AnimatePresence>
        {showPrivacyPolicy && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-dark/60 backdrop-blur-sm flex items-center justify-center p-4 md:p-6"
            onClick={() => setShowPrivacyPolicy(false)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white w-full max-w-3xl max-h-[85vh] rounded-[2rem] shadow-2xl flex flex-col overflow-hidden relative"
            >
              {/* Modal Header */}
              <div className="px-8 py-6 border-b border-dark/5 flex items-center justify-between bg-light/50 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                    <ShieldCheck size={24} />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-dark">Chính sách bảo mật</h3>
                </div>
                <button 
                  onClick={() => setShowPrivacyPolicy(false)}
                  className="w-10 h-10 bg-dark/5 hover:bg-dark/10 rounded-full flex items-center justify-center text-dark/60 hover:text-dark transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-8 overflow-y-auto custom-scrollbar text-dark/70 space-y-8">
                <div className="space-y-4">
                  <p className="text-lg leading-relaxed font-medium text-dark">
                    Tại Systemic Soul (Trần Thiện), việc bảo vệ sự riêng tư và an toàn thông tin cá nhân của bạn là ưu tiên hàng đầu, đặc biệt trong lĩnh vực tham vấn tâm lý và phát triển cá nhân.
                  </p>
                </div>

                <div className="space-y-4">
                  <h4 className="font-display text-xl font-bold text-dark flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm">1</span>
                    Bảo mật tuyệt đối phiên tham vấn
                  </h4>
                  <p className="leading-relaxed pl-8">
                    Mọi thông tin, câu chuyện và vấn đề bạn chia sẻ trong các phiên tham vấn 1:1 đều được giữ <strong>bí mật tuyệt đối</strong> theo tiêu chuẩn đạo đức nghề nghiệp tâm lý học. Chúng tôi cam kết không ghi âm, ghi hình hay tiết lộ nội dung tham vấn cho bất kỳ bên thứ ba nào nếu không có sự đồng ý bằng văn bản của bạn (trừ trường hợp liên quan đến an toàn tính mạng theo quy định của pháp luật).
                  </p>
                </div>

                <div className="space-y-4">
                  <h4 className="font-display text-xl font-bold text-dark flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm">2</span>
                    Thu thập & Sử dụng thông tin
                  </h4>
                  <p className="leading-relaxed pl-8">
                    Hệ thống chỉ thu thập các thông tin cơ bản (Họ tên, Số điện thoại, Email, Lời nhắn) thông qua biểu mẫu đặt lịch nhằm mục đích:
                  </p>
                  <ul className="list-disc pl-12 space-y-2">
                    <li>Liên hệ để sắp xếp lịch hẹn tham vấn.</li>
                    <li>Gửi các tài liệu, công cụ (Dashboard, Template) mà bạn đã đăng ký.</li>
                    <li>Chuẩn bị tốt nhất cho phiên làm việc dựa trên lời nhắn sơ bộ của bạn.</li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h4 className="font-display text-xl font-bold text-dark flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm">3</span>
                    Cam kết không chia sẻ dữ liệu
                  </h4>
                  <p className="leading-relaxed pl-8">
                    Dữ liệu cá nhân của bạn được lưu trữ an toàn trên hệ thống nội bộ (Google Workspace). Chúng tôi cam kết <strong>KHÔNG bán, trao đổi hay chia sẻ</strong> thông tin cá nhân của bạn cho bất kỳ bên thứ ba nào vì mục đích thương mại hay quảng cáo.
                  </p>
                </div>

                <div className="space-y-4">
                  <h4 className="font-display text-xl font-bold text-dark flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm">4</span>
                    Quyền lợi của bạn
                  </h4>
                  <p className="leading-relaxed pl-8">
                    Bạn hoàn toàn có quyền yêu cầu xem lại, chỉnh sửa hoặc <strong>xóa vĩnh viễn</strong> toàn bộ hồ sơ thông tin cá nhân và lịch sử làm việc của mình khỏi hệ thống của chúng tôi bất cứ lúc nào bằng cách gửi email yêu cầu tới contact@systemicsoul.com.
                  </p>
                </div>
              </div>
              
              {/* Modal Footer */}
              <div className="px-8 py-6 border-t border-dark/5 bg-light/50 shrink-0 flex justify-end">
                <button 
                  onClick={() => setShowPrivacyPolicy(false)}
                  className="bg-dark text-white px-8 py-3 rounded-xl font-bold hover:bg-primary transition-colors active:scale-95"
                >
                  Đã hiểu & Đóng
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
