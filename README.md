## 架构

本项目采用基于[React](https://react.dev/)的全栈无服务器应用程序开发框架[Next.js](https://nextjs.org/)，并采用非关系型数据库[MongoDB](https://www.mongodb.com/)，你可以去[MongoDB Cloud](https://cloud.mongodb.com/)白嫖。

## 开发

在项目根目录新建一个`.env.development.local`文件，输入以下内容作为环境变量：

```dotenv
MONGODB_URL=<你取得的mongodb数据库的地址>
MONGODB_DATABASE=lianwen
```

安装依赖：

```bash
pnpm i
```

启动服务：

```bash
yarn dev
```

用浏览器打开 http://localhost:3000 就能看到结果。

## 部署

点此按钮一键部署在[Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)上：

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fiamnottsh%2Flianwen&env=MONGODB_URL,MONGODB_DATABASE&project-name=lianwen&repository-name=lianwen)
