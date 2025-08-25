from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from api.views import chatbot  # <-- this is now correct
from accounts import views as accounts_views
from django.views.generic import TemplateView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('',TemplateView.as_view(template_name="index.html")),  # <-- serves the React app
    path('chatbot/', chatbot, name='chatbot'),  # <-- renders chatbot.html
    path("api/", include("api.urls")),
]+ static(settings.STATIC_URL, document_root=settings.STATICFILES_DIRS[0])