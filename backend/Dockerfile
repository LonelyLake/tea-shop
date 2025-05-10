# Базовый образ Python
FROM python:3.11-slim

# Рабочая директория
WORKDIR /app

# Копируем зависимости
COPY requirements.txt .

# Устанавливаем зависимости
RUN pip install --no-cache-dir -r requirements.txt

# Копируем остальные файлы
COPY . .

# Команда для запуска
CMD ["gunicorn", "app:app", "--bind", "0.0.0.0:8000"]