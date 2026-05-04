import {
  Database,
  MonitorSmartphone,
  ServerCog,
} from 'lucide-react';

const TeamSection = () => {
  return (
    <section id="equipe" className="py-24 overflow-hidden p-8 md:p-20">
      <div className="relative z-10">
        <div className="max-w-3xl mb-16">
          <h2 className="text-4xl md:text-6xl font-black mb-8 italic leading-tight">
            ESTRUTURA <br />
            <span className="text-purple-500">DA EQUIPE.</span>
          </h2>

        </div>

        <div className="flex flex-col items-center">

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-10 w-full">
            <div className="bg-white/5 border border-white/10 rounded-[2rem] p-6 backdrop-blur-sm hover:border-cyan-400/30 transition-all">
              <div className="w-24 h-24 mx-auto mb-5 rounded-full overflow-hidden border-2 border-cyan-400/30 bg-white/5 flex items-center justify-center">
                <span className="text-xs text-gray-500 font-bold uppercase">
                  Foto
                </span>
              </div>

              <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 mb-4 mx-auto">
                <ServerCog size={22} />
              </div>

              <h4 className="text-lg font-black uppercase italic mb-2 text-center">
                Henrique da Silva Reis
              </h4>

              <span className="block text-cyan-400 text-xs font-black uppercase tracking-wide text-center">
                Backend + Integração IoT
              </span>

            </div>

            <div className="bg-white/5 border border-white/10 rounded-[2rem] p-6 backdrop-blur-sm hover:border-purple-400/30 transition-all">
              <div className="w-24 h-24 mx-auto mb-5 rounded-full overflow-hidden border-2 border-purple-400/30 bg-white/5 flex items-center justify-center">
                <span className="text-xs text-gray-500 font-bold uppercase">
                  Foto
                </span>
              </div>

              <div className="flex justify-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400">
                  <MonitorSmartphone size={18} />
                </div>
                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
                  <Database size={18} />
                </div>
              </div>

              <h4 className="text-lg font-black uppercase italic mb-2 text-center">
                Ester Lima Barreto
              </h4>

              <span className="block text-purple-400 text-xs font-black uppercase tracking-wide text-center">
                Front-end + Banco de Dados
              </span>

            </div>

            <div className="bg-white/5 border border-white/10 rounded-[2rem] p-6 backdrop-blur-sm hover:border-pink-400/30 transition-all">
              <div className="w-24 h-24 mx-auto mb-5 rounded-full overflow-hidden border-2 border-pink-400/30 bg-white/5 flex items-center justify-center">
                <span className="text-xs text-gray-500 font-bold uppercase">
                  Foto
                </span>
              </div>

              <div className="flex justify-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400">
                  <MonitorSmartphone size={18} />
                </div>
                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
                  <Database size={18} />
                </div>
              </div>

              <h4 className="text-lg font-black uppercase italic mb-2 text-center">
                Gabriela L. M. Espin
              </h4>

              <span className="block text-pink-400 text-xs font-black uppercase tracking-wide text-center">
                Front-end + Banco de Dados
              </span>

            </div>

            <div className="bg-white/5 border border-white/10 rounded-[2rem] p-6 backdrop-blur-sm hover:border-red-400/30 transition-all">
              <div className="w-24 h-24 mx-auto mb-5 rounded-full overflow-hidden border-2 border-red-400/30 bg-white/5 flex items-center justify-center">
                <span className="text-xs text-gray-500 font-bold uppercase">
                  Foto
                </span>
              </div>

              <div className="flex justify-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400">
                  <MonitorSmartphone size={18} />
                </div>
                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
                  <Database size={18} />
                </div>
              </div>

              <h4 className="text-lg font-black uppercase italic mb-2 text-center">
                Tayla Caroline Cazarine
              </h4>

              <span className="block text-red-400 text-xs font-black uppercase tracking-wide text-center">
                Front-end + Banco de Dados
              </span>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;