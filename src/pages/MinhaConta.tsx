import { useState, ChangeEvent } from "react";

const MinhaConta = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [nome, setNome] = useState(user.nome || "Usuário");
  const [telefone, setTelefone] = useState(user.telefone || "");
  const [notificacao, setNotificacao] = useState("email");
  const [foto, setFoto] = useState<string | null>(null);

  function handleFoto(event: ChangeEvent<HTMLInputElement>): void {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFoto(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
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
            <img src={foto} className="w-full h-full object-cover" />
         ) : (
        <span className="text-gray-400 text-sm">Foto</span>
    )}
         </div>

             <label className="cursor-pointer text-sm text-purple-400 hover:text-purple-300"> Alterar foto
            <input
                type="file"
                accept="image/*"
                onChange={handleFoto}
                className="hidden"/>
            </label>

        </div>


        <div className="flex flex-col gap-4">

          <div>
            <label className="text-sm text-gray-400 mb-1 block">Nome</label>
            <input
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full p-3 rounded-xl bg-white/5 border border-white/10 outline-none focus:border-purple-500 transition"
            />
          </div>

          <div>
            <label className="text-sm text-gray-400 mb-1 block">E-mail</label>
            <input
              value={user.email}
              disabled
              className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-gray-500 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="text-sm text-gray-400 mb-1 block">Telefone</label>
            <input
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              className="w-full p-3 rounded-xl bg-white/5 border border-white/10 outline-none focus:border-purple-500 transition"
            />
          </div>

          <div>
            <label className="text-sm text-gray-400 mb-1 block">
              Preferência de notificações
            </label>

            <select
              value={notificacao}
              onChange={(e) => setNotificacao(e.target.value)}
              className="w-full p-3 rounded-xl bg-white/5 border border-white/10 outline-none focus:border-purple-500 transition"
            >
              <option value="email">E-mail</option>
              <option value="app">App</option>
              <option value="whatsapp">WhatsApp</option>
            </select>
          </div>

          <button className="mt-6 bg-white text-black py-3 rounded-full font-semibold hover:opacity-90 transition">
            Salvar alterações
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
    onClick={() => {
      const confirmacao = window.confirm(
        "Tem certeza que deseja excluir sua conta? Esta ação é permanente."
      );

      if (confirmacao) {
        localStorage.removeItem("user");
        window.location.href = "/";
      }
    }}
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