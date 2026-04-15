import { useState } from "react";

const FAQ = () => {
  const [open, setOpen] = useState(null);

  const faqs = [
    {
      pergunta: "O que é a plataforma?",
      resposta:
        "É um sistema de gestão de conta que permite ao usuário gerenciar suas informações, segurança e preferências de forma simples e segura.",
    },
    {
      pergunta: "Meus dados estão seguros?",
      resposta:
        "Sim. Todos os dados são protegidos e tratados de acordo com a LGPD, garantindo privacidade e segurança no uso da plataforma.",
    },
    {
      pergunta: "Posso alterar minhas informações depois?",
      resposta:
        "Sim. Você pode atualizar seus dados a qualquer momento na seção Minha Conta, exceto informações críticas de identificação.",
    },
    {
      pergunta: "Existe suporte disponível?",
      resposta:
        "Sim. Oferecemos suporte via e-mail e canais internos da plataforma para ajudar em qualquer dúvida ou problema.",
    },
  ];

  return (
    <section className="w-full py-20 px-6 md:px-20 bg-[#0b0f14] text-white">

      <h2 className="text-3xl md:text-5xl font-black text-center mb-12">
        DÚVIDAS <span className="text-purple-500">FREQUENTES</span>
      </h2>

      <div className="max-w-3xl mx-auto space-y-4">

        {faqs.map((item, index) => (
          <div
            key={index}
            className="bg-white/5 border border-white/10 rounded-2xl p-5 cursor-pointer transition hover:bg-white/10"
            onClick={() => setOpen(open === index ? null : index)}
          >
            <div className="flex justify-between items-center">
              <h3 className="font-medium text-white">
                {item.pergunta}
              </h3>

              <span className="text-gray-400 text-xl">
                {open === index ? "−" : "+"}
              </span>
            </div>

            {open === index && (
              <p className="text-gray-400 mt-3 text-sm leading-relaxed">
                {item.resposta}
              </p>
            )}
          </div>
        ))}

      </div>
    </section>
  );
};

export default FAQ;