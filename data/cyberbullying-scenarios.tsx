import { Smartphone, MessageCircle, School, Users, Globe, FileWarning } from "lucide-react"
import type { Scenario } from "@/types/game"

export const cyberbullyingScenarios: Scenario[] = [
  {
    id: "upset-child",
    text: "Seu filho de 10 anos parece muito chateado depois de usar o celular. Ao perguntar o que aconteceu, ele se esquiva e não quer falar.",
    icon: <Smartphone className="h-10 w-10 text-blue-700" />,
    difficulty: "beginner",
    interactionType: "multiple-choice",
    options: [
      "Respeitar o espaço dele e esperar que ele decida falar quando estiver pronto.",
      "Tirar o celular dele como medida preventiva até descobrir o que aconteceu.",
      "Conversar em um momento calmo, demonstrando apoio e observando seu comportamento.",
      "Verificar o celular dele sem permissão para descobrir o que está acontecendo.",
    ],
    correctAnswer: 2,
    correctFeedback:
      "Excelente escolha! Abordar a situação com calma, demonstrando apoio e disponibilidade para ouvir é fundamental. Estabelecer esse diálogo aberto ajuda seu filho a se sentir seguro para compartilhar o que está acontecendo online.",
    incorrectFeedback:
      "Esta abordagem pode não ser a mais eficaz. É importante criar um ambiente de confiança onde seu filho se sinta seguro para compartilhar suas experiências online. Verificar o celular sem permissão ou simplesmente tirar o acesso pode prejudicar a relação de confiança.",
    additionalInfo:
      "Mudanças de comportamento, como tristeza, ansiedade ou evitar usar o celular ou ir à escola, podem ser sinais de cyberbullying. Observe padrões e estabeleça uma comunicação aberta e sem julgamentos para que seu filho se sinta confortável em compartilhar suas experiências online.",
    legalInfo:
      "A Lei 13.185/2015 institui o Programa de Combate à Intimidação Sistemática, que inclui o cyberbullying. Ela estabelece que pais têm papel fundamental na identificação precoce e no apoio às vítimas.",
    mascot: "dpo",
    context:
      "Seu filho normalmente é comunicativo e gosta de compartilhar suas experiências. Esta mudança de comportamento é recente e coincide com o aumento do uso do celular.",
  },
  {
    id: "social-media-anxiety",
    text: "Você percebe que seu filho adolescente está passando muitas horas nas redes sociais e parece ansioso sempre que recebe notificações.",
    icon: <MessageCircle className="h-10 w-10 text-blue-700" />,
    difficulty: "beginner",
    interactionType: "hotspot",
    hotspotImage: "/placeholder.svg?height=400&width=800",
    hotspotQuestion: "Qual destas abordagens é mais recomendada como primeiro passo?",
    hotspots: [
      {
        id: 1,
        x: 25,
        y: 30,
        size: 40,
        label: "Estabelecer limites rigorosos de tempo de tela imediatamente",
      },
      {
        id: 2,
        x: 75,
        y: 30,
        size: 40,
        label: "Conversar abertamente sobre uso saudável das redes sociais",
      },
      {
        id: 3,
        x: 25,
        y: 70,
        size: 40,
        label: "Monitorar secretamente todas as atividades nas redes sociais",
      },
      {
        id: 4,
        x: 75,
        y: 70,
        size: 40,
        label: "Proibir completamente o uso de redes sociais",
      },
    ],
    correctAnswer: 2,
    correctFeedback:
      "Perfeito! Iniciar com uma conversa aberta sobre o uso saudável das redes sociais estabelece uma base de confiança. Você pode discutir como as redes sociais podem afetar o bem-estar emocional e ajudar seu filho a desenvolver uma relação mais equilibrada com a tecnologia.",
    incorrectFeedback:
      "Esta não é a melhor primeira abordagem. Começar com uma conversa aberta sobre o uso saudável das redes sociais é mais eficaz para construir confiança e compreensão mútua antes de implementar regras ou restrições.",
    additionalInfo:
      "O uso excessivo de redes sociais está associado a problemas de ansiedade e depressão em adolescentes. Ajude seu filho a estabelecer limites saudáveis, incentive atividades offline e ensine-o a reconhecer quando o uso da tecnologia está afetando negativamente seu bem-estar.",
    mascot: "clipboard",
    context:
      "As redes sociais são parte importante da vida social dos adolescentes, mas precisam ser usadas de forma equilibrada e saudável.",
  },
  {
    id: "offensive-messages",
    text: "Um amigo comenta que viu mensagens ofensivas sobre seu filho em um grupo online de colegas da escola.",
    icon: <Users className="h-10 w-10 text-blue-700" />,
    difficulty: "intermediate",
    interactionType: "timeline",
    timelineEvents: [
      { id: "evidence", content: "Capturar e salvar evidências (prints, mensagens)" },
      { id: "talk", content: "Conversar com seu filho sobre a situação" },
      { id: "school", content: "Comunicar à escola sobre o ocorrido" },
      { id: "report", content: "Reportar o conteúdo à plataforma onde ocorreu" },
      { id: "follow", content: "Acompanhar o bem-estar emocional do seu filho" },
    ],
    correctAnswer: ["talk", "evidence", "school", "report", "follow"],
    correctFeedback:
      "Excelente sequência! Primeiro conversar com seu filho para entender a situação e oferecer apoio emocional, depois documentar as evidências, comunicar à escola, reportar à plataforma e continuar acompanhando o bem-estar do seu filho são os passos adequados.",
    incorrectFeedback:
      "A ordem das ações é importante. Começar conversando com seu filho para entender a situação e oferecer apoio emocional é fundamental antes de tomar outras medidas.",
    additionalInfo:
      "Documentar evidências de cyberbullying é crucial para que as autoridades escolares e, se necessário, as autoridades legais possam tomar medidas apropriadas. Prints de tela, mensagens, comentários ou e-mails devem ser salvos com data e hora. Manter um registro detalhado fortalece o caso.",
    legalInfo:
      "No Brasil, a Lei 13.185/2015 e a Lei 13.663/2018 obrigam as escolas a prevenir e combater o bullying e o cyberbullying. A escola tem responsabilidade legal de investigar e tomar providências quando informada sobre casos envolvendo seus alunos.",
    mascot: "dpo",
  },
  {
    id: "new-social-network",
    text: "Seu filho mais novo pede para criar um perfil em uma nova rede social que você nunca ouviu falar.",
    icon: <Globe className="h-10 w-10 text-blue-700" />,
    difficulty: "intermediate",
    interactionType: "drag-drop",
    items: [
      { id: "research", content: "Pesquisar sobre a rede social e seus riscos potenciais" },
      { id: "age", content: "Verificar a idade mínima recomendada para a plataforma" },
      { id: "privacy", content: "Examinar as configurações de privacidade disponíveis" },
      { id: "monitor", content: "Monitorar todas as atividades sem o conhecimento da criança" },
      { id: "refuse", content: "Negar o pedido sem explicação" },
      { id: "together", content: "Explorar a plataforma junto com seu filho" },
    ],
    categories: [
      { id: "recommended", name: "Ações Recomendadas" },
      { id: "not-recommended", name: "Ações Não Recomendadas" },
    ],
    correctAnswer: {
      recommended: ["research", "age", "privacy", "together"],
      "not-recommended": ["monitor", "refuse"],
    },
    correctFeedback:
      "Ótima classificação! Pesquisar sobre a rede, verificar a idade mínima, examinar as configurações de privacidade e explorar a plataforma junto com seu filho são abordagens que combinam segurança com respeito e educação digital.",
    incorrectFeedback:
      "Revise sua classificação. Monitorar secretamente ou negar sem explicação não são práticas recomendadas, pois não educam a criança sobre segurança digital e podem prejudicar a confiança.",
    additionalInfo:
      "Muitas redes sociais têm idade mínima de 13 anos devido à lei americana COPPA (Children's Online Privacy Protection Act). Explorar novas plataformas junto com seus filhos é uma oportunidade para educá-los sobre privacidade, segurança e comportamento online responsável.",
    mascot: "clipboard",
  },
  {
    id: "school-cyberbullying",
    text: "A escola do seu filho enviou um comunicado sobre um caso de cyberbullying envolvendo alunos da mesma turma.",
    icon: <School className="h-10 w-10 text-blue-700" />,
    difficulty: "advanced",
    interactionType: "chat",
    chatPrompt:
      "Olá! Sou um especialista em cyberbullying e gostaria de saber como você abordaria essa situação com seu filho. Que pontos você considera importantes discutir?",
    correctAnswer: ["conversa", "empatia", "posicionamento", "denúncia", "apoio", "prevenção"],
    correctFeedback:
      "Excelente resposta! Você abordou pontos fundamentais como ter uma conversa aberta, promover empatia, discutir a importância de se posicionar contra o cyberbullying, explicar como denunciar, oferecer apoio e trabalhar em estratégias preventivas.",
    incorrectFeedback:
      "Sua resposta poderia incluir mais elementos importantes como: promover uma conversa aberta, desenvolver empatia, discutir a importância de se posicionar contra o cyberbullying (sem participar ou compartilhar), explicar como denunciar casos, oferecer apoio e desenvolver estratégias preventivas.",
    additionalInfo:
      "Casos de cyberbullying na escola impactam todo o ambiente escolar, mesmo alunos que não estão diretamente envolvidos. Estes momentos são oportunidades valiosas para educar as crianças sobre empatia digital, responsabilidade online e a importância de não serem espectadores passivos.",
    legalInfo:
      "As escolas têm responsabilidade legal de implementar ações de prevenção e combate ao bullying, incluindo o cyberbullying. A Lei 13.185/2015 e a Lei 13.663/2018 exigem que as escolas adotem medidas de conscientização, prevenção e combate ao bullying em todas as suas formas.",
    mascot: "dpo",
  },
  {
    id: "intimate-photos",
    text: "Você descobre que seu filho adolescente está sendo pressionado por colegas a enviar fotos íntimas em um aplicativo de mensagens.",
    icon: <FileWarning className="h-10 w-10 text-blue-700" />,
    difficulty: "advanced",
    interactionType: "multiple-choice",
    options: [
      "Confrontar os colegas que estão fazendo a pressão diretamente.",
      "Proibir completamente o uso de aplicativos de mensagens pelo seu filho.",
      "Conversar seriamente sobre os riscos legais e emocionais, oferecer apoio e reportar o caso às autoridades apropriadas.",
      "Ignorar a situação, pois provavelmente é apenas uma brincadeira entre adolescentes.",
    ],
    correctAnswer: 2,
    correctFeedback:
      "Perfeito! É fundamental abordar a situação com seriedade, explicando os riscos do compartilhamento de imagens íntimas, oferecendo apoio emocional, e envolvendo as autoridades apropriadas como a escola ou, se necessário, as autoridades legais.",
    incorrectFeedback:
      "Esta não é a melhor abordagem. É essencial conversar seriamente com seu filho sobre os riscos legais e emocionais envolvidos, oferecer apoio incondicional e, dependendo da gravidade, reportar o caso às autoridades apropriadas.",
    additionalInfo:
      "O sexting (envio de mensagens e imagens íntimas) entre adolescentes é mais comum do que muitos pais imaginam. A pressão dos colegas pode ser intensa. Ensine seus filhos que nunca devem ceder a esse tipo de pressão e que podem sempre buscar ajuda com um adulto de confiança.",
    legalInfo:
      "No Brasil, a produção, posse ou compartilhamento de imagens íntimas de menores de 18 anos é considerada pornografia infantil, mesmo se produzidas ou compartilhadas pelos próprios adolescentes. O Estatuto da Criança e do Adolescente (ECA) prevê penas severas para esses crimes.",
    context:
      "A pressão de pares para enviar fotos íntimas é uma forma de cyberbullying que pode ter consequências legais e emocionais sérias. Adolescentes muitas vezes não compreendem completamente os riscos envolvidos.",
  },
]

