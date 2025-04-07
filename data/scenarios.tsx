import { Smartphone, MessageCircle, School, Users, Globe, AlertTriangle } from "lucide-react"
import type { Scenario } from "@/types/game"

export const scenarios: Scenario[] = [
  {
    id: "upset-child",
    text: "Seu filho de 10 anos parece muito chateado depois de usar o celular. Ao perguntar o que aconteceu, ele se esquiva e não quer falar.",
    icon: <Smartphone className="h-10 w-10 text-slate-700" />,
    difficulty: "beginner",
    interactionType: "multiple-choice",
    options: [
      "Ignorar, pois crianças resolvem essas coisas sozinhas.",
      "Tirar o celular dele como precaução.",
      "Conversar abertamente, demonstrar apoio e tentar entender a situação.",
      "Verificar o celular dele sem permissão para descobrir o que aconteceu.",
    ],
    correctAnswer: 2,
    correctFeedback:
      "Construir confiança é fundamental para que os filhos se sintam seguros para compartilhar suas experiências online. Observar mudanças de humor e estar atento são os primeiros passos para identificar possíveis problemas.",
    incorrectFeedback:
      "Esta abordagem pode não ser a mais eficaz. Construir um diálogo aberto e demonstrar apoio é essencial para que seu filho se sinta seguro para compartilhar o que está acontecendo.",
    additionalInfo:
      "Mudanças de comportamento, como tristeza, ansiedade ou evitar a escola, podem ser sinais de cyberbullying. Estabeleça uma comunicação aberta e sem julgamentos para que seu filho se sinta confortável em compartilhar suas experiências online.",
    legalInfo:
      "A Lei 13.185/2015 institui o Programa de Combate à Intimidação Sistemática, que inclui o cyberbullying. Pais têm papel fundamental na identificação e no apoio às vítimas.",
    mascot: "dpo",
  },
  {
    id: "social-media-anxiety",
    text: "Você percebe que seu filho adolescente está passando muitas horas nas redes sociais e parece ansioso.",
    icon: <MessageCircle className="h-10 w-10 text-slate-700" />,
    difficulty: "beginner",
    interactionType: "slider",
    sliderConfig: {
      min: 0,
      max: 10,
      step: 1,
      label: "Em uma escala de 0 a 10, quão importante é estabelecer limites de tempo para o uso de redes sociais?",
      unit: "/10",
    },
    correctAnswer: 8, // Valor ideal (com tolerância definida no componente)
    correctFeedback:
      "Estabelecer limites saudáveis é muito importante! Isso ajuda a desenvolver hábitos digitais equilibrados, reduzir a ansiedade e promover outras atividades essenciais para o desenvolvimento.",
    incorrectFeedback:
      "Reconsidere a importância dos limites de tempo. O uso excessivo de redes sociais está associado a problemas de saúde mental em adolescentes, incluindo ansiedade e depressão.",
    additionalInfo:
      "O uso excessivo de redes sociais pode estar relacionado a problemas de saúde mental em adolescentes. Estabeleça momentos livres de telas, incentive atividades offline e converse regularmente sobre as interações online.",
    mascot: "clipboard",
  },
  {
    id: "offensive-messages",
    text: "Um amigo comenta que viu mensagens ofensivas sobre seu filho em um grupo online.",
    icon: <Users className="h-10 w-10 text-slate-700" />,
    difficulty: "intermediate",
    interactionType: "timeline",
    timelineEvents: [
      { id: "talk", content: "Conversar com seu filho sobre a situação" },
      { id: "evidence", content: "Capturar e salvar evidências (prints, mensagens)" },
      { id: "report", content: "Reportar à plataforma onde ocorreu" },
      { id: "school", content: "Comunicar à escola" },
      { id: "authorities", content: "Se necessário, reportar às autoridades" },
    ],
    correctAnswer: ["talk", "evidence", "report", "school", "authorities"],
    correctFeedback:
      "Excelente! Esta é a sequência recomendada de ações. Primeiro entender a situação com seu filho, depois documentar as evidências e então reportar aos canais apropriados.",
    incorrectFeedback:
      "A ordem das ações é importante. Primeiro é essencial conversar com seu filho e entender a situação, depois documentar as evidências antes de tomar outras medidas.",
    additionalInfo:
      "No Brasil, o cyberbullying é considerado crime pela Lei 13.185/2015. Documentar as evidências é crucial caso seja necessário tomar medidas legais. Muitas plataformas têm ferramentas para denunciar conteúdo abusivo.",
    legalInfo:
      "O Marco Civil da Internet (Lei 12.965/2014) estabelece princípios e garantias para o uso da internet no Brasil, incluindo a proteção da privacidade e dos dados pessoais.",
  },
  {
    id: "new-social-network",
    text: "Seu filho mais novo pede para criar um perfil em uma nova rede social que você nunca ouviu falar.",
    icon: <Globe className="h-10 w-10 text-slate-700" />,
    difficulty: "intermediate",
    interactionType: "drag-drop",
    items: [
      { id: "research", content: "Pesquisar sobre a rede social" },
      { id: "age", content: "Verificar a idade mínima recomendada" },
      { id: "privacy", content: "Analisar as configurações de privacidade" },
      { id: "friends", content: "Perguntar quais amigos usam a rede" },
      { id: "content", content: "Verificar o tipo de conteúdo compartilhado" },
      { id: "allow", content: "Permitir o uso sem restrições" },
    ],
    categories: [
      { id: "recommended", name: "Ações Recomendadas" },
      { id: "not-recommended", name: "Ações Não Recomendadas" },
    ],
    correctAnswer: {
      recommended: ["research", "age", "privacy", "friends", "content"],
      "not-recommended": ["allow"],
    },
    correctFeedback:
      "Correto! Antes de permitir o uso de uma nova rede social, é importante fazer uma avaliação completa da plataforma, incluindo idade mínima, configurações de privacidade e tipo de conteúdo.",
    incorrectFeedback:
      "Revise sua classificação. Permitir o uso sem restrições não é recomendado sem antes fazer uma avaliação completa da plataforma.",
    additionalInfo:
      "Muitas redes sociais têm idade mínima de 13 anos devido à lei americana COPPA. Verifique as configurações de privacidade juntos e explique a importância de não compartilhar informações pessoais online.",
    mascot: "clipboard",
  },
  {
    id: "school-cyberbullying",
    text: "A escola do seu filho enviou um comunicado sobre um caso de cyberbullying envolvendo alunos.",
    icon: <School className="h-10 w-10 text-slate-700" />,
    difficulty: "advanced",
    interactionType: "chat",
    chatPrompt:
      "Como pai/mãe responsável, o que você faria ao receber este comunicado da escola sobre cyberbullying? Descreva suas ações.",
    correctAnswer: ["conversar", "filho", "escola", "política", "prevenção", "apoio"],
    correctFeedback:
      "Excelente resposta! Você mencionou elementos importantes como conversar com seu filho, entrar em contato com a escola e buscar entender as políticas de prevenção.",
    incorrectFeedback:
      "Sua resposta poderia incluir mais elementos importantes como conversar com seu filho para verificar seu envolvimento ou conhecimento, contatar a escola para entender as medidas sendo tomadas, e discutir estratégias de prevenção.",
    additionalInfo:
      "As escolas têm responsabilidade legal de implementar ações de prevenção e combate ao bullying, incluindo o cyberbullying. A Lei 13.185/2015 estabelece que instituições de ensino devem adotar medidas de conscientização, prevenção e combate ao bullying.",
    legalInfo:
      "A Lei Geral de Proteção de Dados (LGPD) também se aplica a dados de crianças e adolescentes, exigindo consentimento específico dos pais para coleta e tratamento desses dados.",
    mascot: "dpo",
  },
  {
    id: "intimate-photos",
    text: "Você descobre que seu filho está sendo pressionado a enviar fotos íntimas em um aplicativo de mensagens.",
    icon: <AlertTriangle className="h-10 w-10 text-slate-700" />,
    difficulty: "advanced",
    interactionType: "multiple-choice",
    options: [
      "Punir seu filho por estar envolvido nesse tipo de conversa.",
      "Ignorar, pois provavelmente é apenas uma fase da adolescência.",
      "Conversar seriamente sobre os riscos, oferecer apoio e, se necessário, buscar ajuda profissional e reportar às autoridades.",
      "Apenas deletar o aplicativo do celular dele.",
    ],
    correctAnswer: 2,
    correctFeedback:
      "É fundamental abordar a situação com seriedade, explicando os riscos legais e emocionais do compartilhamento de imagens íntimas. Ofereça apoio emocional, busque ajuda profissional se necessário e, dependendo da gravidade, reporte às autoridades.",
    incorrectFeedback:
      "Esta abordagem pode não ser a mais adequada para lidar com uma situação tão séria. É importante oferecer apoio, educação e, se necessário, buscar ajuda profissional.",
    additionalInfo:
      "No Brasil, a produção, posse ou compartilhamento de imagens íntimas de menores de 18 anos é crime, mesmo entre adolescentes. O Marco Civil da Internet (Lei 12.965/2014) também prevê a remoção de conteúdo íntimo compartilhado sem consentimento.",
    legalInfo:
      "O Estatuto da Criança e do Adolescente (ECA) tipifica como crime a produção, reprodução, venda ou divulgação de imagens pornográficas envolvendo crianças ou adolescentes.",
    context:
      "Esta é uma situação grave que requer atenção imediata. A pressão para enviar imagens íntimas (sexting) é uma forma de abuso que pode ter consequências legais e emocionais sérias.",
    mascot: "dpo",
  },
]

