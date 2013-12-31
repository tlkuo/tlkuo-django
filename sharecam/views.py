from django.shortcuts import render

# Create your views here.

def index(request):
    return render(request, 'sharecam/index.html', {});

def client(request):
    return render(request, 'sharecam/client.html', {});
