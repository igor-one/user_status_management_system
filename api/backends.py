from django.contrib.auth import get_user_model


class NoPasswordAuthBackend(object):
    def authenticate(self, request, username=None):
        UserModel = get_user_model()

        try:
            user = UserModel.objects.get(username=username)
        except UserModel.DoesNotExist:
            user = None

        return user

    def get_user(self, pk):
        UserModel = get_user_model()

        try:
            user = UserModel.objects.get(pk=pk)
        except UserModel.DoesNotExist:
            user = None

        return user
