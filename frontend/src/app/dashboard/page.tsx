// app/page.tsx  (main dashboard page)
"use client";

import { useEffect, useState } from "react";
import {
  BarChart3,
  Download,
  LogOut,
  Settings,
  ShieldCheck,
  Users,
  Wallet,
} from "lucide-react";
import { backendApi } from "@/lib/api";
import { ApiResponse, DashboardStats } from "@/types/api.types";
import { useRequest } from "alova/client";
import { formatRupiah } from "@/lib/helper";
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from "recharts";

const getDashboardStats = () => backendApi.Get<ApiResponse<DashboardStats>>("/admin/dashboard/stats", {});

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const {
    loading: statsLoading,
    data: statsData,
    error: statsError,
  } = useRequest(getDashboardStats, {
    immediate: true
  });

  const sidebar = [
    { icon: BarChart3, label: "Dashboard", active: true },
    { icon: Wallet, label: "Deposit" },
    { icon: Download, label: "Withdraw" },
    { icon: Users, label: "Member" },
    { icon: ShieldCheck, label: "Verification (KYC)" },
    { icon: ShieldCheck, label: "Reset 2FA Request" },
    { icon: BarChart3, label: "Daily Report" },
    { icon: Settings, label: "Setting" },
  ]

  const cards = [
    {
      title: "Total Deposit",
      value: 0,
      sub: "0 Deposit(s)",
      icon: Wallet,
    },
    {
      title: "Total Withdraw",
      value: 0,
      sub: "0 Withdraw(s)",
      icon: Download,
    },
    {
      title: "Total Verified KYC",
      value: 0,
      icon: ShieldCheck,
    },
    {
      title: "Total Registration",
      value: 0,
      icon: Users,
    },
  ]

  return (
    <div className="flex min-h-screen bg-[#0a0a12]">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-[#111827] border-r border-gray-800 transition-transform duration-300 lg:translate-x-0 lg:static lg:inset-auto ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-gray-800 px-5">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-full bg-linear-to-br from-amber-400 to-amber-600 flex items-center justify-center font-bold text-black">
              C
            </div>
            <span className="text-lg font-semibold tracking-tight">CKC</span>
          </div>
          <button
            className="lg:hidden text-gray-400 hover:text-white"
            onClick={() => setSidebarOpen(false)}
          >
            <LogOut size={20} />
          </button>
        </div>

        <nav className="p-4 space-y-1">
          {sidebar.map((item, i) => (
            <a
              key={i}
              href="#"
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                item.active
                  ? "bg-amber-500/20 text-amber-400"
                  : "text-gray-300 hover:bg-gray-800/60 hover:text-white"
              }`}
            >
              <item.icon size={20} />
              {item.label}
            </a>
          ))}
        </nav>

        <div className="absolute bottom-6 left-4 right-4">
          <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-600/80 py-2.5 text-sm font-medium hover:bg-red-600 transition">
            <LogOut size={18} />
            Keluar
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Mobile header */}
        <header className="lg:hidden flex items-center justify-between bg-[#111827] border-b border-gray-800 px-4 py-3">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-full bg-linear-to-br from-amber-400 to-amber-600 flex items-center justify-center font-bold text-black">
              C
            </div>
            <span className="font-semibold">CKC</span>
          </div>
          <button onClick={() => setSidebarOpen(true)}>
            <BarChart3 size={24} />
          </button>
        </header>

        {/* Content area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Welcome + Filter */}
            <div className="bg-linear-to-br from-gray-900 to-black border border-gray-800 rounded-xl p-5 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold">
                    Welcome John Doe
                  </h1>
                  <p className="text-gray-400 mt-1">
                    How are you today...
                  </p>
                </div>

                <div className="flex items-center gap-3 self-start sm:self-center">
                  <span className="text-sm text-gray-400 whitespace-nowrap">
                    Filter By Year:
                  </span>
                  {/* <select className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-amber-500">
                    <option>Januari</option>
                    <option>Februari</option>
                    <option>Maret</option>
                  </select> */}
                  <select className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-amber-500">
                    <option>2023</option>
                    <option>2024</option>
                    <option>2025</option>
                    <option>2026</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Chart */}
                <div className="bg-[#0d111b] rounded-xl p-5 border border-gray-800 flex flex-col space-y-6">
                  <h3 className="text-lg font-semibold mb-4">Bar Chart</h3>
                  <div className="h-64 flex items-end justify-between gap-2">
                    {statsData &&
                      <BarChart
                        style={{ width: '100%', height: '100%' }}
                        responsive
                        data={statsData.data.sales_list}
                        margin={{
                          top: 5,
                          right: 0,
                          left: 0,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip labelStyle={{ color: 'black' }} />
                        <YAxis width="auto" />
                        <XAxis dataKey="month" hide/>
                        <Bar dataKey="total_sales" fill="#5dc887" radius={[10, 10, 0, 0]} />
                      </BarChart>
                    }
                  </div>
                </div>

                {/* Stats cards */}

                {statsData &&
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div
                      className="bg-[#0d111b] rounded-xl p-5 border border-gray-800 flex flex-col items-center justify-center text-center"
                    >
                      <Wallet size={32} className="text-emerald-400 mb-3" />
                      <h4 className="font-semibold">Total Deposit</h4>
                      {statsData.data.total_deposit_value && (
                        <p className="text-2xl font-bold mt-2">{formatRupiah(statsData.data.total_deposit_value)}</p>
                      )}
                      <p className="text-sm text-gray-400 mt-1">{statsData.data.total_deposit ?? 0} Deposits</p>
                    </div>
                    <div
                      className="bg-[#0d111b] rounded-xl p-5 border border-gray-800 flex flex-col items-center justify-center text-center"
                    >
                      <Download size={32} className="text-emerald-400 mb-3" />
                      <h4 className="font-semibold">Total Withdraw</h4>
                      {statsData.data.total_withdraw_value && (
                        <p className="text-2xl font-bold mt-2">{formatRupiah(statsData.data.total_withdraw_value)}</p>
                      )}
                      <p className="text-sm text-gray-400 mt-1">{statsData.data.total_withdraw ?? 0} Withdraws</p>
                    </div>
                    <div
                      className="bg-[#0d111b] rounded-xl p-5 border border-gray-800 flex flex-col items-center justify-center text-center"
                    >
                      <ShieldCheck size={32} className="text-emerald-400 mb-3" />
                      <h4 className="font-semibold">Total Verified KYC</h4>
                      <p className="text-2xl font-bold mt-2">{statsData.data.total_verified_kyc ?? 0} Verified</p>
                    </div>
                    <div
                      className="bg-[#0d111b] rounded-xl p-5 border border-gray-800 flex flex-col items-center justify-center text-center"
                    >
                      <Users size={32} className="text-emerald-400 mb-3" />
                      <h4 className="font-semibold">Total Registration</h4>
                      <p className="text-2xl font-bold mt-2">{statsData.data.total_registration ?? 0} Users</p>
                    </div>
                  </div>
                }
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}