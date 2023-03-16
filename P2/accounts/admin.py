from django.contrib import admin
# from .models import CustomUser
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import User
from .serializers import SignupSerializer
from .models import Comment
# Register your models here.
# admin.site.register(CustomUser)
from django.contrib.auth import get_user_model
CustomUser = get_user_model()
admin.site.register(CustomUser)
admin.site.register(Comment)
# admin.site.register(User)

# class CustomUserAdmin(UserAdmin):
#     add_serializer_class = SignupSerializer
    

#     model = CustomUser
#     list_display = ('username', 'email', 'first_name', 'last_name', 'phone_num' 'is_active',
#                     'is_staff', 'is_superuser', 'last_login',)
#     list_filter = ('is_active', 'is_staff', 'is_superuser')
#     fieldsets = (
#         (None, {'fields': ('username', 'email', 'password', 'first_name', 'last_name','phone_num')}),
#         ('Permissions', {'fields': ('is_staff', 'is_active',
#          'is_superuser', 'groups', 'user_permissions')}),
#         ('Dates', {'fields': ('last_login', 'date_joined')})
#     )
#     add_fieldsets = (
#         (None, {
#             'classes': ('wide',),
#             'fields': ('username', 'email', 'password1', 'password2', 'first_name', 'last_name','phone_num', 'is_staff', 'is_active')}
#          ),
#     )
#     search_fields = ('email',)
#     ordering = ('email',)

# admin.site.register(CustomUser, CustomUserAdmin)