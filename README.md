# Установка

Требуется ввести команды:
```
$git clone https://github.com/nickitin123321/anychartTest  
```
```
$npm install  
```
# Использование
1. Запуск сервера на node.js:
```
$npm run start
```
2. Переход по ссылке http://localhost:5000/index.html или запуск файла index.html

3. Ввод URL где хранятся данные, в данном случае на сервере: http://localhost:5000/api

4. Нажатие на кнопку upgrade data

5. Происходит отрисовка данных из JSON файла. При измение данных происходит перерисовка по новым данным.

# Список используемых технологий

- Node.js

  - Запуск сервера, на который загружаются данные

- JavaScript

  - Контроль данных (DataController)
  - Отрисовка графика на SVG (ChartController)

- HTML:

  - Разметка страницы
  - Создание поля ввода и кнопки обновления данных

- CSS
  - Cтили элементов страницы
