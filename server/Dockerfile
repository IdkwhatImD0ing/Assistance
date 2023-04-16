# syntax=docker/dockerfile:1

FROM python:3.10-slim-buster

WORKDIR /sinkorswim

# Install dependencies
RUN apt-get update
RUN apt-get install -y python3-opencv libgl1-mesa-glx libgl1 nginx supervisor
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Copy your certificate, private key, and CA files
COPY cert.pem /etc/ssl/certs/cert.pem
COPY private.pem /etc/ssl/private/private.pem
COPY ca.pem /etc/ssl/certs/ca.pem

# Copy the Flask app and requirements
COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt

COPY . .

# Configure Nginx
RUN rm /etc/nginx/sites-enabled/default
COPY nginx_config /etc/nginx/sites-available/sinkorswim
RUN ln -s /etc/nginx/sites-available/sinkorswim /etc/nginx/sites-enabled/

# Run the application
CMD ["/usr/bin/supervisord"]
