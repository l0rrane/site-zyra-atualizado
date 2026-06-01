import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// IMPORTAÇÕES DO FIREBASE
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth } from "../firebase"; // Ajuste o caminho se necessário

// Seus componentes
import MinhaConta from "./MinhaConta";
import Seguranca from "./Seguranca";
import Suporte from "./Suporte";
import LGPD from "./LGPD";
import Monitoramento from "./monitoramento";

const Dashboard = () => {
  const [aba, setAba] = useState("monitoramento");
  const [menuAberto, setMenuAberto] = useState(false);
  
  // Estados para gerenciar o usuário logado via Firebase
  const [user, setUser] = useState<User | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    // onAuthStateChanged fica "escutando" o status de login do usuário
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // Usuário está logado
        setUser(currentUser);
      } else {
        // Usuário não está logado, expulsa para o login
        navigate("/login");
      }
      setLoadingAuth(false); // Terminou de checar
    });

    // Limpa o listener quando o componente é desmontado
    return () => unsubscribe();
  }, [navigate]);

  const logout = async () => {
    try {
      await signOut(auth); // Desloga com segurança no Firebase
      navigate("/"); // Redireciona para a home ou login
    } catch (error) {
      console.error("Erro ao sair da conta:", error);
    }
  };

  const handleZyraMonitora = () => {
    // Aqui no futuro você vai fazer a chamada para a sua API
    alert("Integração com a API Zyra Monitora em breve!");
  };

  const renderConteudo = () => {
    switch (aba) {
      case "conta": return <MinhaConta />;
      case "seguranca": return <Seguranca />;
      case "suporte": return <Suporte />;
      case "lgpd": return <LGPD />;
      case "monitoramento": return <Monitoramento />;
      default: return <MinhaConta />;
    }
  };

  const getButtonClass = (nome: string) =>
    `w-full text-left px-4 py-3 rounded-lg transition-all text-sm font-medium ${
      aba === nome
        ? "bg-white/10 text-white"
        : "text-gray-400 hover:text-white hover:bg-white/5"
    }`;

  // Exibe uma tela preta/loading enquanto o Firebase verifica o login
  if (loadingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0b0f14] text-white">
        <p className="text-gray-400">Carregando painel...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#0b0f14] text-white">
      {/* TOP BAR MOBILE */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-white/10">
        <h1 className="text-lg font-semibold">Dashboard</h1>

        <button
          onClick={() => setMenuAberto(!menuAberto)}
          className="text-sm text-gray-300"
        >
          Menu
        </button>
      </div>

      {/* SIDEBAR */}
      <aside
  className={`
    fixed md:static
    z-50
    top-0
    left-0
    w-[85%]
    max-w-64
    bg-[#0f141b]
    border-r border-white/5
    p-6
    flex flex-col justify-between
    transition-transform duration-300
    h-screen md:h-auto md:self-stretch
    ${
      menuAberto
        ? "translate-x-0"
        : "-translate-x-full md:translate-x-0"
    }
  `}

      >
        <div>
          <h2 className="text-xl font-semibold mb-10">
            Painel <span className="text-gray-400">Zyra</span>
          </h2>

          <nav className="flex flex-col gap-2">
            <button onClick={() => { setAba("monitoramento"); setMenuAberto(false); }} className={getButtonClass("monitoramento")}>
              Monitoramento
            </button>

            <button onClick={() => { setAba("conta"); setMenuAberto(false); }} className={getButtonClass("conta")}>
              Minha Conta
            </button>

            <button onClick={() => { setAba("seguranca"); setMenuAberto(false); }} className={getButtonClass("seguranca")}>
              Segurança
            </button>

            <button onClick={() => { setAba("suporte"); setMenuAberto(false); }} className={getButtonClass("suporte")}>
              Suporte
            </button>

            <button onClick={() => { setAba("lgpd"); setMenuAberto(false); }} className={getButtonClass("lgpd")}>
              Privacidade
            </button>
          </nav>

          {/* BOTÃO DA API ZYRA MONITORA */}
          <button
  onClick={() => {
    handleZyraMonitora();
    setMenuAberto(false);
  }}
  className="
    mt-6
    w-full
    bg-gradient-to-r
    from-cyan-500
    to-purple-600
    hover:scale-[1.02]
    active:scale-[0.98]
    transition-all
    text-white
    font-bold
    py-3
    px-4
    rounded-xl
    shadow-lg
    shadow-purple-500/20

    text-xs
    sm:text-sm

    uppercase
    tracking-wide

    flex
    items-center
    justify-center
  "
>
  Zyra Monitora
</button>

        </div>

        <button
          onClick={logout}
          className="text-sm text-red-400 hover:text-red-300"
        >
          Sair da conta
        </button>
      </aside>

      {/* OVERLAY MOBILE */}
      {menuAberto && (
        <div
          onClick={() => setMenuAberto(false)}
          className="fixed inset-0 bg-black/50 md:hidden"
        />
      )}

      {/* CONTEÚDO */}
      <main className="flex-1 p-4 md:p-10">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-xl md:text-2xl font-semibold"></h1>

          {/* Exibe o email puxado direto do Firebase */}
          <div className="text-xs md:text-sm text-gray-400">
            {user?.email}
          </div>
        </div>

        <div className="bg-white/5 border border-white/5 rounded-2xl p-4 md:p-8">
          <motion.div
            key={aba}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {renderConteudo()}
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;