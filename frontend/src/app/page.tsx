'use client';

// app/page.tsx
import type { Metadata } from "next";
import { useState } from "react";
import Image from "next/image";
import { Area, AreaChart } from "recharts";
import InvestImg from "~/invest.svg";
// import "./globals.css";

const metadata: Metadata = {
  title: "Invest — Pasar Kripto Indonesia",
  description: "Harga kripto dalam Rupiah hari ini",
};

const exchangeBase = ["IDR", "USD", "BNB", "BTC", "ALTS"];

const bearChartsData = [
  { name: "Jan", uv: 400 },
  { name: "Feb", uv: 300 },
  { name: "Mar", uv: 200 },
  { name: "Apr", uv: 228 },
  { name: "May", uv: 189 },
  { name: "Jun", uv: 229 },
  { name: "Jul", uv: 248 },
]

const bullChartsData = [
  { name: "Jan", uv: 249 },
  { name: "Feb", uv: 259 },
  { name: "Mar", uv: 289 },
  { name: "Apr", uv: 378 },
  { name: "May", uv: 320 },
  { name: "Jun", uv: 350 },
  { name: "Jul", uv: 400 },
]

export default function Home() {
  const [currencyState, setCurrencyState] = useState<string>("IDR");

  return (
    <div className="min-h-screen bg-[#0f0f17] text-white font-sans">
      {/* Header / Navbar */}
      <header className="border-b border-gray-800/60 bg-[#0a0a12]/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-16">
              <div className="flex flex-row items-center space-x-4">
                <Image src={InvestImg} width={48} height={48} alt="Invest" />
              </div>
              <nav className="hidden md:flex items-center gap-8">
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Pasar
                </a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Tentang Kami
                </a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Kontak Kami
                </a>
              </nav>
            </div>


            <div className="flex items-center gap-3">
              <button className="hidden sm:block px-4 py-1.5 rounded-full border border-amber-500/40 text-amber-400 text-sm font-medium hover:bg-amber-950/30 transition">
                SIGN IN
              </button>
              <button className="px-5 py-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 font-medium text-sm shadow-lg shadow-amber-900/30 hover:brightness-110 transition">
                SIGN UP
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Global stats bar */}
        {/* <div className="mb-10 rounded-xl bg-gradient-to-r from-gray-900/80 to-black/60 p-5 border border-gray-800/50">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-gray-400 text-sm">Pasar dalam Rupiah Hari ini</p>
              <div className="flex items-baseline gap-3 mt-1">
                <span className="text-3xl font-bold tracking-tight">Rp 5,261.3</span>
                <span className="text-red-500 text-xl font-medium">-3.82%</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-gray-400 text-sm">Volume 24 jam</p>
              <p className="text-lg font-medium">Rp 2,261 IDR</p>
            </div>
          </div>
        </div> */}

        <h1 className="text-3xl font-bold mb-2">Pasar</h1>
        <p className="text-gray-400 mb-8">
          Harga Kripto dalam Rupiah Hari ini di Market Terbesar Indonesia
        </p>

        {/* Mini charts row — mobile scrolls horizontally */}
        <div className="mb-12 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-700">
          <div className="flex gap-4 min-w-max">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="w-72 sm:w-80 bg-[#111827]/70 rounded-xl p-4 border border-gray-800/60 flex flex-col space-y-3"
              >
                <div className="flex flex-row space-x-8">
                  <div className="flex flex-col justify-between">
                    <p className="text-sm flex-1 w-full max-h-fit">TKO/IDR</p>
                    <p className="text-xl font-bold mt-1 flex-1 w-full max-h-fit">Rp5,261.3</p>
                  </div>
                  <div className="max-h-fit w-full">
                    <AreaChart
                      style={{ width: '100%', maxWidth: '600px', maxHeight: '70vh', aspectRatio: 1.618 }}
                      responsive
                      data={i % 2 === 0 ? bullChartsData : bearChartsData}
                      margin={{
                        top: 10
                      }}
                    >
                      <Area
                        type="monotone"
                        dataKey="uv"
                        stroke={i % 2 === 0 ? "#10b981" : "#ef4444"}
                        strokeWidth={3}
                        fill="transparent"
                      />
                    </AreaChart>
                  </div>
                </div>
                <div className="flex flex-row justify-between">
                  <p className={i % 2 === 0 ? "text-[#10b981]" : "text-[#ef4444]"}>{i % 2 === 0 ? "+" : "-"}3.82%</p>
                  <p className="text-gray-400 text-sm">Volume: 2,258 IDR</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Market table section */}
        <div className="bg-[#0d111b] rounded-xl border border-gray-800/60 overflow-hidden">
          <div className="p-5 border-b border-gray-800/60">
            <h2 className="text-xl font-semibold">Favorit</h2>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-800 px-5 overflow-x-auto">
            {exchangeBase.map((tab) => (
              <button
                key={tab}
                className={`px-5 py-3 text-sm font-medium whitespace-nowrap border-b-2 ${
                  tab === currencyState
                    ? "border-amber-500 text-amber-400"
                    : "border-transparent text-gray-400 hover:text-gray-200"
                }`}
                onClick={() => {
                  setCurrencyState(tab);
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-black/40">
                <tr className="text-gray-400 text-left">
                  <th className="px-6 py-4 font-normal">Pasangan</th>
                  <th className="px-6 py-4 font-normal text-right">Harga Terakhir</th>
                  <th className="px-6 py-4 font-normal text-right">Perubahan 24jam</th>
                  <th className="px-6 py-4 font-normal text-right hidden md:table-cell">
                    Tertinggi / Terendah 24jam
                  </th>
                  <th className="px-6 py-4 font-normal text-right hidden lg:table-cell">
                    Kapitalisasi Pasar
                  </th>
                  <th className="px-6 py-4 font-normal text-right">Volume 24 Jam</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/40">
                {Array.from({ length: 6 }).map((_, i) => {
                  const isPositive = i % 3 !== 1;
                  const pair = [`BTC/${currencyState}`, `ETH/${currencyState}`, `XRP/${currencyState}`][i % 3];

                  return (
                    <tr key={i} className="hover:bg-gray-900/40 transition-colors">
                      <td className="px-6 py-4 font-medium flex items-center gap-2">
                        <span className="text-amber-400">★</span>
                        {pair}
                      </td>
                      <td className="px-6 py-4 text-right">
                        98,832.93 <span className="text-gray-500">/</span>{" "}
                        <span className="text-gray-400">Rp1,612,132,81.72</span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className={isPositive ? "text-[#10b981]" : "text-[#ef4444]"}>
                          {isPositive ? "+" : "-"}3.89%
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right text-gray-300 hidden md:table-cell">
                        102,451.34 / Rp94,288.07
                      </td>
                      <td className="px-6 py-4 text-right text-gray-300 hidden lg:table-cell">
                        Rp31,953.008T
                      </td>
                      <td className="px-6 py-4 text-right">1.538M</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}