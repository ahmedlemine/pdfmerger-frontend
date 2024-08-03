## PDF Merger Frontend
A frontend for [PDF Merger](https://github.com/ahmedlemine/pdf-merger) built with React JS.

### How to run the frontend:
After running the [backend](https://github.com/ahmedlemine/pdf-merger) separately, follow these steps to run the frontend:

1- clone the project repo:
```bash
git clone git@github.com:ahmedlemine/pdfmerger-frontend.git
```

2- change directory into the project folder:
```bash
cd pdfmerger-frontend
```

3- install dependencies (you have to have node.js installed on your system):
```bash
npm install
```

4- create .env file using the included [.env_example](https://github.com/ahmedlemine/pdfmerger-frontend/blob/master/.env_example), or simply copy ".env_example" to ".env":
```bash
cp .env_example .env
```

5- run Vite development server:
```bash
npm run dev
```

6- access the project web interface on [http://localhost:3000](http://localhost:3000)