export type Severity = 'critical' | 'high' | 'medium' | 'low'
export type ThreatLevel = 'critical' | 'high' | 'medium' | 'low'

export interface CVEItem {
  id: string
  title: string
  severity: Severity
  cvss_score: number
  description: string
  plain_english: string
  affected_systems: string[]
  recommendation: string
  mitre_tactic?: string
  mitre_technique?: string
  security_plus_domain: string
  security_plus_objective: string
}

export interface ThreatIntelItem {
  title: string
  source: string
  severity: Severity
  description: string
  plain_english: string
  threat_actor?: string | null
  mitre_tactics: string[]
  security_plus_domain: string
  security_plus_objective: string
}

export interface BreachItem {
  title: string
  organization: string
  severity: Severity
  description: string
  plain_english: string
  attack_vector: string
  records_affected?: string | null
  security_plus_domain: string
  security_plus_objective: string
  lessons_learned: string
}

export interface SecurityPlusMapping {
  domain: string
  domain_number: string
  exam_weight: string
  items_covered: string[]
  study_tip: string
  key_concept: string
}

export interface Brief {
  date: string
  overall_threat_level: ThreatLevel
  threat_level_reason: string
  summary: string
  cves: CVEItem[]
  threat_intel: ThreatIntelItem[]
  breaches: BreachItem[]
  security_plus_mappings: SecurityPlusMapping[]
}

export interface ArchiveEntry {
  date: string
  overall_threat_level: ThreatLevel
  summary: string
  threat_level_reason: string
}
