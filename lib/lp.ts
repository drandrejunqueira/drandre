// ============================================================
// LANDING PAGES DE ANÚNCIO — /lp/[slug]
//
// Uma configuração por página. O template (app/lp/[slug]) lê daqui.
// Condições, tratamentos e FAQ vêm de lib/data.ts para não duplicar conteúdo.
// Copy pensada para "message match" com os anúncios do Google Ads:
// o título da LP repete a intenção da busca (ex.: "dor no joelho").
// ============================================================

import { specialties } from './data'

export interface LpFaq {
  q: string
  a: string
}

export interface LpConfig {
  slug: string
  /** Especialidade de lib/data.ts que alimenta condições/tratamentos/FAQ. */
  specialtySlug: string | null
  /** Valor gravado no CRM (coluna specialty). Igual às opções do LeadForm. */
  formSpecialty: string
  /** <title> da página (a LP é noindex; serve para o Google Ads e relatórios). */
  title: string
  description: string
  eyebrow: string
  /** [antes, destaque em dourado, depois] */
  headline: [string, string, string]
  sub: string
  bullets: string[]
  painsTitle: string
  pains: string[]
  conditionsTitle: string
  conditions: string[]
  treatments: string[]
  faqs: LpFaq[]
}

/** Extrai as linhas "- item" da descrição markdown-like de uma especialidade. */
function bulletLines(text: string): string[] {
  return text
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.startsWith('- '))
    .map((line) => line.slice(2).trim())
}

function specialty(slug: string) {
  const found = specialties.find((s) => s.slug === slug)
  if (!found) throw new Error(`Especialidade "${slug}" não encontrada em lib/data.ts`)
  return found
}

const COMMON_BULLETS = [
  'Consulta com o próprio Dr. André — avaliação clínica completa, sem pressa',
  'Do diagnóstico ao tratamento no mesmo lugar: exame, plano e acompanhamento',
  'Opções conservadoras primeiro; cirurgia só quando é realmente a melhor saída',
]

const joelho = specialty('joelho')
const coluna = specialty('coluna')
const quadril = specialty('quadril')
const ombro = specialty('ombro-cotovelo')

export const landingPages: LpConfig[] = [
  {
    slug: 'joelho',
    specialtySlug: 'joelho',
    formSpecialty: 'Joelho (LCA, Menisco, Artrose)',
    title: 'Ortopedista especialista em joelho em São José dos Campos',
    description:
      'Dor no joelho? Avaliação com ortopedista especialista em joelho em SJC. Artrose, menisco, LCA e condromalácia. Agende sua consulta.',
    eyebrow: 'Ortopedista especialista em joelho · São José dos Campos',
    headline: ['Dor no joelho', 'não é normal.', 'Descubra a causa e trate certo.'],
    sub: 'Artrose, menisco, ligamento ou condromalácia: o Dr. André Elias Junqueira avalia seu caso e monta um plano de tratamento individualizado — em São José dos Campos.',
    bullets: COMMON_BULLETS,
    painsTitle: 'Você se identifica com algum destes sinais?',
    pains: [
      'Dor ao subir ou descer escadas, ou ao levantar da cadeira',
      'Joelho que estala, trava ou "falha" ao andar',
      'Inchaço que vai e volta depois de esforço',
      'Dor que atrapalha o sono ou a atividade física',
      'Já fez fisioterapia ou tomou remédio e a dor voltou',
      'Recebeu indicação de cirurgia e quer uma segunda opinião',
    ],
    conditionsTitle: 'O que tratamos no joelho',
    conditions: bulletLines(joelho.description),
    treatments: joelho.treatments,
    faqs: joelho.faqs,
  },
  {
    slug: 'coluna',
    specialtySlug: 'coluna',
    formSpecialty: 'Coluna Vertebral (Hérnia, Estenose)',
    title: 'Ortopedista especialista em coluna em São José dos Campos',
    description:
      'Dor na coluna, hérnia de disco ou ciático? Avaliação com ortopedista especialista em coluna em SJC. Agende sua consulta.',
    eyebrow: 'Ortopedista especialista em coluna · São José dos Campos',
    headline: ['Dor na coluna', 'ou hérnia de disco?', 'Trate a causa, não só o sintoma.'],
    sub: 'Lombar, cervical, ciático ou hérnia: o Dr. André Elias Junqueira investiga a origem da dor e indica o tratamento menos invasivo possível — em São José dos Campos.',
    bullets: COMMON_BULLETS,
    painsTitle: 'Você se identifica com algum destes sinais?',
    pains: [
      'Dor lombar que piora ao sentar, dirigir ou ficar em pé',
      'Dor que desce pela perna ou pelo braço (formigamento, choque)',
      'Rigidez ao acordar ou dificuldade para se abaixar',
      'Diagnóstico de hérnia de disco e dúvida sobre o que fazer',
      'Já tentou remédio e fisioterapia e a dor continua',
      'Recebeu indicação de cirurgia e quer uma segunda opinião',
    ],
    conditionsTitle: 'O que tratamos na coluna',
    conditions: bulletLines(coluna.description),
    treatments: coluna.treatments,
    faqs: coluna.faqs,
  },
  {
    slug: 'quadril',
    specialtySlug: 'quadril',
    formSpecialty: 'Quadril (Artrose, FAI)',
    title: 'Ortopedista especialista em quadril em São José dos Campos',
    description:
      'Dor no quadril, artrose ou bursite? Avaliação com ortopedista especialista em quadril em SJC. Agende sua consulta.',
    eyebrow: 'Ortopedista especialista em quadril · São José dos Campos',
    headline: ['Dor no quadril', 'limitando seus passos?', 'Vamos descobrir a causa.'],
    sub: 'Artrose, bursite, impacto ou lesão do labrum: o Dr. André Elias Junqueira avalia seu quadril e propõe um plano para recuperar mobilidade — em São José dos Campos.',
    bullets: COMMON_BULLETS,
    painsTitle: 'Você se identifica com algum destes sinais?',
    pains: [
      'Dor na virilha ou na lateral do quadril ao caminhar',
      'Dificuldade para calçar sapatos, cruzar as pernas ou sair do carro',
      'Dor que piora ao deitar de lado à noite',
      'Rigidez ao levantar depois de ficar sentado',
      'Diagnóstico de artrose e medo de precisar de prótese',
      'Recebeu indicação de cirurgia e quer uma segunda opinião',
    ],
    conditionsTitle: 'O que tratamos no quadril',
    conditions: bulletLines(quadril.description),
    treatments: quadril.treatments,
    faqs: quadril.faqs,
  },
  {
    slug: 'ombro',
    specialtySlug: 'ombro-cotovelo',
    formSpecialty: 'Ombro e Cotovelo',
    title: 'Ortopedista especialista em ombro em São José dos Campos',
    description:
      'Dor no ombro, tendinite ou lesão do manguito? Avaliação com ortopedista especialista em ombro em SJC. Agende sua consulta.',
    eyebrow: 'Ortopedista especialista em ombro · São José dos Campos',
    headline: ['Dor no ombro', 'que não passa?', 'Levante o braço sem sofrer.'],
    sub: 'Tendinite, bursite, manguito rotador ou ombro congelado: o Dr. André Elias Junqueira identifica a causa e trata com o mínimo de intervenção — em São José dos Campos.',
    bullets: COMMON_BULLETS,
    painsTitle: 'Você se identifica com algum destes sinais?',
    pains: [
      'Dor ao levantar o braço, pentear o cabelo ou vestir uma blusa',
      'Dor no ombro que acorda você à noite ao deitar de lado',
      'Perda de força ou sensação de ombro "solto"',
      'Estalos ou travamento no movimento',
      'Já fez fisioterapia e a dor voltou',
      'Recebeu indicação de cirurgia e quer uma segunda opinião',
    ],
    conditionsTitle: 'O que tratamos no ombro e cotovelo',
    conditions: bulletLines(ombro.description),
    treatments: ombro.treatments,
    faqs: ombro.faqs,
  },
  {
    slug: 'ortopedista',
    specialtySlug: null,
    formSpecialty: 'Outro / Avaliação Geral',
    title: 'Ortopedista em São José dos Campos — Dr. André Elias Junqueira',
    description:
      'Ortopedista em São José dos Campos. Consulta com cirurgião ortopédico, CRM-SP, joelho, coluna, quadril, ombro. Agende sua consulta.',
    eyebrow: 'Ortopedista · São José dos Campos',
    headline: ['Ortopedista em', 'São José dos Campos', 'para tratar sua dor com precisão.'],
    sub: 'Joelho, coluna, quadril, ombro, pé ou mão: o Dr. André Elias Junqueira, cirurgião ortopédico, avalia seu caso e monta um plano de tratamento individualizado — no Jardim Aquarius.',
    bullets: COMMON_BULLETS,
    painsTitle: 'Procure um ortopedista se você sente',
    pains: [
      'Dor em alguma articulação há mais de duas semanas',
      'Dor que limita trabalho, exercício ou sono',
      'Inchaço, estalo, travamento ou perda de força',
      'Dor após queda, torção ou esforço',
      'Diagnóstico de artrose, hérnia ou tendinite sem plano claro',
      'Indicação de cirurgia e vontade de ouvir uma segunda opinião',
    ],
    conditionsTitle: 'Áreas que tratamos',
    conditions: [
      'Joelho — artrose, menisco, LCA, condromalácia',
      'Coluna — hérnia de disco, lombalgia, ciático, estenose',
      'Quadril — artrose, bursite, impacto femoroacetabular',
      'Ombro e cotovelo — manguito rotador, tendinite, ombro congelado',
      'Pé e tornozelo — fascite plantar, entorse, tendão de Aquiles',
      'Mãos e punhos — túnel do carpo, dedo em gatilho, tendinites',
    ],
    treatments: [
      'Avaliação clínica e diagnóstico por imagem',
      'Infiltrações guiadas',
      'Terapias regenerativas quando indicadas',
      'Reabilitação com foco funcional',
      'Cirurgia minimamente invasiva',
      'Artroscopia',
    ],
    faqs: [
      joelho.faqs[0],
      coluna.faqs[3],
      {
        q: 'Preciso de encaminhamento para marcar consulta?',
        a: 'Não. Você pode agendar diretamente. Se já tiver exames (raio-X, ressonância, ultrassom), leve-os à consulta — eles ajudam a acelerar o diagnóstico.',
      },
      {
        q: 'Onde fica o consultório?',
        a: 'Rua Armando de Oliveira Cobra, 50, sala 712 — Jardim Aquarius, São José dos Campos. Atendimento de segunda a sexta, das 8h às 18h.',
      },
      quadril.faqs[0],
    ],
  },
]

export const lpSlugs = landingPages.map((lp) => lp.slug)

export function getLandingPage(slug: string): LpConfig | undefined {
  return landingPages.find((lp) => lp.slug === slug)
}
