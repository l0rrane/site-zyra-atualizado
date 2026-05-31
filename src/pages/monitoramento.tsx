import React,
{
  useEffect,
  useState,
} from "react";

import {
  Thermometer,
  Droplets,
  Waves,
  Sprout,
  ShieldCheck,
  Clock3,
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
} from "recharts";

import { auth }
from "../firebase";

import {
  getDatabase,
  ref,
  onValue,
} from "firebase/database";

// ======================

const db =
  getDatabase();

// ======================

interface ChartItem {

  hora: string;

  temperatura: number;

  umidadeAr: number;

  umidadeSolo: number;

  vazao: number;
}

// ======================

const formatarHora =
(
  valor: string
) => {

  if (!valor)
    return "--:--";

  try {

    const [
      ,
      hora
    ] =
      valor.split("T");

    return hora
      ?.slice(
        0,
        5
      ) || "--:--";

  } catch {

    return "--:--";
  }
};

// ======================

const Card = ({
  title,
  value,
  unit,
  icon,
}: any) => (

  <div className="rounded-3xl border border-white/10 bg-[#0b1320] p-5 shadow-lg hover:border-cyan-400/30 transition">

    <div className="flex justify-between items-center">

      <div>

        <p className="text-sm text-gray-400">
          {title}
        </p>

        <h2 className="text-3xl font-bold mt-2 text-white">

          {value}

          <span className="text-base text-gray-400 ml-1">
            {unit}
          </span>

        </h2>

      </div>

      <div className="text-cyan-400">
        {icon}
      </div>

    </div>

  </div>
);

// ======================

const TooltipCustom =
({
  active,
  payload,
  label,
}: any) => {

  if (
    !active ||
    !payload
  )
    return null;

  return (

    <div className="bg-[#08111c] border border-white/10 rounded-2xl p-4 shadow-xl">

      <p className="text-white font-semibold mb-3">
        {label}
      </p>

      {payload.map(
        (
          item: any,
          i: number
        ) => (

          <p
            key={i}
            className="text-sm text-gray-300"
          >

            {item.name}:{" "}

            <span className="text-white font-semibold">

              {item.value}

            </span>

          </p>
        )
      )}

    </div>
  );
};

// ======================

const Monitoramento =
() => {

  const [
    atual,
    setAtual,
  ] =
    useState<any>(
      {}
    );

  const [
    chartData,
    setChartData,
  ] =
    useState<
      ChartItem[]
    >([]);

// ======================

  useEffect(() => {

    const user =
      auth.currentUser;

    if (!user)
      return;

    const atualRef =
      ref(
        db,
        `usuarios/${user.uid}/sensores/atual`
      );

    const historicoRef =
      ref(
        db,
        `usuarios/${user.uid}/sensores/historico`
      );

    onValue(
      atualRef,
      (
        snapshot
      ) => {

        const data =
          snapshot.val();

        if (!data)
          return;

        setAtual(
          data
        );
      }
    );

    onValue(
      historicoRef,
      (
        snapshot
      ) => {

        const data =
          snapshot.val();

        if (!data)
          return;

        const lista =
          Object
            .values(
              data
            )

            .sort(
              (
                a: any,
                b: any
              ) =>

                String(
                  a.hora
                ).localeCompare(
                  String(
                    b.hora
                  )
                )
            )

            .slice(-12)

            .map(
              (
                item: any
              ) => ({

                hora:
                  formatarHora(
                    item.hora
                  ),

                temperatura:
                  item.temperatura || 0,

                umidadeAr:
                  item.umidadeAr || 0,

                umidadeSolo:
                  item.umidadeSolo || 0,

                vazao:
                  item.vazao || 0,
              })
            );

        setChartData(
          lista
        );
      }
    );

  }, []);

// ======================

  return (

    <section className="text-white space-y-8">

      {/* topo */}

      <div>

        <p className="text-cyan-400 uppercase tracking-[0.25em] text-sm">

          Zyra Dashboard

        </p>

        <h1 className="text-3xl font-black mt-2">

          Monitoramento Inteligente

        </h1>

      </div>

      {/* cards */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

        <Card
          title="Temperatura"
          value={atual.temperatura || 0}
          unit="°C"
          icon={<Thermometer />}
        />

        <Card
          title="Umidade Ar"
          value={atual.umidadeAr || 0}
          unit="%"
          icon={<Droplets />}
        />

        <Card
          title="Solo"
          value={atual.umidadeSolo || 0}
          unit="%"
          icon={<Sprout />}
        />

        <Card
          title="Vazão"
          value={atual.vazao || 0}
          unit="L/min"
          icon={<Waves />}
        />

      </div>

      {/* charts */}

      <div className="grid xl:grid-cols-2 gap-6">

        <div className="rounded-3xl bg-[#08111c] border border-white/10 p-6">

          <h2 className="font-semibold mb-5">

            Temperatura x Umidade

          </h2>

          <ResponsiveContainer
            width="100%"
            height={320}
          >

            <LineChart
              data={chartData}
            >

              <CartesianGrid
                stroke="#1f2937"
              />

              <XAxis
                dataKey="hora"
              />

              <YAxis />

              <Tooltip
                content={
                  <TooltipCustom />
                }
              />

              <Line
                name="Temperatura"
                dataKey="temperatura"
                stroke="#22d3ee"
                strokeWidth={3}
                dot={false}
              />

              <Line
                name="Umidade"
                dataKey="umidadeAr"
                stroke="#8b5cf6"
                strokeWidth={3}
                dot={false}
              />

            </LineChart>

          </ResponsiveContainer>

        </div>

        <div className="rounded-3xl bg-[#08111c] border border-white/10 p-6">

          <h2 className="font-semibold mb-5">

            Umidade do Solo

          </h2>

          <ResponsiveContainer
            width="100%"
            height={320}
          >

            <AreaChart
              data={chartData}
            >

              <CartesianGrid
                stroke="#1f2937"
              />

              <XAxis
                dataKey="hora"
              />

              <YAxis />

              <Tooltip
                content={
                  <TooltipCustom />
                }
              />

              <Area
                dataKey="umidadeSolo"
                stroke="#22c55e"
                fill="#22c55e22"
                strokeWidth={3}
              />

            </AreaChart>

          </ResponsiveContainer>

        </div>

      </div>

      {/* histórico */}

      <div className="rounded-3xl bg-[#08111c] border border-white/10 p-6">

        <div className="flex items-center gap-2 mb-5">

          <Clock3
            size={18}
            className="text-cyan-400"
          />

          <h2 className="font-semibold">

            Últimas leituras

          </h2>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full text-sm">

            <thead>

              <tr className="text-gray-400 border-b border-white/10">

                <th className="text-left py-3">
                  Hora
                </th>

                <th>
                  Temp
                </th>

                <th>
                  Ar
                </th>

                <th>
                  Solo
                </th>

                <th>
                  Vazão
                </th>

              </tr>

            </thead>

            <tbody>

              {chartData
                .slice()
                .reverse()
                .map(
                  (
                    item,
                    index
                  ) => (

                    <tr
                      key={index}
                      className="border-b border-white/5 text-center"
                    >

                      <td className="text-left py-3">
                        {item.hora}
                      </td>

                      <td>
                        {item.temperatura}°C
                      </td>

                      <td>
                        {item.umidadeAr}%
                      </td>

                      <td>
                        {item.umidadeSolo}%
                      </td>

                      <td>
                        {item.vazao}
                      </td>

                    </tr>
                  )
                )}

            </tbody>

          </table>

        </div>

      </div>

      {/* resumo */}

      <div className="rounded-3xl bg-[#08111c] border border-white/10 p-6">

        <div className="flex gap-3">

          <ShieldCheck className="text-cyan-400" />

          <p className="text-gray-300">

            Sistema sincronizado com ESP32
            + Firebase.
            Leituras automáticas a cada
            10 minutos e histórico salvo
            em tempo real.

          </p>

        </div>

      </div>

    </section>
  );
};

export default
Monitoramento;