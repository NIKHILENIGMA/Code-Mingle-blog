type Role = 'ADMIN' | 'USER' | 'MODERATOR' | 'GUEST'
type Actions = 'READ' | 'WRITE' | 'DELETE' | 'UPDATE' | 'SHOW'  
type Resources = 'POST' | 'COMMENT' | 'USER' | 'ADMIN_PANEL'

interface ABACRule {
    role: Role;
    resource: Resources;
    actions: Actions[];
    condition: string; // Use a DSL string to evaluate
  }

function evaluateCondition(condition: string, context: {role: Role, action: Actions, resource: Resources}): void {
    // Implement your DSL logic here
    condition = condition.replace(/role/g, `'${context.role}'`)
    condition = condition.replace(/action/g, `'${context.action}'`)

    condition = condition.replace(/resource/g, `'${context.resource}'`)
    // Example: 'role === "ADMIN" && action === "READ"'

    
    
  }

class PolicyEngine {
    constructor(private rules: ABACRule[]) {
        this.rules = rules
    }

    public isAllowed(
        role: Role,
        action: Actions,
        resource: Resources
    ): boolean {
        return this.rules.some((rule: ABACRule) => {
            return (
                rule.role === role &&
                rule.resource === resource &&
                rule.actions.includes(action) &&
                evaluateCondition(rule.condition, { role, action, resource })
            )
        })
    }
}

export default PolicyEngine
