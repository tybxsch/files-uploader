# files-uploader

Estudo de `zod` + `react-hook-form` como uploader de arquivos, buildado com Rspack.

## Rodando localmente

```bash
pnpm install
pnpm dev
```

## Testes

```bash
pnpm test
```

## Build de produção

```bash
pnpm build
```

Gera os arquivos estáticos em `dist/`.

## Docker

```bash
docker build -t files-uploader .
docker run --rm -p 8080:80 files-uploader
```

A aplicação fica disponível em `http://localhost:8080`.

## CI/CD

O workflow em `.github/workflows/ci-cd.yml` roda em todo push e pull request para `master`:

1. Instala as dependências e roda os testes (`pnpm test`)
2. Faz o build da aplicação (`pnpm build`)
3. Builda a imagem Docker (`docker/build-push-action`)
