from django.contrib import admin
from django.urls import path, include
from api.views import chatbot  # <-- this is now correct
from accounts import views as accounts_views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', chatbot, name='chatbot'),  # <-- renders chatbot.html
    path("api/", include("api.urls")),
]