# Escambo — Roadmap Completo de Produto

> Plataforma global de troca direta de produtos e serviços (sem dinheiro). Documento de planejamento para apresentação a desenvolvedores, investidores, parceiros e empresas de tecnologia.

## Premissas assumidas

Como o briefing pede um plano executável e não apenas conceitual, assumi as seguintes premissas onde a informação não estava definida. Troque qualquer uma delas sem impacto na estrutura do restante do documento:

- **Nome definitivo:** *Escambo* (nome já usado no projeto, é uma palavra real em português para "troca/permuta", curta e com boa carga semântica). Sugestões alternativas para variações internacionais estão na seção 5.
- **Mercado e cidade-piloto:** Brasil, começando por **uma cidade de porte médio (300–700 mil habitantes) com forte cultura de classificados/segunda mão e boa penetração de smartphone** — ex.: Florianópolis, Curitiba, Campinas ou Uberlândia. Os critérios de escolha estão na seção 19; substitua pela cidade real quando definida.
- **Moeda das estimativas:** Real (R$), valores de mercado brasileiro (freelancers/PJ), 2025–2026.
- **Cenários de equipe/orçamento:** os três pedidos (mínimo, intermediário, completo) são apresentados lado a lado, sem assumir qual é o real hoje.
- **Stack técnica:** escolhida e justificada na seção 14 (Node.js/TypeScript no back e front) para permitir equipe pequena e polivalente no MVP.
- **Escopo geográfico do MVP:** apenas Brasil, com modelo de dados já preparado para múltiplos países/moedas de referência desde o início (custo de retrabalho futuro é maior que o custo de generalizar agora).

---

## 1. Resumo executivo

Escambo é um marketplace de troca direta (produto↔produto, produto↔serviço, serviço↔serviço) sem intermediação financeira. Diferente da OLX, Enjoei ou Facebook Marketplace, não existe preço de venda: o valor estimado é usado **apenas** como sinal de compatibilidade entre ofertas, nunca como cobrança.

O produto resolve dois problemas simultâneos: (1) pessoas com itens/talentos ociosos que preferem trocar a vender por valores baixos, e (2) o atrito de descobrir "quem tem o que eu quero e quer o que eu tenho" — resolvido por um algoritmo de matching bidirecional com pontuação de compatibilidade visível ao usuário.

Estratégia de lançamento: validar em uma única cidade com massa crítica de anúncios semeados manualmente antes de abrir cadastro público, evitando o problema clássico de marketplace vazio. MVP enxuto (8–10 semanas de desenvolvimento efetivo após design), matching baseado em regras (não IA) na v1, evoluindo para aprendizado de máquina após ter dados de comportamento suficientes.

## 2. Proposta de valor

- **Para quem tem itens/serviços parados:** transforme o que não usa em algo que precisa, sem burocracia de venda, negociação de preço ou taxas.
- **Para quem não quer/não pode gastar dinheiro:** acesso a produtos e serviços via permuta justa, com transparência de compatibilidade.
- **Diferencial central:** nenhuma outra plataforma brasileira relevante é *troca pura* com matching algorítmico bidirecional — o mercado tem grupos de Facebook e fóruns informais, sem estrutura, reputação ou segurança.

## 3. Público-alvo

- **Pessoas físicas** de classe B/C que possuem bens duráveis subutilizados (eletrônicos, móveis, roupas, livros, ferramentas) e preferem trocar a vender por valores baixos em plataformas de venda.
- **Profissionais autônomos e freelancers** (design, TI, aulas particulares, serviços domésticos, consultoria) que querem trocar competência por competência sem ciclo de caixa.
- **Pequenas empresas e MEIs** com excedente de estoque, equipamentos ociosos ou capacidade de serviço parada, buscando ativos ou serviços complementares (ex.: equipamento por marketing).
- **Comunidades com consciência ambiental/consumo consciente** — economia circular é um ângulo de marketing natural.

## 4. Personas

**Camila, 29, redistribuidora criativa** — mora em apto pequeno, troca roupas/decoração/eletrônicos por itens equivalentes para não acumular nem gastar. Usa o app 2–3x por semana, sensível a distância (não quer buscar longe).

**Rafael, 34, freelancer de TI** — oferece manutenção de computadores/redes, procura criação de site ou serviços de design para o próprio negócio. Alto valor de reputação: só troca com quem tem histórico.

**Dona Marta, 61, aposentada** — quer trocar móveis e utensílios domésticos por itens equivalentes, baixa familiaridade com apps complexos; exige UX simples, poucos passos, suporte por WhatsApp/telefone.

**Estúdio Nova Marca, pequena empresa (2–5 funcionários)** — oferece equipamentos usados (impressora, mobiliário de escritório) por serviços de marketing/design. Precisa de "conta profissional" com múltiplos anúncios e um responsável designado.

## 5. Sugestões de nomes

| Nome | Racional | Domínio internacional |
|---|---|---|
| **Escambo** (recomendado) | Palavra real em português para troca; curto, memorável, já em uso no projeto | escambo.app / .co |
| Trove | Curto, soa bem em inglês/espanhol, remete a "achado valioso" | trove é usado por outros produtos — checar disponibilidade |
| Truqa | Variação de "troca/truck", pronunciável em PT/ES/EN | mais disponível para registro |
| Swaply | Direto ao ponto ("swap"), inteligível globalmente | genérico, concorrência de nome |
| Exchi | Curto, moderno, soa como app | pouco significado semântico próprio |

Recomendação: manter **Escambo** para o mercado de língua portuguesa (identidade forte, já validado) e reservar **Truqa** ou um nome cunhado (ex.: "Trokka") como marca secundária caso a internacionalização exija um nome mais neutro foneticamente.

## 6. Diferenciais da plataforma

- Troca pura, sem dinheiro nem comissão sobre valor do item — remove o maior ponto de atrito de confiança de marketplaces de venda (preço injusto, calote).
- Score de compatibilidade transparente (0–100%) mostrado antes de qualquer contato, economizando tempo de negociação.
- Um único grafo de produtos **e** serviços — permite trocas cruzadas (produto por serviço) que nenhum classificado tradicional resolve bem.
- Foco hiperlocal com raio configurável pelo usuário, pensado para troca presencial (reduz necessidade de logística/frete no MVP).
- Reputação como moeda social desde o primeiro dia — sistema de confiança é tratado como funcionalidade central, não acessório.
- Arquitetura pronta para evoluir de troca 1-para-1 para cadeias de troca com 3+ participantes (ciclo A→B→C→A), algo que nenhum concorrente direto oferece hoje.

## 7. Funcionamento do sistema

### Cadastro do usuário
Campos obrigatórios: nome, e-mail (verificado), telefone (verificado via SMS/WhatsApp OTP), país, estado/região, cidade, CEP, raio máximo de troca.
Campos opcionais no cadastro, obrigatórios para publicar anúncio: foto de perfil, endereço aproximado (usado só para cálculo de distância, nunca exibido), preferências de troca (categorias de interesse).

**Privacidade de localização:** o endereço completo nunca é público. Publicamente, outros usuários veem apenas cidade, região e distância aproximada (ex.: "a 3,4 km de você"), calculada a partir de coordenadas ofuscadas (jitter de ~200–500m aplicado às coordenadas exibidas em mapa, mantendo a coordenada exata só para cálculo interno de distância).

### Anúncio
Campos: título, descrição, categoria, condição (novo/seminovo/usado - bom/usado - regular), fotos/vídeos (mín. 1, máx. 8 fotos + 1 vídeo curto), localização aproximada herdada do perfil (editável por anúncio), valor estimado (faixa, não número exato — ver seção 10), itens/serviços desejados na troca (texto livre + categorias estruturadas), aceita outras propostas (sim/não), disponibilidade (datas/horários para serviços), forma de entrega (retirada em mãos / envio / ambos), raio máximo específico do anúncio (pode ser menor que o do perfil, nunca maior), data de publicação (automática), status (ativo, pausado, em negociação, trocado, expirado, removido por moderação).

## 8. Jornada do usuário

1. Cadastro → verificação de e-mail e telefone → onboarding (definição de CEP, raio, primeira preferência de troca).
2. Publicação do primeiro anúncio (fluxo guiado, sugestão de categoria por foto usando visão computacional simples no futuro).
3. Sistema calcula matches contra anúncios existentes compatíveis e notifica o usuário.
4. Usuário navega lista de matches ordenada por score, com ações rápidas: **Tenho interesse** / **Não tenho interesse** / **Quero propor outra troca**.
5. Interesse mútuo → chat liberado automaticamente entre as partes.
6. Uma das partes envia proposta formal de troca (itens específicos de cada lado).
7. Contraparte aceita, recusa ou contrapropõe (até um limite de rodadas, ver seção 9).
8. Negociação de logística pelo chat interno (local, data, forma de entrega).
9. Confirmação bilateral obrigatória (as duas partes marcam "troca realizada" — sem confirmação dupla, o status não muda).
10. Avaliação mútua (nota + comentário + tags rápidas: "item como descrito", "pontual", "comunicação boa").
11. Anúncio marcado como "trocado" (some da busca) ou volta a "ativo" se a troca não avançar.

## 9. Regras de negócio

| Situação | Regra |
|---|---|
| Expiração de proposta | Proposta sem resposta em 5 dias corridos expira automaticamente; autor é notificado 24h antes. |
| Contraproposta | Máximo de 3 rodadas de contraproposta por negociação; na 4ª tentativa o sistema sugere reiniciar como nova proposta. |
| Cancelamento | Qualquer parte pode cancelar antes da confirmação bilateral; cancelamentos recorrentes (>3 em 30 dias) geram alerta de reputação. |
| Desistência pós-combinado | Gera penalidade de reputação e fica registrado no histórico visível à outra parte em trocas futuras. |
| Não comparecimento | Contraparte reporta no-show; 3 no-shows confirmados em 90 dias → suspensão temporária de 15 dias. |
| Bloqueio de usuário | Bloqueio é unilateral e imediato; remove visibilidade mútua de anúncios e impede novo contato. |
| Denúncia | Categorias fixas (item ilegal, golpe/fraude, assédio, spam, item falsificado, perfil falso); denúncia com 2+ evidências (fotos/prints) tem fila prioritária de moderação. |
| Divergência anúncio x item entregue | Janela de 48h após confirmação para abrir contestação com evidências; pausa a reputação da troca até resolução. |
| Disputa | Fluxo: (1) mediação assistida por chat guiado com checklist, (2) escalonamento a moderador humano, (3) decisão registrada e reputação ajustada conforme resultado. |
| Suspensão preventiva | Disparada por score de risco (múltiplas denúncias recentes, padrão de conta nova + alto volume de anúncios, IPs/dispositivos repetidos); suspende publicação, não o acesso, até revisão manual. |

**Evoluções futuras (fora do MVP):** trocas envolvendo múltiplos itens de um lado; um produto por vários serviços fracionados; trocas em ciclo com 3+ participantes (o motor de matching já modela oferta/demanda como grafo, o que facilita essa extensão depois); integração com transportadoras para trocas remotas; rede de "pontos seguros de troca" (parcerias com delegacias, lojas de conveniência, coworkings).

## 10. Algoritmo de matching

**Pontuação de compatibilidade (0–100%), pesos sugeridos:**

| Fator | Peso | Lógica |
|---|---|---|
| Compatibilidade de interesse (o que A quer = o que B oferece, nos dois sentidos) | 30% | Núcleo do match: interseção entre "desejado" de um e "oferecido" do outro, nos dois sentidos simultaneamente. |
| Proximidade | 25% | Distância real entre CEPs, normalizada pelo raio máximo aceito por ambos; decai a zero fora do raio. |
| Similaridade de valor estimado | 20% | Comparação de faixas (não valores exatos) — ver mecanismo anti-manipulação abaixo. |
| Categoria | 10% | Mesma categoria ou categorias declaradas como aceitas por ambos. |
| Condição do produto | 5% | Diferença de condição reduz o score (ex.: "novo" trocando por "usado - regular" pesa negativo). |
| Reputação | 7% | Nota média e volume de trocas concluídas sem incidente. |
| Disponibilidade | 3% | Datas/horários compatíveis, relevante principalmente para serviços. |

**Evitando manipulação do valor declarado:** o valor estimado nunca é exibido como número exato para o outro usuário — apenas como **faixa** (ex.: "R$ 500–800"), calculada automaticamente comparando o valor informado com a mediana de anúncios semelhantes (mesma categoria + condição, últimos 90 dias). Se o valor informado se desviar mais de ~40% da mediana de mercado da categoria, o anúncio recebe um aviso ("valor fora do padrão para esta categoria") e o score de similaridade de valor é calculado usando a mediana, não o número declarado — impedindo que o usuário infle o valor para "casar" com trocas melhores. Revisão comunitária (denúncia de "valor incompatível com o item") e, na v2, um modelo de IA treinado nos próprios dados históricos de troca completam a defesa.

O motor de matching v1 é **baseado em regras** (pesos fixos acima, ajustáveis pelo admin — seção 17). IA/aprendizado de comportamento entra em v2+, quando já existir volume suficiente de matches aceitos/recusados para treinar um modelo supervisionado.

## 11. Escopo do MVP

**Entra obrigatoriamente no MVP:** cadastro/login com verificação de e-mail e telefone, perfil básico, CRUD de anúncio (produto e serviço) com upload de imagem, localização por CEP com raio configurável, busca e filtros (categoria, distância, condição), matching por regras (proximidade + interesse + valor em faixa), fluxo completo de proposta/aceite/recusa/contraproposta, chat interno, notificações (in-app + e-mail), confirmação bilateral de troca, avaliação pós-troca, denúncia de anúncio/usuário, painel administrativo básico (moderação de anúncios e denúncias, gestão de usuários).

**Entra na v2:** contas profissionais/empresa, verificação de identidade opcional, favoritos, destaque pago de anúncio, filtros avançados, notificação push mobile, disputas com fluxo de mediação formal, detecção automática de fotos duplicadas/copiadas (hash perceptual).

**Planejado para versões futuras:** app mobile nativo, trocas multi-item e multi-participante, IA no matching, pontos seguros de troca, parcerias com transportadoras, internacionalização multi-país/multi-moeda de referência, API para parceiros.

**Não desenvolver inicialmente** (custo/complexidade não justificados antes de validar demanda): qualquer forma de pagamento ou complemento em dinheiro, app nativo (web responsiva cobre o MVP), sistema de disputa com arbitragem jurídica formal, IA/ML no matching, suporte multi-idioma, integração com transportadoras.

## 12. Funcionalidades por versão

| Versão | Foco | Principais entregas |
|---|---|---|
| v1 (MVP) | Validar o loop core de troca em 1 cidade | Seção 11 — "entra obrigatoriamente" |
| v2 | Reter e monetizar | Contas profissionais, destaque pago, verificação de identidade, disputas formais, detecção de fraude/fotos duplicadas, push mobile |
| v3 | Escalar | App nativo, trocas multi-item, expansão multi-cidade, matching com IA, programa de indicação |
| v4+ | Internacionalizar | Multi-país/multi-moeda de referência, multi-idioma, pontos seguros de troca, API para parceiros, trocas em cadeia (3+ participantes) |

## 13. Telas e experiência do usuário

Home (feed de matches perto de você) · Cadastro/Login (e-mail, telefone, social login) · Onboarding (CEP, raio, primeira preferência) · Perfil (público e edição) · Criar/editar anúncio (fluxo em etapas, wizard) · Busca com filtros · Lista de matches (cards com score %) · Detalhe do anúncio · Enviar proposta (seletor de "o que ofereço em troca") · Contraproposta · Chat · Minhas propostas (enviadas/recebidas) · Minhas trocas (histórico + em andamento) · Favoritos · Notificações · Avaliações (dadas/recebidas) · Denúncias (abrir/acompanhar) · Configurações (privacidade, raio, notificações) · Painel administrativo (interno).

Interação principal do feed de matches é estilo *swipe/ação rápida* (Tenho interesse / Não tenho interesse / Quero propor outra troca), reduzindo fricção para personas menos técnicas como Dona Marta — três botões grandes, sem gestos obrigatórios (swipe é atalho opcional, não único caminho, por acessibilidade).

## 14. Arquitetura técnica

**Comparação de stacks para o back-end:**

| Critério | Node.js/NestJS + TypeScript | Python/Django |
|---|---|---|
| Compartilhar tipos com o front (Next.js/TS) | Sim, reduz bugs de contrato de API | Não nativamente |
| Ecossistema de tempo real (WebSocket) | Nativo e maduro (Socket.io/NestJS Gateway) | Precisa de Channels/ASGI, mais fricção |
| Curva de contratação (equipe pequena polivalente) | Um único idioma no front+back facilita | Exige dois perfis distintos |
| Maturidade em GIS (PostGIS) | Boa via TypeORM/Prisma + raw SQL | Excelente (GeoDjango é referência) |
| Velocidade de prototipagem administrativa | Requer construir admin | Django Admin pronto acelera MVP |

**Decisão para o MVP: Node.js (NestJS) + TypeScript no back, Next.js no front.** Justificativa: equipe pequena consegue reaproveitar tipos e lógica entre front/back, tempo real (chat) é nativo, e a perda do Django Admin é compensada por um painel admin simples e propositalmente enxuto (seção 17). Se a prioridade fosse "admin pronto o mais rápido possível" com equipe já fluente em Python, Django seria defensável — mas o custo de dois times de linguagem pesa mais no cenário de equipe mínima/intermediária (seções 21–22).

**Demais componentes:**
- Banco de dados: **PostgreSQL + extensão PostGIS** para busca geográfica por raio/distância.
- Armazenamento de mídia: object storage compatível com S3 (Cloudflare R2 ou AWS S3) — R2 é mais barato para MVP por não cobrar egress.
- Chat em tempo real: WebSocket via NestJS Gateway (Socket.io), com histórico persistido no Postgres.
- Notificações: e-mail transacional (Amazon SES ou Resend), SMS/WhatsApp OTP (Twilio ou Zenvia — Zenvia é mais competitiva no Brasil), push (Firebase Cloud Messaging) a partir da v2.
- Geolocalização/mapas: geocodificação de CEP via API dos Correios/ViaCEP (gratuita, cobre o essencial do MVP) + Google Maps Platform ou Mapbox para exibição de mapa aproximado — Mapbox tende a ser mais barato em volume.
- Autenticação: JWT + refresh token, login social opcional (Google) via OAuth2.
- Moderação de imagem: fila manual no MVP; hashing perceptual (pHash) para detectar fotos duplicadas/copiadas antes de IA de visão computacional (AWS Rekognition/Google Vision) na v2.
- Hospedagem: Railway ou Render para MVP econômico (deploy simples, custo previsível); migração para AWS/GCP quando a escala justificar equipe de DevOps dedicada.
- Monitoramento e logs: Sentry (erros) + Grafana Cloud/Better Stack (métricas e logs), com free tier suficiente para o MVP.
- Backup: snapshot diário automatizado do Postgres + point-in-time recovery habilitado desde o dia 1 (dado de usuário é sensível — não é opcional).
- Ambientes: dev (local/docker-compose), homologação (réplica de produção com dados sintéticos), produção — com CI/CD via GitHub Actions.

## 15. Modelo de dados

| Entidade | Campos principais | Relacionamentos |
|---|---|---|
| Usuário | id, nome, e-mail, telefone, senha_hash, verificado_email, verificado_telefone, criado_em | 1:1 Perfil, 1:N Anúncio, 1:N Avaliação (dada/recebida), 1:N Denúncia |
| Perfil | usuário_id, foto, país, estado, cidade, cep, raio_max_km, preferências_troca | N:1 Usuário |
| Endereço aproximado | perfil_id, lat, lng (ofuscados publicamente), cep | 1:1 Perfil |
| Categoria | id, nome, tipo (produto/serviço), categoria_pai_id | 1:N Anúncio (auto-relacionamento para subcategorias) |
| Anúncio | id, usuário_id, título, descrição, categoria_id, condição, valor_estimado, aceita_outras_propostas, disponibilidade, forma_entrega, raio_max_km, status, criado_em | N:1 Usuário, N:1 Categoria, 1:N Imagem, 1:N Item desejado |
| Imagem | id, anúncio_id, url, ordem, hash_perceptual | N:1 Anúncio |
| Item desejado | id, anúncio_id, categoria_desejada_id, descrição_livre | N:1 Anúncio, N:1 Categoria |
| Match | id, anúncio_a_id, anúncio_b_id, score, detalhamento_score (json), criado_em | N:1 Anúncio (x2) |
| Interesse de troca | id, match_id, usuário_id, tipo (interesse/recusa/contraproposta) | N:1 Match, N:1 Usuário |
| Proposta | id, match_id, remetente_id, status (pendente/aceita/recusada/expirada), criado_em, expira_em | N:1 Match, 1:N Item da proposta, 1:N Contraproposta |
| Item da proposta | id, proposta_id, anúncio_id, lado (oferecido/desejado) | N:1 Proposta, N:1 Anúncio |
| Contraproposta | id, proposta_original_id, rodada, itens (json) | N:1 Proposta |
| Conversa | id, proposta_id, participante_a_id, participante_b_id | 1:1 Proposta, 1:N Mensagem |
| Mensagem | id, conversa_id, remetente_id, conteúdo, enviado_em, lida | N:1 Conversa |
| Troca | id, proposta_id, confirmado_a, confirmado_b, status, concluído_em | 1:1 Proposta, 1:N Avaliação |
| Avaliação | id, troca_id, avaliador_id, avaliado_id, nota, comentário, tags | N:1 Troca, N:1 Usuário (x2) |
| Denúncia | id, denunciante_id, alvo_tipo (usuário/anúncio), alvo_id, categoria, evidências, status | N:1 Usuário |
| Bloqueio | id, usuário_id, bloqueado_id, criado_em | N:1 Usuário (x2) |
| Disputa | id, troca_id, aberto_por_id, motivo, status, resolução | N:1 Troca |
| Log de auditoria | id, ator_id (admin), ação, alvo_tipo, alvo_id, timestamp | N:1 Usuário (admin) |

## 16. Segurança, privacidade e moderação

**Verificação e confiança:** verificação obrigatória de e-mail e telefone no cadastro; MFA opcional (recomendado obrigatório para contas com muitas trocas/alto volume); validação de identidade opcional (documento + selfie) como selo de confiança, não bloqueante para uso básico.

**Reputação e conduta:** avaliação obrigatória pós-troca (bloqueia nova proposta se houver 3+ avaliações pendentes de dar), denúncia de usuário/anúncio com categorias fixas, moderação manual para casos sensíveis + automática para spam/duplicados/palavras proibidas, detecção de anúncios duplicados (título+categoria+preço similar do mesmo usuário) e de fotos copiadas (hash perceptual comparado contra banco de imagens já publicadas).

**Prevenção de fraude:** score de risco por conta (idade da conta, velocidade de publicação, denúncias, dispositivos/IPs compartilhados com contas já banidas) alimenta suspensão preventiva; lista de produtos/serviços proibidos (armas, drogas, animais vivos, medicamentos controlados, serviços ilegais, itens roubados denunciados) com bloqueio automático por palavra-chave + revisão manual.

**Dados e conformidade (LGPD/GDPR):**

| Dado | Classificação | Tratamento |
|---|---|---|
| Nome, foto de perfil, cidade/região | Público | Exibido a todos os usuários |
| Endereço exato, CEP completo | Privado | Nunca exposto; usado só para cálculo de distância |
| E-mail, telefone | Privado/criptografado em repouso | Nunca exposto a outro usuário; usado para notificação/verificação |
| Documento de identidade (verificação opcional) | Sensível/criptografado | Retenção mínima necessária, acesso restrito a compliance |
| Mensagens do chat | Privado | Retenção padrão 12 meses após encerramento da conversa, salvo em disputa aberta |
| Logs de auditoria de admin | Interno | Retenção 24 meses para fins de compliance/investigação |
| Dados de menores | Proibido coletar | Cadastro exige confirmação de maioridade (18+); denúncia de perfil suspeito de menor gera suspensão preventiva imediata |

Base legal LGPD/GDPR: consentimento explícito no cadastro + legítimo interesse para segurança/antifraude; direito de exclusão de conta com anonimização de histórico de trocas (mantém integridade de avaliações de terceiros sem expor dados pessoais do titular excluído).

## 17. Painel administrativo

Gestão de usuários (buscar, suspender, banir, ver histórico) · Gestão de anúncios (aprovar/remover, ver denunciados) · Gestão de categorias (CRUD hierárquico) · Fila de denúncias com priorização · Suspensão/bloqueio de contas com motivo registrado · Histórico de propostas e trocas por usuário · Indicadores de uso (dashboard: cadastros, anúncios ativos, trocas concluídas, taxa de match) · Configuração de lista de produtos/serviços proibidos · Fila de moderação de imagem/texto · Log de auditoria de todas as ações administrativas · **Configuração dos pesos do algoritmo de matching (seção 10), editável sem deploy** · Gestão de países/regiões/formato de CEP (preparação para internacionalização).

## 18. Modelo de negócio

Sem comissão sobre valor do item (não há pagamento na plataforma). Monetização por camadas que não comprometem a proposta de troca pura:

- **Assinatura premium** (destaque de anúncios, mais anúncios simultâneos, filtros avançados, ver quem visualizou seu anúncio).
- **Destaque pago avulso** por anúncio (sem assinatura).
- **Selo de verificação de identidade** como serviço opcional pago.
- **Conta profissional/empresa** com múltiplos anúncios, usuários vinculados e métricas — plano B2B.
- **Publicidade nativa** de marcas alinhadas a consumo consciente/economia circular (não concorrente do próprio marketplace).
- **Parcerias com transportadoras/seguradoras** (comissão de indicação, não incluída no MVP).
- **API para parceiros** (v3+, ex.: ONGs de doação/troca, integrações com apps de sustentabilidade).

## 19. Estratégia de lançamento

**Escolha da cidade-piloto (critérios, não a cidade final):** porte 300–700 mil habitantes (grande o suficiente para massa crítica, pequeno o suficiente para marketing hiperlocal viável), alta penetração de smartphone, forte cultura local de grupos de troca/doação (sinal: grupos ativos de Facebook/WhatsApp de "doações e trocas" na região), presença universitária (early adopters).

**Formação da oferta inicial:** equipe cadastra manualmente 200–300 anúncios reais antes do lançamento público (parcerias com brechós, oficinas, freelancers locais dispostos a testar), evitando a sensação de plataforma vazia no dia 1.

**Aquisição:** convite fechado às primeiras semanas (lista de espera + convites de early adopters), parcerias com coworkings/universidades/associações de bairro, campanhas locais em redes sociais com ângulo de sustentabilidade/economia circular, programa de indicação (bônus de destaque de anúncio por indicação que resulta em troca concluída).

**Operação inicial:** moderação 100% manual na cidade-piloto (volume baixo permite), atendimento direto via WhatsApp Business pela própria equipe fundadora.

**Critério de expansão para nova cidade:** cidade-piloto atinge >500 trocas concluídas/mês e taxa de usuários sem nenhum match <20% antes de abrir a segunda cidade — evita repetir o problema de oferta vazia em escala.

**Internacionalização (futuro):** modelo de dados já suporta país/moeda de referência/formato de endereço desde o MVP (seção 15), reduzindo retrabalho quando a expansão for decidida; tradução e adaptação de CEP/postal code ficam para quando houver validação de demanda em outro país.

## 20. Roadmap por fases

| Fase | Objetivo | Principais atividades | Entregável | Critério de conclusão |
|---|---|---|---|---|
| Descoberta e validação | Confirmar dor e disposição a trocar | Entrevistas com personas-alvo, análise de concorrência informal (grupos de troca) | Relatório de validação | 20+ entrevistas, sinal de demanda claro |
| Definição do produto | Fechar escopo do MVP | Priorização de backlog, definição de premissas (seção topo) | Backlog P0 fechado | Escopo congelado e aprovado |
| Prototipação | Validar fluxo antes de codar | Wireframes navegáveis, teste com 5–8 usuários | Protótipo clicável | Taxa de conclusão de tarefa >80% no teste |
| Design | Produzir UI final | Design system, telas de alta fidelidade (seção 13) | UI Kit + telas prontas | Handoff para dev aprovado |
| Desenvolvimento do MVP | Construir o produto | Implementação backend/frontend/matching v1 | MVP funcional em staging | Todas as histórias P0 aceitas |
| Testes | Garantir qualidade mínima | QA manual + testes automatizados core, teste de carga leve | Relatório de bugs zerado em críticos | Zero bugs bloqueantes |
| Projeto-piloto | Validar com usuários reais | Lançamento fechado na cidade-piloto, oferta semeada | Primeiras trocas reais concluídas | 50+ trocas concluídas |
| Lançamento | Abrir cadastro público na cidade | Campanha de aquisição, imprensa local | Plataforma pública na cidade-piloto | Cadastro aberto sem convite |
| Aprendizado e correções | Corrigir com base em uso real | Ajuste de pesos de matching, correções de UX | Backlog de melhorias v1.1 | Métricas core estabilizadas |
| Segunda versão | Reter e monetizar | Features da seção 12 (v2) | v2 em produção | Primeira receita registrada |
| Expansão nacional | Replicar em novas cidades | Playbook de lançamento replicado | 3+ cidades ativas | Critério da seção 19 atingido em 2+ cidades |
| Internacionalização | Adaptar para outro país | Localização, moeda de referência, compliance local | Piloto internacional | Primeiro país fora do Brasil ativo |

## 21. Cronograma (tabela, estimativa em semanas)

| Fase | Duração | Pode rodar em paralelo com |
|---|---|---|
| Descoberta e validação | 3–4 semanas | — |
| Definição do produto | 2 semanas | Fim da descoberta |
| Prototipação | 2–3 semanas | Definição do produto (fim) |
| Design de UI final | 4–5 semanas | Início do desenvolvimento de backend |
| Desenvolvimento do MVP | 12–16 semanas | Design (últimas semanas), testes (fase final) |
| Testes | 3–4 semanas | Últimas semanas do desenvolvimento |
| Projeto-piloto | 4–6 semanas | — |
| Lançamento público na cidade-piloto | 1–2 semanas | — |
| Aprendizado e correções | 4–6 semanas | — |
| **Total até fim do piloto** | **~28–36 semanas (7–9 meses)** | |
| Segunda versão (v2) | 8–12 semanas | Após aprendizado |
| Expansão nacional | 12–24 semanas (contínuo) | Após v2 estável |
| Internacionalização | 24+ semanas | Futuro, condicionado a tração |

## 22. Equipe necessária (três cenários)

| Função | Mínima (bootstrap) | Intermediária | Completa |
|---|---|---|---|
| Product Owner | Fundador acumula função | Dedicado | Dedicado + PM de apoio |
| UX/UI Designer | Freelance part-time | Dedicado | Time de 2 |
| Dev back-end | 1 (full-stack) | 2 | 3–4 |
| Dev front-end | Acumulado com back (mesma pessoa) | 2 | 2–3 |
| Dev mobile | — (fora do MVP) | — | 2 (a partir da v2/v3) |
| QA | Próprios devs + beta testers | 1 dedicado | Time de 2 |
| DevOps | Acumulado pelo dev back-end | Consultoria part-time | Dedicado/SRE |
| Segurança | Consultoria pontual | Consultoria retainer | Dedicado |
| Jurídico | Consultoria avulsa (ToS/LGPD) | Retainer mensal | Parcial interno + escritório |
| Atendimento/moderação | Fundador | 1 dedicado | Time de 2–3 |
| Marketing | Fundador + freelancer de conteúdo | 1 dedicado | Time de 2–3 (growth) |

## 23. Estimativa de custos (R$, faixas — não são valores exatos)

**Premissas:** valores de mercado brasileiro para freelancers/PJ em 2025–2026; infraestrutura em escala inicial (<5 mil usuários ativos no MVP econômico, 5–50 mil no profissional, 100 mil+ no completo).

| Item | MVP econômico | MVP profissional | Plataforma completa |
|---|---|---|---|
| Planejamento/descoberta | R$ 5.000–15.000 | R$ 20.000–40.000 | R$ 50.000–100.000 |
| Design UX/UI | R$ 15.000–35.000 | R$ 35.000–70.000 | R$ 100.000–200.000 |
| Desenvolvimento (inicial, até fim do piloto) | R$ 80.000–160.000 | R$ 300.000–550.000 | R$ 1.000.000–2.000.000+ |
| **Total inicial (até o piloto)** | **R$ 100.000–210.000** | **R$ 355.000–660.000** | **R$ 1.150.000–2.300.000+** |
| Infraestrutura/hosting mensal | R$ 800–2.500 | R$ 3.000–10.000 | R$ 20.000–60.000+ |
| Mapas/geocodificação mensal | R$ 300–1.500 | R$ 1.500–5.000 | R$ 8.000–20.000 |
| Armazenamento (imagens/vídeos) | R$ 100–500 | R$ 500–2.000 | R$ 3.000–8.000 |
| E-mail e SMS/WhatsApp OTP | R$ 300–1.000 | R$ 1.500–4.000 | R$ 8.000–20.000 |
| Monitoramento/logs | R$ 0–300 (free tier) | R$ 500–2.000 | R$ 3.000–8.000 |
| Segurança (WAF, certificados, pentest pontual) | R$ 0–500 | R$ 1.000–3.000 | R$ 8.000–20.000 |
| Jurídico mensal | R$ 2.000–6.000 (pontual) | R$ 3.000–8.000 | R$ 10.000–25.000 |
| Marketing mensal | R$ 3.000–10.000 | R$ 15.000–40.000 | R$ 50.000–150.000+ |
| Suporte mensal | R$ 0 (acumulado) | R$ 3.000–6.000 | R$ 15.000–30.000 |
| **Total mensal recorrente** | **R$ 6.500–22.300** | **R$ 29.000–80.000** | **R$ 125.000–341.000+** |

## 24. KPIs

**Núcleo do negócio:** usuários cadastrados, usuários ativos (semanal/mensal), anúncios ativos, matches gerados/usuário, taxa de interesse sobre matches exibidos, propostas enviadas, taxa de propostas aceitas, trocas confirmadas, tempo médio da publicação até a troca concluída, distância média entre participantes de uma troca.

**Saúde/risco:** taxa de cancelamento, taxa de denúncia por troca, retenção (D7/D30), % de usuários sem nenhum match em 30 dias (alvo <20% para justificar expansão — seção 19), equilíbrio oferta/demanda por categoria (categorias com excesso de oferta e pouca procura, e vice-versa).

**Específicos do MVP (critério de validação, primeiros 3 meses do piloto):** 500+ cadastros na cidade-piloto, 200+ anúncios ativos, 100+ trocas concluídas, NPS pós-troca ≥40, <15% de trocas com denúncia/disputa.

## 25. Matriz de riscos

| Risco | Probabilidade | Impacto | Prevenção | Resposta | Responsável |
|---|---|---|---|---|---|
| Poucos usuários na mesma região (marketplace vazio) | Alta | Alto | Semeadura manual de anúncios pré-lançamento, foco em 1 cidade | Intensificar aquisição local, parcerias pontuais | Marketing/PO |
| Falta de compatibilidade entre ofertas | Média | Alto | Categorias bem desenhadas, incentivo a múltiplos "itens desejados" por anúncio | Ajustar pesos do matching, campanha para categorias carentes | Produto |
| Fraude/golpes | Média | Alto | Verificação de conta, reputação, denúncia fácil | Suspensão preventiva, investigação manual | Segurança/Moderação |
| Produtos roubados | Baixa/Média | Alto | Lista de proibidos, denúncia comunitária | Remoção imediata + colaboração com autoridades se necessário | Moderação/Jurídico |
| Avaliação incorreta de valores | Média | Médio | Faixas de valor + mediana de mercado (seção 10) | Revisão comunitária, ajuste de algoritmo | Produto |
| Produtos ilegais anunciados | Baixa | Alto | Bloqueio automático por palavra-chave + moderação | Remoção + banimento de reincidentes | Moderação |
| Problemas em encontros presenciais | Baixa/Média | Alto | Recomendações de segurança, sugestão de locais públicos | Canal de denúncia rápido, cooperação com autoridades se grave | Moderação/Jurídico |
| Dificuldade de monetização | Média | Médio | Camadas de monetização não-core desde o design (seção 18) | Testar precificação, priorizar conta profissional B2B | PO/Negócio |
| Alto custo de mapas/geolocalização em escala | Média | Médio | ViaCEP gratuito para geocodificação base, Mapbox só para exibição | Negociar contrato de volume, cache agressivo | DevOps |
| Exposição de dados pessoais | Baixa | Alto | Ofuscação de coordenadas, criptografia em repouso, minimização de dados públicos (seção 16) | Plano de resposta a incidente, notificação conforme LGPD | Segurança/Jurídico |
| Conflitos entre participantes | Média | Médio | Fluxo de disputa estruturado (seção 9) | Mediação, decisão registrada em log de auditoria | Moderação |
| Problemas jurídicos (ToS, itens proibidos, LGPD) | Baixa/Média | Alto | ToS claro, lista de proibidos, consultoria jurídica desde o MVP | Assessoria jurídica reativa, ajuste de política | Jurídico |
| Crescimento sem estrutura (moderação não escala) | Média | Médio | Automação de moderação desde a v2, regras claras de expansão (seção 19) | Reforço temporário de equipe de moderação | Operações |
| Desequilíbrio entre produtos e serviços ofertados | Média | Baixo/Médio | Onboarding incentiva declarar ambos, categorias mistas | Campanhas direcionadas por categoria carente | Marketing/Produto |

## 26. Backlog priorizado

### P0 — indispensável para o MVP

1. **Cadastro com verificação de e-mail e telefone** — Como usuário, quero me cadastrar e verificar meu e-mail/telefone para que minha conta seja confiável. *Complexidade: M · Dependências: nenhuma · Critério de aceite: conta só fica ativa após dupla verificação.*
2. **Perfil com localização e raio de troca** — Como usuário, quero definir meu CEP e raio máximo para ver apenas matches relevantes. *Complexidade: S · Dependências: cadastro · Critério de aceite: raio é respeitado em toda busca/matching.*
3. **CRUD de anúncio (produto/serviço) com imagens** — Como usuário, quero publicar o que ofereço com fotos para atrair interesse. *Complexidade: M · Dependências: perfil · Critério de aceite: anúncio publicado aparece em busca em até 1 minuto.*
4. **Busca e filtros (categoria, distância, condição)** — Como usuário, quero filtrar anúncios para encontrar o que procuro rápido. *Complexidade: M · Dependências: CRUD de anúncio · Critério de aceite: filtros combinam entre si sem erro.*
5. **Motor de matching baseado em regras** — Como usuário, quero ver um % de compatibilidade com outros anúncios para saber quais valem meu tempo. *Complexidade: L · Dependências: CRUD de anúncio, perfil · Critério de aceite: score recalcula ao editar anúncio ou perfil.*
6. **Ação rápida Tenho interesse/Não tenho interesse/Propor outra troca** — Como usuário, quero reagir rápido a um match. *Complexidade: S · Dependências: matching · Critério de aceite: ação registra estado e libera/oculta próximos passos corretamente.*
7. **Fluxo de proposta, aceite, recusa e contraproposta** — Como usuário, quero formalizar uma troca específica. *Complexidade: L · Dependências: interesse mútuo · Critério de aceite: histórico de rodadas de contraproposta é rastreável (seção 9).*
8. **Chat interno** — Como usuário, quero negociar detalhes sem sair da plataforma. *Complexidade: L · Dependências: proposta enviada · Critério de aceite: mensagens em tempo real, com histórico persistido.*
9. **Notificações in-app e e-mail** — Como usuário, quero ser avisado de matches, propostas e mensagens novas. *Complexidade: M · Dependências: matching, chat, propostas · Critério de aceite: notificação chega em até 1 minuto do evento.*
10. **Confirmação bilateral de troca** — Como usuário, quero que a troca só seja marcada como concluída quando ambos confirmarem. *Complexidade: M · Dependências: proposta aceita · Critério de aceite: status só muda com as duas confirmações.*
11. **Avaliação pós-troca** — Como usuário, quero avaliar minha contraparte para alimentar a reputação da plataforma. *Complexidade: M · Dependências: troca confirmada · Critério de aceite: avaliação é obrigatória para liberar nova proposta se houver pendência.*
12. **Denúncia de usuário/anúncio** — Como usuário, quero denunciar comportamento ou conteúdo indevido. *Complexidade: S · Dependências: nenhuma · Critério de aceite: denúncia entra em fila de moderação com categoria e evidência.*
13. **Painel administrativo básico** — Como moderador, quero aprovar/remover anúncios e tratar denúncias. *Complexidade: L · Dependências: todas as anteriores · Critério de aceite: toda ação de admin gera log de auditoria.*

### P1 — importante para a v2

14. **Conta profissional/empresa** — Complexidade: M · Dependências: P0 completo · Critério de aceite: múltiplos usuários vinculados a uma conta, anúncios em nome da empresa.
15. **Verificação de identidade opcional** — Complexidade: M · Dependências: cadastro · Critério de aceite: selo visível no perfil após aprovação manual/automática.
16. **Destaque pago de anúncio** — Complexidade: M · Dependências: CRUD de anúncio, meio de cobrança de assinatura · Critério de aceite: anúncio destacado aparece no topo do feed/busca.
17. **Detecção de fotos duplicadas/copiadas** — Complexidade: M · Dependências: upload de imagem · Critério de aceite: alerta automático ao publicar imagem já existente na base.
18. **Fluxo formal de disputa com mediação** — Complexidade: L · Dependências: troca confirmada, painel admin · Critério de aceite: disputa aberta pausa reputação até resolução registrada.
19. **Notificação push mobile (web push)** — Complexidade: M · Dependências: notificações in-app · Critério de aceite: push chega mesmo com app/aba fechada.

### P2 — melhoria futura

20. **App mobile nativo (iOS/Android)** — Complexidade: XL · Dependências: API estável da v1/v2 · Critério de aceite: paridade de funcionalidades core com a web.
21. **Matching com IA/aprendizado de comportamento** — Complexidade: XL · Dependências: volume histórico de matches/trocas · Critério de aceite: modelo supera baseline de regras em taxa de aceite de proposta.
22. **Programa de indicação** — Complexidade: M · Dependências: P0 completo · Critério de aceite: indicação rastreável até troca concluída, com recompensa aplicada.
23. **Trocas multi-item / um produto por vários serviços** — Complexidade: L · Dependências: modelo de proposta (item da proposta já suporta N itens) · Critério de aceite: proposta aceita N:N itens dos dois lados corretamente.

### P3 — ideia para avaliação posterior

24. **Trocas em cadeia com 3+ participantes** — Complexidade: XL · Dependências: matching multi-item validado · Critério de aceite: protótipo de ciclo A→B→C→A funcional em ambiente controlado.
25. **Pontos seguros de troca (parcerias físicas)** — Complexidade: L · Dependências: expansão multi-cidade · Critério de aceite: pelo menos 1 parceria ativa por cidade expandida.
26. **Internacionalização multi-país/multi-moeda de referência** — Complexidade: XL · Dependências: modelo de dados já preparado (seção 15) · Critério de aceite: primeiro país fora do Brasil operando com formato de endereço/CEP local.

## 27. Próximos passos

1. Validar/ajustar as premissas do topo deste documento (nome, cidade-piloto, cenário de equipe) com base na realidade atual do projeto.
2. Rodar a fase de Descoberta e validação (seção 20) com entrevistas reais antes de travar o backlog P0.
3. Fechar o design system e wireframes das telas P0 (seção 13).
4. Montar o time conforme o cenário de orçamento escolhido (seção 22) e abrir o desenvolvimento do MVP.
5. Iniciar a semeadura manual de anúncios na cidade-piloto em paralelo ao fim do desenvolvimento, para não perder tempo de mercado.
