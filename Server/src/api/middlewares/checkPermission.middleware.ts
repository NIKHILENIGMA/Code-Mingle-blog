import PolicyEngine from '@/Lib/access-control/engine/PolicyEngine'
import { policyRules, Resources } from '@/Lib/access-control/policies/policyRules'

const engine = new PolicyEngine(policyRules)
