FROM mcr.microsoft.com/dotnet/aspnet:10.0.11-azurelinux3.0-arm64v8
USER app
WORKDIR /var/www/app
COPY . /var/www/app/
RUN dotnet restore ""
RUN dotnet publish ""
EXPOSE 8080
