from django.urls import path
from . import views


app_name="accounts"
urlpatterns = [ 
    # path('list/', views.stores_list, name='list'),
    # path('manage/', views.StoresManage.as_view(), name='manage'),
    # path('owned/', views.StoresOwned.as_view(), name='owned'),
    # path('detail/<int:pk>/', views.StoreGetSet.as_view(), name='detail'),
    path('signup/', views.SignupView.as_view(), name='create'),
    path('logout/', views.LogoutView.as_view(), name='logout'),
    path('profile/<int:pk>/', views.ProfileView.as_view(), name='profile'),
    path('comments/<int:pk>/', views.GuestCommentView.as_view(), name='comments'),
    path('notification/create/', views.NotificationsViewCreate.as_view(), name='notification/create'),
    path('notification/list/', views.NotificationsListView.as_view(), name='notification/list'),
    path('notification/<int:pk>/', views.NotificationView.as_view(), name='notification'),
    # path('update/<int:pk>/', views.StoreGetSet.as_view(), name='update'),
    #path('delete/<int:pk>/', views.StoresDelete.as_view(), name='delete'),
] 
