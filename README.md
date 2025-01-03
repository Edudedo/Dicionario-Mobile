DICIONÁRIO MOBILE

Este é um aplicativo mobile que permite aos usuários buscar definições de palavras, ouvir suas pronúncias, salvar palavras como favoritas e visualizar o histórico de buscas. Desenvolvido como parte de um desafio técnico para a Coodesh, o projeto foi cuidadosamente estruturado para oferecer uma experiência responsiva, funcional e prática.

DESCRIÇÃO DO PROJETO:

O Dicionário Mobile é um aplicativo que permite ao usuário acessar uma imensa lista de palavras, oferecendo:

Definição: Definições detalhadas, fonéticas e exemplos de uso.
Áudio integrado: Escute a pronúncia correta das palavras.
Favoritos: Funcionalidade para você salvar palavras desejadas como favoritas.
Histórico: Veja as palavras que você pesquisou recentemente.
Interface simples e intuitiva: Desenvolvido com foco no usuário, o design é responsivo e fácil de navegar.

TECNOLOGIAS UTILIZADAS NO PROJETO:

Linguagem: 
-TypeScript

Frameworks e Bibliotecas:
- React Native (Expo)
- Gluesstack V2 (Estilização e UI)
- Axio (API)

APIs Externas:

-Free Dictionary API (Ádui e descrição)

DESCRIÇÃO DO PROCESSO:

Resolvi utilizar React Native, Expo e Gluestacks(Previamente NativeBase) devido a minha familiaridade com a tecnologia, já fiz um APP utilizando esses recursos e consegui ter um desempenho satisfatório no último projeto. Comecei por criar as paginas iniciais, index.tsx, favoritos.tsx e historico.tsx, percebi que nas 3 paginas teriam informacoes muito parecidas no cabeçalho entao criei um componente separado para apenas importas nessas paginas, nesse componente utilizei 3 botoes para navegar entre as paginas e e colocar um titulo a elas.
A partir daí criei os servicós de palavras, favoritos e historico, são as paginas ondem contem a logica de salvar no SecureStore, de pegar da API as palavras, de salvar as palavras tanto em uma chave de favoritos quanto em uma chave de historico e a partir dessas chaves, cada uma ser chamada respectivamente nas paginas.
A grande maioria das palavras na lista que foi passada no antigo README nao possui definicao no Free Dictionary APi entao eu tratei um erro e envio para a tela do usuario avisando que na API essa palavra nao existe.

INSTALAÇÃO:

Eu buildei um APK do aplicativo para ficar mais fácil os teste e assim conseguir avaliar melhor meu trabalho.

https://expo.dev/accounts/edudedo/projects/Dicionario-Mobile/builds/a3a6c945-77c4-43ad-9f46-55dfe23088a5

Basta acessar esse link e instalar o APK para rodar em seus dispositivo.

COMO USAR O APLICATIVO:
Na tela inicial uma lista de palavras irá aparecer, cada palavra tem um campo clicavél que ao clicar aparecerá na tela um Modal com as definições da palavra, ao deslizar a tela para baixo você consegue acessar mais palavras a medida que for carregando.
Ouvir a pronúncia: No modal de detalhes, clique no botão de TOCAR.
Salvar favoritos: No modal de detalhes, clique em "Salvar como Favorito".
Acessar favoritos: Vá até a página de favoritos para visualizar as palavras salvas.
Histórico: As palavras clicadas na tela inicial aparecem automaticamente na página de histórico.

Challenge by Coodesh
Este projeto foi desenvolvido como parte de um desafio técnico para a Coodesh. Agradeço a oportunidade de demonstrar minhas habilidades e aprender ainda mais ao longo do processo
