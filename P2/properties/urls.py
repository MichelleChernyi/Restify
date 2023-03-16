from django.urls import path
from . import views_d
from . import views_e

app_name="properties"
urlpatterns = [ 
    path('search/', views_e.PropertyListView.as_view(), name='search'),
    path('<int:pk>/comments/', views_e.PropertyCommentView.as_view(), name='comments'),
    path('comments/<int:pk>/reply/', views_e.ReplyView.as_view(), name='reply'),
] 