from django.shortcuts import render, get_object_or_404, redirect
from .models import CustomUser, Object
from .forms import CustomUserForm, ObjectForm


def custom_user_list(request):
    users = CustomUser.objects.all()
    return render(request, 'accounts/custom_user_list.html', {'users': users})


def custom_user_detail(request, pk):
    user = get_object_or_404(CustomUser, pk=pk)
    return render(request, 'accounts/custom_user_detail.html', {'user': user})


def custom_user_create(request):
    if request.method == 'POST':
        form = CustomUserForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('custom_user_list')
    else:
        form = CustomUserForm()
    return render(request, 'accounts/custom_user_form.html', {'form': form})


def object_list(request):
    objects = Object.objects.all()
    return render(request, 'accounts/object_list.html', {'objects': objects})


def object_detail(request, pk):
    obj = get_object_or_404(Object, pk=pk)
    return render(request, 'accounts/object_detail.html', {'object': obj})


def object_create(request):
    if request.method == 'POST':
        form = ObjectForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('object_list')
    else:
        form = ObjectForm()
    return render(request, 'accounts/object_form.html', {'form': form})
