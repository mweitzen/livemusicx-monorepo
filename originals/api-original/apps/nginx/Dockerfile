FROM nginx:mainline-alpine

# Copy Nginx configuration file
COPY apps/nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 for HTTP traffic
EXPOSE 80

# Start Nginx in the foreground (suitable for development)
CMD ["nginx", "-g", "daemon off;"]