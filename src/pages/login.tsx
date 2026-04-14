import { Mail, Lock, LogIn } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    //  Aqui depois vamo conecta com backend
    console.log("Email:", email);
    console.log("Senha:", senha);

    alert("Login enviado ");
  };

  return (
    <section
      id="login"
      className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-black via-gray-900 to-black"
    >
      <div className="w-full max-w-md bg-white/5 border border-white/10 backdrop-blur-sm rounded-[2rem] p-8 shadow-2xl">

        {/* TÍTULO */}
        <h2 className="text-3xl md:text-4xl font-black italic text-center mb-6">
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
            <input
              type="password"
              placeholder="Sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              className="w-full pl-12 pr-4 py-3 rounded-full bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-all"
            />
          </div>

          {/* BOTÃO */}
          <button
            type="submit"
            className="mt-4 flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 transition-all text-white font-black py-3 rounded-full shadow-lg"
          >
            <LogIn size={18} />
            ENTRAR
          </button>

          {/* LINK */}
          <span className="text-center text-xs text-gray-500 mt-2 hover:text-purple-400 cursor-pointer transition">
            Esqueci minha senha
          </span>
          <Link
            to="/cadastro"
            className="text-center text-xs text-gray-500 mt-2 hover:text-purple-400 cursor-pointer transition"
          >
            Cadastrar-se
          </Link>
        </form>
      </div>
    </section>
  );
};

export default Login;