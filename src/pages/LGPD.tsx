const LGPD = () => {
  return (
    <div className="max-w-3xl">
      <h2 className="text-4xl font-black italic mb-8">
        PRIVACIDADE <span className="text-purple-500">E TERMOS</span>
      </h2>

      <div className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-[2rem] p-8 shadow-xl">

        <p className="text-gray-400 mb-5 leading-relaxed">
          Nós valorizamos a sua privacidade e tratamos seus dados com responsabilidade e segurança.
          As informações coletadas durante o uso da plataforma são utilizadas exclusivamente para
          melhorar sua experiência, personalizar funcionalidades e garantir o correto funcionamento do sistema.
        </p>

        <p className="text-gray-400 mb-5 leading-relaxed">
          Todos os dados são armazenados de forma segura e seguem as diretrizes da Lei Geral de Proteção de Dados (LGPD).
          Isso significa que você tem total controle sobre suas informações, podendo solicitar acesso, correção ou exclusão
          sempre que necessário.
        </p>

        <p className="text-gray-400 mb-6 leading-relaxed">
          Ao utilizar o sistema, você concorda com nossos Termos de Uso, que estabelecem regras claras sobre o uso da plataforma,
          responsabilidades do usuário e boas práticas de segurança digital.
        </p>

        <ul className="list-disc ml-6 text-gray-400 space-y-2">
          <li>Proteção e uso responsável dos dados pessoais</li>
          <li>Conformidade com a Lei Geral de Proteção de Dados (LGPD)</li>
          <li>Termos de uso transparentes e acessíveis</li>
        </ul>

      </div>
    </div>
  );
};

export default LGPD;