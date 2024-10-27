# Paso a Paso Desarrollo Taller 4

# Paso 1

Clonar el repositorio https://github.com/greyli/todoism 

# Paso 2

Crear un repositorio de pruebas en PlayWright

# Paso 3

Crear y configurar el archivo playwright.config.js

# Paso 4

Crear una carpeta pages en dónde vamos a crear los archivos LoginPage.ts y TodoListPage.ts

![image](https://github.com/user-attachments/assets/c8ada341-8d2c-4073-84ca-4d133890d94a)


![image](https://github.com/user-attachments/assets/83c26062-4938-4b50-8c8d-7521cb8ffc0b)


# Paso 5

Crear la carpeta tests donde vamos a crear los archivos example.spec.ts y todolist.ts

![image](https://github.com/user-attachments/assets/e716aeef-373c-4f68-97eb-9f3a7d4b7bf9)


![image](https://github.com/user-attachments/assets/6e0e7574-6aaa-4e4a-bfbf-444300ab9bfd)


En el archivo todolist.spec.ts tenemos una suite de pruebas que se componen de tres casos de prueba que son:

1) 'Add task'
2) 'Complete task'
3) 'Clear Task'

# Paso 5

creamos el archivo .yml y lo configuramos 

## Archivo Test1.yml

name: Run Tests
on: 
  push: 
    branches: 
      - main 
  pull_request: 
    branches: 
      - main 
env: 
  REPO_URL: https://github.com/mamunetond/Taller4
  WORKING_DIR: Taller4 
jobs: 
  run-tests: 
    runs-on: ubuntu-latest 
    steps: 
      - name: Checkout Flask app repo 
        uses: actions/checkout@v3 
      - name: Set up Python 
        uses: actions/setup-python@v4 
        with: 
          python-version: '3.11' 
      - name: Install Flask app dependencies 
        run: | 
          python -m venv venv 
          source venv/bin/activate 
          pip install -r requirements.txt 
      - name: Run Flask app 
        run: | 
          source venv/bin/activate 
          flask initdb 
          flask translate compile 
          nohup flask run > flask.log 2>&1 & 
      - name: Checkout tests repo 
        run: git clone https://github.com/mamunetond/Taller4.git 
      - name: Setup Node 
        uses: actions/setup-node@v4 
        with: 
          node-version: lts/*
      - name: Install dependencies 
        run: | 
          cd Taller4 
          npm ci 
      - name: Install Playwright Browsers 
        run: npx playwright install --with-deps 
      - name: Run Playwright tests 
        run: | 
          cd Taller4 
          npx playwright test todolist.spec.ts 
      - name: Upload Artifact 
        uses: actions/upload-artifact@v4 
        if: ${{ !cancelled() }} 
        with: 
          name: Taller4 
          path: Taller4/playwright-report/ 
          retention-days: 30



