# Certificados da Resistência — Exército das Sáficas

Site estático em HTML, CSS e JavaScript. Não tem login, banco de dados ou envio dos dados digitados. Cada participante usa o mesmo link e gera o próprio arquivo no navegador.

## Arquivos
- `index.html`: página e conteúdo do certificado.
- `style.css`: identidade visual e responsividade.
- `app.js`: formulário, preenchimento automático, PNG e PDF.
- `logo.png`: recorte do logotipo fornecido.

## Testar
1. Descompacte a pasta.
2. Abra `index.html` em um navegador moderno. Para exportação mais confiável, teste com internet ativa porque as bibliotecas de PNG/PDF e as fontes são carregadas de CDNs.
3. Preencha nome, cidade e estado; toque em **GERAR MEU CERTIFICADO**.
4. Teste PNG e PDF. Em celulares, o navegador pode perguntar onde salvar o arquivo.

## Publicar gratuitamente pelo Android (GitHub Pages)
1. Entre em `github.com` no navegador e crie uma conta, se ainda não tiver.
2. Crie um repositório público, por exemplo `certificados-resistencia`.
3. Envie os quatro arquivos (`index.html`, `style.css`, `app.js`, `logo.png`) para a raiz do repositório. No celular, use **Add file → Upload files** no site do GitHub; se for mais fácil, envie o ZIP e extraia antes de publicar, pois o Pages precisa dos arquivos soltos na raiz.
4. Abra **Settings → Pages**.
5. Em **Build and deployment**, selecione **Deploy from a branch**, branch `main` e pasta `/ (root)`, depois salve.
6. Aguarde a publicação. O endereço ficará parecido com `https://SEU-USUARIO.github.io/certificados-resistencia/`.
7. Abra o link no celular e teste geração e downloads. Compartilhe esse mesmo link com os participantes.

Alternativa: Netlify Drop ou Cloudflare Pages também hospedam sites estáticos; confira os passos atuais na documentação da plataforma escolhida.

## Como alterar
- Textos do certificado: edite o HTML em `index.html`.
- Cores, fontes, moldura e faixa: edite as variáveis no início de `style.css` e as regras de `.certificate`, `.ribbon`, `.frame` etc.
- Data: atualmente usa a data do dispositivo no momento da emissão (`todayText()` em `app.js`). Para data fixa, altere essa função.
- Logotipo: substitua `logo.png` por outro PNG, mantendo o mesmo nome de arquivo. O arquivo incluído é um recorte automático da imagem enviada e pode conter pequenos artefatos; para fidelidade profissional, substitua pelo logotipo original em PNG transparente ou SVG.

## Limitações / verificações
- PNG e PDF são renderizados no navegador com html2canvas e jsPDF; essas bibliotecas e as fontes vêm de CDNs, então a primeira carga/exportação requer internet.
- O PDF é A4 retrato e contém o certificado como imagem de alta resolução, não texto vetorial selecionável.
- O logotipo foi recortado da imagem de referência; como a imagem fornecida tinha fundo roxo e não era um arquivo de logotipo transparente isolado, o recorte pode não ficar perfeito.
- Não foi possível validar em todos os modelos de Android ou navegadores. Faça um teste real antes de divulgar o link.
- A faixa diagonal é discreta para não prejudicar a leitura. O visual é uma interpretação baseada no logotipo enviado, pois não foi anexado um modelo completo do certificado.
- Dados permanecem no navegador e não são enviados pelo código do site. Bibliotecas e fontes são requisitadas a serviços externos.
