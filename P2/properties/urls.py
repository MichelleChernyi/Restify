from django.urls import path
from . import views_d
from . import views_e

app_name="properties"
urlpatterns = [ 
    path('search/', views_e.PropertyListView.as_view(), name='search')
] 