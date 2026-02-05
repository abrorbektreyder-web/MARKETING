'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    ChevronRight,
    ChevronLeft,
    Building2,
    Users,
    Target,
    BarChart3,
    DollarSign,
    Megaphone,
    MessageSquare,
    Clock,
    Globe,
    LucideIcon
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import LeadGate from './LeadGate'
import { AuditAnswers } from '@/lib/utils'

interface Question {
    id: string
    text: string
    type: 'boolean' | 'number'
    field: keyof AuditAnswers
    placeholder?: string
    icon: LucideIcon
}

const QUESTIONS: Question[] = [
    { id: 'f1', text: 'Biznes egasimisiz?', type: 'boolean', field: 'is_decision_maker', icon: Building2 },
    { id: 'f2', text: 'CRM tizimi bormi?', type: 'boolean', field: 'has_crm', icon: BarChart3 },
    { id: 'f3', text: 'Sotuv bo\'limi bormi?', type: 'boolean', field: 'has_sales_team', icon: Users },
    { id: 't1', text: 'Oxirgi 30 kunda reklama qildingizmi?', type: 'boolean', field: 'has_recent_ads', icon: Megaphone },
    { id: 't2', text: 'Faol ijtimoiy tarmoq kontentingiz bormi?', type: 'boolean', field: 'has_social_content', icon: Globe },
    { id: 't3', text: 'Mijozlarga 5 daqiqada javob berasizmi?', type: 'boolean', field: 'fast_response', icon: Clock },
    { id: 's1', text: 'Sotuv skriptlaringiz bormi?', type: 'boolean', field: 'has_sales_script', icon: MessageSquare },
    { id: 'm1', text: 'Oylik daromad maqsadingiz ($)', type: 'number', field: 'monthly_revenue_goal', placeholder: '10,000', icon: Target },
    { id: 'm2', text: 'O\'rtacha chekingiz ($)', type: 'number', field: 'average_check', placeholder: '100', icon: DollarSign }
]

export default function AuditQuiz() {
    const [currentStep, setCurrentStep] = useState(0)
    const [answers, setAnswers] = useState<AuditAnswers>({})
    const [isLoading, setIsLoading] = useState(false)
    const [showLeadGate, setShowLeadGate] = useState(false)
    const router = useRouter()

    useEffect(() => {
        sessionStorage.removeItem('audit_answers')
    }, [])

    const handleNext = () => {
        currentStep < QUESTIONS.length - 1 ? setCurrentStep(currentStep + 1) : setShowLeadGate(true)
    }

    const handleBack = () => {
        showLeadGate ? setShowLeadGate(false) : currentStep > 0 && setCurrentStep(currentStep - 1)
    }

    if (showLeadGate) {
        return (
            <div className="max-w-sm mx-auto py-6">
                <button
                    onClick={handleBack}
                    className="text-xs text-gray-500 mb-6 flex items-center uppercase font-bold tracking-widest hover:text-white transition-colors"
                >
                    <ChevronLeft className="w-4 h-4 mr-1" /> Savollarga qaytish
                </button>
                <LeadGate onSubmit={(data) => {
                    setIsLoading(true)
                    sessionStorage.setItem('audit_answers', JSON.stringify({ ...answers, ...data }))
                    setTimeout(() => router.push('/result'), 1200)
                }} isLoading={isLoading} />
            </div>
        )
    }

    const question = QUESTIONS[currentStep]
    const progress = ((currentStep + 1) / QUESTIONS.length) * 100
    const isNextDisabled = question.type === 'boolean'
        ? answers[question.field] === undefined
        : !answers[question.field]

    return (
        <div className="max-w-md mx-auto py-6">
            <div className="mb-10">
                <div className="flex justify-between text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-2 font-bold px-1">
                    <span>Qadam {currentStep + 1} / {QUESTIONS.length}</span>
                    <span>{Math.round(progress)}%</span>
                </div>
                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        className="h-full bg-brand-blue shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                    />
                </div>
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={question.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8 text-center min-h-[300px] flex flex-col justify-center"
                >
                    <div className="w-16 h-16 mx-auto rounded-2xl bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center shadow-inner">
                        <question.icon className="w-8 h-8 text-brand-blue" />
                    </div>

                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight px-2 leading-tight">
                        {question.text}
                    </h2>

                    <div className="pt-4">
                        {question.type === 'boolean' ? (
                            <div className="grid grid-cols-2 gap-4">
                                <MiniBtn
                                    selected={answers[question.field] === true}
                                    onClick={() => {
                                        setAnswers(prev => ({ ...prev, [question.field]: true }))
                                        setTimeout(handleNext, 300)
                                    }}
                                    label="Ha"
                                    color="border-brand-green/40 text-brand-green bg-brand-green/10"
                                />
                                <MiniBtn
                                    selected={answers[question.field] === false}
                                    onClick={() => {
                                        setAnswers(prev => ({ ...prev, [question.field]: false }))
                                        setTimeout(handleNext, 300)
                                    }}
                                    label="Yo'q"
                                    color="border-brand-red/40 text-brand-red bg-brand-red/10"
                                />
                            </div>
                        ) : (
                            <div className="relative max-w-[240px] mx-auto">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-xl font-bold">$</span>
                                <input
                                    type="number"
                                    value={typeof answers[question.field] === 'boolean' ? '' : (answers[question.field] as string | number | undefined) || ''}
                                    onChange={(e) => setAnswers(prev => ({ ...prev, [question.field]: e.target.value }))}
                                    autoFocus
                                    placeholder={question.placeholder}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 pl-10 text-2xl font-bold outline-none focus:border-brand-blue transition-all focus:ring-1 focus:ring-brand-blue/20"
                                />
                            </div>
                        )}
                    </div>
                </motion.div>
            </AnimatePresence>

            <div className="flex justify-between mt-12 items-center px-1">
                <button
                    onClick={handleBack}
                    disabled={currentStep === 0}
                    className="text-xs uppercase font-bold text-gray-500 hover:text-white disabled:opacity-0 transition-colors"
                >
                    Orqaga
                </button>
                <button
                    onClick={handleNext}
                    disabled={isNextDisabled}
                    className="btn-primary flex items-center gap-2 py-3 px-8 text-sm group"
                >
                    {currentStep === QUESTIONS.length - 1 ? 'Natijani Ko\'rish' : 'Keyingisi'}
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        </div>
    )
}

function MiniBtn({ selected, onClick, label, color }: any) {
    return (
        <button
            onClick={onClick}
            className={`py-5 rounded-2xl border transition-all font-bold text-lg ${selected
                ? color + ' border-opacity-100 ring-4 ring-white/5 scale-[0.98]'
                : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10'
                }`}
        >
            {label}
        </button>
    )
}
