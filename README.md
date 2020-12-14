# B2B OXOUNO

## Подготовка
* [**Аккаунт**](https://github.com/)
* [**Git**](https://git-scm.com/)
* [**Node.js**](https://nodejs.org/en/download/current/) (не ниже 14 версии, нужны ES модули)
## Подготовка проекта
```bash
git clone https://github.com/ralex123/b2b-oxouno b2b.oxouno.ru
cd b2b.oxouno.ru
git checkout next
# Укажи свое имя вместо yourname
git checkout -b next-yourname
cd app
npm install -g yarn
yarn --frozen-lockfile
```

> Перед выполнением команд ниже,
> убедись, что находишься в
> папке содержащей папку *b2b.oxouno.ru*.
## Сборка и запуск проекта
```bash
cd b2b.oxouno.ru/app
yarn dev
```
Укажи протокол и хост своего API:

* Открой файл *b2b.oxouno.ru/app/env.js*
* Замени строку `http://domain.com`
* Сохрани файл, проект пересоберется

Для завершения `Ctrl+C` в консоли.

## Обновление проекта
```bash
cd b2b.oxouno.ru
git fetch
git merge origin/next
cd app
yarn --frozen-lockfile
```