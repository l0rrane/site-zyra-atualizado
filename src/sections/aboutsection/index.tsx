import { Clock, Globe, Target } from 'lucide-react';

const AboutSection = () => {
  return (
    <section id="about" className="py-24 overflow-hidden p-8 md:p-20">
      <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
        <div className="text-[10rem] md:text-[12rem] font-black leading-none italic">
          WHO
        </div>
      </div>

      <div className="relative z-10">
        <div className="max-w-3xl mb-16">
          <h2 className="text-4xl md:text-6xl font-black mb-8 italic leading-tight">
            QUEM <br />
            <span className="text-purple-500">SOMOS.</span>
          </h2>

          <p className="text-gray-400 text-lg font-medium leading-relaxed">
            Conheça a base da nossa startup, desde a origem da ideia até o
            impacto que buscamos gerar.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white/5 border border-white/10 rounded-[2rem] p-6 backdrop-blur-sm hover:border-cyan-400/30 transition-all">
            <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 mb-4">
              <Clock size={22} />
            </div>

            <h3 className="text-xl font-black uppercase italic mb-4">
              História
            </h3>

            <p className="text-sm text-gray-400 leading-relaxed">
              A ideia da Zyra Flow surgiu a partir da necessidade de melhorar o
              monitoramento e a gestão no campo. Observamos dificuldades no
              controle de dados e na tomada de decisões rápidas, o que motivou a
              criação de uma solução tecnológica acessível.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-[2rem] p-6 backdrop-blur-sm hover:border-purple-400/30 transition-all">
            <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 mb-4">
              <Target size={22} />
            </div>

            <h3 className="text-xl font-black uppercase italic mb-4">
              Propósito
            </h3>

            <p className="text-sm text-gray-400 leading-relaxed">
              Nosso propósito é levar tecnologia inteligente ao agronegócio,
              proporcionando mais controle, eficiência e segurança para
              produtores. Buscamos transformar dados em decisões estratégicas
              que realmente impactam resultados.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-[2rem] p-6 backdrop-blur-sm hover:border-green-400/30 transition-all">
            <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 mb-4">
              <Globe size={22} />
            </div>

            <h3 className="text-xl font-black uppercase italic mb-4">
              Contexto
            </h3>

            <p className="text-sm text-gray-400 leading-relaxed">
              No cenário atual, o agronegócio exige cada vez mais precisão e
              agilidade. A Zyra Flow surge como uma startup focada em integrar
              sensores e software, criando um ecossistema digital que conecta
              tecnologia e produtividade no campo.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;