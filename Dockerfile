# Используем базовый образ Nginx
FROM nginx:latest

# Копируем файлы проекта в контейнер
COPY . /usr/share/nginx/html

# Устанавливаем рабочую директорию
WORKDIR /usr/share/nginx/html

# Открываем порт для веб-сервера
EXPOSE 80

# Запускаем веб-сервер Nginx
CMD ["nginx", "-g", "daemon off;"]
