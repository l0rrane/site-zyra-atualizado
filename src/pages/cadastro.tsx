import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  CreditCard,
  FileText,
  MapPin,
  Phone,
  User,
  Mail,
  LockIcon,
  Home,
  Building2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

type Plano = "mensal" | "semestral" | "anual";
type FormaPagamento = "cartao_credito" | "cartao_debito" | "pix" | "boleto";

interface FormData {
  nomeCompleto: string;
  senha: string;
  email: string;
  telefone: string;
  cpf: string;
  tipoPlano: Plano;
  formaPagamento: FormaPagamento;
  quantidadeParcelas: number;

  cep: string;
  logradouro: string;
  numero: string;
  bairro: string;
  cidade: string;
  estado: string;
  complemento: string;
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
  cpf: "",
  tipoPlano: "mensal",
  formaPagamento: "pix",
  quantidadeParcelas: 1,

  cep: "",
  logradouro: "",
  numero: "",
  bairro: "",
  cidade: "",
  estado: "",
  complemento: "",
};

const registerClient = async (payload: FormData): Promise<ApiResponse> => {
  console.log("Payload enviado para API:", payload);

  await new Promise((resolve) => setTimeout(resolve, 1200));

  return {
    success: true,
    message: "Cadastro enviado com sucesso.",
  };
};

const Cadastro = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFetchingCep, setIsFetchingCep] = useState(false);
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

  const formatCep = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 8);
    return digits.replace(/^(\d{5})(\d{0,3})$/, "$1-$2");
  };

  const formatCpf = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 11);
    return digits
      .replace(/^(\d{3})(\d)/, "$1.$2")
      .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/\.(\d{3})(\d)/, ".$1-$2");
  };

  const formatTelefone = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 11);

    if (digits.length <= 10) {
      return digits
        .replace(/^(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{4})(\d)/, "$1-$2");
    }

    return digits
      .replace(/^(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2");
  };

  const validarSenha = (senha: string) => {
    const regex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&()[\]{}\-_=+;:,.<>/?\\|#])[A-Za-z\d@$!%*?&()[\]{}\-_=+;:,.<>/?\\|#]{8,20}$/;

    return regex.test(senha);
  };

  const senhaMinimo = formData.senha.length >= 8;
  const senhaMaximo = formData.senha.length <= 20;
  const senhaMaiuscula = /[A-Z]/.test(formData.senha);
  const senhaNumero = /\d/.test(formData.senha);
  const senhaEspecial = /[@$!%*?&()[\]{}\-_=+;:,.<>/?\\|#]/.test(
    formData.senha
  );
  const senhaValida = validarSenha(formData.senha);

  const buscarCep = async (cep: string) => {
    const cepLimpo = cep.replace(/\D/g, "");

    if (cepLimpo.length !== 8) return;

    setIsFetchingCep(true);

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);

      if (!response.ok) {
        throw new Error("Não foi possível consultar o CEP.");
      }

      const data = await response.json();

      if (data.erro) {
        throw new Error("CEP não encontrado.");
      }

      setFormData((prev) => ({
        ...prev,
        cep: formatCep(cep),
        logradouro: data.logradouro || "",
        bairro: data.bairro || "",
        cidade: data.localidade || "",
        estado: data.uf || "",
      }));

      setErrorMessage("");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Erro ao buscar CEP.";
      setErrorMessage(message);
    } finally {
      setIsFetchingCep(false);
    }
  };

  const handleChange = async (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    let formattedValue: string | number = value;

    if (name === "quantidadeParcelas") {
      formattedValue = Number(value);
    }

    if (name === "cep") {
      formattedValue = formatCep(value);
    }

    if (name === "cpf") {
      formattedValue = formatCpf(value);
    }

    if (name === "telefone") {
      formattedValue = formatTelefone(value);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: formattedValue,
    }));

    if (successMessage) setSuccessMessage("");
    if (errorMessage) setErrorMessage("");

    if (name === "cep") {
      const cepLimpo = String(formattedValue).replace(/\D/g, "");
      if (cepLimpo.length === 8) {
        await buscarCep(String(formattedValue));
      }
    }
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

    if (!senhaValida) {
      setErrorMessage(
        "A senha deve ter entre 8 e 20 caracteres, com pelo menos 1 letra maiúscula, 1 número e 1 caractere especial."
      );
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await registerClient(formData);

      if (!response.success) {
        throw new Error(response.message || "Falha ao enviar cadastro.");
      }

      setSuccessMessage(
        "Cadastro realizado com sucesso! Redirecionando para login..."
      );
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

  const getPasswordRuleClass = (isValid: boolean) =>
    isValid ? "text-green-400" : "text-gray-400";

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
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-5"
            >
              <div className="md:col-span-2">
                <label className="text-sm text-gray-300 mb-2 block">
                  Nome completo
                </label>
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
                    type="password"
                    name="senha"
                    value={formData.senha}
                    onChange={handleChange}
                    placeholder="Digite sua senha"
                    minLength={8}
                    maxLength={20}
                    className="w-full bg-transparent py-4 outline-none text-white placeholder:text-gray-500"
                    required
                  />
                </div>

                <div className="mt-3 space-y-1 text-xs">
                  <p className={getPasswordRuleClass(senhaMinimo)}>
                    • Mínimo de 8 caracteres
                  </p>
                  <p className={getPasswordRuleClass(senhaMaximo)}>
                    • Máximo de 20 caracteres
                  </p>
                  <p className={getPasswordRuleClass(senhaMaiuscula)}>
                    • Pelo menos 1 letra maiúscula
                  </p>
                  <p className={getPasswordRuleClass(senhaNumero)}>
                    • Pelo menos 1 número
                  </p>
                  <p className={getPasswordRuleClass(senhaEspecial)}>
                    • Pelo menos 1 caractere especial
                  </p>
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
                <label className="text-sm text-gray-300 mb-2 block">
                  Telefone
                </label>
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
                <label className="text-sm text-gray-300 mb-2 block">CEP</label>
                <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/30 px-4">
                  <MapPin size={18} className="text-cyan-400" />
                  <input
                    type="text"
                    name="cep"
                    value={formData.cep}
                    onChange={handleChange}
                    placeholder="00000-000"
                    className="w-full bg-transparent py-4 outline-none text-white placeholder:text-gray-500"
                    required
                  />
                </div>
                {isFetchingCep && (
                  <p className="text-xs text-cyan-300 mt-2">
                    Buscando endereço pelo CEP...
                  </p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="text-sm text-gray-300 mb-2 block">
                  Rua / Logradouro
                </label>
                <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/30 px-4">
                  <MapPin size={18} className="text-cyan-400" />
                  <input
                    type="text"
                    name="logradouro"
                    value={formData.logradouro}
                    onChange={handleChange}
                    placeholder="Rua, avenida, travessa..."
                    className="w-full bg-transparent py-4 outline-none text-white placeholder:text-gray-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-300 mb-2 block">
                  Número
                </label>
                <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/30 px-4">
                  <Home size={18} className="text-green-400" />
                  <input
                    type="text"
                    name="numero"
                    value={formData.numero}
                    onChange={handleChange}
                    placeholder="Número da residência"
                    className="w-full bg-transparent py-4 outline-none text-white placeholder:text-gray-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-300 mb-2 block">
                  Bairro
                </label>
                <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/30 px-4">
                  <Building2 size={18} className="text-purple-400" />
                  <input
                    type="text"
                    name="bairro"
                    value={formData.bairro}
                    onChange={handleChange}
                    placeholder="Digite o bairro"
                    className="w-full bg-transparent py-4 outline-none text-white placeholder:text-gray-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-300 mb-2 block">
                  Cidade
                </label>
                <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/30 px-4">
                  <MapPin size={18} className="text-cyan-400" />
                  <input
                    type="text"
                    name="cidade"
                    value={formData.cidade}
                    onChange={handleChange}
                    placeholder="Digite a cidade"
                    className="w-full bg-transparent py-4 outline-none text-white placeholder:text-gray-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-300 mb-2 block">
                  Estado
                </label>
                <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/30 px-4">
                  <MapPin size={18} className="text-cyan-400" />
                  <input
                    type="text"
                    name="estado"
                    value={formData.estado}
                    onChange={handleChange}
                    placeholder="UF"
                    className="w-full bg-transparent py-4 outline-none text-white placeholder:text-gray-500"
                    maxLength={2}
                    required
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="text-sm text-gray-300 mb-2 block">
                  Complemento
                </label>
                <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/30 px-4">
                  <MapPin size={18} className="text-cyan-400" />
                  <input
                    type="text"
                    name="complemento"
                    value={formData.complemento}
                    onChange={handleChange}
                    placeholder="Apartamento, bloco, referência..."
                    className="w-full bg-transparent py-4 outline-none text-white placeholder:text-gray-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-300 mb-2 block">
                  Tipo de plano
                </label>
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
                <label className="text-sm text-gray-300 mb-2 block">
                  Forma de pagamento
                </label>
                <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/30 px-4">
                  <CreditCard size={18} className="text-green-400" />
                  <select
                    name="formaPagamento"
                    value={formData.formaPagamento}
                    onChange={handleFormaPagamentoChange}
                    className="w-full py-4 outline-none text-white bg-transparent"
                  >
                    <option value="pix" className="bg-black text-white">
                      Pix
                    </option>
                    <option
                      value="cartao_debito"
                      className="bg-black text-white"
                    >
                      Cartão de débito
                    </option>
                    <option
                      value="cartao_credito"
                      className="bg-black text-white"
                    >
                      Cartão de crédito
                    </option>
                    <option value="boleto" className="bg-black text-white">
                      Boleto
                    </option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-300 mb-2 block">
                  Quantidade de parcelas
                </label>
                <select
                  name="quantidadeParcelas"
                  value={formData.quantidadeParcelas}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-4 outline-none text-white"
                >
                  {parcelasDisponiveis.map((parcela) => (
                    <option
                      key={parcela}
                      value={parcela}
                      className="bg-black text-white"
                    >
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
                  disabled={isSubmitting || isFetchingCep}
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