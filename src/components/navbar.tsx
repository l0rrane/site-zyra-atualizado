import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ExternalLink, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-black/80 backdrop-blur-md py-3 border-b border-purple-500/20'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="w-10 h-10 relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400 to-purple-600 rounded-lg blur-sm opacity-50 group-hover:opacity-100 transition-opacity" />
            <div className="relative bg-black rounded-lg w-full h-full flex items-center justify-center border border-white/20">
              <img src="/logo zyra.jpeg" alt="Logo" />
            </div>
          </div>

          <span className="text-white font-bold text-2xl tracking-tighter uppercase italic">
            Zyra <span className="text-cyan-400 font-light">Systems</span>
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide">
          <a
            href="#features"
            className="text-gray-300 hover:text-cyan-400 transition-colors uppercase"
          >
            Tecnologia
          </a>
          <a
            href="#app"
            className="text-gray-300 hover:text-cyan-400 transition-colors uppercase"
          >
            App
          </a>
          <a
            href="#about"
            className="text-gray-300 hover:text-cyan-400 transition-colors uppercase"
          >
            Sobre
          </a>
          <a
            href="#equipe"
            className="text-gray-300 hover:text-cyan-400 transition-colors uppercase"
          >
            Equipe
          </a>
          

          <button className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-6 py-2 rounded-full font-bold hover:scale-105 transition-all flex items-center gap-2">
            ACESSAR SISTEMA <ExternalLink size={16} />
          </button>
        </div>

        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/95 border-b border-purple-500/20 overflow-hidden"
          >
            <div className="flex flex-col gap-6 p-6">
              <a
                href="#features"
                onClick={() => setIsOpen(false)}
                className="text-xl text-gray-300 uppercase font-bold"
              >
                Tecnologia
              </a>
              <a
                href="#about"
                onClick={() => setIsOpen(false)}
                className="text-xl text-gray-300 uppercase font-bold"
              >
                Sobre
              </a>
              <a
                href="#app"
                onClick={() => setIsOpen(false)}
                className="text-xl text-gray-300 uppercase font-bold"
              >
                App
              </a>
              <a
                href="#equipe"
                onClick={() => setIsOpen(false)}
                className="text-xl text-gray-300 uppercase font-bold"
              >
                Equipe
              </a>

              <button className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-6 py-4 rounded-xl font-bold uppercase">
                Acessar Sistema
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;