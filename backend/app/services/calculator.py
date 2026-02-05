from typing import Dict, Any

def calculate_audit(data: Dict[str, Any]) -> Dict[str, Any]:
    """
    Business Growth Audit calculation logic based on TZ.
    """
    # 1. Inputs
    monthly_revenue_goal = float(data.get("monthly_revenue_goal", 0))
    average_check = float(data.get("average_check", 1))
    conversion_rate = float(data.get("conversion_rate", 5)) / 100  # Default 5%
    
    # 2. Foundation Penalties (Jarimalar)
    penalty_multiplier = 1.0
    if not data.get("has_crm", False):
        penalty_multiplier += 0.20  # +20% for no CRM
    if not data.get("has_sales_team", False):
        penalty_multiplier += 0.20  # +20% for no Sales Team
    if not data.get("has_social_trust", False):
        penalty_multiplier += 0.10  # +10% for low social trust
        
    # 3. Core Metrics
    clients_needed = monthly_revenue_goal / average_check if average_check > 0 else 0
    leads_needed = clients_needed / conversion_rate if conversion_rate > 0 else 0
    
    # Assume a benchmark Cost Per Lead (CPL) based on industry or platform
    # For now, use a generic $5 CPL benchmark
    cpl_benchmark = 5.0 
    
    ideal_budget = leads_needed * cpl_benchmark
    real_budget = ideal_budget * penalty_multiplier
    waste_money = real_budget - ideal_budget
    
    # Growth Potential
    # 1x Growth (Optimization) - recover wasted money
    optimization_gain = waste_money * 1.5  # Rough estimate of system impact
    
    return {
        "clients_needed": round(clients_needed, 1),
        "leads_needed": int(leads_needed),
        "ideal_budget": round(ideal_budget, 2),
        "real_budget": round(real_budget, 2),
        "waste_money": round(waste_money, 2),
        "optimization_gain": round(optimization_gain, 2),
        "risk_level": "High" if penalty_multiplier > 1.3 else "Medium" if penalty_multiplier > 1.1 else "Low"
    }
