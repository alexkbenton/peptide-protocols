/**
 * Peptide database for Peptide Protocols
 * Contains 19 compounds across 5 categories with clinical evidence, dosing, and synergies
 */

export interface Dosing {
  dose: string;
  frequency: string;
  cycleWeeks: string;
  notes: string;
}

export interface PeptideDosing {
  beginnerIntermediate: Dosing;
  advanced: Dosing;
}

export interface Peptide {
  slug: string;
  name: string;
  aliases: string[];
  category: string;
  categoryColor: string;
  summary: string;
  routes: string[];
  evidenceLevel: 'approved' | 'emerging' | 'preclinical' | 'early-research';
  dosing: PeptideDosing;
  mechanism: string;
  benefits: string[];
  sideEffects: string[];
  contraindications: string[];
  synergies: string[];
  keyTakeaway: string;
}

export const peptides: Peptide[] = [
  // Recovery & Repair
  {
    slug: 'bpc-157',
    name: 'BPC-157',
    aliases: ['Body Protection Compound 157', 'Pentadecapeptide BPC 157'],
    category: 'Recovery & Repair',
    categoryColor: 'bg-blue-50 text-blue-700',
    summary: 'A 15-amino-acid peptide that accelerates healing of tendons, ligaments, muscles, and nerves through angiogenesis and fibroblast activation.',
    routes: ['Subcutaneous', 'Intramuscular', 'Oral'],
    evidenceLevel: 'preclinical',
    dosing: {
      beginnerIntermediate: {
        dose: '250-300 mcg',
        frequency: 'Once daily subcutaneous',
        cycleWeeks: '4-6 weeks',
        notes: 'Start with 250 mcg daily, escalate to 500 mcg if tolerated'
      },
      advanced: {
        dose: '500 mcg',
        frequency: 'Twice daily subcutaneous',
        cycleWeeks: '6-8 weeks',
        notes: 'Higher doses support systemic healing and injury recovery'
      }
    },
    mechanism: 'Activates VEGF, fibroblast growth factor, and growth hormone receptors to stimulate angiogenesis and tissue regeneration. Suppresses inflammatory markers via nitric oxide-dependent pathways.',
    benefits: [
      'Accelerated tendon and ligament repair',
      'Enhanced muscle recovery from training',
      'Improved wound healing and skin regeneration',
      'Anti-inflammatory effects',
      'Nerve regeneration support'
    ],
    sideEffects: [
      'Injection site swelling or redness',
      'Transient nausea or dizziness',
      'Anecdotal reports of anxiety (rare)',
      'Local irritation (resolves within 24-72 hours)'
    ],
    contraindications: [
      'Active malignancy (pro-angiogenic effects)',
      'Pregnancy and lactation',
      'Immunocompromised states'
    ],
    synergies: ['TB-500', 'GHK-Cu', 'KPV', 'Vitamin C', 'Collagen peptides'],
    keyTakeaway: 'Restore tissue integrity faster: BPC-157 activates your body\'s own healing mechanisms for superior recovery.'
  },
  {
    slug: 'tb-500',
    name: 'TB-500',
    aliases: ['Thymosin Beta-4', 'Thymosin β-4', 'RGN-259'],
    category: 'Recovery & Repair',
    categoryColor: 'bg-blue-50 text-blue-700',
    summary: 'A 43-amino-acid peptide that promotes systemic healing through actin regulation and endothelial cell mobilization.',
    routes: ['Subcutaneous', 'Intramuscular'],
    evidenceLevel: 'emerging',
    dosing: {
      beginnerIntermediate: {
        dose: '1-2.5 mg',
        frequency: '2-3x weekly subcutaneous',
        cycleWeeks: '4-6 weeks',
        notes: '1 mg every other day for the first 4 weeks as a loading phase'
      },
      advanced: {
        dose: '5 mg',
        frequency: '2-3x weekly subcutaneous',
        cycleWeeks: '6-8 weeks',
        notes: 'Supports systemic regeneration across multiple tissues'
      }
    },
    mechanism: 'Binds and sequesters G-actin, regulating cytoskeletal dynamics and cell migration. Activates PI3K/Akt/eNOS pathways to promote endothelial progenitor cell mobilization and angiogenesis.',
    benefits: [
      'Accelerated wound closure and tissue healing',
      'Enhanced cell migration and fibroblast activity',
      'Systemic anti-inflammatory response',
      'Improved endothelial function',
      'Cell survival under oxidative stress'
    ],
    sideEffects: [
      'Injection site reactions',
      'Transient fatigue during loading phase',
      'Mild headache',
      'Rare: fever or muscle aches'
    ],
    contraindications: [
      'Active malignancy (pro-angiogenic)',
      'History of cancer (relative caution)',
      'Pregnancy and lactation',
      'Uncontrolled hypertension'
    ],
    synergies: ['BPC-157', 'GHK-Cu', 'IGF-1', 'Resistance training'],
    keyTakeaway: 'Multiply your recovery: TB-500 amplifies cellular healing through systemic cell mobilization and angiogenesis.'
  },
  {
    slug: 'ghk-cu',
    name: 'GHK-Cu',
    aliases: ['Copper Peptide', 'Glycine-Histidine-Lysine Copper Complex'],
    category: 'Recovery & Repair',
    categoryColor: 'bg-blue-50 text-blue-700',
    summary: 'A naturally occurring tripeptide complexed with copper that stimulates collagen synthesis and wound healing with 30+ years of clinical research.',
    routes: ['Topical', 'Subcutaneous', 'Intranasal'],
    evidenceLevel: 'approved',
    dosing: {
      beginnerIntermediate: {
        dose: '1 mg',
        frequency: 'Once daily subcutaneous',
        cycleWeeks: '4-8 weeks',
        notes: 'Reconstitute 50 mg vial with 2-3 ml BAC water; topical also effective for skin'
      },
      advanced: {
        dose: '2 mg',
        frequency: 'Once daily subcutaneous',
        cycleWeeks: '8-12 weeks',
        notes: 'Higher doses support comprehensive collagen remodeling'
      }
    },
    mechanism: 'Upregulates lysyl oxidase and lysyl hydroxylase, enzymes critical for collagen cross-linking and stability. Modulates gene expression to increase type I and III collagen synthesis while downregulating inflammatory pathways.',
    benefits: [
      '70% increase in collagen production',
      'Improved skin elasticity and thickness',
      'Wrinkle reduction and fine-line improvement',
      'Enhanced wound healing',
      'Anti-inflammatory gene modulation'
    ],
    sideEffects: [
      'Minimal; topical non-irritating',
      'Rare injection site reactions',
      'No systemic toxicity reported'
    ],
    contraindications: [
      'Wilson\'s disease (copper metabolism disorder)',
      'Metal allergy or hypersensitivity',
      'Pregnancy and lactation (systemic use)'
    ],
    synergies: ['KPV', 'Larazotide', 'Vitamin C', 'Retinol', 'TB-500'],
    keyTakeaway: 'Rebuild from inside out: GHK-Cu triggers collagen synthesis for visibly rejuvenated skin and stronger tissues.'
  },
  {
    slug: 'kpv',
    name: 'KPV',
    aliases: ['Lysine-Proline-Valine', 'Alpha-MSH C-terminal tripeptide'],
    category: 'Recovery & Repair',
    categoryColor: 'bg-blue-50 text-blue-700',
    summary: 'A potent anti-inflammatory tripeptide derived from alpha-melanocyte-stimulating hormone that reduces intestinal and systemic inflammation.',
    routes: ['Oral', 'Subcutaneous', 'Intranasal'],
    evidenceLevel: 'preclinical',
    dosing: {
      beginnerIntermediate: {
        dose: '250-500 mcg',
        frequency: 'Once or twice daily oral on empty stomach',
        cycleWeeks: '4 weeks',
        notes: 'Take 30-60 minutes before food for optimal absorption'
      },
      advanced: {
        dose: '500 mcg',
        frequency: 'Twice daily subcutaneous',
        cycleWeeks: '6-8 weeks',
        notes: 'Subcutaneous delivery maximizes systemic anti-inflammatory effects'
      }
    },
    mechanism: 'Inhibits NF-κB and MAPK pathways via PepT1 transporter-mediated intracellular uptake. Suppresses pro-inflammatory cytokine secretion (TNF-α, IL-6) in intestinal and respiratory epithelial cells.',
    benefits: [
      'Reduces gut inflammation and SASP markers',
      'Suppresses pro-inflammatory cytokines',
      'Supports intestinal barrier integrity',
      'Anti-inflammatory response activation',
      'Immune modulation without immunosuppression'
    ],
    sideEffects: [
      'Mild nausea or GI disturbance',
      'Transient flu-like symptoms',
      'Histamine sensitivity in MCAS individuals',
      'Generally well-tolerated and transient'
    ],
    contraindications: [
      'Mast cell activation syndrome (MCAS)',
      'Severe histamine intolerance',
      'Pregnancy and lactation',
      'Active malignancy'
    ],
    synergies: ['Larazotide', 'GHK-Cu', 'Curcumin', 'Quercetin'],
    keyTakeaway: 'Calm systemic inflammation at the source: KPV blocks NF-κB to reduce pro-inflammatory cytokines.'
  },
  {
    slug: 'larazotide',
    name: 'Larazotide Acetate',
    aliases: ['AT-1001', 'Tight Junction Regulator'],
    category: 'Recovery & Repair',
    categoryColor: 'bg-blue-50 text-blue-700',
    summary: 'An octapeptide that restores intestinal tight junction integrity by antagonizing zonulin, the protein that regulates paracellular permeability.',
    routes: ['Oral'],
    evidenceLevel: 'emerging',
    dosing: {
      beginnerIntermediate: {
        dose: '0.5 mg',
        frequency: 'Three times daily with meals',
        cycleWeeks: '4-8 weeks',
        notes: 'Take with food for optimal mucosal contact'
      },
      advanced: {
        dose: '1 mg',
        frequency: 'Three times daily with meals',
        cycleWeeks: '8-12 weeks',
        notes: 'Higher doses show no additional benefit; lower dose is optimal'
      }
    },
    mechanism: 'Blocks zonulin-mediated tight junction disruption via MLCK inhibition. Promotes proper localization of claudin-4, occludin, ZO-1, and E-cadherin at epithelial junctions.',
    benefits: [
      'Restores intestinal barrier function',
      'Reduces intestinal permeability',
      'Decreases symptom days by 26-31%',
      'Supports tight junction protein assembly',
      'Prevents gluten-induced barrier breakdown'
    ],
    sideEffects: [
      'Headache (paradoxically reduced at optimal dose)',
      'Mild GI symptoms',
      'Urinary tract infection (mechanism unclear)',
      'Overall safety profile excellent'
    ],
    contraindications: [
      'Pregnancy and lactation',
      'Active severe infection',
      'Inflammatory flare requiring immunosuppression'
    ],
    synergies: ['KPV', 'GHK-Cu', 'Glutamine', 'Zinc', 'Bone broth'],
    keyTakeaway: 'Seal your gut: Larazotide restores tight junction integrity for rapid barrier restoration.'
  },

  // Fat Loss & Metabolism
  {
    slug: 'tirzepatide',
    name: 'Tirzepatide',
    aliases: ['Mounjaro', 'Zepbound', 'Dual GIP/GLP-1 Agonist'],
    category: 'Fat Loss & Metabolism',
    categoryColor: 'bg-orange-50 text-orange-700',
    summary: 'FDA-approved dual GIP/GLP-1 agonist producing 22.5% weight loss—the highest ever recorded in an anti-obesity medication trial.',
    routes: ['Subcutaneous'],
    evidenceLevel: 'approved',
    dosing: {
      beginnerIntermediate: {
        dose: '2.5-5 mg',
        frequency: 'Once weekly subcutaneous',
        cycleWeeks: '12+ weeks',
        notes: 'Standard escalation: 2.5 mg weekly for 4 weeks, then 5 mg'
      },
      advanced: {
        dose: '10-15 mg',
        frequency: 'Once weekly subcutaneous',
        cycleWeeks: '24-48 weeks',
        notes: 'Escalate 2.5 mg every 4 weeks to maintenance 15 mg'
      }
    },
    mechanism: 'GIP agonism reduces lipolysis in adipose tissue and appetite via CNS pathways; GLP-1 agonism delays gastric emptying, increases satiety, and suppresses glucagon. Synergistic effect exceeds sum of individual components.',
    benefits: [
      '22.5% average weight loss at 15 mg',
      '75% fat loss, 25% lean mass (superior body composition)',
      'Superior HbA1c control vs semaglutide',
      'Improved triglycerides and blood pressure',
      'Once-weekly convenient dosing'
    ],
    sideEffects: [
      'Nausea (25-35% at escalation)',
      'Diarrhea (20-25%)',
      'Vomiting (8-12%)',
      'Constipation (10-15%)',
      'Heart rate increase (8-10 bpm)'
    ],
    contraindications: [
      'Personal or family history of medullary thyroid carcinoma',
      'MEN2 syndromes',
      'History of pancreatitis',
      'Type 1 diabetes (relative)',
      'DKA history',
      'ESRD (eGFR <15)'
    ],
    synergies: ['Metformin', 'SGLT2 inhibitors', 'Exercise', 'High-protein nutrition'],
    keyTakeaway: 'Proven weight loss: Tirzepatide achieves 22.5% fat loss with superior lean mass preservation.'
  },
  {
    slug: '5-amino-1mq',
    name: '5-Amino-1MQ',
    aliases: ['NNMT Inhibitor', '5A1MQ'],
    category: 'Fat Loss & Metabolism',
    categoryColor: 'bg-orange-50 text-orange-700',
    summary: 'A selective NNMT inhibitor that preserves cellular NAD+ to enhance metabolic rate and reduce fat accumulation.',
    routes: ['Oral', 'Subcutaneous'],
    evidenceLevel: 'preclinical',
    dosing: {
      beginnerIntermediate: {
        dose: '50-100 mg',
        frequency: 'Once daily oral with food',
        cycleWeeks: '4-8 weeks',
        notes: 'Take earlier in day; avoid late afternoon dosing'
      },
      advanced: {
        dose: '100-150 mg',
        frequency: 'Twice daily oral',
        cycleWeeks: '8-12 weeks',
        notes: 'Morning and afternoon dosing maximizes metabolic effect'
      }
    },
    mechanism: 'Inhibits NNMT enzyme, blocking NAD+ conversion to 1-methylnicotinamide. Preserves intracellular NAD+ pools, enhancing mitochondrial function, oxidative capacity, and energy expenditure.',
    benefits: [
      '35-40% reduction in fat mass (animal models)',
      'Increased resting energy expenditure',
      'Improved insulin sensitivity and glucose tolerance',
      '50-60% reduction in fasting insulin',
      'Enhanced mitochondrial function'
    ],
    sideEffects: [
      'Temporary digestive changes',
      'Mild headaches',
      'Muscle soreness or fatigue',
      'Nausea or dizziness',
      'Sleep disturbance if taken late'
    ],
    contraindications: [
      'Pregnancy and breastfeeding',
      'Kidney or liver disease',
      'Active cancer treatment',
      'Eating disorders',
      'Uncontrolled cardiovascular disease',
      'Age <21'
    ],
    synergies: ['NAD+ precursors (NMN/NR)', 'GLP-1 agonists', 'Intermittent fasting', 'Resistance training'],
    keyTakeaway: 'Burn more, store less: 5-Amino-1MQ unlocks your cells\' metabolic potential by preserving NAD+.'
  },
  {
    slug: 'mots-c',
    name: 'MOTS-c',
    aliases: ['Mitochondrial-Derived Peptide', 'Exercise Mimetic'],
    category: 'Fat Loss & Metabolism',
    categoryColor: 'bg-orange-50 text-orange-700',
    summary: 'An exercise mimetic peptide derived from mitochondrial DNA that activates AMPK to restore insulin sensitivity and boost metabolic rate.',
    routes: ['Subcutaneous'],
    evidenceLevel: 'emerging',
    dosing: {
      beginnerIntermediate: {
        dose: '1 mg',
        frequency: 'Once daily subcutaneous (AM)',
        cycleWeeks: 'Up to 60 days',
        notes: 'Start at 1 mg; reconstitute with greater BAC volume if injection-site reactions occur'
      },
      advanced: {
        dose: '5 mg twice weekly, or 10 mg once weekly',
        frequency: 'Subcutaneous',
        cycleWeeks: '8-12 weeks',
        notes: 'Lower-frequency maintenance dosing as an alternative to daily'
      }
    },
    mechanism: 'Upregulated during exercise; activates AMPK-FOXA2 pathway to restore insulin sensitivity independent of weight loss. Increases mitochondrial biogenesis, fatty acid oxidation, and oxidative capacity.',
    benefits: [
      'Restores insulin sensitivity to young-animal levels',
      'Increased mitochondrial biogenesis',
      'Enhanced exercise capacity',
      'Improved glucose tolerance',
      'Preserved muscle mass'
    ],
    sideEffects: [
      'Injection site reactions (>10% incidence)',
      'Mild headache',
      'Transient fatigue',
      'Flushing or temporary energy fluctuation'
    ],
    contraindications: [
      'Active cancer',
      'Concurrent metformin or thiazolidinediones',
      'Type 1 diabetes (hypoglycemia risk)',
      'Pregnancy and breastfeeding'
    ],
    synergies: ['Exercise training', 'NAD+ precursors (NMN)', 'Resveratrol', 'SIRT1 activators'],
    keyTakeaway: 'Get exercise benefits without the gym: MOTS-c mimics endurance training to restore insulin sensitivity.'
  },
  {
    slug: 'slu-pp-332',
    name: 'SLU-PP-332',
    aliases: ['ERR Agonist', 'Exercise in a Pill'],
    category: 'Fat Loss & Metabolism',
    categoryColor: 'bg-orange-50 text-orange-700',
    summary: 'A pan-agonist of estrogen-related receptors (ERRα/β/γ) that induces the aerobic exercise gene program and increases energy expenditure.',
    routes: ['Oral (preclinical)', 'Subcutaneous (preclinical)'],
    evidenceLevel: 'preclinical',
    dosing: {
      beginnerIntermediate: {
        dose: '250 mcg',
        frequency: 'Every other day oral (AM)',
        cycleWeeks: '4 weeks',
        notes: 'Estimated from preclinical data; no human dosing established'
      },
      advanced: {
        dose: '250 mcg',
        frequency: 'Once daily oral (AM)',
        cycleWeeks: '8-12 weeks',
        notes: 'Least-studied compound; dosing is anecdotal and experimental'
      }
    },
    mechanism: 'Binds ligand-binding domain of ERRα, promoting interaction with PGC-1α. Triggers acute aerobic exercise genetic program with increased type IIa oxidative muscle fibers, mitochondrial biogenesis, and energy expenditure.',
    benefits: [
      'Induces exercise gene program without activity',
      'Increased energy expenditure',
      'Enhanced fatty acid oxidation',
      'Improved insulin sensitivity',
      'Increased type IIa oxidative muscle'
    ],
    sideEffects: [
      'Appetite modulation',
      'Initial energy dysregulation',
      'Uncertain cardiovascular effects at higher doses',
      'Unknown off-target ERR effects'
    ],
    contraindications: [
      'Pregnancy and breastfeeding',
      'Uncontrolled cardiac disease',
      'Cancer history (unclear risk)',
      'Severe liver disease'
    ],
    synergies: ['5-Amino-1MQ', 'NAD+ precursors', 'Structured exercise', 'Caloric deficit'],
    keyTakeaway: 'Activate endurance pathways without training: SLU-PP-332 ignites ERR-driven metabolic remodeling.'
  },

  // Growth Hormone
  {
    slug: 'cjc-1295',
    name: 'CJC-1295',
    aliases: ['GRF (1-29)', 'GHRH Analog'],
    category: 'Growth Hormone',
    categoryColor: 'bg-purple-50 text-purple-700',
    summary: 'A GHRH analog with a DAC modification that extends half-life, enabling once or twice-weekly dosing for sustained GH elevation.',
    routes: ['Subcutaneous'],
    evidenceLevel: 'emerging',
    dosing: {
      beginnerIntermediate: {
        dose: '100 mcg',
        frequency: 'Before bed subcutaneous',
        cycleWeeks: '8-12 weeks',
        notes: 'Inject on empty stomach; fast 90-120 min before and 30-60 min after'
      },
      advanced: {
        dose: '100-200 mcg',
        frequency: 'Twice daily subcutaneous',
        cycleWeeks: '12-16 weeks',
        notes: 'Stack with ipamorelin for synergistic GH pulse amplification'
      }
    },
    mechanism: 'Binds GHRH receptors on somatotroph cells, stimulating GH synthesis and pulsatile release. DAC (Drug Affinity Complex) enables albumin binding for 6-10 day half-life.',
    benefits: [
      '2-10 fold GH elevation sustained 6+ days',
      '1.5-3 fold IGF-I elevation',
      'Enhanced muscle protein synthesis',
      'Visceral fat reduction',
      'Improved sleep quality'
    ],
    sideEffects: [
      'Flushing or warmth sensation',
      'Water retention and mild edema',
      'Headache or dizziness',
      'Joint pain (from IGF-I elevation)'
    ],
    contraindications: [
      'Pregnancy and breastfeeding',
      'Active cancer or cancer history',
      'Acute critical illness',
      'Pre-diabetes (caution: insulin antagonism)',
      'Acromegaly or pituitary disease'
    ],
    synergies: ['Ipamorelin', 'Sermorelin', 'Resistance training', 'Adequate sleep'],
    keyTakeaway: 'Sustained GH elevation: CJC-1295 extends GHRH signaling for days with convenient weekly dosing.'
  },
  {
    slug: 'ipamorelin',
    name: 'Ipamorelin',
    aliases: ['GHRP-1 Derivative', 'Selective GHS'],
    category: 'Growth Hormone',
    categoryColor: 'bg-purple-50 text-purple-700',
    summary: 'The first selective growth hormone secretagogue with no cortisol stimulation—a critical safety advantage over other GHRPs.',
    routes: ['Subcutaneous'],
    evidenceLevel: 'emerging',
    dosing: {
      beginnerIntermediate: {
        dose: '100-200 mcg',
        frequency: 'Before bed subcutaneous',
        cycleWeeks: '8-12 weeks',
        notes: 'Inject on empty stomach; 2-3 injections daily optimal'
      },
      advanced: {
        dose: '200-300 mcg',
        frequency: '2-3 times daily subcutaneous',
        cycleWeeks: '12-16 weeks',
        notes: 'Bedtime injection most important; peak 40 min post-injection'
      }
    },
    mechanism: 'Pentapeptide that selectively binds ghrelin receptor (GHSR-1a) on somatotroph cells, triggering GH pulse amplitude without off-target ACTH or cortisol release.',
    benefits: [
      'Pulsatile GH release (physiologic pattern)',
      'No cortisol or prolactin elevation',
      'Enhanced muscle protein synthesis',
      'Improved bone density',
      'Enhanced GH secretion when stacked with CJC'
    ],
    sideEffects: [
      'Appetite stimulation',
      'Mild nausea or dizziness',
      'Injection site reactions (minimal)',
      'Very safe; no serious AEs in trials'
    ],
    contraindications: [
      'Pregnancy and breastfeeding',
      'Active cancer or cancer history',
      'Acute critical illness',
      'Growth hormone-secreting tumors'
    ],
    synergies: ['CJC-1295', 'CJC-1295 without DAC', 'Resistance training', 'Protein-rich diet'],
    keyTakeaway: 'Selective GH amplification: Ipamorelin triggers GH pulses without cortisol—the safest GHRP available.'
  },
  {
    slug: 'tesamorelin',
    name: 'Tesamorelin',
    aliases: ['GHRH Analog', 'Egrifta', 'FDA-Approved'],
    category: 'Growth Hormone',
    categoryColor: 'bg-purple-50 text-purple-700',
    summary: 'The only FDA-approved GHRH analog with proven efficacy for visceral fat reduction—uniquely selective for abdominal fat compartments.',
    routes: ['Subcutaneous'],
    evidenceLevel: 'approved',
    dosing: {
      beginnerIntermediate: {
        dose: '1 mg',
        frequency: 'Once daily subcutaneous, 5 days on / 2 off',
        cycleWeeks: '12 weeks',
        notes: 'Start at 1 mg (range 1-2 mg) and titrate toward 2 mg as tolerated'
      },
      advanced: {
        dose: '2 mg',
        frequency: 'Once daily subcutaneous (evening)',
        cycleWeeks: '26 weeks',
        notes: 'Can continue long-term; most studies show benefit at 26 weeks'
      }
    },
    mechanism: 'Identical to native GRF with hexarelin modification for extended half-life (25-30 min). Selectively mobilizes visceral fat through GH/IGF-I-mediated lipolysis.',
    benefits: [
      '15-18% visceral fat reduction',
      '33% hepatic steatosis reduction',
      'Preserved subcutaneous fat',
      'Improved liver enzymes (ALT/AST)',
      'Lean mass gain 0.5-1.0 kg'
    ],
    sideEffects: [
      'Injection site reactions (most common)',
      'Headache (10-20%)',
      'Flushing or water retention',
      'Carpal tunnel syndrome (1-2%, rare)',
      'Edema (peripheral, transient)'
    ],
    contraindications: [
      'Pregnancy and breastfeeding',
      'Active or recent cancer',
      'Untreated hypothyroidism',
      'Diabetic retinopathy',
      'Acute critical illness',
      'Closed epiphyses'
    ],
    synergies: ['Exercise', 'Caloric deficit', 'Resistance training'],
    keyTakeaway: 'FDA-approved visceral fat loss: Tesamorelin selectively targets dangerous belly fat with clinical proof.'
  },

  // Longevity & Cellular
  {
    slug: 'ss-31',
    name: 'SS-31 (Elamipretide)',
    aliases: ['Elamipretide', 'Bendavia', 'Forzinity'],
    category: 'Longevity & Cellular',
    categoryColor: 'bg-emerald-50 text-emerald-700',
    summary: 'FDA-approved (2025) mitochondrial-targeted antioxidant that restores ATP production by stabilizing cardiolipin in the inner mitochondrial membrane.',
    routes: ['Intravenous', 'Subcutaneous'],
    evidenceLevel: 'approved',
    dosing: {
      beginnerIntermediate: {
        dose: '500 mcg',
        frequency: 'Once daily subcutaneous (AM)',
        cycleWeeks: '4-8 weeks',
        notes: 'Reconstitute 5 mg vial with 1 ml BAC water; rotate injection sites'
      },
      advanced: {
        dose: '1 mg',
        frequency: 'Once daily subcutaneous (AM)',
        cycleWeeks: '8-12 weeks',
        notes: 'Titrate from 500 mcg up to 1 mg daily after the first week if tolerated'
      }
    },
    mechanism: 'Binds cardiolipin on inner mitochondrial membrane, stabilizing cristae structure and suppressing electron leakage. Enhances ATP production efficiency while reducing ROS generation.',
    benefits: [
      'Restored mitochondrial ATP production',
      'Reduced mitochondrial ROS',
      'Improved cellular energy status',
      'Stabilized mitochondrial cristae',
      'Long-term safety in Barth syndrome (168 weeks)'
    ],
    sideEffects: [
      'Injection site reactions (20-40% SubQ)',
      'Headache (mild-moderate)',
      'Dizziness or nausea (rare)',
      'No serious cardiovascular toxicity'
    ],
    contraindications: [
      'Currently none formally listed',
      'Theoretical: severe systemic infection'
    ],
    synergies: ['CoQ10', 'PQQ', 'NAD+ precursors', 'L-Carnitine', 'Exercise'],
    keyTakeaway: 'Restore your cellular powerhouse: SS-31 stabilizes mitochondria for restored energy and resilience.'
  },
  {
    slug: 'epithalon',
    name: 'Epithalon',
    aliases: ['Epitalon', 'AEDG Tetrapeptide'],
    category: 'Longevity & Cellular',
    categoryColor: 'bg-emerald-50 text-emerald-700',
    summary: 'A telomerase-activating peptide that extends telomeres and reverses senescence markers—backed by 25+ years of clinical use in Russia.',
    routes: ['Subcutaneous', 'Intramuscular'],
    evidenceLevel: 'emerging',
    dosing: {
      beginnerIntermediate: {
        dose: '5 mg',
        frequency: 'Daily for 10 days',
        cycleWeeks: '1-2 weeks per course',
        notes: 'Repeat every 3-6 months'
      },
      advanced: {
        dose: '10 mg',
        frequency: 'Daily for 20 days',
        cycleWeeks: '4 weeks per course',
        notes: 'Repeat 2x per year; cyclic low-dose more effective than continuous'
      }
    },
    mechanism: 'Activates telomerase (hTERT subunit), extending telomere length in somatic cells. Restores melatonin and supports neuroendocrine function; reverses some senescence markers.',
    benefits: [
      'Measurable telomere lengthening',
      'Reversal of replicative senescence',
      'Restored melatonin secretion',
      'Improved lipid and inflammatory markers',
      'Enhanced cognitive and physical function'
    ],
    sideEffects: [
      'Minimal; excellent 15+ year safety data',
      'Rare: mild injection site reactions',
      'Anecdotal: transient sleep disruption',
      'No serious toxicity or malignancy acceleration'
    ],
    contraindications: [
      'Active malignancy',
      'Recent cancer history (<5 years, relative)',
      'Pregnancy and breastfeeding'
    ],
    synergies: ['TA-65', 'NAD+ precursors (NMN/NR)', 'Resveratrol', 'Fisetin'],
    keyTakeaway: 'Reset your biological clock: Epithalon activates telomerase to add years to your cells\' lifespan.'
  },
  {
    slug: 'pinealon',
    name: 'Pinealon',
    aliases: ['EDR Tripeptide', 'Glu-Asp-Arg'],
    category: 'Longevity & Cellular',
    categoryColor: 'bg-emerald-50 text-emerald-700',
    summary: 'A neuroprotective peptide bioregulator that enhances cognitive function and supports aging brain health through MAPK/ERK signaling.',
    routes: ['Subcutaneous', 'Intramuscular', 'Oral'],
    evidenceLevel: 'emerging',
    dosing: {
      beginnerIntermediate: {
        dose: '100 mcg',
        frequency: 'Once daily subcutaneous',
        cycleWeeks: '6-8 weeks',
        notes: 'Or 200-300 mg daily oral if bioavailable formulation used'
      },
      advanced: {
        dose: '200-300 mcg',
        frequency: 'Once daily subcutaneous',
        cycleWeeks: '8-12 weeks',
        notes: 'Multiple courses per year; 2-4 week rest between cycles'
      }
    },
    mechanism: 'Activates MAPK/ERK signaling in neurons, upregulating neuroprotective genes and BDNF. Suppresses apoptosis through caspase inhibition and ROS reduction.',
    benefits: [
      'Enhanced memory acquisition and retention',
      'Improved attention and concentration',
      'Accelerated reaction time',
      'Neuroprotection in aging',
      'Potential brain injury recovery support'
    ],
    sideEffects: [
      'Minimal reported; well-tolerated',
      'Rare: injection site reactions',
      'Anecdotal: muscle aches or fatigue',
      'Generally safe with decades of Russian use'
    ],
    contraindications: [
      'No formal contraindications established'
    ],
    synergies: ['NAD+ precursors (NMN)', 'Magnesium L-Threonate', 'B-Complex vitamins', 'Cognitive training'],
    keyTakeaway: 'Preserve cognitive sharpness: Pinealon activates MAPK/ERK to upregulate neuroprotective genes.'
  },
  {
    slug: 'nad-plus',
    name: 'NAD+ / NAD+ Precursors',
    aliases: ['Nicotinamide Adenine Dinucleotide', 'NMN', 'NR'],
    category: 'Longevity & Cellular',
    categoryColor: 'bg-emerald-50 text-emerald-700',
    summary: 'Essential mitochondrial cofactor that declines with age. Supplementation enhances energy metabolism, DNA repair, and sirtuin activation.',
    routes: ['Intravenous (NAD+)', 'Subcutaneous (NAD+)', 'Oral (NMN, NR)'],
    evidenceLevel: 'emerging',
    dosing: {
      beginnerIntermediate: {
        dose: '250 mg NMN',
        frequency: 'Once daily oral',
        cycleWeeks: '4-8 weeks continuous',
        notes: 'Or 500-750 mg IV NAD+ over 2-4 hours 1-2x/week'
      },
      advanced: {
        dose: '500-1000 mg NMN',
        frequency: 'Daily oral, or 100 mg NAD+ SubQ 2x/week',
        cycleWeeks: '8-12 weeks or ongoing',
        notes: 'Combination approaches maximize NAD+ bioavailability'
      }
    },
    mechanism: 'NAD+ serves as electron carrier in energy metabolism, substrate for sirtuins (longevity pathways), and PARPs (DNA repair). Precursors (NMN, NR) bypass GI degradation for superior bioavailability.',
    benefits: [
      'Enhanced ATP production',
      'Sirtuin activation (longevity pathways)',
      'Improved mitochondrial function',
      'Enhanced DNA repair capacity',
      'Metabolic flexibility and energy'
    ],
    sideEffects: [
      'IV: Nausea, flushing, headache (slow infusion mitigates)',
      'SubQ: Minor tingling or cramping',
      'Oral: Well-tolerated; rare nausea',
      'Most resolve within hours'
    ],
    contraindications: [
      'Cardiovascular disease (IV NAD+ especially)',
      'Hypotension (<100 mmHg systolic)',
      'Severe liver or kidney impairment',
      'Pregnancy and breastfeeding',
      'Concurrent MAOIs'
    ],
    synergies: ['5-Amino-1MQ', 'SLU-PP-332', 'Resveratrol', 'Mitochondrial agents', 'Exercise'],
    keyTakeaway: 'Recharge your cells: NAD+ supplementation restores the fundamental currency of cellular energy.'
  },
  {
    slug: 'foxo4-dri',
    name: 'FOXO4-DRI',
    aliases: ['Senolytic Peptide', 'D-Retro-Inverso'],
    category: 'Longevity & Cellular',
    categoryColor: 'bg-emerald-50 text-emerald-700',
    summary: 'The first rationally designed senolytic peptide that selectively eliminates senescent cells by disrupting FOXO4-p53 interaction.',
    routes: ['Intravenous', 'Subcutaneous (experimental)'],
    evidenceLevel: 'preclinical',
    dosing: {
      beginnerIntermediate: {
        dose: '5 mg/kg estimated',
        frequency: 'IV dosing on Days 1, 3, 5',
        cycleWeeks: '3 weeks on, 3 weeks off',
        notes: 'Only dose with published efficacy (animal models); human dosing unestablished'
      },
      advanced: {
        dose: '5 mg/kg estimated',
        frequency: 'Repeat cycles every 3-6 months',
        cycleWeeks: 'Variable; minimal human data',
        notes: 'No human clinical trials conducted; use experimental and physician-supervised only'
      }
    },
    mechanism: 'D-retro-inverso peptide that penetrates cells and disrupts FOXO4-p53 protein interaction. Releases p53 from nuclear sequestration, leading to mitochondrial translocation and senescent cell-specific apoptosis.',
    benefits: [
      'Selective senescent cell elimination',
      'Reduced SASP inflammatory cytokines',
      'Improved tissue homeostasis (preclinical)',
      'Potential restoration of age-related function',
      'No off-target toxicity to healthy cells (animal data)'
    ],
    sideEffects: [
      'No serious toxicity in mouse models',
      'Theoretical: immune perturbation from senescent cell death',
      'Theoretical: off-target p53 effects',
      'Unknown in humans—no trials conducted'
    ],
    contraindications: [
      'Severe immunosuppression',
      'Active systemic infection',
      'No established human safety data'
    ],
    synergies: ['Dasatinib + Quercetin', 'Fisetin', 'Exercise', 'Intermittent fasting'],
    keyTakeaway: 'Remove the cellular zombies: FOXO4-DRI selectively triggers apoptosis in senescent cells for tissue rejuvenation.'
  },

  // Vascular & Sexual Health
  {
    slug: 'tadalafil',
    name: 'Tadalafil',
    aliases: ['Cialis', 'PDE5 Inhibitor', 'FDA-Approved'],
    category: 'Vascular & Sexual Health',
    categoryColor: 'bg-rose-50 text-rose-700',
    summary: 'FDA-approved PDE5 inhibitor that improves endothelial function and vascular health. Recent studies show 56% mortality reduction and cardiovascular protection.',
    routes: ['Oral'],
    evidenceLevel: 'approved',
    dosing: {
      beginnerIntermediate: {
        dose: '2.5-5 mg',
        frequency: 'Once daily oral',
        cycleWeeks: '4+ weeks continuous',
        notes: 'Take with or without food; consistent timing optimal'
      },
      advanced: {
        dose: '5-10 mg',
        frequency: 'Once daily or as-needed before activity',
        cycleWeeks: '12+ weeks continuous',
        notes: 'Sustained daily dosing provides continuous endothelial benefit'
      }
    },
    mechanism: 'Inhibits phosphodiesterase-5 (PDE5), blocking cGMP degradation. Increases nitric oxide signaling, enhancing vascular smooth muscle relaxation and systemic vasodilation.',
    benefits: [
      '56% reduction in all-cause mortality',
      '37% reduction in heart attack risk',
      '35% reduction in stroke risk',
      'Improved endothelial function',
      'Enhanced blood flow and oxygen delivery'
    ],
    sideEffects: [
      'Headache (14-22%)',
      'Dyspepsia (10-13%)',
      'Back pain (6-12%)',
      'Flushing (4%)',
      'Most mild and transient'
    ],
    contraindications: [
      'Concurrent nitrate use (life-threatening hypotension)',
      'Severe cardiovascular disease',
      'Uncontrolled hypertension',
      'Recent myocardial infarction (<6 months)',
      'Severe hepatic or renal impairment',
      'Unstable angina'
    ],
    synergies: ['Exercise', 'Cardiovascular training', '5-Amino-1MQ', 'SLU-PP-332', 'NAD+', 'L-Citrulline'],
    keyTakeaway: 'Cardioprotection proven: Tadalafil enhances endothelial function for vascular health and longevity.'
  }
];

/**
 * Helper function to get peptide by slug
 */
export function getPeptideBySlug(slug: string): Peptide | undefined {
  return peptides.find((p) => p.slug === slug);
}

/**
 * Helper function to get all peptides
 */
export function getAllPeptides(): Peptide[] {
  return peptides;
}

/**
 * Helper function to get peptides by category
 */
export function getPeptidesByCategory(category: string): Peptide[] {
  return peptides.filter((p) => p.category === category);
}

/**
 * Get unique categories
 */
export function getCategories(): string[] {
  return Array.from(new Set(peptides.map((p) => p.category))).sort();
}
