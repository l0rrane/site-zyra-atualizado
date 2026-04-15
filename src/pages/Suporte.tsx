import { useState } from "react";

const Suporte = () => {
  const [msg, setMsg] = useState("");

  return (
    <div className="max-w-3xl">
      <h2 className="text-4xl font-black italic mb-8">
        SUPORTE <span className="text-purple-500">E AJUDA</span>
      </h2>

      <div className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-[2rem] p-8 shadow-xl">

        <p className="text-gray-400 mb-5 leading-relaxed">
          Se você estiver enfrentando qualquer dificuldade no uso da plataforma, nossa equipe de suporte está disponível
          para te ajudar. Buscamos responder todas as solicitações o mais rápido possível, garantindo uma experiência estável e segura.
        </p>

        <p className="text-gray-400 mb-5">
          Você pode entrar em contato pelos canais abaixo ou descrever seu problema diretamente no campo de mensagem.
        </p>

        <div className="mb-6 text-gray-400 space-y-1">
          <p><span className="text-white">E-mail:</span> suporte@zyra.com</p>
          <p><span className="text-white">WhatsApp:</span> (11) 99999-9999</p>
        </div>

        <textarea
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          placeholder="Descreva seu problema com o máximo de detalhes possível (erro, tela, ação realizada...)"
          className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 outline-none focus:border-purple-500 transition min-h-[140px]"
        />

        <button
          className="mt-6 bg-white text-black py-3 px-6 rounded-full font-semibold hover:opacity-90 transition"
        >
          Enviar solicitação
        </button>

      </div>
    </div>
  );
};

export default Suporte;