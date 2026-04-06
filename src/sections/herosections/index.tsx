import { motion } from 'framer-motion';
import { ArrowRight, Database, Wifi } from 'lucide-react';
import { InstagramIcon, TikTokIcon } from "../../components/socialicons";

const HeroSection = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-24 overflow-hidden">
      <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-purple-600/5 blur-[120px] rounded-full -translate-y-1/2" />
      <div className="absolute bottom-0 right-1/4 w-[800px] h-[800px] bg-cyan-600/5 blur-[120px] rounded-full translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-12 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-7"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-cyan-400 text-xs font-black tracking-widest uppercase mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
            </span>
            SISTEMA DE IRRIGAÇÃO INTELIGENTE
          </div>

          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-6 leading-[0.85] tracking-tighter italic">
            ZYRA <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-green-400">
              SYSTEMS
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-400 mb-10 max-w-2xl leading-relaxed font-light">
            Tecnologia de ponta em sensores de solo e automação para maximizar
            sua produtividade agrícola com economia real.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 mb-12">
            <button className="group relative px-10 py-5 bg-white text-black font-black rounded-2xl overflow-hidden transition-all hover:scale-105 active:scale-95">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative z-10 flex items-center justify-center gap-3 group-hover:text-white transition-colors uppercase italic tracking-tighter">
                Acessar Plataforma{' '}
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </span>
            </button>

            <div className="flex gap-4">
              <a
                href="#"
                className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors group"
              >
                <InstagramIcon
                  size={24}
                  className="group-hover:text-purple-400 transition-colors"
                />
              </a>

              <a
                href="#"
                className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors group"
              >
                <TikTokIcon
                  size={24}
                  className="group-hover:text-cyan-400 transition-colors"
                />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-8 border-t border-white/10 pt-10">
            <div>
              <div className="text-3xl font-black italic mb-1 text-cyan-400">
                40%
              </div>
              <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                Economia Hídrica
              </div>
            </div>

            <div>
              <div className="text-3xl font-black italic mb-1 text-purple-500">
                24/7
              </div>
              <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                Monitoramento
              </div>
            </div>

            <div>
              <div className="text-3xl font-black italic mb-1 text-green-400">
                +25%
              </div>
              <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                Produtividade
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="lg:col-span-5 relative"
        >
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="relative z-20"
          >
            <div className="relative w-full aspect-[4/5] max-w-md mx-auto">
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/30 via-purple-500/30 to-green-500/30 blur-[100px] rounded-full scale-75 animate-pulse" />

              <div className="relative h-full w-full rounded-[4rem] border border-white/20 bg-gradient-to-b from-white/10 to-transparent backdrop-blur-xl p-8 flex flex-col items-center justify-center overflow-hidden group shadow-2xl">
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                  <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-cyan-400 to-transparent" />
                  <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
                </div>

                <div className="relative mb-12 flex justify-center">
                  <div className="absolute inset-0 bg-cyan-400 blur-3xl opacity-20 scale-150" />

                  <img
                    src="/Zyro.jpeg"
                    alt="Mascote"
                    className="w-40 md:w-90 object-contain mx-auto group-hover:scale-110 transition-transform duration-500"
                  />

                  <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" />
                    <div className="w-2 h-2 rounded-full bg-purple-500 animate-bounce delay-75" />
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-bounce delay-150" />
                  </div>
                </div>
              </div>

              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 border-2 border-dashed border-white/5 rounded-full -m-10 pointer-events-none"
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-black border border-white/20 rounded-xl flex items-center justify-center text-cyan-400 shadow-xl">
                  <Wifi size={20} />
                </div>

                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-12 h-12 bg-black border border-white/20 rounded-xl flex items-center justify-center text-purple-400 shadow-xl">
                  <Database size={20} />
                </div>
              </motion.div>
            </div>
          </motion.div>

          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-48 h-8 bg-black/50 blur-2xl rounded-full scale-x-150" />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;