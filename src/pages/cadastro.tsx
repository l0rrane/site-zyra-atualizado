import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { CreditCard, FileText, MapPin, Phone, User, Mail, LockIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

type Plano = "mensal" | "semestral" | "anual";
type FormaPagamento = "cartao_credito" | "cartao_debito" | "pix" | "boleto";

interface FormData {
  nomeCompleto: string;
  senha: string;
  email: string;
  telefone: string;
  endereco: string;
  cpf: string;
  tipoPlano: Plano;
  formaPagamento: FormaPagamento;
  quantidadeParcelas: number;
}

interface ApiResponse {
  success: boolean;
  message: string;
}

const initialFormData: FormData = {
  nomeCompleto: "",
  senha: "",
  email: "",
  telefone: "",
  endereco: "",
  cpf: "",
  tipoPlano: "mensal",
  formaPagamento: "pix",
  quantidadeParcelas: 1,
};

/**
 * Função temporária simulando a API.
 * Depois você pode trocar pelo fetch/axios sem mexer no resto do componente.
 */
const registerClient = async (payload: FormData): Promise<ApiResponse> => {
  console.log("Payload enviado para API:", payload);

  await new Promise((resolve) => setTimeout(resolve, 1200));

  return {
    success: true,
    message: "Cadastro enviado com sucesso.",
  };
};

/**
 Depois com a API deve ficar assim:

 const cadastro = async (payload: FormData): Promise<ApiResponse> => {
   const response = await fetch("http://localhost:3000/cadastros", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(payload),
   });

   if (!response.ok) {
     throw new Error("Erro ao enviar cadastro.");
   }

   return response.json();
 };
*/

const Cadastro = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const parcelasDisponiveis = useMemo(() => {
    if (
      formData.formaPagamento === "pix" ||
      formData.formaPagamento === "cartao_debito"
    ) {
      return [1];
    }

    if (formData.tipoPlano === "mensal") {
      return [1, 2];
    }

    if (formData.tipoPlano === "semestral") {
      return [1, 2, 3, 4, 5, 6];
    }

    return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  }, [formData.formaPagamento, formData.tipoPlano]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "quantidadeParcelas" ? Number(value) : value,
    }));

    if (successMessage) setSuccessMessage("");
    if (errorMessage) setErrorMessage("");
  };

  const handleFormaPagamentoChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = e.target.value as FormaPagamento;

    setFormData((prev) => ({
      ...prev,
      formaPagamento: value,
      quantidadeParcelas:
        value === "pix" || value === "cartao_debito"
          ? 1
          : prev.quantidadeParcelas,
    }));

    if (successMessage) setSuccessMessage("");
    if (errorMessage) setErrorMessage("");
  };

  const handlePlanoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as Plano;

    setFormData((prev) => ({
      ...prev,
      tipoPlano: value,
      quantidadeParcelas: 1,
    }));

    if (successMessage) setSuccessMessage("");
    if (errorMessage) setErrorMessage("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsSubmitting(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await registerClient(formData);

      if (!response.success) {
        throw new Error(response.message || "Falha ao enviar cadastro.");
      }

      setSuccessMessage("Cadastro realizado com sucesso! Redirecionando para login...");
      setFormData(initialFormData);

      setTimeout(() => {
        navigate("/login");
      }, 3500);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Não foi possível concluir o cadastro.";

      setErrorMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative min-h-screen pt-32 pb-20 overflow-hidden bg-black text-white">
      <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-purple-600/10 blur-[120px] rounded-full -translate-y-1/2" />
      <div className="absolute bottom-0 right-1/4 w-[800px] h-[800px] bg-cyan-600/10 blur-[120px] rounded-full translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-12 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-5"
        >
          <h1 className="text-5xl md:text-7xl font-black italic mb-6 leading-[0.95] tracking-tighter">
            FAÇA SEU
            <br />
            <span className="text-purple-500">CADASTRO</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-xl leading-relaxed font-light">
            Preencha suas informações para escolher seu plano, definir a forma
            de pagamento e concluir seu cadastro de forma rápida e simples.
          </p>

        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="lg:col-span-7"
        >
          <div className="rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-xl p-6 md:p-8 shadow-2xl">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="md:col-span-2">
                <label className="text-sm text-gray-300 mb-2 block">Nome completo</label>
                <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/30 px-4">
                  <User size={18} className="text-cyan-400" />
                  <input
                    type="text"
                    name="nomeCompleto"
                    value={formData.nomeCompleto}
                    onChange={handleChange}
                    placeholder="Digite seu nome completo"
                    className="w-full bg-transparent py-4 outline-none text-white placeholder:text-gray-500"
                    required
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="text-sm text-gray-300 mb-2 block">Senha</label>
                <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/30 px-4">
                  <LockIcon size={18} className="text-cyan-400" />
                  <input
                    type="text"
                    name="senha"
                    value={formData.senha}
                    onChange={handleChange}
                    placeholder="Digite sua senha"
                    className="w-full bg-transparent py-4 outline-none text-white placeholder:text-gray-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-300 mb-2 block">Email</label>
                <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/30 px-4">
                  <Mail size={18} className="text-purple-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Digite seu email"
                    className="w-full bg-transparent py-4 outline-none text-white placeholder:text-gray-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-300 mb-2 block">Telefone</label>
                <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/30 px-4">
                  <Phone size={18} className="text-green-400" />
                  <input
                    type="text"
                    name="telefone"
                    value={formData.telefone}
                    onChange={handleChange}
                    placeholder="(11) 99999-9999"
                    className="w-full bg-transparent py-4 outline-none text-white placeholder:text-gray-500"
                    required
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="text-sm text-gray-300 mb-2 block">Endereço</label>
                <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/30 px-4">
                  <MapPin size={18} className="text-cyan-400" />
                  <input
                    type="text"
                    name="endereco"
                    value={formData.endereco}
                    onChange={handleChange}
                    placeholder="Rua, número, bairro, cidade"
                    className="w-full bg-transparent py-4 outline-none text-white placeholder:text-gray-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-300 mb-2 block">CPF</label>
                <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/30 px-4">
                  <FileText size={18} className="text-purple-400" />
                  <input
                    type="text"
                    name="cpf"
                    value={formData.cpf}
                    onChange={handleChange}
                    placeholder="000.000.000-00"
                    className="w-full bg-transparent py-4 outline-none text-white placeholder:text-gray-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-300 mb-2 block">Tipo de plano</label>
                <select
                  name="tipoPlano"
                  value={formData.tipoPlano}
                  onChange={handlePlanoChange}
                  className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-4 outline-none text-white"
                >
                  <option value="mensal">Mensal</option>
                  <option value="semestral">Semestral</option>
                  <option value="anual">Anual</option>
                </select>
              </div>

              <div>
                <label className="text-sm text-gray-300 mb-2 block">Forma de pagamento</label>
                <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/30 px-4">
                  <CreditCard size={18} className="text-green-400" />
                  <select
                    name="formaPagamento"
                    value={formData.formaPagamento}
                    onChange={handleFormaPagamentoChange}
                    className="w-full  py-4 outline-none text-white"
                  >
                    <option value="pix">Pix</option>
                    <option value="cartao_debito">Cartão de débito</option>
                    <option value="cartao_credito">Cartão de crédito</option>
                    <option value="boleto">Boleto</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-300 mb-2 block">Quantidade de parcelas</label>
                <select
                  name="quantidadeParcelas"
                  value={formData.quantidadeParcelas}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-4 outline-none text-white"
                >
                  {parcelasDisponiveis.map((parcela) => (
                    <option key={parcela} value={parcela}>
                      {parcela}x
                    </option>
                  ))}
                </select>
              </div>

              {(successMessage || errorMessage) && (
                <div className="md:col-span-2">
                  {successMessage && (
                    <div className="rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-300">
                      {successMessage}
                    </div>
                  )}

                  {errorMessage && (
                    <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                      {errorMessage}
                    </div>
                  )}
                </div>
              )}

              <div className="md:col-span-2 pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative w-full px-8 py-5 bg-purple-600 hover:bg-purple-700 text-white font-black rounded-2xl overflow-hidden transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <span className="relative z-10 uppercase tracking-wide">
                    {isSubmitting ? "Enviando..." : "Finalizar Cadastro"}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Cadastro;