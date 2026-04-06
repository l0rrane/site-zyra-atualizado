import { ExternalLink, ShieldCheck, Zap } from 'lucide-react';

const AppSection = () => {
  return (
    <section id="app" className="py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-[3rem] p-8 md:p-20 relative">
          <div className="absolute top-0 right-0 p-12 opacity-5">
            <div className="text-[12rem] font-black leading-none italic">
              APP
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center relative z-10">
            <div>
              <h2 className="text-4xl md:text-6xl font-black mb-8 italic">
                CONTROLE <br />
                <span className="text-purple-500">TOTAL.</span>
              </h2>

              <p className="text-gray-400 text-lg mb-12 font-medium leading-relaxed">
                Gerencie sua fazenda de qualquer lugar. Nosso ecossistema de
                sensores se conecta diretamente ao seu smartphone.
              </p>

              <div className="grid grid-cols-2 gap-6 mb-12">
                <div className="flex flex-col gap-2">
                  <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400">
                    <ShieldCheck size={20} />
                  </div>
                  <span className="font-bold">Seguro</span>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400">
                    <Zap size={20} />
                  </div>
                  <span className="font-bold">Rápido</span>
                </div>
              </div>

              <button className="bg-white text-black px-10 py-5 rounded-2xl font-black flex items-center gap-3 hover:bg-cyan-400 transition-colors uppercase tracking-tighter">
                Acessar Painel de Controle <ExternalLink size={20} />
              </button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-purple-500/20 blur-[100px]" />

              <div className="relative z-10 w-full aspect-square max-w-[400px] mx-auto bg-black rounded-[3rem] border-4 border-white/10 p-8 flex items-center justify-center shadow-2xl">
                <div className="text-center">
                  <div className="relative w-32 h-32 mx-auto mb-6">
                    <div className="absolute inset-0 bg-cyan-400 blur-xl opacity-20 animate-pulse" />
                    <img src="/logo app.jpeg" alt="Logo" />
                  </div>

                  <h4 className="text-2xl font-black uppercase tracking-widest italic">
                    Zyra <span className="text-cyan-400">Flow</span>
                  </h4>

                  <div className="mt-4 px-4 py-1 bg-white/10 rounded-full text-xs font-bold text-green-400 border border-green-400/20">
                    SISTEMA ONLINE
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppSection;