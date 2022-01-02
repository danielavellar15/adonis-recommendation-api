# Adonis API application

This is the boilerplate for creating an API server in AdonisJs, it comes pre-configured with.

1. Bodyparser
2. Authentication
3. CORS
4. Lucid ORM
5. Migrations and seeds

## Setup

Use the adonis command to install the blueprint

```bash
adonis new yardstick --api-only
```

or manually clone the repo and then run `npm install`.

### Comandos

```js
adonis migration:run
adonis serve --dev
adonis  make:migration recomendationSystem

adonis make:model Property -m -c
```

PASSO A PASSO:
Criar usuario -> criar sistema de recomendacao completo -> importacao ->

TODOLIST:

- Token estatico para as funcoes de recomendacao (como no google platform)
- Criar uma rota que cria um sistema de recomendacao completo pasaando o tipo de avaliacao e retornando o api key
- criar rota onde é configurado um modelo de recomendacao e escolhido o algoritmo
- Trocar os ids de sistema de recomendacao pelo token
