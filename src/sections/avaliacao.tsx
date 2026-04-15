import { useState } from "react";
/*esse ainda nao linkei pq nao sei se e legal, falta ajustes*/
const Avaliacao = () => {
  const [nota, setNota] = useState(0);
  const [hover, setHover] = useState(0);
  const [comentario, setComentario] = useState("");

  const estrelas = [1, 2, 3, 4, 5];

  const enviarAvaliacao = () => {
    const data = {
      nota,
      comentario,
    };

    console.log("Avaliação enviada:", data);

    alert("Obrigado pela sua avaliação!");
    setNota(0);
    setComentario("");
  };

  return (
    <div className="max-w-3xl">
      <h2 className="text-4xl font-black italic mb-8">
        AVALIE <span className="text-purple-500">O SISTEMA</span>
      </h2>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">

        <p className="text-gray-400 mb-6">
          Sua opinião ajuda a melhorar a plataforma.
        </p>

        {/* ESTRELAS */}
        <div className="flex gap-2 mb-6">

          {estrelas.map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setNota(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
              className="text-3xl transition"
            >
              <span
                className={`${
                  (hover || nota) >= star
                    ? "text-yellow-400"
                    : "text-gray-600"
                }`}
              >
                ★
              </span>
            </button>
          ))}

        </div>

        {/* COMENTÁRIO */}
        <textarea
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
          placeholder="Deixe seu comentário..."
          className="w-full h-28 p-4 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-purple-500 transition"
        />

        {/* BOTÃO */}
        <button
          onClick={enviarAvaliacao}
          className="mt-5 bg-gradient-to-r from-purple-500 to-cyan-500 px-6 py-3 rounded-xl font-semibold hover:scale-105 transition"
        >
          Enviar avaliação
        </button>

      </div>
    </div>
  );
};

export default Avaliacao;