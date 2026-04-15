import { useState } from "react";

const Seguranca = () => {
  const [senha, setSenha] = useState("");

  return (
    <div className="max-w-3xl">
      <h2 className="text-4xl font-black italic mb-8">
        SEGURANÇA <span className="text-purple-500">DA CONTA</span>
      </h2>

      <div className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-[2rem] p-8 shadow-xl">

        <p className="text-gray-400 mb-5 leading-relaxed">
          A segurança da sua conta é uma prioridade. Recomendamos o uso de senhas fortes e únicas para garantir a proteção
          das suas informações e evitar acessos não autorizados.
        </p>

        <p className="text-gray-400 mb-6 leading-relaxed">
          Sua senha deve seguir os seguintes critérios de segurança:
        </p>

        <ul className="text-gray-400 mb-6 space-y-2 list-disc ml-6">
          <li>Ter no mínimo 8 caracteres</li>
          <li>Conter letras e números</li>
          <li>Preferencialmente incluir caracteres especiais</li>
        </ul>

        <input
          type="password"
          placeholder="Digite sua nova senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          className="w-full p-3 rounded-xl bg-white/5 border border-white/10 outline-none focus:border-purple-500 transition mb-4"
        />

        <button className="bg-white text-black py-3 px-6 rounded-full font-semibold hover:opacity-90 transition">
          Atualizar senha
        </button>

      </div>
    </div>
  );
};

export default Seguranca;