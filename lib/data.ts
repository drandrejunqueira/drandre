// ============================================================
// DATA LAYER — Dr. André Elias Junqueira
// Fonte: drandreortopedia.com.br
// ============================================================

export const doctor = {
  name: 'Dr. André Elias Junqueira',
  shortName: 'Dr. André',
  title: 'Cirurgião Ortopédico',
  tagline: 'Bem-vindo à nova ortopedia: mais inovação e menos dor.',
  description:
    'Cirurgião ortopédico com atuação focada em prevenção, terapias regenerativas e cirurgia minimamente invasiva. Aqui, seu tratamento é feito de forma individualizada, com base em ciência, tecnologia médica de ponta e foco total em qualidade de vida.',
  about: `Sou o Dr. André Elias Junqueira, cirurgião ortopédico com atuação focada em prevenção, terapias regenerativas e cirurgia minimamente invasiva. Aqui, seu tratamento é feito de forma individualizada, com base em ciência, tecnologia médica de ponta e foco total em qualidade de vida.

Se você sofre com dores no joelho, coluna, ombro ou outras articulações — ou deseja prevenir desgastes e evitar cirurgias —, este é o seu lugar.

Com as técnicas mais modernas da medicina ortopédica, trabalhamos para que você recupere sua mobilidade com segurança e agilidade.`,
  media: [
    { type: 'TV', name: 'BAND TV', description: 'Revolução no Tratamento da Dor e Artrose com Medicina Regenerativa' },
    { type: 'Revista', name: 'Revista Especializada', description: 'Referência em ortopedia regenerativa na mídia especializada' },
  ],
  phones: {
    whatsapp: '5511910600503',
    whatsappDisplay: '(11) 91060-0503',
    consultorio: '(12) 98176-7896',
    consultorioHref: '+5512981767896',
  },
  address: {
    street: 'Rua Armando de Oliveira Cobra, 50 | Sala 712',
    neighborhood: 'Jardim Aquarius',
    city: 'São José dos Campos – SP',
    full: 'Rua Armando de Oliveira Cobra, 50 | Sala 712, Jardim Aquarius, São José dos Campos – SP',
  },
  email: 'contato@drandreortopedia.com.br',
  hours: 'Seg – Sex: 8h às 18h',
  social: {
    instagram: '#',
    facebook: '#',
  },
}

export const stats = [
  { number: '6', suffix: '+', label: 'Áreas de Especialidade', icon: '🦴' },
  { number: '3', suffix: '', label: 'Terapias Regenerativas', icon: '🔬' },
  { number: '10', suffix: '+', label: 'Anos de Experiência', icon: '⚕️' },
  { number: 'SJC', suffix: '', label: 'São José dos Campos – SP', icon: '📍' },
]

export const specialties = [
  {
    slug: 'ombro-cotovelo',
    name: 'Ombro e Cotovelo',
    shortDesc: 'Diagnóstico e tratamento de lesões do manguito rotador, tendinites, instabilidades e dores crônicas.',
    description: `O ombro é a articulação com maior amplitude de movimento do corpo humano, o que o torna suscetível a diversas lesões. O Dr. André Elias Junqueira é especialista no diagnóstico e tratamento de condições como:

- Lesão do manguito rotador
- Síndrome do impacto (pinçamento) do ombro
- Instabilidade e luxação do ombro
- Tendinite do bíceps
- Artrose glenoumeral
- Lesões do labrum (SLAP)
- Bursite subescapular
- Capsulite adesiva (ombro congelado)

Para o cotovelo, tratamos epicondilite lateral (cotovelo do tenista), epicondilite medial (cotovelo do golfista), lesões ligamentares e artrose.`,
    treatments: ['Artroscopia do ombro', 'Reparo do manguito rotador', 'Estabilização cirúrgica', 'PRP para tendinites', 'Infiltração de ácido hialurônico', 'Fisioterapia orientada'],
    faqs: [
      { q: 'Como se chama o médico que cuida do ombro?', a: 'O especialista em ombro é o ortopedista, especialmente aquele com foco em articulações e cirurgia minimamente invasiva.' },
      { q: 'Quando devo procurar um especialista para dor no ombro?', a: 'Quando a dor dura mais de 7–14 dias, impede levantar o braço, acorda à noite ou surgiu após uma lesão.' },
      { q: 'Como tratar tendinite no ombro?', a: 'O tratamento envolve o diagnóstico preciso, que após confirmado, pode orientar fisioterapia, correção de movimento, PRP (Plasma Rico em Plaquetas), medicações e, em alguns casos, artroscopia.' },
      { q: 'O que pode causar dor no cotovelo?', a: 'A dor no cotovelo pode estar associada a sobrecarga, prática esportiva, movimentos repetitivos, tendinopatias (epicondilite lateral/medial) ou compressão nervosa.' },
      { q: 'Quanto custa uma cirurgia de ombro particular?', a: 'O valor de uma Cirurgia de Ombro varia conforme o tipo da lesão, materiais necessários e complexidade técnica. Para obter detalhes sobre o investimento, realize uma avaliação individualizada.' },
      { q: 'Artroscopia dói?', a: 'A artroscopia é realizada com pequenas incisões (furos), o que gera muito menos desconforto e menos dor no pós-operatório quando comparada às cirurgias abertas, resultando em uma recuperação mais rápida.' }
    ],
    icon: '💪',
    color: 'from-blue-500 to-blue-600',
  },
  {
    slug: 'coluna',
    name: 'Coluna Vertebral',
    shortDesc: 'Tratamento da hérnia de disco, escoliose, estenose e dores na coluna cervical, torácica e lombar.',
    description: `A coluna vertebral é a estrutura central do nosso sistema musculoesquelético. As dores na coluna estão entre as queixas mais frequentes no consultório ortopédico.

O Dr. André trata condições em toda a extensão da coluna:

**Coluna Cervical:**
- Hérnia de disco cervical
- Estenose cervical
- Cervicalgia crônica
- Radiculopatia cervical

**Coluna Torácica:**
- Escoliose
- Cifose
- Dores torácicas

**Coluna Lombar:**
- Hérnia de disco lombar
- Estenose do canal lombar
- Lombociatalgia
- Espondilolistese
- Lombalgia crônica`,
    treatments: ['Cirurgia minimamente invasiva', 'Microdiscectomia', 'Infiltrações epidurais', 'Denervação por radiofrequência', 'PRP intradiscal', 'Fisioterapia especializada'],
    faqs: [
      { q: 'Quem trata hérnia de disco?', a: 'O ortopedista especialista em coluna é o profissional indicado para diagnosticar e tratar hérnias de disco, oferecendo desde opções conservadoras modernas até técnicas cirúrgicas inovadoras.' },
      { q: 'O que é discectomia a laser?', a: 'É um procedimento minimamente invasivo de alta tecnologia que utiliza o laser para descomprimir ou remover a parte da hérnia de disco que comprime as raízes nervosas, aliviando a dor de forma ágil.' },
      { q: 'Dor lombar precisa sempre de cirurgia?', a: 'Não. Na grande maioria dos casos, tratamentos clínicos, fisioterapia especializada, infiltrações guiadas e terapias regenerativas conseguem controlar a dor de forma eficaz, sem necessidade de cirurgia.' },
      { q: 'Ortopedista ou neurocirurgião: quem devo procurar?', a: 'O ortopedista especialista em coluna trata problemas estruturais, mecânicos e degenerativos (como artrose, hérnia e dores crônicas). O neurocirurgião é focado em condições neurológicas graves ou compressões severas da medula.' }
    ],
    icon: '🦴',
    color: 'from-teal-500 to-teal-600',
  },
  {
    slug: 'quadril',
    name: 'Quadril',
    shortDesc: 'Tratamento da artrose, bursites, síndromes de impacto e lesões do labrum com técnicas modernas.',
    description: `O quadril é uma das articulações mais robustas do corpo, mas também sujeita a desgastes e lesões, especialmente em pessoas ativas e idosos.

O Dr. André Elias Junqueira trata:

- Artrose do quadril (coxartrose)
- Síndrome do impacto femoroacetabular (FAI)
- Lesão do labrum acetabular
- Bursites do quadril
- Tendinopatia dos abdutores
- Necrose avascular da cabeça do fêmur
- Fraturas do colo do fêmur`,
    treatments: ['Artroscopia do quadril', 'Infiltração de PRP', 'Ácido hialurônico', 'Células-tronco (BMAC)', 'Osteotomia pélvica', 'Prótese total do quadril'],
    faqs: [
      { q: 'Como tratar a artrose de quadril sem cirurgia?', a: 'As terapias regenerativas (PRP, BMAC, ácido hialurônico) combinadas a reabilitação funcional focada ajudam a lubrificar a articulação, controlar a dor e postergar ou evitar a cirurgia de prótese.' },
      { q: 'O que causa dor lateral no quadril?', a: 'Frequentemente está associada à Síndrome de Dor Trocantérica Maior, que envolve bursite trocantérica e tendinopatia (inflamação ou microlesões) dos tendões glúteos.' }
    ],
    icon: '🏃',
    color: 'from-purple-500 to-purple-600',
  },
  {
    slug: 'joelho',
    name: 'Joelho',
    shortDesc: 'Tratamento de lesões do LCA, menisco, artrose do joelho, condromalácia e outras condições.',
    description: `A dor no joelho é uma das queixas mais comuns no consultório ortopédico, tanto entre pessoas mais velhas, quanto em adultos ativos e praticantes de atividade física.

Em muitos casos, ela começa de forma leve, mas pode evoluir e impactar diretamente a qualidade de vida.

O Dr. André trata:

- Lesão do ligamento cruzado anterior (LCA)
- Lesão do ligamento cruzado posterior (LCP)
- Lesão meniscal (menisco medial e lateral)
- Condromalácia patelar
- Artrose do joelho (gonartrose)
- Tendinite patelar
- Síndrome de dor patelofemoral
- Corpo livre articular`,
    treatments: ['Reconstrução do LCA', 'Meniscectomia / sutura meniscal', 'PRP para artrose', 'Ácido hialurônico', 'BMAC (células-tronco)', 'Prótese total do joelho'],
    faqs: [
      { q: 'Qual médico cuida de lesões no joelho?', a: 'O ortopedista especialista em joelho é o profissional indicado para diagnosticar e tratar todas as condições clínicas, de dores simples a lesões ligamentares complexas ou desgaste de cartilagem.' },
      { q: 'Quando é necessário operar o joelho?', a: 'A cirurgia é recomendada para lesões graves (como rupturas de ligamento completo como LCA em pacientes ativos ou lesões de menisco instáveis) ou quando o tratamento clínico/regenerativo não obteve sucesso.' },
      { q: 'PRP ajuda na artrose de joelho?', a: 'Sim. O Plasma Rico em Plaquetas (PRP) é um excelente aliado no alívio de dor, na redução do processo inflamatório e na melhora funcional de articulações com artrose leve a moderada.' },
      { q: 'Quanto tempo leva para se recuperar de uma cirurgia no joelho?', a: 'Varia com o tipo de cirurgia. Procedimentos simples como artroscopia de menisco têm retorno rápido (poucas semanas). Reconstruções ligamentares complexas exigem de 6 a 9 meses de fisioterapia focada.' }
    ],
    icon: '🦵',
    color: 'from-orange-500 to-orange-600',
  },
  {
    slug: 'pe-tornozelo',
    name: 'Pé e Tornozelo',
    shortDesc: 'Avaliação e tratamento de fascite plantar, entorses, tendão de Aquiles e deformidades do pé.',
    description: `Os pés e tornozelos sustentam o peso de todo o corpo e estão sujeitos a diversas lesões e deformidades, especialmente em atletas e pessoas que ficam muito tempo em pé.

Condições tratadas:

- Fascite plantar e esporão de calcâneo
- Tendinite e ruptura do tendão de Aquiles
- Entorse e instabilidade do tornozelo
- Hallux valgus (joanete)
- Deformidades dos dedos (dedo em martelo)
- Artrose do tornozelo
- Sindesmose e lesões ligamentares
- Neuroma de Morton`,
    treatments: ['PRP para fascite plantar', 'Reparo do tendão de Aquiles', 'Artroscopia do tornozelo', 'Correção de joanete', 'Infiltrações guiadas', 'Palmilhas ortopédicas'],
    faqs: [
      { q: 'Como tratar a fascite plantar resistente?', a: 'O tratamento une alongamentos específicos, fisioterapia e palmilhas customizadas. Em casos resistentes, infiltrações guiadas por ultrassom de ácido hialurônico ou PRP aceleram a cicatrização.' },
      { q: 'Entorse de tornozelo sempre precisa de gesso?', a: 'Não. Atualmente, prioriza-se a mobilização precoce protegida com órteses específicas (robofoot/imobilizadores) e reabilitação funcional ativa para evitar a rigidez articular.' }
    ],
    icon: '👟',
    color: 'from-green-500 to-green-600',
  },
  {
    slug: 'maos-punhos',
    name: 'Mãos e Punhos',
    shortDesc: 'Tratamento da síndrome do túnel do carpo, tendinites, cistos e lesões ligamentares.',
    description: `As mãos e punhos são estruturas complexas que permitem movimentos finos e precisos. Lesões nessa região podem impactar significativamente a qualidade de vida e capacidade de trabalho.

O Dr. André Elias Junqueira trata:

- Síndrome do túnel do carpo
- Tendinite de De Quervain
- Dedo em gatilho (tenossinovite)
- Cistos ganglionares
- Fraturas do punho (Colles, Smith)
- Lesões ligamentares do punho
- Artrose da base do polegar (rizartrose)
- Dedos em martelo e garra`,
    treatments: ['Liberação do túnel do carpo', 'Tenossinovectomia', 'Remoção de cistos', 'PRP para tendinites', 'Infiltrações de corticoide', 'Cirurgia percutânea'],
    faqs: [
      { q: 'Como aliviar a Síndrome do Túnel do Carpo?', a: 'Além de ergonomia e uso de órtese noturna, infiltrações guiadas ajudam no controle da dor inicial. Casos refratários ou graves respondem de forma excelente à liberação cirúrgica minimamente invasiva.' },
      { q: 'O que causa o dedo em gatilho?', a: 'É causado pela inflamação da bainha do tendão flexor (tenossinovite), fazendo com que o dedo trave em posição dobrada. O tratamento clínico envolve repouso, órtese, infiltrações ou liberação percutânea rápida.' }
    ],
    icon: '🤲',
    color: 'from-red-500 to-red-600',
  },
]

export const services = [
  {
    slug: 'ortopedia-regenerativa',
    name: 'Ortopedia Regenerativa',
    tagline: 'Trate sem cirurgia com a força do seu próprio corpo',
    description: `A ortopedia regenerativa representa uma revolução no tratamento de lesões e doenças articulares. Em vez de simplesmente aliviar sintomas, estas terapias estimulam o próprio organismo a regenerar os tecidos danificados.

Você sabia que é possível tratar artrose, tendinites e lesões musculares sem cirurgia? Com as terapias regenerativas, seu próprio corpo pode ser estimulado a se curar, reduzindo dor e devolvendo mobilidade.`,
    techniques: [
      {
        name: 'PRP — Plasma Rico em Plaquetas',
        abbr: 'PRP',
        description: 'O Plasma Rico em Plaquetas (PRP) é obtido através do próprio sangue do paciente. Após centrifugação, é concentrado com plaquetas que liberam fatores de crescimento, estimulando a regeneração tecidual e reduzindo inflamação.',
        benefits: ['Sem risco de rejeição', 'Procedimento ambulatorial', 'Resultado duradouro', 'Baixo risco de complicações'],
      },
      {
        name: 'BMAC — Células-tronco da Medula Óssea',
        abbr: 'BMAC',
        description: 'O BMAC (Bone Marrow Aspirate Concentrate) é obtido da medula óssea do próprio paciente e concentrado para uso nas articulações danificadas. Contém células mesenquimais com alto potencial regenerativo.',
        benefits: ['Alta capacidade regenerativa', 'Material autólogo (do próprio corpo)', 'Indicado para artrose avançada', 'Pode evitar a prótese'],
      },
      {
        name: 'SVF — Fração Vascular Estromal',
        abbr: 'SVF',
        description: 'Obtida do tecido adiposo do paciente e processada com tecnologia de ponta, a Fração Vascular Estromal (SVF) é extremamente rica em células progenitoras e substâncias bioativas que reduzem a inflamação e promovem o reparo tecidual.',
        benefits: ['Excelente potencial anti-inflamatório', 'Uso autólogo (material próprio)', 'Indicada para maior degeneração articular', 'Altamente segura e moderna'],
      },
      {
        name: 'Ácido Hialurônico',
        abbr: 'AH',
        description: 'A viscossuplementação com ácido hialurônico repõe o líquido sinovial da articulação, restaurando sua lubrificação natural, reduzindo dor e melhorando a mobilidade.',
        benefits: ['Alívio rápido da dor', 'Melhora da mobilidade', 'Procedimento simples', 'Efeito de 6 a 12 meses'],
      },
      {
        name: 'Reabilitação com Foco Funcional',
        abbr: 'REAB',
        description: 'Programa individualizado de reabilitação que complementa as terapias regenerativas, com exercícios específicos para cada condição e objetivo do paciente.',
        benefits: ['Retorno rápido à atividade', 'Fortalecimento muscular', 'Prevenção de recidivas', 'Acompanhamento especializado'],
      },
    ],
    faqs: [
      { q: 'As terapias regenerativas são seguras?', a: 'Sim, por utilizarem material autólogo (do próprio paciente), o risco de rejeição é inexistente e o perfil de segurança é extremamente elevado.' },
      { q: 'Qual a diferença entre PRP e BMAC?', a: 'O PRP é extraído do sangue periférico, sendo ideal para tendinites e artroses leves. O BMAC é extraído da medula óssea, concentrando células-tronco ideais para casos de desgaste articular mais avançado.' },
      { q: 'Quanto tempo leva para sentir melhora?', a: 'O processo regenerativo ocorre de forma progressiva. Muitos pacientes relatam redução da dor nas primeiras semanas, com melhora contínua por até 6 meses após o procedimento.' }
    ],
    conditions: ['Artrose do joelho', 'Artrose do quadril', 'Tendinites crônicas', 'Lesões musculares', 'Bursite', 'Sinovite', 'Condromalácia'],
    icon: '🔬',
  },
  {
    slug: 'cirurgia-minimamente-invasiva',
    name: 'Cirurgia Minimamente Invasiva',
    tagline: 'Quando a cirurgia é necessária, a escolha certa faz toda a diferença',
    description: `Quando a cirurgia é necessária, a escolha certa faz toda a diferença. Com técnicas menos agressivas, mais precisas e com recuperação rápida, tratamos condições que antes exigiam cirurgias abertas de grande porte.

A cirurgia minimamente invasiva utiliza incisões mínimas, câmeras e instrumentos especializados para realizar procedimentos com menor trauma aos tecidos saudáveis.`,
    benefits: [
      { icon: '✅', title: 'Menor Dor', desc: 'Incisões menores resultam em menos dor no pós-operatório' },
      { icon: '🏠', title: 'Menos Internação', desc: 'Procedimentos ambulatoriais ou com 1-2 dias de internação' },
      { icon: '🏃', title: 'Recuperação Rápida', desc: 'Retorno mais ágil às atividades normais e ao trabalho' },
      { icon: '🎯', title: 'Alta Precisão', desc: 'Visualização magnificada para maior precisão cirúrgica' },
      { icon: '🩺', title: 'Menor Sangramento', desc: 'Menos perda sanguínea e menor risco de infecção' },
      { icon: '✨', title: 'Melhor Estética', desc: 'Cicatrizes menores e menos visíveis' },
    ],
    conditions: ['Hérnia de disco', 'Lesão de manguito rotador', 'Artrose avançada', 'Reparos tendíneos', 'Lesões no joelho', 'Lesões no quadril', 'Lesões na coluna'],
    icon: '⚡',
  },
]

export const preventionItems = [
  {
    icon: '🩺',
    title: 'Avaliação Ortopédica Preventiva',
    desc: 'Consulta completa para identificar riscos e vulnerabilidades antes que se tornem problemas sérios de saúde articular.',
  },
  {
    icon: '⚡',
    title: 'Check-up de Desempenho Funcional',
    desc: 'Avaliação biomecânica para otimizar sua performance e prevenir lesões em atletas e pessoas fisicamente ativas.',
  },
  {
    icon: '🎯',
    title: 'Rastreamento de Sobrecargas',
    desc: 'Identificação precoce de sobrecargas articulares antes que evoluam para lesões ou desgastes crônicos.',
  },
  {
    icon: '🌱',
    title: 'Cuidados na Maturidade',
    desc: 'Programa especial de cuidados com a mobilidade e qualidade de vida para cada fase da vida.',
  },
]

export const blogPosts = [
  {
    slug: 'dor-no-joelho-quando-se-preocupar',
    title: 'Dor no Joelho: Quando se Preocupar e Como Evitar a Prótese',
    excerpt: 'A dor no joelho é uma das queixas mais comuns no consultório ortopédico, tanto entre pessoas mais velhas, quanto em adultos ativos e praticantes de atividade física.',
    content: `A dor no joelho é uma das queixas mais comuns no consultório ortopédico, tanto entre pessoas mais velhas, quanto em adultos ativos e praticantes de atividade física. Em muitos casos, ela começa de forma leve, mas pode evoluir e impactar diretamente a qualidade de vida.

## Quando a dor no joelho é sinal de alerta?

Nem toda dor no joelho requer intervenção cirúrgica imediata. No entanto, alguns sinais indicam que é hora de procurar um especialista:

- **Dor persistente por mais de 2 semanas**
- **Inchaço ou vermelhidão sem causa aparente**
- **Limitação de movimento** (dificuldade para dobrar ou estender o joelho)
- **Instabilidade** — sensação de que o joelho vai "ceder"
- **Crepitação** (estalos) acompanhados de dor
- **Dor que piora à noite** ou em repouso

## Como evitar a prótese do joelho?

A boa notícia é que, com o diagnóstico precoce e o tratamento adequado, é possível evitar — ou pelo menos postergar — a necessidade de prótese total do joelho.

### Terapias Conservadoras

1. **Fisioterapia** — fortalecimento muscular reduz a sobrecarga articular
2. **Perda de peso** — cada kilo a menos alivia cerca de 3-4 kg na articulação do joelho
3. **Atividade física adaptada** — exercícios de baixo impacto (natação, ciclismo)

### Terapias Regenerativas

- **PRP (Plasma Rico em Plaquetas)** — estimula a regeneração da cartilagem
- **Ácido Hialurônico** — melhora a lubrificação e amortecimento articular
- **BMAC** — células-tronco para casos de artrose moderada a grave

## Conclusão

O segredo para evitar a prótese é não esperar a dor se tornar insuportável. Consultar um ortopedista ao primeiro sinal de problema pode fazer toda a diferença no prognóstico e nas opções de tratamento disponíveis.`,
    author: 'Dr. André Elias Junqueira',
    date: '15 de abril, 2025',
    readTime: '4 min',
    category: 'Joelho',
    emoji: '🦵',
    image: '/image/blog-joelho.png',
    type: 'type-1',
  },
  {
    slug: 'tratamento-regenerativo-como-evitar-cirurgias',
    title: 'Tratamento Regenerativo na Ortopedia: como evitar cirurgias desnecessárias',
    excerpt: 'A evolução da ortopedia trouxe uma mudança importante na forma de tratar dores articulares e lesões musculoesqueléticas.',
    content: `A evolução da ortopedia trouxe uma mudança importante na forma de tratar dores articulares e lesões musculoesqueléticas. Hoje, antes de indicar uma cirurgia, muitos casos podem ser conduzidos com abordagens menos invasivas, focadas na regeneração dos tecidos.

## O que é a Ortopedia Regenerativa?

A ortopedia regenerativa é um campo da medicina que utiliza substâncias bioativas — como plaquetas, células-tronco e ácido hialurônico — para estimular o próprio organismo a se recuperar de lesões e doenças articulares.

## Quando indicar terapias regenerativas?

As terapias regenerativas são indicadas para:

- **Artrose** de joelho, quadril e ombro (graus iniciais a moderados)
- **Tendinites crônicas** (manguito rotador, tendão de Aquiles, patelar)
- **Lesões musculares** de repetição
- **Condromalácia** patelar
- **Síndrome do impacto** no ombro
- **Fasciite plantar** resistente ao tratamento convencional

## Por que evitar cirurgias desnecessárias?

Toda cirurgia carrega riscos, mesmo quando realizada por cirurgiões experientes:

- Risco anestésico
- Infecção pós-operatória
- Trombose venosa profunda
- Tempo de recuperação mais longo
- Necessidade de afastamento do trabalho

Com as terapias regenerativas, muitos pacientes conseguem resultados semelhantes — ou até superiores — sem passar pelos riscos e pelo tempo de recuperação de uma cirurgia.

## Conclusão

A ortopedia moderna avançou muito nos últimos anos. Hoje, temos ferramentas que permitem tratar a maioria das condições articulares de forma menos invasiva, com resultados cada vez melhores. Consulte sempre um especialista para avaliar a melhor opção para o seu caso.`,
    author: 'Dr. André Elias Junqueira',
    date: '15 de abril, 2025',
    readTime: '4 min',
    category: 'Regenerativa',
    emoji: '🔬',
    image: '/image/blog-regenerativa.png',
    type: 'type-2',
  },
  {
    slug: 'terapias-regenerativas-nova-era',
    title: 'Terapias Regenerativas: Uma Nova Era no Tratamento de Dores e Lesões',
    excerpt: 'As terapias regenerativas vêm ganhando espaço na medicina moderna por usarem recursos do próprio organismo para acelerar a cicatrização.',
    content: `As terapias regenerativas vêm ganhando espaço na medicina moderna justamente por isso: elas usam recursos do próprio organismo para acelerar a cicatrização, diminuir inflamações e até evitar cirurgias.

## O princípio das terapias regenerativas

A ideia central é simples e poderosa: em vez de introduzir substâncias externas no organismo, concentramos e aplicamos componentes que já existem no próprio corpo do paciente — como plaquetas, células-tronco e ácido hialurônico.

## Os três pilares da regeneração

### 1. PRP — Plasma Rico em Plaquetas

O PRP é obtido a partir de uma pequena coleta de sangue do próprio paciente. Após centrifugação, separamos as plaquetas em alta concentração. Quando aplicadas na área afetada, estas plaquetas liberam fatores de crescimento que:

- Estimulam a proliferação celular
- Aceleram a cicatrização
- Reduzem a inflamação crônica
- Promovem a vascularização tecidual

### 2. BMAC — Células-tronco da Medula Óssea

O BMAC representa o que há de mais avançado em medicina regenerativa ortopédica. As células mesenquimais da medula óssea têm capacidade de se diferenciar em diversos tipos celulares, incluindo cartilagem, osso e tendão.

### 3. Ácido Hialurônico

O ácido hialurônico é um componente natural do líquido sinovial das articulações. Com o envelhecimento e o desgaste articular, sua concentração diminui. A reposição via injeção intra-articular restaura a lubrificação e a amortecimento.

## Resultados esperados

Os resultados variam conforme o grau da lesão e a condição geral do paciente, mas em geral observamos:

- Redução significativa da dor em 4-8 semanas
- Melhora da mobilidade articular
- Retorno às atividades em tempo menor do que com cirurgia
- Efeito duradouro de 6 a 18 meses (dependendo da técnica)

## Conclusão

As terapias regenerativas não são "milagres", mas representam um avanço real na medicina ortopédica. Com indicação correta e aplicação por especialistas treinados, oferecem uma alternativa segura e eficaz para milhões de pacientes que sofrem com dores articulares.`,
    author: 'Dr. André Elias Junqueira',
    date: '15 de dezembro, 2025',
    readTime: '5 min',
    category: 'Terapias',
    emoji: '✨',
    image: '/image/blog-terapias.png',
    type: 'type-3',
  },
  {
    slug: 'dor-referida-ombro-causas-sintomas',
    title: 'Dor Referida no Ombro: Causas, Sintomas e Tratamentos',
    excerpt: 'A dor referida no ombro é um tema que merece atenção especial quando se trata de saúde ortopédica.',
    content: `A dor referida no ombro é um tema que merece atenção especial, especialmente quando se trata de saúde ortopédica. Muitas pessoas podem experimentar dor no ombro que, na verdade, tem origem em outra parte do corpo.

## O que é dor referida?

Dor referida é aquela que o paciente sente em um local diferente de onde está a lesão ou o problema real. No caso do ombro, a dor pode originar-se na coluna cervical, no coração, no fígado ou na vesícula biliar.

## Causas mais comuns de dor referida no ombro

### De origem na coluna cervical

A hérnia de disco cervical ou a estenose cervical podem comprimir raízes nervosas que irradiam dor para o ombro, braço e mão. É chamada de radiculopatia cervical.

**Sintomas associados:**
- Dor que piora com movimentos do pescoço
- Formigamento ou dormência no braço
- Fraqueza muscular no membro superior

### De origem cardíaca

O infarto do miocárdio pode se apresentar com dor intensa no ombro esquerdo, especialmente em mulheres. Nesses casos, outros sintomas como dor no peito, falta de ar e sudorese acompanham o quadro.

### De origem visceral (fígado e vesícula)

Problemas na vesícula biliar e no fígado podem causar dor referida no ombro direito, pela irritação do nervo frênico.

## Como diferenciar dor referida de dor local do ombro?

O diagnóstico diferencial é feito através de:

1. **Histórico clínico detalhado**
2. **Exame físico ortopédico** (testes especiais do ombro)
3. **Imagens** — RX, ultrassonografia, ressonância magnética
4. **Eletroneuromiografia** — para avaliar condução nervosa

## Tratamento

O tratamento depende inteiramente da causa real da dor:

- **Origem cervical:** fisioterapia, bloqueios, cirurgia se necessário
- **Origem local no ombro:** fisioterapia, PRP, infiltrações, artroscopia
- **Origem cardíaca:** encaminhamento imediato para cardiologista
- **Origem visceral:** encaminhamento para gastroenterologista

## Conclusão

A dor no ombro merece investigação cuidadosa. Nem sempre o problema está no ombro, e tratar a causa errada prolonga o sofrimento do paciente. Consulte sempre um especialista.`,
    author: 'Dr. André Elias Junqueira',
    date: '3 de outubro, 2025',
    readTime: '4 min',
    category: 'Ombro',
    emoji: '🫱',
    image: '/image/blog-ombro.png',
    type: 'type-4',
  },
]

export const navigation = [
  { label: 'Sobre', href: '/sobre' },
  {
    label: 'Especialidades',
    href: '#',
    children: [
      { label: 'Joelho', href: '/joelho' },
      { label: 'Ombro e Cotovelo', href: '/ombro-cotovelo' },
      { label: 'Coluna Vertebral', href: '/coluna' },
      { label: 'Quadril', href: '/quadril' },
      { label: 'Pé e Tornozelo', href: '/pe-tornozelo' },
      { label: 'Mãos e Punhos', href: '/maos-punhos' },
    ],
  },
  { label: 'Regenerativa', href: '/ortopedia-regenerativa' },
  { label: 'Cirurgia', href: '/cirurgia-minimamente-invasiva' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contato', href: '/contato' },
]
