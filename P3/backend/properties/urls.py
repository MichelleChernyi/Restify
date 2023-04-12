from django.urls import path  
from . import views_d  
from . import views_e  
  
app_name="properties"  
urlpatterns = [   
    path('search/', views_e.PropertyListView.as_view(), name='search'),  
    path('<int:pk>/comments/', views_e.PropertyCommentView.as_view(), name='comments'),  
    path('comments/<int:pk>/reply/', views_e.ReplyView.as_view(), name='reply'),  
    path('create/', views_d.CreatePropertyView.as_view(), name='create'),  
    path('update/<int:pk>/', views_d.UpdatePropertyView.as_view(), name='update'),  
    path('delete/<int:pk>/', views_d.DeletePropertyView.as_view(), name='delete'),  
    path('reservations/create/<int:pk>/', views_d.CreateReservationView.as_view(), name='create_reservation'),  
    path('reservations/update/<int:pk>/', views_d.ChangeStatusReservationView.as_view(), name='update_reservation'),  
    # path('reservations/terminate/<int:pk>/', views_d.DeleteReservationView.as_view(), name='terminate_reservation'),  
    path('reservations/cancel/<int:pk>/', views_d.DeleteReservationView.as_view(), name='terminate_reservation'),  
    path('reservations/list/', views_d.ListReservationView.as_view(), name='list_reservation'),  
    path('<int:pk>', views_e.PropertyView.as_view(), name='property')  
]   