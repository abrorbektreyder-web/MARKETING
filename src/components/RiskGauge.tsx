'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { RiskLevel } from '@/lib/utils'

interface RiskGaugeProps {
    level: RiskLevel
}

export default function RiskGauge({ level }: RiskGaugeProps) {
    const config = {
        L: { color: '#10b981', label: 'Ideal', angle: -60, text: 'Biznesingiz sog\'lom, lekin o\'sish uchun joy bor' },
        M: { color: '#f59e0b', label: 'O\'rtacha', angle: 0, text: 'Siz pul yo\'qotyapsiz, tizimlashtirish zarur' },
        H: { color: '#ef4444', label: 'Yuqori Xavf', angle: 60, text: 'Kritik holat: Pul tom ma\'noda yonmoqda!' },
    }

    const current = config[level]

    return (
        <div className="flex flex-col items-center justify-center space-y-4">
            <div className="relative w-48 h-24 overflow-hidden">
                {/* Background Gauge */}
                <svg viewBox="0 0 100 50" className="w-full h-full">
                    <path
                        d="M 10 50 A 40 40 0 0 1 90 50"
                        fill="none"
                        stroke="#ffffff10"
                        strokeWidth="8"
                        strokeLinecap="round"
                    />
                    {/* Colored Sections */}
                    <path
                        d="M 10 50 A 40 40 0 0 1 36.6 20"
                        fill="none"
                        stroke="#ef444430"
                        strokeWidth="8"
                    />
                    <path
                        d="M 36.6 20 A 40 40 0 0 1 63.3 20"
                        fill="none"
                        stroke="#f59e0b30"
                        strokeWidth="8"
                    />
                    <path
                        d="M 63.3 20 A 40 40 0 0 1 90 50"
                        fill="none"
                        stroke="#10b98130"
                        strokeWidth="8"
                    />

                    {/* Active Track */}
                    <motion.path
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        d="M 10 50 A 40 40 0 0 1 90 50"
                        fill="none"
                        stroke={current.color}
                        strokeWidth="8"
                        strokeLinecap="round"
                        style={{
                            clipPath: `inset(0 ${50 - (current.angle + 90) / 1.8}% 0 0)`
                        }}
                    />
                </svg>

                {/* Needle */}
                <motion.div
                    initial={{ rotate: -90 }}
                    animate={{ rotate: current.angle }}
                    transition={{ duration: 1.5, type: 'spring', damping: 10 }}
                    className="absolute bottom-0 left-1/2 -ml-0.5 w-1 h-20 origin-bottom"
                >
                    <div className="w-full h-full bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
                    <div className="absolute bottom-0 left-1/2 -ml-2 w-4 h-4 bg-white rounded-full border-4 border-bg-primary shadow-lg" />
                </motion.div>
            </div>

            <div className="text-center space-y-1">
                <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-2xl font-black uppercase tracking-tighter"
                    style={{ color: current.color }}
                >
                    {current.label}
                </motion.div>
                <p className="text-xs text-gray-500 max-w-[200px] mx-auto font-medium leading-relaxed">
                    {current.text}
                </p>
            </div>
        </div>
    )
}
