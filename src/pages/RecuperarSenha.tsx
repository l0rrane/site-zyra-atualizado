import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, ArrowLeft, KeySquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const RecuperarSenha = () => {
  const [email, setEmail] = useState("");
  const [mensagemSucesso, setMensagemSucesso] = useState("");
  const [mensagemErro, setMensagemErro] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensagemSucesso("");
    setMensagemErro("");
    setIsLoading(true);

    if (!email || !email.includes("@")) {
      setMensagemErro("Por favor, digite um endereço de e-mail válido.");
      setIsLoading(false);
      return;
    }

    try {
      // CONEXÃO COM SUA API:
      // Troque "http://localhost:3000" pela URL do seu back-end quando for para produção (ex: Vercel)
      const response = await fetch("/api/recuperar-senha", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erro ao processar solicitação.");
      }

      setMensagemSucesso(
        "Se o e-mail existir em nossa base, um link de recuperação foi enviado para você!"
      );
      setEmail(""); 
      
    } catch (error: any) {
      console.error("Erro ao conectar com a API:", error);
      setMensagemErro("Não foi possível conectar ao servidor no momento. Tente mais tarde.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
      
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-600/10 blur-[100px] rounded-full -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-cyan-600/10 blur-[100px] rounded-full translate-y-1/2 pointer-events-none" />

      <div className="w-full max-w-md bg-white/5 border border-white/10 backdrop-blur-sm rounded-[2rem] p-8 shadow-2xl relative z-10">
        
        <Link 
          to="/login" 
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          Voltar para o Login
        </Link>

        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 mb-4 shadow-inner">
            <KeySquare size={28} className="text-cyan-400" />
          </div>
          <h2 className="text-2xl md:text-3xl font-black italic text-center text-white">
            RECUPERAR <br />
            <span className="text-purple-500">SENHA</span>
          </h2>
          <p className="text-gray-400 text-sm text-center mt-3 leading-relaxed">
            Digite o e-mail associado à sua conta. Enviaremos um link seguro para você redefinir sua senha.
          </p>
        </div>

        <AnimatePresence>
          {(mensagemSucesso || mensagemErro) && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`mb-6 p-4 rounded-xl text-sm font-medium border text-center ${
                mensagemSucesso 
                  ? "bg-green-500/10 border-green-500/30 text-green-400" 
                  : "bg-red-500/10 border-red-500/30 text-red-400"
              }`}
            >
              {mensagemSucesso || mensagemErro}
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="relative">
            <Mail
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="email"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-12 pr-4 py-4 rounded-xl bg-black/30 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="mt-2 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-cyan-600 hover:opacity-90 transition-all text-white font-black py-4 rounded-xl shadow-lg disabled:opacity-70 disabled:cursor-not-allowed uppercase tracking-wide"
          >
            {isLoading ? "Enviando..." : "Enviar link de recuperação"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default RecuperarSenha;