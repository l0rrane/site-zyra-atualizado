import { ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { Link } from "react-router-dom";

const AppSection = () => {
  return (
    <section id="app" className="py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        <div
          className="
            relative
            bg-gradient-to-br
            from-zinc-900/80
            via-zinc-950/90
            to-black
            border border-white/10
            rounded-[3rem]
            p-8 md:p-20
            backdrop-blur-xl
            overflow-hidden
          "
        >
          <div className="absolute top-1/2 right-0 -translate-y-1/2 w-80 h-80 bg-cyan-500/10 blur-3xl rounded-full" />
          <div className="absolute top-20 left-20 w-64 h-64 bg-purple-500/5 blur-3xl rounded-full" />

          <div className="grid md:grid-cols-2 gap-16 items-center relative z-10">

            <div>
              <h2 className="text-4xl md:text-6xl font-black mb-8 italic leading-none">
                CONTROLE <br />
                <span className="text-purple-500">
                  TOTAL.
                </span>
              </h2>

              <p className="text-gray-400 text-lg mb-12 font-medium leading-relaxed max-w-lg">
                Gerencie sua fazenda de qualquer lugar.
                Nosso ecossistema de sensores se conecta
                diretamente ao seu smartphone, fornecendo
                monitoramento e controle em tempo real.
              </p>

              <div className="flex gap-8 mb-12">
                <div className="flex flex-col gap-3">
                  <div className="w-11 h-11 rounded-full bg-cyan-500/15 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                    <ShieldCheck size={20} />
                  </div>

                  <span className="font-bold">
                    Seguro
                  </span>
                </div>

                <div className="flex flex-col gap-3">
                  <div className="w-11 h-11 rounded-full bg-purple-500/15 border border-purple-500/20 flex items-center justify-center text-purple-400">
                    <Zap size={20} />
                  </div>

                  <span className="font-bold">
                    Rápido
                  </span>
                </div>
              </div>
              <Link
                to="/login"
                className="
                  inline-flex
                  items-center
                  gap-2
                  px-7
                  py-3.5
                  rounded-full
                  font-bold
                  text-white
                  bg-gradient-to-r
                  from-cyan-500
                  to-purple-600
                  hover:scale-105
                  hover:shadow-lg
                  hover:shadow-purple-500/20
                  transition-all
                  duration-300
                  group
                "
              >
                Acessar Plataforma

                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
            </div>

            <div className="relative flex justify-center">

              <div className="absolute w-72 h-72 bg-purple-500/10 blur-[60px] rounded-full" />

              <div
                className="
                  relative
                  z-10
                  w-full
                  aspect-square
                  max-w-[400px]
                  bg-gradient-to-br
                  from-zinc-900
                  to-black
                  rounded-[3rem]
                  border border-white/10
                  p-8
                  flex
                  items-center
                  justify-center
                  shadow-[0_20px_60px_rgba(0,0,0,0.45)]
                "
              >
                <div className="text-center">

                  <div className="relative w-32 h-32 mx-auto mb-8 flex items-center justify-center">

                    <div className="absolute inset-0 bg-cyan-400 blur-lg opacity-10 animate-pulse rounded-full" />

                    <img
                      src="/logo app.png"
                      alt="Logo Zyra Flow"
                      className="relative z-10 w-24 h-24 object-contain rounded-[10px]"
                    />

                  </div>

                  <h4 className="text-2xl font-black uppercase tracking-widest italic">
                    Zyra <span className="text-cyan-400">Flow</span>
                  </h4>

                  <div
                    className="
                      mt-5
                      inline-flex
                      items-center
                      px-4
                      py-1.5
                      rounded-full
                      text-xs
                      font-bold
                      text-green-400
                      bg-green-500/10
                      border
                      border-green-500/20
                    "
                  >
                    SISTEMA MOBILE
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