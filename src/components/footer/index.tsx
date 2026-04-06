import { InstagramIcon, TikTokIcon } from '../socialicons';

const Footer = () => {
  return (
    <footer className="py-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="text-center md:text-left">
            <div className="flex items-center gap-2 mb-6 justify-center md:justify-start">
              <img
                src="/logo zyra.jpeg"
                alt="Logo"
                className="w-10 h-10 rounded-lg"
              />
              <span className="text-2xl font-black tracking-tighter uppercase italic">
                ZYRA
              </span>
            </div>

            <p className="text-gray-500 text-sm max-w-xs">
              Inovando o campo com inteligência artificial e sensores de alta
              precisão.
            </p>
          </div>

          <div className="flex flex-col items-center gap-4">
            <div className="flex gap-4">
              <a
                href="#"
                className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center hover:bg-purple-600 transition-all border border-white/10"
              >
                <InstagramIcon size={24} />
              </a>

              <a
                href="#"
                className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center hover:bg-cyan-500 hover:text-black transition-all border border-white/10"
              >
                <TikTokIcon size={24} />
              </a>
            </div>

            <div className="text-gray-600 text-xs font-bold uppercase tracking-widest">
              Social Media
            </div>
          </div>

          <div className="flex flex-col items-center md:items-end gap-2">
            <div className="text-gray-400 text-sm font-bold">
              Dúvidas? <span className="text-white">suporte@zyra.com.br</span>
            </div>

            <p className="text-gray-600 text-[10px] mt-4 font-mono">
              © 2024 ZYRA SYSTEMS INC.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;