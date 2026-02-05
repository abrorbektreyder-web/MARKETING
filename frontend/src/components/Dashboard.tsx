'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import {
    CheckCircle,
    AlertTriangle,
    ArrowRight,
    ArrowLeft,
    TrendingUp,
    DollarSign,
    Users,
    Target,
    Zap
} from 'lucide-react'
import { calculateAuditResults, AuditResults } from '@/lib/utils'
import RiskGauge from './RiskGauge'

export default function Dashboard() {
    const [results, setResults] = useState<AuditResults | null>(null)
    const router = useRouter()

    useEffect(() => {
        const stored = sessionStorage.getItem('audit_answers')
        if (!stored) {
            router.push('/')
            return
        }
        const answers = JSON.parse(stored)
        const computed = calculateAuditResults(answers)
        setResults(computed)
    }, [router])

    if (!results) return (
        <div className="flex items-center justify-center min-h-[60vh]">
            <div className="animate-pulse text-brand-blue font-bold tracking-widest text-xs uppercase">
                Hisob-kitob qilinmoqda...
            </div>
        </div>
    )

    return (
        <div className="space-y-8 py-4 px-4 max-w-4xl mx-auto">
            <div className="flex justify-between items-center">
                <button
                    onClick={() => router.push('/quiz')}
                    className="flex items-center gap-2 text-gray-400 text-xs uppercase font-bold tracking-widest hover:text-white transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" /> Savollarga qaytish
                </button>
                <div className="text-[10px] text-gray-500 uppercase font-black tracking-widest bg-white/5 py-1 px-3 rounded-full border border-white/10">
                    Sizning Auditingiz
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-4 glass-card p-8 flex items-center justify-center">
                    <RiskGauge level={results.risk} />
                </div>

                <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <StatCard
                        label="Yo'qotish (har oy)"
                        value={`$${results.waste.toLocaleString()}`}
                        color="text-brand-red"
                        description="Siz bu pulni tom ma'noda havoga uchiryapsiz"
                        icon={<AlertTriangle className="w-6 h-6" />}
                    />
                    <StatCard
                        label="O'sish salohiyati"
                        value={`+$${results.gain.toLocaleString()}`}
                        color="text-brand-green"
                        description="Tizim o'rnatilgandan so'ng erishish mumkin bo'lgan o'sish"
                        icon={<TrendingUp className="w-6 h-6" />}
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <MiniMetric label="Maqsad" value={`$${results.goal.toLocaleString()}`} icon={<Target className="w-4 h-4 text-brand-blue" />} />
                <MiniMetric label="Mijozlar" value={results.clients} icon={<Users className="w-4 h-4 text-brand-blue" />} />
                <MiniMetric label="Lidlar" value={results.leads} icon={<Zap className="w-4 h-4 text-brand-blue" />} />
                <MiniMetric label="Ideal Byudjet" value={`$${results.ideal.toLocaleString()}`} icon={<DollarSign className="w-4 h-4 text-brand-blue" />} />
            </div>

            <div className="space-y-4">
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Ekspert Tavsiyalari:</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {results.reasons.length > 0 ? results.reasons.map((reason, i) => (
                        <div key={i} className="glass-card p-4 border-l-4 border-brand-blue/30 bg-white/[0.02]">
                            <div className="flex items-start gap-3">
                                <div className="p-1.5 rounded-lg bg-brand-blue/10 border border-brand-blue/20">
                                    <CheckCircle className="w-4 h-4 text-brand-blue" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-gray-200">{reason}</p>
                                    <p className="text-[10px] text-gray-500 mt-1 font-medium">Buni tuzatish o&apos;sishga olib keladi</p>
                                </div>
                            </div>
                        </div>
                    )) : (
                        <div className="col-span-full glass-card p-6 text-center text-gray-400 font-bold italic text-sm">
                            Sizda barcha asosiy jarayonlar to&apos;g&apos;ri yo&apos;lga qo&apos;yilgan!
                        </div>
                    )}
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center p-10 glass-card bg-gradient-to-br from-brand-blue/10 to-transparent border-brand-blue/20"
            >
                <div className="inline-flex p-3 rounded-2xl bg-brand-blue/10 border border-brand-blue/20 mb-4">
                    <TrendingUp className="w-8 h-8 text-brand-blue" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold mb-2 tracking-tight">O&apos;sishni boshlash vaqti keldi</h2>
                <p className="text-sm text-gray-400 mb-8 max-w-md mx-auto font-medium">
                    Siz uchun maxsus ishlab chiqilgan individual strategiyani bepul yuklab oling va mutaxassis bilan maslahatga yoziling.
                </p>
                <button
                    onClick={() => window.open('https://t.me/yourusername', '_blank')}
                    className="btn-primary w-full max-w-[280px] mx-auto flex items-center justify-center gap-3 py-4 shadow-[0_10px_30px_rgba(59,130,246,0.3)]"
                >
                    Strategiyamni Olish <ArrowRight className="w-5 h-5" />
                </button>
            </motion.div>
        </div>
    )
}

function StatCard({ label, value, color, icon, description }: { label: string, value: string, color: string, icon: React.ReactNode, description: string }) {
    return (
        <div className="glass-card p-6 relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity">
                {icon}
            </div>
            <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 rounded-xl bg-white/5 border border-white/10 ${color}`}>
                    {icon}
                </div>
                <div className="text-xs uppercase tracking-widest text-gray-500 font-black">{label}</div>
            </div>
            <div className={`text-3xl md:text-4xl font-black tracking-tighter ${color} mb-2`}>{value}</div>
            <p className="text-[10px] text-gray-500 font-bold leading-relaxed">{description}</p>
        </div>
    )
}

function MiniMetric({ label, value, icon }: { label: string, value: string | number, icon: React.ReactNode }) {
    return (
        <div className="glass-card p-4 flex flex-col items-center text-center bg-white/[0.01]">
            <div className="p-2 rounded-lg bg-brand-blue/5 border border-brand-blue/10 mb-2">
                {icon}
            </div>
            <div className="text-lg font-black tracking-tight">{value}</div>
            <div className="text-[8px] uppercase tracking-widest text-gray-500 font-black mt-1">{label}</div>
        </div>
    )
}
