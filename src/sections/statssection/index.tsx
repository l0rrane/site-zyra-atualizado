import { Activity, Cpu, Layers, ShieldCheck } from 'lucide-react';

const StatsSection = () => {
  return (
    <section className="py-20 border-y border-white/5 bg-white/[0.01]">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12">
        <div className="text-center group">
          <div className="mb-4 flex justify-center">
            <Activity className="text-cyan-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-sm font-bold uppercase tracking-widest text-gray-500">
            Análise Real
          </div>
        </div>

        <div className="text-center group">
          <div className="mb-4 flex justify-center">
            <Layers className="text-purple-500 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-sm font-bold uppercase tracking-widest text-gray-500">
            Multicamadas
          </div>
        </div>

        <div className="text-center group">
          <div className="mb-4 flex justify-center">
            <Cpu className="text-green-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-sm font-bold uppercase tracking-widest text-gray-500">
            Processamento
          </div>
        </div>

        <div className="text-center group">
          <div className="mb-4 flex justify-center">
            <ShieldCheck className="text-white group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-sm font-bold uppercase tracking-widest text-gray-500">
            Cloud Segura
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;