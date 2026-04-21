import React, { useState } from "react";
import {
  Thermometer,
  Droplets,
  Waves,
  AlertTriangle,
  Activity,
  Sprout,
  ShieldCheck,
} from "lucide-react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

type AlertType = "warning" | "danger" | "info";
type Periodo = "hoje" | "7dias" | "30dias";

interface AlertItem {
  id: number;
  title: string;
  description: string;
  type: AlertType;
  time: string;
}

interface SensorSummary {
  temperatura: number;
  umidadeAr: number;
  umidadeSolo: number;
  vazao: number;
  statusIrrigacao: "Ativa" | "Inativa";
}

const sensorSummary: SensorSummary = {
  temperatura: 29,
  umidadeAr: 61,
  umidadeSolo: 34,
  vazao: 18,
  statusIrrigacao: "Ativa",
};

const periodData: Record<
  Periodo,
  { hora: string; temperatura: number; umidadeAr: number; umidadeSolo: number; vazao: number }[]
> = {
  hoje: [
    { hora: "08:00", temperatura: 24, umidadeAr: 72, umidadeSolo: 45, vazao: 10 },
    { hora: "10:00", temperatura: 26, umidadeAr: 68, umidadeSolo: 42, vazao: 12 },
    { hora: "12:00", temperatura: 29, umidadeAr: 61, umidadeSolo: 38, vazao: 15 },
    { hora: "14:00", temperatura: 31, umidadeAr: 58, umidadeSolo: 35, vazao: 18 },
    { hora: "16:00", temperatura: 30, umidadeAr: 60, umidadeSolo: 34, vazao: 17 },
    { hora: "18:00", temperatura: 27, umidadeAr: 66, umidadeSolo: 37, vazao: 11 },
  ],
  "7dias": [
    { hora: "Seg", temperatura: 27, umidadeAr: 65, umidadeSolo: 39, vazao: 14 },
    { hora: "Ter", temperatura: 28, umidadeAr: 63, umidadeSolo: 37, vazao: 15 },
    { hora: "Qua", temperatura: 29, umidadeAr: 61, umidadeSolo: 35, vazao: 18 },
    { hora: "Qui", temperatura: 26, umidadeAr: 69, umidadeSolo: 41, vazao: 12 },
    { hora: "Sex", temperatura: 30, umidadeAr: 59, umidadeSolo: 34, vazao: 17 },
    { hora: "Sáb", temperatura: 31, umidadeAr: 57, umidadeSolo: 33, vazao: 19 },
    { hora: "Dom", temperatura: 28, umidadeAr: 64, umidadeSolo: 38, vazao: 13 },
  ],
  "30dias": [
    { hora: "S1", temperatura: 27, umidadeAr: 66, umidadeSolo: 40, vazao: 13 },
    { hora: "S2", temperatura: 29, umidadeAr: 62, umidadeSolo: 36, vazao: 16 },
    { hora: "S3", temperatura: 30, umidadeAr: 60, umidadeSolo: 34, vazao: 18 },
    { hora: "S4", temperatura: 28, umidadeAr: 64, umidadeSolo: 39, vazao: 14 },
  ],
};

const alerts: AlertItem[] = [
  {
    id: 1,
    title: "Umidade do solo baixa",
    description: "O solo está abaixo do nível ideal para irrigação eficiente.",
    type: "warning",
    time: "há 5 min",
  },
  {
    id: 2,
    title: "Temperatura elevada",
    description: "A temperatura passou do limite configurado para o setor 2.",
    type: "danger",
    time: "há 12 min",
  },
  {
    id: 3,
    title: "Sistema operando normalmente",
    description: "A vazão atual está dentro do intervalo esperado.",
    type: "info",
    time: "agora",
  },
];

const getAlertStyle = (type: AlertType) => {
  switch (type) {
    case "danger":
      return "border-red-500/20 bg-red-500/10";
    case "warning":
      return "border-yellow-500/20 bg-yellow-500/10";
    default:
      return "border-cyan-500/20 bg-cyan-500/10";
  }
};

const getAlertBadge = (type: AlertType) => {
  switch (type) {
    case "danger":
      return "text-red-300 bg-red-500/10 border-red-500/20";
    case "warning":
      return "text-yellow-300 bg-yellow-500/10 border-yellow-500/20";
    default:
      return "text-cyan-300 bg-cyan-500/10 border-cyan-500/20";
  }
};

const getPeriodoButtonClass = (ativo: boolean) =>
  `px-3 py-2 rounded-xl text-sm font-medium transition-all border ${
    ativo
      ? "bg-cyan-500/15 text-cyan-300 border-cyan-400/30"
      : "bg-white/5 text-gray-400 border-white/10 hover:text-white hover:bg-white/10"
  }`;

const StatCard = ({
  title,
  value,
  unit,
  icon,
}: {
  title: string;
  value: number | string;
  unit?: string;
  icon: React.ReactNode;
}) => {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-5 shadow-lg transition-all duration-300 hover:bg-white/[0.07] hover:border-white/15">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm text-gray-400">{title}</p>
          <h3 className="text-3xl font-bold text-white mt-2">
            {value}
            {unit && <span className="text-lg text-gray-400 ml-1">{unit}</span>}
          </h3>
        </div>
        <div className="text-cyan-400">{icon}</div>
      </div>
    </div>
  );
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload || !payload.length) return null;

  return (
    <div className="rounded-xl border border-white/10 bg-[#11161d] px-4 py-3 shadow-xl">
      <p className="text-sm text-white font-medium mb-2">{label}</p>
      <div className="space-y-1">
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-xs text-gray-300">
            {entry.name}: <span className="text-white font-semibold">{entry.value}</span>
          </p>
        ))}
      </div>
    </div>
  );
};

const Monitoramento: React.FC = () => {
  const [periodo, setPeriodo] = useState<Periodo>("hoje");
  const chartData = periodData[periodo];

  return (
    <section className="text-white">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-cyan-400/80 mb-2">
              Painel de monitoramento
            </p>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight">
              Visão geral do sistema
            </h1>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 min-w-[220px]">
            <div className="flex items-center gap-3">
              <div
                className={`h-3 w-3 rounded-full ${
                  sensorSummary.statusIrrigacao === "Ativa"
                    ? "bg-green-400 shadow-[0_0_12px_rgba(74,222,128,0.7)]"
                    : "bg-red-400 shadow-[0_0_12px_rgba(248,113,113,0.7)]"
                }`}
              />
              <div>
                <p className="text-xs text-gray-400">Status da irrigação</p>
                <p
                  className={`font-semibold ${
                    sensorSummary.statusIrrigacao === "Ativa"
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {sensorSummary.statusIrrigacao}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          <StatCard
            title="Temperatura"
            value={sensorSummary.temperatura}
            unit="°C"
            icon={<Thermometer size={28} />}
          />
          <StatCard
            title="Umidade do Ar"
            value={sensorSummary.umidadeAr}
            unit="%"
            icon={<Droplets size={28} />}
          />
          <StatCard
            title="Umidade do Solo"
            value={sensorSummary.umidadeSolo}
            unit="%"
            icon={<Sprout size={28} />}
          />
          <StatCard
            title="Vazão"
            value={sensorSummary.vazao}
            unit="L/min"
            icon={<Waves size={28} />}
          />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2 rounded-2xl border border-white/10 bg-white/5 p-5 md:p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
              <div className="flex items-center gap-2">
                <Activity className="text-cyan-400" size={20} />
                <h2 className="text-lg md:text-xl font-bold">
                  Temperatura x Umidade do Ar
                </h2>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setPeriodo("hoje")}
                  className={getPeriodoButtonClass(periodo === "hoje")}
                >
                  Hoje
                </button>
                <button
                  type="button"
                  onClick={() => setPeriodo("7dias")}
                  className={getPeriodoButtonClass(periodo === "7dias")}
                >
                  7 dias
                </button>
                <button
                  type="button"
                  onClick={() => setPeriodo("30dias")}
                  className={getPeriodoButtonClass(periodo === "30dias")}
                >
                  30 dias
                </button>
              </div>
            </div>

            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2a2f37" />
                  <XAxis dataKey="hora" stroke="#9ca3af" tickLine={false} axisLine={false} />
                  <YAxis stroke="#9ca3af" tickLine={false} axisLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="temperatura"
                    name="Temperatura"
                    stroke="#22d3ee"
                    strokeWidth={3}
                    dot={{ r: 3 }}
                    activeDot={{ r: 5 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="umidadeAr"
                    name="Umidade do Ar"
                    stroke="#a78bfa"
                    strokeWidth={3}
                    dot={{ r: 3 }}
                    activeDot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 md:p-6">
            <div className="flex items-center gap-2 mb-6">
              <AlertTriangle className="text-yellow-400" size={20} />
              <h2 className="text-lg md:text-xl font-bold">Alertas recentes</h2>
            </div>

            <div className="space-y-4">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`rounded-2xl border p-4 transition-all ${getAlertStyle(alert.type)}`}
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h3 className="font-semibold text-white">{alert.title}</h3>
                    <span className="text-xs text-gray-400 whitespace-nowrap">
                      {alert.time}
                    </span>
                  </div>

                  <p className="text-sm text-gray-300 leading-relaxed mb-3">
                    {alert.description}
                  </p>

                  <span
                    className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${getAlertBadge(
                      alert.type
                    )}`}
                  >
                    {alert.type === "danger"
                      ? "Crítico"
                      : alert.type === "warning"
                      ? "Atenção"
                      : "Informativo"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 md:p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg md:text-xl font-bold">Umidade do Solo</h2>
              <span className="text-xs text-gray-400">
                {periodo === "hoje"
                  ? "Média diária"
                  : periodo === "7dias"
                  ? "Últimos 7 dias"
                  : "Últimos 30 dias"}
              </span>
            </div>

            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2a2f37" />
                  <XAxis dataKey="hora" stroke="#9ca3af" tickLine={false} axisLine={false} />
                  <YAxis stroke="#9ca3af" tickLine={false} axisLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="umidadeSolo"
                    name="Umidade do Solo"
                    stroke="#34d399"
                    fill="#34d39922"
                    strokeWidth={3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 md:p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg md:text-xl font-bold">Vazão por horário</h2>
              <span className="text-xs text-gray-400">
                {periodo === "hoje"
                  ? "Fluxo atual"
                  : periodo === "7dias"
                  ? "Fluxo semanal"
                  : "Fluxo mensal"}
              </span>
            </div>

            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2a2f37" />
                  <XAxis dataKey="hora" stroke="#9ca3af" tickLine={false} axisLine={false} />
                  <YAxis stroke="#9ca3af" tickLine={false} axisLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="vazao" name="Vazão" fill="#f59e0b" radius={[10, 10, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-white/[0.04] to-white/[0.02] p-5 md:p-6">
          <div className="flex items-start gap-3">
            <ShieldCheck className="text-cyan-400 mt-0.5" size={20} />
            <div>
              <h3 className="text-lg font-semibold">Resumo operacional</h3>
              <p className="text-sm text-gray-400 mt-2 leading-relaxed">
                O sistema segue operando com irrigação ativa, vazão dentro do esperado
                e alerta moderado relacionado à umidade do solo. Recomenda-se atenção
                ao setor com temperatura elevada nas próximas horas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Monitoramento;