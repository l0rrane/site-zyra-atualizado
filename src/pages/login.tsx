
import { Eye, EyeOff } from "lucide-react";
import { Mail, Lock, LogIn } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// IMPORTAÇÕES DO FIREBASE
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase"; // Verifique se o caminho está correto

const Login = () => {

  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro(""); // Limpa erros anteriores
    setIsLoading(true);

    // validação simples
    if (!email || !senha) {
      setErro("Preencha todos os campos");
      setIsLoading(false);
      return;
    }

    if (!email.includes("@")) {
      setErro("Digite um email válido");
      setIsLoading(false);
      return;
    }

    try {
      // Tenta fazer o login no Firebase
      await signInWithEmailAndPassword(auth, email, senha);
      
      // Se der certo, redireciona pro dashboard
      navigate("/dashboard");
    } catch (error: any) {
      console.error("Erro no login:", error);
      
      // Tratamento de erros comuns do Firebase
      if (
        error.code === "auth/invalid-credential" || 
        error.code === "auth/user-not-found" || 
        error.code === "auth/wrong-password"
      ) {
        setErro("E-mail ou senha incorretos.");
      } else if (error.code === "auth/too-many-requests") {
        setErro("Muitas tentativas falhas. Tente novamente mais tarde.");
      } else {
        setErro("Ocorreu um erro ao tentar entrar. Tente novamente.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      id="login"
      className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-black via-gray-900 to-black"
    >
      <div className="w-full max-w-md bg-white/5 border border-white/10 backdrop-blur-sm rounded-[2rem] p-8 shadow-2xl">
        {/* TÍTULO */}
        <h2 className="text-3xl md:text-4xl font-black italic text-center mb-6 text-white">
          ACESSAR <br />
          <span className="text-purple-500">PLATAFORMA</span>
        </h2>

        <p className="text-gray-400 text-sm text-center mb-8">
          Entre com suas credenciais
        </p>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* EMAIL */}
          <div className="relative">
            <Mail
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="email"
              placeholder="Seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-12 pr-4 py-3 rounded-full bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-all"
            />
          </div>

          {/* SENHA */}
          <div className="relative">
            <Lock
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <div className="relative w-full">
  <input
    type={mostrarSenha ? "text" : "password"}
    value={senha}
    onChange={(e) => setSenha(e.target.value)}
    placeholder="Digite sua senha"
    className="w-full pl-12 pr-10 py-3 rounded-full bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-all"
    required
  />

  <button
    type="button"
    onClick={() => setMostrarSenha((prev) => !prev)}
    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
  >
    {mostrarSenha ? <EyeOff size={18} /> : <Eye size={18} />}
  </button>
</div>
          </div>

          {/* EXIBIÇÃO DE ERRO */}
          {erro && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm text-center py-2 rounded-lg">
              {erro}
            </div>
          )}

          {/* BOTÃO */}
          <button
            type="submit"
            disabled={isLoading}
            className="mt-4 flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-purple-600 hover:scale-105 transition-all text-white font-black py-3 rounded-full shadow-lg disabled:opacity-70 disabled:hover:scale-100 disabled:cursor-not-allowed"
          >
            <LogIn size={18} />
            {isLoading ? "ENTRANDO..." : "ENTRAR"}
          </button>

          {/* LINKS */}
          <span className="text-center text-xs text-gray-500 mt-2 hover:text-purple-400 cursor-pointer transition">
            Esqueci minha senha
          </span>

          <Link
            to="/cadastro"
            className="text-center text-xs text-gray-500 mt-2 hover:text-purple-400 transition"
          >
            Cadastrar-se
          </Link>
        </form>
      </div>
    </section>
  );
};

export default Login;

