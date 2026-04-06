import { BarChart3, Cpu, Droplets } from 'lucide-react';
import FeatureCard from "../../components/featurecard"

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 relative bg-white/[0.01]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-20">
          <h2 className="text-4xl md:text-5xl font-black mb-6 italic tracking-tighter">
            O QUE NOS FAZ <br />
            <span className="text-cyan-400">DIFERENTES?</span>
          </h2>
          <div className="h-1 w-20 bg-cyan-400" />
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={Droplets}
            title="Precisão Radical"
            description="Nossos sensores proprietários capturam dados de umidade e nutrientes com precisão laboratorial no campo."
            color="from-cyan-500 to-blue-500"
          />

          <FeatureCard
            icon={Cpu}
            title="Rede Mesh AI"
            description="Sensores que se comunicam entre si criando uma rede inteligente que otimiza o fluxo de água autonomamente."
            color="from-purple-500 to-fuchsia-500"
          />

          <FeatureCard
            icon={BarChart3}
            title="Analytics Avançado"
            description="Dashboards que mostram o ROI em tempo real, economia de recursos e projeção de colheita."
            color="from-green-500 to-emerald-500"
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;