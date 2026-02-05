export type RiskLevel = 'L' | 'M' | 'H';

export interface AuditAnswers {
    is_decision_maker?: boolean;
    has_crm?: boolean;
    has_sales_team?: boolean;
    has_recent_ads?: boolean;
    has_social_content?: boolean;
    fast_response?: boolean;
    has_sales_script?: boolean;
    monthly_revenue_goal?: string | number;
    average_check?: string | number;
    name?: string;
    phone?: string;
}

export interface AuditResults {
    goal: number;
    clients: number;
    leads: number;
    ideal: number;
    waste: number;
    gain: number;
    risk: RiskLevel;
    reasons: string[];
}

export function calculateAuditResults(answers: AuditAnswers): AuditResults {
    const goal = Number(answers.monthly_revenue_goal) || 10000;
    const check = Number(answers.average_check) || 100;
    const clients = Math.ceil(goal / check);

    // Default conversion 10%
    const leads = Math.ceil(clients / 0.1);

    // Ideal budget calculation (assuming $2 per lead as base)
    const ideal = leads * 2;

    let penalty = 1.0;
    const reasons: string[] = [];

    if (answers.has_crm === false) {
        penalty += 0.25;
        reasons.push("CRM tizimi mavjud emas");
    }
    if (answers.has_sales_team === false) {
        penalty += 0.20;
        reasons.push("Sotuv bo'limi shakllanmagan");
    }
    if (answers.fast_response === false) {
        penalty += 0.15;
        reasons.push("Mijozlarga javob berish sekin");
    }
    if (answers.has_sales_script === false) {
        penalty += 0.10;
        reasons.push("Sotuv skriptlari yo'q");
    }

    const real = Math.round(ideal * penalty);
    const waste = real - ideal;

    // Potential gain: recovering waste + improving conversion by 15%
    const gain = Math.round((waste + (goal * 0.15)) * 1.5);

    let risk: RiskLevel = 'L';
    if (penalty > 1.4) risk = 'H';
    else if (penalty > 1.1) risk = 'M';

    return {
        goal,
        clients,
        leads,
        ideal,
        waste,
        gain,
        risk,
        reasons
    };
}
