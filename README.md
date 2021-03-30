# Обзор

- Веб-приложение выглядит как веб-страница с полем ввода URL и кнопкой "Обновить данные".
- При вводе URL источника данных (ссылка на API сервера) и нажатии кнопки происходит установка источника данных и отрисовка линейной диаграммы по данным источника.
- Сервер, написанный на Node.js отдает данные, хранимые в файле 11.json.
- DataController каждые 1000ms делает GET запросы с помощью fetch() метода к введенному источнику данных(в данном случае - к серверу) и при изменении данных сообщает об этом - dispatchEvent().
- ChartConroller слышит, что данные изменились, получает их и перерисовывает график по новым данным.
- Элементы графика:
  - Контейнер, в который помещается график - элемент SVG.
  - Оси координат графика - 2 элемента line с установленными расположениями и длинами.
  - Подписи к осям координат - элементы text.
  - Линия графика - элемент path.
  - Точки, которые соответсвуют данным data.value - элементы circle.
  - Подсказка при наведении курсора на точку графика - div элемент, который отображает значение выбранной точки.

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

- Node.js:

  - Запуск сервера на который загружаются данные.
    - Express.js - удобный фреймворк для создания веб-приложений.

- JavaScript:

  - Контроль данных (DataController).
    - fetch() - современный и мощный метод отправки HTTP-запроса, поддерживаемый всеми современными браузерами.
  - Отрисовка графика на SVG (ChartController).
    - SVG формат обладает масштабируемостью. Изображение в SVG формате хорошо выглядит на любом устройстве.

- HTML:

  - Разметка страницы.
  - Создание поля ввода и кнопки обновления данных.

- CSS:
  - Cтили элементов страницы.

# Использование

1. Запуск сервера на Node.js:

```
$npm run start
```

2. Переход по ссылке http://localhost:5000 или запуск файла index.html.

3. Ввод URL источника данных в специальное поле, в данном случае - сервера: http://localhost:5000/api.

4. Нажатие на кнопку "Обновить данные".

5. При изменении данных в файле 11.json происходит перерисовка графика с задержкой в 1000ms.
