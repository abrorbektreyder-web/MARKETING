'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Loader2, ArrowRight } from 'lucide-react'

interface LeadGateProps {
    onSubmit: (data: { name: string; phone: string }) => void
    isLoading: boolean
}

export default function LeadGate({ onSubmit, isLoading }: LeadGateProps) {
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!name.trim()) {
            setError('Iltimos, ismingizni kiriting')
            return
        }
        if (phone.replace(/\D/g, '').length < 9) {
            setError("Telefon raqami kamida 9 ta raqam bo'lishi kerak")
            return
        }
        onSubmit({ name, phone: '+998' + phone.replace(/\D/g, '') })
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-sm mx-auto"
        >
            <div className="glass-card p-8 text-center space-y-6">
                <div className="space-y-2">
                    <h2 className="text-2xl font-bold tracking-tight">Natijalar tayyor! 🚀</h2>
                    <p className="text-xs text-gray-400 uppercase tracking-widest font-medium">
                        Strategiyani olish uchun ma&apos;lumotlarni kiriting
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5 text-left">
                    <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-gray-500 uppercase ml-1">Ismingiz</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => { setName(e.target.value); setError('') }}
                            placeholder="Ismingizni yozing..."
                            className="w-full bg-white/5 border border-white/10 rounded-xl p-3.5 text-base focus:border-brand-blue outline-none transition-all focus:ring-1 focus:ring-brand-blue/20"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-gray-500 uppercase ml-1">Telefon</label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-500 font-bold border-r border-white/10 pr-3">+998</span>
                            <input
                                type="tel"
                                value={phone}
                                onChange={(e) => {
                                    setPhone(e.target.value)
                                    setError('')
                                }}
                                placeholder="90 123 45 67"
                                className="w-full bg-white/5 border border-white/10 rounded-xl p-3.5 pl-20 text-base focus:border-brand-blue outline-none transition-all focus:ring-1 focus:ring-brand-blue/20"
                            />
                        </div>
                    </div>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="text-brand-red text-xs text-center font-bold"
                        >
                            {error}
                        </motion.div>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="btn-primary w-full py-4 text-base flex items-center justify-center disabled:opacity-50"
                    >
                        {isLoading ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <>
                                Natijani Ko&apos;rish
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </>
                        )}
                    </button>
                </form>

                <p className="text-[10px] text-gray-500 italic opacity-80">
                    * Ma&apos;lumotlaringiz xavfsizligi kafolatlanadi.
                </p>
            </div>
        </motion.div>
    )
}
