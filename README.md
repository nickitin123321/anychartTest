# Обзор

- Веб-приложение выглядит как веб-страница с полем ввода URL и кнопкой upgrade data.
- При вводе URL источника данных (ссылка на API сервера) и нажатии кнопки происходит отрисовка линейной диаграммы по данным источника.
- DataController каждые 1000ms делает GET запросы с помощью fetch() метода к введенному источнику данных(в данном случае к серверу) и при изменении данных сообщает об этом (dispatch event).
- ChartConroller слышит, что данные изменились, получает их и перерисовывает график по новым данным.
- Описание графика:
  - Элемент <SVG> - контейнер, в который помещается график.
  - 2 элемента <line> с установленным положением и длинной, которые являются осями координат графика и элементы <text> - подписи к осям координат.
  - Элемент <path> - линия графика.
  - Элементы <circle> - точки, которые соответсвуют данным из файла.
  - Подсказка при наведении курсора на точку графика - <div> элемент, который отображает значение выбранной точки.

# Установка

Требуется ввести команды:

- Клонирование репозитория:

```
$git clone https://github.com/nickitin123321/anychartTest
```

- Установка пакетов Node.js:

```
$npm install
```

# Список используемых технологий

- Node.js

  - Запуск сервера, на который загружаются данные
    - Express.js - удобный фреймворк для создания веб приложений.

- JavaScript

  - Контроль данных (DataController)
    - fetch() - современный и мощный метод отправки HTTP-запроса, поддерживаемый всеми современными браузерами.
  - Отрисовка графика на SVG (ChartController)
    - SVG формат обладает масштабируемостью. Изображение в SVG формате хорошо выглядит на любом устройстве.

- HTML:

  - Разметка страницы
  - Создание поля ввода и кнопки обновления данных

- CSS
  - Cтили элементов страницы

# Использование

1. Запуск сервера на Node.js:

```
$npm run start
```

2. Переход по ссылке http://localhost:5000/index.html или запуск файла index.html

3. Ввод URL на котором хранятся данные в специальное поле, в данном случае на сервере: http://localhost:5000/api

4. Нажатие на кнопку upgrade data
