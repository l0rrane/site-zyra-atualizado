
import { useState, ChangeEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// IMPORTAÇÕES DO FIREBASE
import { auth, db } from "../firebase";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { deleteUser } from "firebase/auth";

const MinhaConta = () => {
  const navigate = useNavigate();
  const currentUser = auth.currentUser;

  // Estados
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [notificacao, setNotificacao] = useState("email");
  const [foto, setFoto] = useState<string | null>(null);
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Busca os dados do usuário no Firestore ao carregar a página
  useEffect(() => {
    const fetchUserData = async () => {
      if (currentUser) {
        setEmail(currentUser.email || "");
        
        try {
          const docRef = doc(db, "usuarios", currentUser.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const data = docSnap.data();
            setNome(data.nomeCompleto || "");
            setTelefone(data.telefone || "");
            setFoto(data.fotoBase64 || null); // Puxa a foto em Base64 salva
            setNotificacao(data.notificacao || "email");
          }
        } catch (error) {
          console.error("Erro ao buscar dados do usuário:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchUserData();
  }, [currentUser]);

  // Função para lidar com o upload e conversão para Base64
  function handleFoto(event: ChangeEvent<HTMLInputElement>): void {
    const file = event.target.files?.[0];
    
    if (file) {
      // LIMITA O TAMANHO DO ARQUIVO PARA 500KB PARA NÃO QUEBRAR O FIRESTORE (Limite de 1MB por documento)
      if (file.size > 500 * 1024) {
        alert("A imagem é muito grande! Por favor, escolha uma imagem com menos de 500KB.");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        // e.target.result já é a string Base64 da imagem
        setFoto(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  // Função para salvar as alterações no banco
  const handleSalvar = async () => {
    if (!currentUser) return;
    setIsSaving(true);

    try {
      const docRef = doc(db, "usuarios", currentUser.uid);
      await updateDoc(docRef, {
        nomeCompleto: nome,
        telefone: telefone,
        notificacao: notificacao,
        fotoBase64: foto, // Salva a string Base64 no banco
      });
      alert("Alterações salvas com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar:", error);
      alert("Não foi possível salvar as alterações.");
    } finally {
      setIsSaving(false);
    }
  };

  // Função para excluir a conta do Firebase Auth e do Firestore
  const handleExcluirConta = async () => {
    if (!currentUser) return;

    const confirmacao = window.confirm(
      "Tem certeza que deseja excluir sua conta? Esta ação é permanente."
    );

    if (confirmacao) {
      try {
        // 1. Deleta o documento do usuário no Firestore
        await deleteDoc(doc(db, "usuarios", currentUser.uid));
        
        // 2. Deleta o usuário da Autenticação do Firebase
        await deleteUser(currentUser);
        
        // 3. Redireciona para o início
        navigate("/");
      } catch (error: any) {
        console.error("Erro ao excluir conta:", error);
        // O Firebase exige que o usuário tenha feito login recentemente para excluir a conta
        if (error.code === 'auth/requires-recent-login') {
          alert("Por questões de segurança, faça logout, entre novamente e tente excluir a conta.");
        } else {
          alert("Ocorreu um erro ao excluir a conta.");
        }
      }
    }
  };

  if (isLoading) {
    return <div className="text-gray-400 text-sm">Carregando informações...</div>;
  }

  return (
    <div className="max-w-3xl">
      <h2 className="text-4xl font-black italic mb-8">
        MINHA <span className="text-purple-500">CONTA</span>
      </h2>

      <div className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-[2rem] p-8 shadow-xl">
        <p className="text-gray-400 mb-6 leading-relaxed">
          Gerencie suas informações pessoais e preferências da sua conta.  
          Essas informações são utilizadas para personalizar sua experiência dentro da plataforma.
        </p>

        {/* FOTO DE PERFIL */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-20 h-20 rounded-full bg-white/10 overflow-hidden flex items-center justify-center border border-white/10">
            {foto ? (
              <img src={foto} className="w-full h-full object-cover" alt="Perfil" />
            ) : (
              <span className="text-gray-400 text-sm">Foto</span>
            )}
          </div>

          <label className="cursor-pointer text-sm text-purple-400 hover:text-purple-300"> 
            Alterar foto
            <input
              type="file"
              accept="image/*"
              onChange={handleFoto}
              className="hidden"
            />
          </label>
        </div>

        {/* FORMULÁRIO */}
        <div className="flex flex-col gap-4">
          <div>
            <label className="text-sm text-gray-400 mb-1 block">Nome</label>
            <input
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full p-3 rounded-xl bg-white/5 border border-white/10 outline-none focus:border-purple-500 transition text-white"
            />
          </div>

          <div>
            <label className="text-sm text-gray-400 mb-1 block">E-mail</label>
            <input
              value={email}
              disabled
              className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-gray-500 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="text-sm text-gray-400 mb-1 block">Telefone</label>
            <input
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              className="w-full p-3 rounded-xl bg-white/5 border border-white/10 outline-none focus:border-purple-500 transition text-white"
            />
          </div>

          <div>
            <label className="text-sm text-gray-400 mb-1 block">
              Preferência de notificações
            </label>
            <select
              value={notificacao}
              onChange={(e) => setNotificacao(e.target.value)}
              className="w-full p-3 rounded-xl bg-white/5 border border-white/10 outline-none focus:border-purple-500 transition text-white [&>option]:bg-gray-900"
            >
              <option value="email">E-mail</option>
              <option value="app">App</option>
              <option value="whatsapp">WhatsApp</option>
            </select>
          </div>

          <button 
            onClick={handleSalvar}
            disabled={isSaving}
            className="mt-6 bg-white text-black py-3 rounded-full font-semibold hover:opacity-90 transition disabled:opacity-50"
          >
            {isSaving ? "Salvando..." : "Salvar alterações"}
          </button>

          {/* EXCLUSÃO DE CONTA */}
          <div className="mt-10 bg-red-500/5 border border-red-500/20 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-red-400 mb-2">
              Excluir Conta
            </h3>

            <p className="text-sm text-gray-400 mb-5 leading-relaxed">
              A exclusão da sua conta é permanente. Todos os seus dados serão removidos e essa ação não poderá ser desfeita.
            </p>

            <button
              onClick={handleExcluirConta}
              className="bg-red-500 text-white px-5 py-3 rounded-xl text-sm font-medium hover:bg-red-600 transition"
            >
              Excluir minha conta
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MinhaConta;

