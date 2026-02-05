'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Zap, Shield, Clock, TrendingUp } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-8 md:space-y-10 py-10 md:py-16 px-4 max-w-3xl mx-auto">
      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-3 py-1 rounded-full border border-brand-blue/30 bg-brand-blue/10 text-brand-blue text-[10px] font-bold tracking-widest uppercase"
      >
        Strategy • Growth • Audit
      </motion.div>

      {/* Main Headline - Significant reduction */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-4"
      >
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
          Biznesingiz qayerda <span className="text-brand-red">pul yo'qotayotganini</span> bilasizmi?
        </h1>
        <p className="max-w-lg mx-auto text-gray-400 text-sm md:text-base leading-relaxed">
          2 daqiqalik auditdan o'ting va biznesingizdagi "teshik"larni toping. 1x-2x o'sish rejasini taqdim etamiz.
        </p>
      </motion.div>

      {/* CTA Button */}
      <Link href="/quiz">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn-primary flex items-center gap-2"
        >
          Auditni Boshlash
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </Link>

      {/* Trust Items - Smaller scale */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-10 border-t border-white/5 w-full">
        <TrustItem icon={<Zap className="w-4 h-4" />} value="50+" label="Auditlar" />
        <TrustItem icon={<Shield className="w-4 h-4" />} value="UZB" label="Bozori" />
        <TrustItem icon={<TrendingUp className="w-4 h-4" />} value="100%" label="Aniq" />
        <TrustItem icon={<Clock className="w-4 h-4" />} value="2min" label="Tezkor" />
      </div>
    </div>
  )
}

function TrustItem({ icon, value, label }: any) {
  return (
    <div className="flex flex-col items-center gap-1 opacity-70 hover:opacity-100 transition-opacity">
      <div className="text-brand-blue mb-1">{icon}</div>
      <span className="text-lg font-bold">{value}</span>
      <span className="text-[9px] uppercase tracking-widest text-gray-500 font-bold">{label}</span>
    </div>
  )
}
